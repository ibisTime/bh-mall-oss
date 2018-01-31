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
        title : '手机号',
		formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '微信号',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '出货总额',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '推荐总额',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '介绍总额',
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
