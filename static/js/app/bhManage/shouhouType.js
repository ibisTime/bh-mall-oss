$(function() {
// 报货管理-售后管理-售后类型
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'dvalue',
		title : '类型名称',
		search: true
	},{
		field : 'dkey',
		title : '类型值'
	}, {
        field : 'updateDatetime',
        title : '添加时间',
		formatter: dateTimeFormat
    }, {
        field : 'remark',
        title : '备注'
    }];
	buildList({
		columns: columns,
		pageCode: '627075',
		deleteCode : '627071',
		searchParams: {
		 	parentKey : 'after_sale_type',
		 	companyCode : OSS.company
		}
	});
});
