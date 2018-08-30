$(function() {
    // 报货管理-内购商城-产品管理
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '产品编号',
        search: true
    }, {
        field: 'name',
        title: '名称',
        search: true
    }, {
        field: 'specsName',
        title: '产品规格',
        formatter(v, d) {
            let specsName = '';
            d.specsList.forEach((item, index) => {
                specsName += '[' + (index + 1) + '] ' + item.name + ', ';
            });
            specsName = specsName.split('');
            specsName.length = specsName.length - 2;
            specsName = specsName.join('');
            return specsName;
        }
    }, {
        field: 'quantity',
        title: '数量',
        formatter(v, data) {
            return data.quantity;
        }
    }, {
        field: 'status',
        title: '状态',
        search: true,
        type: 'select',
        key: 'inner_status',
        formatter: Dict.getNameForList("inner_status")
    }, {
        field: 'isFree',
        title: '是否包邮',
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'orderNo',
        title: '排序'
    }, {
        field: 'remark',
        title: '备注'
    }, {
        field: 'updater',
        title: '最新修改人'
    }, {
        field: 'updateDatetime',
        title: '最新修改时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '627710'
    });
    // 上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == '1' || selRecords[0].status == '3') {
            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该产品的位序</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'orderNo',
                    title: '顺序',
                    required: true,
                    number: true,
                    min: '0'
                }, {
                    field: 'isFree1',
                    title: '是否包邮',
                    required: true,
                    type: 'select',
                    data: { '0': '否', '1': '是' }
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            reqApi({
                                code: '627703',
                                json: {
                                    code: selRecords[0].code,
                                    updater: getUserId(),
                                    orderNo: data.orderNo,
                                    isFree: data.isFree1
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
            hideLoading()
        } else {
            toastr.info('该状态不可上架')
        }
    });
    // 下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status == '2') {
            confirm('确定下架？').then(function() {
                reqApi({
                    code: 627704,
                    json: {
                        code: selRecords[0].code,
                        updater: getUserId()
                    }
                }).then(function() {
                    sucList();
                });
            })
        } else {
            toastr.info('该状态不可下架')
        }


    });




    // 修改
    $('#editBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != '2') {
            window.location.href = "./productManage_addedit.html?v=0&code=" + selRecords[0].code;
        } else {
            toastr.info('上架状态不可进行修改')
        }


    });

    //详情
    $('#ydetailBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./productManage_detail.html?code=" + selRecords[0].code + '&userId=' + selRecords[0].userId + '&toorter=ok';
    });
});