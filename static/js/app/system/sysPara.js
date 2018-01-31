$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'ckey',
		title : '参数名称',
		search: true,
		type: 'select'
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
		pageCode: '627965',
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
