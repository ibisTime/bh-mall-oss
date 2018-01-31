$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '代理'
	},{
		field : 'cvalue',
		title : '变动业务',
        search: true,
		type: 'select'
	}, {
        field : 'updateDatetime',
        title : '变动前金额'
    }, {
        field : 'updateDatetime',
        title : '变动金额'
    }, {
        field : 'updateDatetime',
        title : '奖励金额'
    }, {
        field : 'updateDatetime',
        title : '状态'
    }, {
        field : 'updateDatetime',
        title : '备注'
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
