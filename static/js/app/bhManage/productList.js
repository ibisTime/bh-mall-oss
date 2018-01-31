$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '编号',
		search: true
	},{
		field : 'cvalue',
		title : '名称'
	}, {
        field : 'updateDatetime',
        title : '建议微信价',
		formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '市场价',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '虚拟库存',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '实际库存',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '状态',
        formatter: dateTimeFormat,
		search: true,
		type: 'select'
    }, {
        field : 'updateDatetime',
        title : '产品组',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '是否计入出货',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '排序',
        formatter: dateTimeFormat
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
