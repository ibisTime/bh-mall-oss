$(function() {
    // 报货管理-云仓管理-产品列表
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
        field: 'adPrice',
        title: '建议价',
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'price',
        title: '市场价',
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'virNumber',
        title: '虚拟库存'
    }, {
        field: 'realNumber',
        title: '实际库存'
    }, {
        field: 'whNumber',
        title: '云库存'
    }, {
        field: 'status',
        title: '状态',
        search: true,
        type: 'select',
        key: 'product_status',
        formatter: Dict.getNameForList("product_status")
    }, {
        field: 'isFree',
        title: '是否包邮',
        type: 'select',
        data: {
            '1': '是',
            '0': '否'
        }
    }, {
        field: 'isTotal',
        title: '是否计入出货奖励',
        type: 'select',
        data: {
            '1': '是',
            '0': '否'
        }
    }, {
        field: 'orderNo',
        title: '排序'
    }, {
        field: 'updateDatetime',
        title: '添加时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '627554'
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
                    min: '0',
                    value: selRecords[0].orderNo ? selRecords[0].orderNo : ''
                }, {
                    field: 'isFree1',
                    title: '是否包邮',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    },
                    value: selRecords[0].isFree ? selRecords[0].isFree : ''
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();

                            reqApi({
                                code: '627543',
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
                    code: 627544,
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


    //修改
    $('#editBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].status != '2') {
            window.location.href = "./productList_edit.html?code=" + selRecords[0].code;
        } else {
            toastr.info('已上架的产品不能修改')
        }

    });


    // 规格库存
    $('#guigeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        reqApi({
            code: '627557',
            json: {
                code: selRecords[0].code,
                updater: getUserId()
            }
        }).done(function(data) {
            var vir = data.virNumber;
            var real = '-';


            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">修改规格库存</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'productName',
                    title: '规格',
                    required: true,
                    type: 'select',
                    listCode: '627926',
                    keyName: 'code',
                    valueName: 'name',
                    params: {
                        code: selRecords[0].code
                    },
                    onChange(v, data) {
                        real = data.stockNumber;
                        $('#stockNumber').text(real);
                    }
                }, {
                    field: 'stockNumber',
                    title: '规格库存',
                    readonly: true,
                    value: real
                }, {
                    field: 'type',
                    title: '操作类型',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '出库',
                        '1': '入库'
                    }
                }, {
                    field: 'number',
                    title: '变动数量',
                    required: true,
                    number: true
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            data.code = data.productName;
                            data.updater = getUserId();
                            if (data.kind == '0') {
                                data.virNumber = data.number;
                            } else {
                                data.realNumber = data.number;
                            }
                            if ($('#number').val() <= 0) {
                                $('#number').parents('li').append(`<span style="color: red;">变动数量不得少于1</span>`);
                                $('#number').css('border', '1px solid red');
                                return;
                            }
                            reqApi({
                                code: '627920',
                                json: data
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

        })

    });

    //库存变动记录
    $('#kucunbdBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./productRecord.html?code=" + selRecords[0].code + '&toorter=ok';
    });

    //详情
    $('#ydetailBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./productList_detail.html?code=" + selRecords[0].code + '&userId=' + selRecords[0].userId + '&toorter=ok';
    });


});