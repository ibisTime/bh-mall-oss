$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '姓名'
	},{
		field : 'cvalue',
		title : '等级',
        search: true,
		type: 'select'
	}, {
        field : 'updateDatetime',
        title : '联系电话',
		formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '微信号',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '地域',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '代理状态',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '来源',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }, {
        field : 'updateDatetime',
        title : '备注',
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
