$(function() {

	var columns = [{
		field : 'remark',
		title : '姓名'
	},{
		field : 'cvalue',
		title : '等级'
	},{
        field : 'cvalue',
        title : '手机号'
    },{
        field : 'cvalue',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '授权时间',
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
