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
        field : 'percent',
        title : '授权本等级直接获利',
        required : true
    },{
        field : 'remark',
        title : '备注'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627247',
		editCode: '627241',
		beforeEdit : function(data) {
			data.updater = getUserName();
			return data
		}
	});
	
});