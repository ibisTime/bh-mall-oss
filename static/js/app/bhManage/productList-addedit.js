$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'remark',
        title : '编号',
        search: true
    },{
        field : 'cvalue',
        title : '名称'
    }, {
        field : 'updateDatetime',
        title : '建议微信价',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '市场价',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '虚拟库存'
    }, {
        field : 'updateDatetime',
        title : '实际库存'
    }, {
        field : 'status',
        title : '状态'
    }, {
        field : 'updateDatetime',
        title : '产品组'
    }, {
        field : 'updateDatetime',
        title : '是否计入出货'
    }, {
        field : 'updateDatetime',
        title : '排序'
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