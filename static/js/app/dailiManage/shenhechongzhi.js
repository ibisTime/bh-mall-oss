$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '编号'
	},{
		field : 'cvalue',
		title : '充值人',
        search: true,
        type: 'select'
	}, {
        field : 'cvalue',
        title : '充值人团队'
    },{
        field : 'cvalue',
        title : '金额'
    },{
        field : 'updateDatetime',
        title : '申请时间',
		formatter: dateTimeFormat
    }, {
        field : 'cvalue',
        title : '状态',
        search: true,
        type: 'select'
    }, {
        field : 'cvalue',
        title : '审核人'
    }, {
        field : 'cvalue',
        title : '审核时间',
        formatter: dateTimeFormat
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
