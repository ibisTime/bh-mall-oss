$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'code',
		title : '编号',
		search: true
	},{
		field : 'name',
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
        title : '状态',
		search: true,
		type: 'select'
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
	buildList({
		columns: columns,
		pageCode: '627955',
		// searchParams: {
		// 	type: 'android_b',
		// 	companyCode: OSS.company,
		// 	orderColumn:'id',
		// 	orderDir: 'asc'
		// },
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
});
