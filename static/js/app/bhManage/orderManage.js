$(function() {
    // 报货管理-内购商城-订单管理
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号'
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'specsName',
        title: '产品规格'
    }, {
        field: 'payAmount',
        title: '付款金额',
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '订单状态',
        search: true,
        type: 'select',
        key: 'inner_order_status',
        formatter: Dict.getNameForList('inner_order_status')
    }, {
        field: 'realName',
        title: '下单代理'
    }, {
        field: 'level',
        title: '下单代理等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
    }, {
        field: 'signer',
        title: '收货人'
    }, {
        field: 'mobile',
        title: '收货人电话'
    }, {
        field: 'applyDatetime',
        title: '下单日期',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '627731'
    });

    // 物流信息
    $('#wuliuBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = './orderManage_wuliu.html?v=1&code=' + selRecords[0].code
    })

    // 发货
    $('#fahuoBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == '2') {
            window.location.href = './orderManage_fahuo.html?code=' + selRecords[0].code
        } else {
            toastr.info('该状态下不能发货')
        }
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
                                    code: '627727',
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
            return;
        }

    });

});