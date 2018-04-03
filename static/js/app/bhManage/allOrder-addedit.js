$(function() {
	var code = getQueryString('code');
	var view = getQueryString('v');

    var fields = [{
        field : 'code1',
        title : '订单编号',
        formatter : function (v, data) {
            return data.code
        }
    },{
        field : 'applyDatetime',
        title : '下单日期',
        formatter: dateTimeFormat
    }, {
        field : 'amount',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'status',
        title : '订单状态',
        type: 'select',
        key : 'order_status',
        formatter : Dict.getNameForList('order_status')
    }, {
        field : 'orderType',
        title : '订单类型'
    }, {
        field : 'updateDatetime',
        title : '下单代理'
    }, {
        field : 'updateDatetime',
        title : '下单代理等级'
    }, {
        field : 'signer',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话'
    }, {
        field : 'remark',
        title : '备注'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
        view : view,
		detailCode: '627664',
		addCode: '627920',
		editCode: '627921'
	});
	
});