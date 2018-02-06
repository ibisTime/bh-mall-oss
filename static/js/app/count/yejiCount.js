$(function() {

	var columns = [{
		field : 'remark',
		title : '姓名',
		search: true,
		type: 'select'
	},{
		field : 'cvalue',
		title : '等级'
	}, {
        field : 'updateDatetime',
        title : '手机号'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '出货总额'
    }, {
        field : 'updateDatetime',
        title : '推荐总额'
    }, {
        field : 'updateDatetime',
        title : '介绍总额'
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
