$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'name',
		title : '等级名称'
	},{
		field : 'level',
		title : '等级',
        search: true,
		type: 'select'
	},{
        field : 'cvalue',
        title : '本等级升级是否公司审核'
    },{
        field : 'cvalue',
        title : '本等级升级首单总额',
		formatter: moneyFormat
    },{
        field : 'cvalue',
        title : '半门槛升级推荐人数'
    },{
        field : 'cvalue',
        title : '本等级升级是否余额清零'
    }];
	buildList({
		columns: columns,
		pageCode: '627025',
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
