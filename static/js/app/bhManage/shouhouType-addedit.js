$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'remark',
        title : '类型名称'
    },{
        field : 'cvalue',
        title : '分类'
    }, {
        field : 'updateDatetime',
        title : '添加时间',
        formatter: dateTimeFormat
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});