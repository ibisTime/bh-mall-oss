$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'remark',
        title : '代理等级'
    },{
        field : 'cvalue',
        title : '产品'
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