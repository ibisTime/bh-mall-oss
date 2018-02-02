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
    }, {
        field : 'updateDatetime',
        title : '等级',
        search: true,
        type: 'select',
        visible: false
    }, {
        field : 'updateDatetime',
        title : '生效时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '生效时间',
        // type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
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
