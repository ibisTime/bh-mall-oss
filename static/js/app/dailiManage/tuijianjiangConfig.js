$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '代理等级'
	},{
		field : 'cvalue',
		title : '产品'
	}, {
        field : 'updateDatetime',
        title : '直推奖励'
    }, {
        field : 'updateDatetime',
        title : '间推奖励'
    }, {
        field : 'updateDatetime',
        title : '次推奖励'
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
