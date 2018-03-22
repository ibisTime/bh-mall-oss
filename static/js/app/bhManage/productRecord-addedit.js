$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'name',
        title : '名称'
    },{
        field : 'cvalue',
        title : '库存分类'
    }, {
        field : 'updateDatetime',
        title : '变动操作'
    }, {
        field : 'updateDatetime',
        title : '变动库存'
    }, {
        field : 'updateDatetime',
        title : '变动后库存'
    }, {
        field : 'updateDatetime',
        title : '变动时间',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '操作人'
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