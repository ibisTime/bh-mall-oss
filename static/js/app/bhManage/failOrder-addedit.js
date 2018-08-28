$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'remark',
        title: '订单编号'
    }, {
        field: 'cvalue',
        title: '下单日期',
        formatter: dateTimeFormat
    }, {
        field: 'fkAmount',
        title: '付款金额',
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'updateDatetime',
        title: '订单状态'
    }, {
        field: 'orderType',
        title: '订单类型'
    }, {
        field: 'updateDatetime',
        title: '下单代理'
    }, {
        field: 'level',
        title: '下单代理等级'
    }, {
        field: 'updateDatetime',
        title: '收货人'
    }, {
        field: 'mobile',
        title: '收货人电话'
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '627927',
        addCode: '627920',
        editCode: '627921'
    });

});