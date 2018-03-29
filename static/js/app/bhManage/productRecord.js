$(function() {
// 报货管理-云仓管理-产品库存记录
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'name',
		title : '产品名称',
		search: true,
		type: 'select'
	},{
        field : 'type',
        title : '变动类型'
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
        formatter: dateTimeFormat
    }, {
        field : 'updater',
        title : '操作人'
    }, {
        field : 'remark',
        title : '备注'
    }, {
        field : 'updateDatetime',
        title : '操作类型',
        search: true,
        type: 'select',
        visible: false
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
