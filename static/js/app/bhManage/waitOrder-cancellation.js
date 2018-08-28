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
            field: 'amount',
            title: '付款金额',
            amount: true,
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '订单状态',
            key: 'out_order_status',
            formatter: Dict.getNameForList('out_order_status')
        }, {
            field: 'kind',
            title: '订单类型',
            key: 'out_order_type',
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
            title: '备注',
            readonly: !cancel,
            required: true
        }];

        var buttons = [{
            title: '确定',
            handler: function() {

                var data = $('#popForm').serializeObject();
                data.code = code;
                data.result = "1";
                data.remark = $('#remark').val();
                data.updater = getUserId();
                reqApi({
                    code: '627650',
                    json: data
                }).done(function(data) {
                    sucDetail();
                    goBack();
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
            view: view,
            buttons: cancel ? buttons : null,
            detailCode: '627664',
            addCode: '627920',
            editCode: '627921'
        });

    })


});