$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '名称',
		search: true,
		type: 'select'
	},{
		field : 'cvalue',
		title : '库存分类'
	}, {
        field : 'updateDatetime',
        title : '变动操作',
		formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '变动库存',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '变动后库存',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '变动时间',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '操作人',
        formatter: dateTimeFormat,
		search: true
    }, {
        field : 'updateDatetime',
        title : '备注',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '操作类型',
        search: true,
        type: 'select',
        visible: false
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
