$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'remark',
        title : '订单编号'
    },{
        field : 'cvalue',
        title : '下单日期',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '下单日期',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }, {
        field : 'updateDatetime',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '订单状态',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '订单类型',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '下单代理'
    }, {
        field : 'updateDatetime',
        title : '下单代理等级',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '收货人'
    }, {
        field : 'updateDatetime',
        title : '收货人电话'
    }, {
        field : 'remark',
        title : '备注'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});