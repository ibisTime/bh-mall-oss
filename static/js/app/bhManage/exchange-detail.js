$(function() {
    var code = getQueryString('code');
    var fields = [{
        field: 'code1',
        title: '订单编号',
        formatter(v, data) {
            return data.code;
        }
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'specsName',
        title: '产品规格',
        required: true
    }, {
        field: 'quantity',
        title: '数量',
        formatter(v, data) {
            return data.quantity;
        }
    }, {
        field: 'amount',
        title: '付款金额',
        formatter: moneyFormat
    }, {
        field: 'changeProductName',
        title: '置换产品'
    }, {
        field: 'changeSpecsName',
        title: '置换产品规格',
        required: true
    }, {
        field: 'canChangeQuantity',
        title: '置换数量',
        formatter(v, data) {
            return data.canChangeQuantity;
        }
    }, {
        field: 'changePrice',
        title: '换货价',
        formatter(v, data) {
            if (data.changePrice) {
                return (parseInt(data.changePrice) / 1000) + '.00'
            } else {
                return '-'
            }
        }
    }, {
        field: 'realName',
        title: '下单代理',
        formatter: function(v, data) {
            return data.agent ? data.agent.realName : '-'
        }
    }, {
        field: 'level',
        title: '下单代理等级',
        search: true,
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
        visible: false,
        params: {
            highLevel: 6
        }
    }, {
        field: 'status',
        title: '订单状态',
        search: true,
        type: 'select',
        key: 'change_product_status',
        formatter: Dict.getNameForList('change_product_status')
    }, {
        field: 'applyDatetime',
        title: '下单日期',
        formatter: dateTimeFormat
    }, {
        field: 'approveName',
        title: '审核人'
    }, {
        field: 'approveNote',
        title: '审核备注'
    }];

    var buttons = [{
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail({
        fields: fields,
        buttons,
        view: '1',
        code: code,
        detailCode: '627803'
    });

});