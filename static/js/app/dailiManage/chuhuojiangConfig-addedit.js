$(function() {
	var code = getQueryString('code');
    var fields = [{
        field : 'level',
        title : '代理等级',
        type : 'select',
        listCode: '627008',
        keyName : 'level',
        searchName :'level',
        valueName: 'name',
        readonly: code,
        required: true
    }, {
        field : 'startAmount',
        title : '奖励区间起始金额',
        amount: true,
        required : true
    }, {
        field : 'endAmount',
        title : '奖励区间截止金额',
        amount: true,
        required : true
    }, {
        field : 'percent',
        title : '出货奖励(%)',
        required : true
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627867',
        addCode: '627860',
		editCode: '627862'
	});
	
});