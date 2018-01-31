$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'ckey',
		title : '参数名称',
		type : 'select',
		search: true,

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
		searchParams: {
			companyCode: OSS.company
		},
	// 	beforeEdit: function(r) {
	// 		location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
	// 	}
	});
});
