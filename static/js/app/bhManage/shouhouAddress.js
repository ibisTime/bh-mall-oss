$(function() {
// 报货管理-售后管理-售后地址
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '地址名称',
		search: true
	},{
		field : 'cvalue',
		title : '省'
	}, {
        field : 'updateDatetime',
        title : '市'
    }, {
        field : 'updateDatetime',
        title : '区'
    }, {
        field : 'updateDatetime',
        title : '具体地址'
    }, {
        field : 'updateDatetime',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话'
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
