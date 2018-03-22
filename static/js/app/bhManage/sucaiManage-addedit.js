$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'title',
        title : '标题'
    },{
        field : 'cvalue',
        title : '分类'
    }, {
        field : 'updateDatetime',
        title : '图像'
    }, {
        field : 'updateDatetime',
        title : '是否显示在列表'
    }, {
        field : 'updateDatetime',
        title : '添加时间',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '可查看等级'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});