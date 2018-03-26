$(function() {
// 代理管理-代理管理-代理结构
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '参数名称',
		search: true
	},{
		field : 'cvalue',
		title : '参数值'
	}, {
        field : 'updateDatetime',
        title : '最近修改时间',
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
