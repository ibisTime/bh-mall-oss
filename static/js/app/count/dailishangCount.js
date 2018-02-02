$(function() {

	var columns = [{
		field : 'remark',
		title : '代理商个数'
	}, {
        field : 'updateDatetime',
        title : '等级',
        search: true,
		type: 'select',
        visible: false
    }, {
        field : 'updateDatetime',
        title : '授权状态',
        search: true,
        type: 'select',
        visible: false
    }, {
        field : 'updateDatetime',
        title : '团队',
        search: true,
        type: 'select',
        visible: false
    }, {
        field : 'updateDatetime',
        title : '管理员',
        search: true,
        type: 'select',
        visible: false
    }, {
        field : 'updateDatetime',
        title : '地区',
        search: true,
        type: 'citySelect',
        visible: false
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
