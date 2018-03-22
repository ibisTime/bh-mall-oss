$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '出货人',
		search: true
	},{
		field : 'mobile',
		title : '出货人手机'
	}, {
        field : 'level',
        title : '出货人等级'
    }, {
        field : 'updateDatetime',
        title : '出货人团队'
    }, {
        field : 'product',
        title : '出货产品',
        search: true,
		type: 'select'
    }, {
        field : 'updateDatetime',
        title : '奖励收入',
		formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '奖励支出',
        formatter: moneyFormat
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
