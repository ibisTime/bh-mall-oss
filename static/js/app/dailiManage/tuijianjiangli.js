$(function() {

    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'remark',
        title : '代理',
        search: true
    },{
        field : 'cvalue',
        title : '代理手机'
    }, {
        field : 'updateDatetime',
        title : '代理等级'
    }, {
        field : 'updateDatetime',
        title : '代理团队'
    },{
        field : 'updateDatetime',
        title : '奖励收入'
    }, {
        field : 'updateDatetime',
        title : '奖励支出'
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
