$(function() {
    // 代理管理-系统设置-云仓订单详情
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'code1',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        field: 'amount',
        title: '订单金额',
        readonly: view,
        formatter: moneyFormat
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
        field: 'status',
        title: '订单状态',
        search: true,
        type: 'select',
        key: 'in_order_status',
        valueName: 'name',
        formatter: Dict.getNameForList("in_order_status")
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat
    }, {
        field: 'productCode',
        title: '商品编号'
    }, {
        field: 'productName',
        title: '商品名称'
    }, {
        field: 'specsName',
        title: '商品规格'
    }, {
        field: 'price',
        title: '产品单价',
        amount: true
    }];


    buildDetail({
        fields: fields,
        code,
        view: view,
        detailCode: '627917'
    });
});