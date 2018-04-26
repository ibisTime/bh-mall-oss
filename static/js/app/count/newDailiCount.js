$(function() {

	var columns = [{
		field : 'name',
		title : '姓名'
	},{
		field : 'value',
		title : '等级'
	},{
        field : 'mobile',
        title : '手机号'
    },{
        field : 'cvalue',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '授权时间',
		formatter: dateTimeFormat
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
		// pageCode: '627955',
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
