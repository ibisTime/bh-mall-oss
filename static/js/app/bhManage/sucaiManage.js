$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '标题'
	},{
		field : 'cvalue',
		title : '分类',
        search: true,
		type: 'select'
	}, {
        field : 'updateDatetime',
        title : '图像',
		formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '是否显示在列表',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '添加时间',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '可查看等级',
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
