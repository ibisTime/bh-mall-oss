$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '姓名',
		search: true,
		type: 'select'
	},{
		field : 'cvalue',
		title : '联系电话',
        search: true,
        type: 'select'
	}, {
        field : 'updateDatetime',
        title : '微信号',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '授权等级'
    }, {
        field : 'updateDatetime',
        title : '授权时间'
    }, {
        field : 'updateDatetime',
        title : '操作人'
    }, {
        field : 'updateDatetime',
        title : '推荐人'
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