$(function() {
	// 实际上是审核授权的审核页面
	var code = getQueryString('code');
	var view = true;
    var fields = [{
        field : 'level',
        title : '代理等级',
		readonly: view
    },{
        field : 'cvalue',
        title : '授权本等级直接获利'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});