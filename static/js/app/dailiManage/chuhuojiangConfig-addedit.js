$(function() {
	var code = getQueryString('code');
    var view = true;
    var fields = [{
        field : 'level',
        title : '代理等级',
        readonly: view
    },{
        field : 'product',
        title : '产品',
        readonly: view
    }, {
        field : 'updateDatetime',
        title : '出货奖励',
        formatter: moneyFormat
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});