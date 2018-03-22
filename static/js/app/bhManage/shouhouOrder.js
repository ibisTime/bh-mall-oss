$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '申请代理'
	},{
		field : 'cvalue',
		title : '代理等级'
	}, {
        field : 'mobile',
        title : '代理电话'
    }, {
        field : 'updateDatetime',
        title : '代理微信'
    }, {
        field : 'updateDatetime',
        title : '关联订单'
    }, {
        field : 'updateDatetime',
        title : '售后类型'
    }, {
        field : 'updateDatetime',
        title : '申请时间',
        formatter: dateTimeFormat
    }, {
        field : 'status',
        title : '状态'
    }, {
        field : 'updateDatetime',
        title : '操作人',
        search: true,
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
