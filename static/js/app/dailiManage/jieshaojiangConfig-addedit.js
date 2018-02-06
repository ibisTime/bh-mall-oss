$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'remark',
        title : '代理等级'
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