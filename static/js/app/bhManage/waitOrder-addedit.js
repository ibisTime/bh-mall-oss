$(function() {
    var code = getQueryString('code');
    var cancel = getQueryString('cancel');
    var view = getQueryString('v');


    if (cancel == '1') {
        view = true
    }


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
            field: 'code1',
            title: '订单编号',
            formatter: function(v, data) {
                return data.code
            }
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
            amount: true,
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '订单状态',
            type: 'select',
            key: 'out_order_status',
            formatter: Dict.getNameForList('out_order_status')

        }, {
            field: 'kind',
            title: '订单类型',
            type: 'select',
            formatter: Dict.getNameForList('out_order_type')

        }, {
            field: 'realName',
            title: '下单代理'
        }, {
            field: 'level',
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
            field: 'quyu',
            title: '区域',
            required: true,
            type: 'citySelect'
        }, {
            field: 'address',
            title: '详细地址'
        }, {
            field: 'applyDatetime',
            title: '下单日期',
            formatter: dateTimeFormat
        }, {
            field: 'remark',
            title: '备注',
            readonly: !cancel,
            required: true
        }];

        var buttons = [{
            title: '通过',
            handler: function() {

                var data = $('#popForm').serializeObject();
                data.code = code;
                data.result = "1";
                data.updater = getUserId();
                reqApi({
                    code: '627647',
                    json: data
                }).done(function(data) {
                    sucDetail();
                    dw.close().remove();
                });

            }
        }, {
            title: '不通过',
            handler: function() {
                var data = $('#popForm').serializeObject();
                data.code = code;
                data.result = "0";
                data.updater = getUserId();
                reqApi({
                    code: '627647',
                    json: data
                }).done(function(data) {
                    sucDetail();
                    dw.close().remove();
                });
            }
        }, {
            title: '取消',
            handler: function() {
                dw.close().remove();
            }
        }];

        buildDetail({
            fields: fields,
            code: {
                code,
                updater: getUserId()
            },
            view: view,
            buttons: cancel ? buttons : null,
            detailCode: '627664',
            addCode: '627920',
            editCode: '627921'
        });

    })


});