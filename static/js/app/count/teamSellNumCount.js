$(function() {

	var columns = [{
		field : 'remark',
		title : '团队',
		search: true,
		type: 'select'
	},{
		field : 'cvalue',
		title : '最高代理名字'
	}, {
        field : 'updateDatetime',
        title : '产品1'
    }, {
        field : 'updateDatetime',
        title : '产品2'
    }, {
        field : 'updateDatetime',
        title : '产品3'
    }, {
        field : 'updateDatetime',
        title : '日期',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '日期',
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
