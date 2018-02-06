$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'remark',
        title : '姓名',
        search: true,
        type: 'select'
    },{
        field : 'cvalue',
        title : '联系电话',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '微信号',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '授权等级'
    }, {
        field : 'updateDatetime',
        title : '授权时间',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '操作人'
    }, {
        field : 'updateDatetime',
        title : '推荐人'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});