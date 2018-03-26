$(function() {
// 代理管理-财务管理-余额管理
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '代理',
		search: true
	},{
		field : 'mobile',
		title : '代理电话',
        search: true
	},{
        field : 'wx',
        title : '代理微信',
        search: true
    },{
        field : 'level',
        title : '代理等级',
        search: true,
		type: 'select'
    },{
        field : 'cvalue',
        title : '代理团队'
    },{
        field : 'cvalue',
        title : '余额',
		formatter: moneyFormat
    }];
	buildList({
		columns: columns,
		pageCode: '627955'
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
