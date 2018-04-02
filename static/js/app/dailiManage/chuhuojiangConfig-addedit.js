$(function() {
	var code = getQueryString('code');
    var view = true;
    var fields = [{
        field : 'level',
        title : '代理等级',
        type : 'select',
        listCode: '627006',
        keyName : 'level',
        searchName :'level',
        valueName: 'name',
        readonly: view
    },{
        field : 'productCode',
        title : '产品',
        readonly: view
    }, {
        field : 'value1',
        title : '出货奖励',
        required : true
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627592',
		editCode: '627580'
	});
	
});