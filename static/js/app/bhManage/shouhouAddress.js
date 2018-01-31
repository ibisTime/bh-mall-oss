$(function() {

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
        title : '市',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '区',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '具体地址',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '收货人',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '收货人电话',
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
