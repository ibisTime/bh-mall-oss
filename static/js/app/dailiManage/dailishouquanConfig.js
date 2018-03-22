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
        title : '本等级是否可被意向'
    },{
        field : 'cvalue',
        title : '本等级是否可被介绍'
    },{
        field : 'cvalue',
        title : '本等级是否需要实名'
    },{
        field : 'cvalue',
        title : '本等级是否公司审核'
    },{
        field : 'cvalue',
        title : '本等级授权首单总额',
        formatter: moneyFormat
    },{
        field : 'cvalue',
        title : '本等级授权充值门槛',
        formatter: moneyFormat
    },{
        field : 'cvalue',
        title : '红线设置'
    },{
        field : 'cvalue',
        title : '本等级授权单是否汇总'
    }];
	buildList({
		columns: columns,
		pageCode: '627015',
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
