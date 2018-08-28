$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');


    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });


        var fields = [{
            field: 'realName',
            title: '申请代理',
            formatter: function(v, data) {
                return data.user ? data.user.realName : '-'
            }
        }, {
            field: 'level',
            title: '下单代理等级',
            formatter: function(v, data) {
                var level = '';
                items.map(function(item) {
                    if (data.user && item.level == data.user.level) {
                        level = item.name
                    }
                })
                return level
            }
        }, {
            field: 'mobile',
            title: '代理电话',
            formatter: function(v, data) {
                return data.user ? data.user.mobile : '-'
            }
        }, {
            field: 'updateDatetime',
            title: '代理微信',
            formatter: function(v, data) {
                return data.user ? data.user.wxId : '-'
            }
        }, {
            field: 'refNo',
            title: '关联订单'
        }, {
            field: 'saleType',
            title: '售后类型',
            search: true,
            type: 'select',
            key: 'after_sale_type',
            formatter: Dict.getNameForList('after_sale_type')
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            formatter: dateTimeFormat
        }, {
            field: 'status',
            title: '状态',
            search: true,
            type: 'select',
            key: 'after_sale_status',
            formatter: Dict.getNameForList('after_sale_status')
        }, {
            field: 'approveNote',
            title: '处理意见',
            readonly: false
        }];


        var buttons = [{
            title: '确定',
            handler: function() {

                var data = $('#popForm').serializeObject();
                data.code = code;
                data.result = "1";
                data.approver = getUserId();
                data.approveNote = $('#approveNote').val();
                reqApi({
                    code: '627681',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });

            }
        }, {
            title: '不通过',
            handler: function() {
                var data = $('#popForm').serializeObject();
                data.code = code;
                data.result = "0";
                data.approver = getUserId();
                data.approveNote = $('#approveNote').val();
                reqApi({
                    code: '627681',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }, {
            title: '取消',
            handler: function() {
                goBack();
            }
        }];
        buildDetail({
            fields: fields,
            code: code,
            detailCode: '627692',
            buttons: buttons,
            view: view,
            beforeSubmit: function(data) {
                data.parentKey = 'after_sale_type',
                    data.updater = getUserId(),
                    data.type = '1'
                return data;
            }
        });
        hideLoading();


    })

});