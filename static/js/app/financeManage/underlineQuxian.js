$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
        search : true
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '开户支行'
    }, {
        field: 'payCardNo',
        title: '卡号'
    }, {
        field: 'loginName',
        title: '申请人',
        formatter : function (v, data) {
            return data.user?data.user.loginName : '-'
        }
    },{
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type : 'select',
        key : 'withdraw_status',
        formatter : Dict.getNameForList('withdraw_status')
    }, {
        field: 'payUser',
        title: '审核人'
    }, {
        field: 'payDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '627510',
        singleSelect : false,
        searchParams: {
            companyCode: OSS.company
        }

    });
    // 代申请
    $('#daishenqingBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./underlineQuxian_daishenqing.html?accountNumber="+selRecords[0].accountNumber

    })
    // 批量审核
    $('#checkBtn').off('click').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');

        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var test = selRecords.map(function (item) {
            if(item.status !== '1') {
                toastr.info("包含一条或多条非待审批记录");
                return false
            }
            return true
        });
        var result = false;
        if($.inArray(false, test) == -1) {
            result = true
        }
        if(!result) {
            return;
        }else {
            var codeList = selRecords.map(function (item) {
                return item.code;
            });

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请填写以下信息</li></ul>' +
                '' +
                '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'approveNote',
                    title: '审批说明',
                    required: true,
                    number: true,
                    min: '0'
                }],
                buttons: [{
                    title: '通过',
                    handler: function () {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            reqApi({
                                code: '627502',
                                json: {
                                    codeList: codeList,
                                    approveUser: getUserName(),
                                    approveResult: '1'
                                }
                            }).done(function () {
                                sucList();
                                dw.close().remove();
                            });
                        }
                    }
                }, {
                    title: '不通过',
                    handler: function () {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            reqApi({
                                code: '627502',
                                json: {
                                    codeList: codeList,
                                    approveUser: getUserName(),
                                    approveResult: '0'
                                }
                            }).done(function () {
                                sucList();
                                dw.close().remove();
                            });
                        }
                    }
                }, {
                    title: '取消',
                    handler: function () {
                        dw.close().remove();
                    }
                }]
            });
            hideLoading();
        }



    })
    // 批量回录
    $('#huiluBtn').off('click').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');

        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        var test = selRecords.map(function (item) {
            if(item.status !== '3') {
                toastr.info("包含一条或多条非审核通过记录");
                return false
            }
            return true
        });
        var result = false;
        if($.inArray(false, test) == -1) {
            result = true
        }
        if(!result) {
            return;
        }else {
            var codeList = selRecords.map(function (item) {
                return item.code;
            });

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请填写以下信息</li></ul>' +
                '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'payNote',
                    title: '审批说明',
                    required: true,
                    number: true,
                    min: '0'
                }],
                buttons: [{
                    title: '通过',
                    handler: function () {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            reqApi({
                                code: '627503',
                                json: {
                                    codeList: codeList,
                                    payUser: getUserName(),
                                    payResult: '1'
                                }
                            }).done(function () {
                                sucList();
                                dw.close().remove();
                            });
                        }
                    }
                }, {
                    title: '不通过',
                    handler: function () {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            reqApi({
                                code: '627503',
                                json: {
                                    codeList: codeList,
                                    payUser: getUserName(),
                                    payResult: '0'
                                }
                            }).done(function () {
                                sucList();
                                dw.close().remove();
                            });
                        }
                    }
                }, {
                    title: '取消',
                    handler: function () {
                        dw.close().remove();
                    }
                }]
            });
            hideLoading();
        }



    })
});