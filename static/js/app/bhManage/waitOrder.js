$(function() {
    // 报货管理-云仓管理-待处理订单


    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });

        var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'code',
            title: '订单编号'
        }, {
            field: 'productName',
            title: '产品名称',
        }, {
            field: 'quantity',
            title: '购买数量',
            formatter(v, data) {
                return data.quantity;
            }
        }, {
            field: 'specsName',
            title: '产品规格',
        }, {
            field: 'amount',
            title: '付款金额',
            amount: true
        }, {
            field: 'status',
            title: '订单状态',
            search: true,
            type: 'select',
            key: 'out_order_status',
            formatter: Dict.getNameForList('out_order_status')
        }, {
            field: 'kind',
            title: '订单类型',
            search: true,
            type: 'select',
            key: 'out_order_type',
            formatter: Dict.getNameForList('out_order_type')
        }, {
            field: 'realName',
            title: '下单代理'
        }, {
            field: 'level',
            title: '下单代理等级',
            search: true,
            type: 'select',
            listCode: '627008',
            keyName: 'level',
            valueName: 'name',
            visible: false
        }, {
            field: 'level1',
            title: '下单代理等级',
            formatter: function(v, data) {
                var level = '';
                items.map(function(item) {
                    if (item.level == data.level) {
                        level = item.name
                    }
                })
                return level
            }
        }, {
            field: 'highUserName',
            title: '上级代理'
        }, {
            field: 'teamLeader',
            title: '团队长名称'
        }, {
            field: 'teamName',
            title: '团队名称',
            formatter: function(v, data) {
                return data.teamName
            }
        }, {
            field: 'signer',
            title: '收货人'
        }, {
            field: 'mobile',
            title: '收货人电话'
        }, {
            field: 'keyword',
            title: '产品名称',
            search: true,
            visible: false
        }, {
            field: 'quyu',
            title: ' &nbsp;&nbsp;&nbsp;区域&nbsp;&nbsp;&nbsp; ',
            formatter: function(v, data) {
                return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                    data.city ? data.province + ' ' + data.city :
                    data.province ? data.province : '-'
            }
        }, {
            field: 'address',
            title: ' &nbsp;&nbsp;&nbsp;详细地址 &nbsp;&nbsp;&nbsp;'
        }, {
            field: 'applyDatetime',
            title: '下单日期',
            formatter: dateTimeFormat,
            field1: 'dateStart',
            title1: '下单日期',
            type: 'datetime',
            field2: 'dateEnd',
            twoDate: true,
            search: true
        }, {
            field: 'remark',
            title: '备注'
        }];
        buildList({
            columns: columns,
            pageCode: '627662',
            searchParams: {
                statusList: ['1', '2', '5'],
                isWareSend: 1,
                toUserId: getUserId()
            },
            singleSelect: false
        });


        // 批量审单
        $('#shendanBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            var check = true;
            selRecords.map(function(item) {
                if (item.status != '1') {
                    toastr.info('包含不可审单的订单')
                    check = false
                }
            });
            if (check) {
                var codeList = [];
                selRecords.map(function(item) {
                    codeList.push(item.code);
                });

                confirm('确定批量审单？').then(function() {
                    var dw = dialog({
                        content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                            '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请填写以下信息</li></ul>' +
                            '</form>'
                    });

                    dw.showModal();

                    buildDetail({
                        container: $('#formContainer'),
                        fields: [{
                            field: 'approveNote',
                            title: '审核备注',
                        }],
                        buttons: [{
                            title: '确定',
                            handler: function() {
                                if ($('#popForm').valid()) {
                                    var data = $('#popForm').serializeObject();
                                    reqApi({
                                        code: '627644',
                                        json: {
                                            codeList: codeList,
                                            approver: getUserId(),
                                            approveNote: data.approveNote
                                        }
                                    }).done(function() {
                                        sucList();
                                        dw.close().remove();
                                    });
                                }
                            }
                        }, {
                            title: '取消',
                            handler: function() {
                                dw.close().remove();
                            }
                        }]
                    });
                    hideLoading();
                })
            } else {
                return
            }

        });
        // 修改收货
        $('#changeAddressBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            if (selRecords[0].status == '0' || selRecords[0].status == '1' || selRecords[0].status == '2') {
                window.location.href = './waitOrder_changeAddress.html?code=' + selRecords[0].code
            } else {
                toastr.info('该状态下不能修改收货地址')
            }
        });

        // 发货
        $('#fahuoBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            if (selRecords[0].status == '2') {
                window.location.href = './waitOrder_fahuo.html?code=' + selRecords[0].code
            } else {
                toastr.info('该状态下不能发货')
            }
        });

        // 审核取消
        $('#cancelBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            if (selRecords[0].status == '5') {
                window.location.href = './waitOrder_addedit.html?cancel=1&code=' + selRecords[0].code
            } else {
                toastr.info('该状态下不能审核取消')
            }
        });

        // 订单作废
        $('#cancellationBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            if (selRecords[0].status == '0' || selRecords[0].status == '1') {
                window.location.href = './waitOrder_cancellation.html?cancel=1&code=' + selRecords[0].code
            } else {
                toastr.info('该状态下不能订单作废')
            }
        });
    })

});