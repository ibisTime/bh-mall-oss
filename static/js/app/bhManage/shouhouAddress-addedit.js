$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'remark',
        title : '地址名称',
        search: true
    },{
        field : 'cvalue',
        title : '省'
    }, {
        field : 'updateDatetime',
        title : '市'
    }, {
        field : 'updateDatetime',
        title : '区'
    }, {
        field : 'updateDatetime',
        title : '具体地址'
    }, {
        field : 'updateDatetime',
        title : '收货人'
    }, {
        field : 'updateDatetime',
        title : '收货人电话'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});