$(function() {
// 报货管理-云仓管理-产品库存记录
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'productName',
		title : '产品名称'
	},{
        field : 'type',
        title : '变动类型',
        type : 'select',
        search : true,
        key : 'product_log_type',
        formatter : Dict.getNameForList('product_log_type')
    }, {
        field : 'tranCount',
        title : '变动库存'
    }, {
        field : 'preCount',
        title : '变动前库存'
    }, {
        field : 'postCount',
        title : '变动后库存'
    }, {
        field : 'updateDatetime',
        title : '变动时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '日期',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        type : 'datetime'
    }, {
        field : 'updater',
        title : '操作人'
    }, {
        field : 'remark',
        title : '备注'
    }];
	buildList({
		columns: columns,
		pageCode: '627610',
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
