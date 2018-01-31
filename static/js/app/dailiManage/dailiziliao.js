$(function() {

    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'remark',
        title : '姓名'
    },{
        field : 'cvalue',
        title : '等级',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '联系电话',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '微信号',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '上级',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '上级电话',
        formatter: dateTimeFormat
    },{
        field : 'updateDatetime',
        title : '团队名称',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '关联管理员',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '推荐人',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '推荐人电话',
        formatter: dateTimeFormat
    }, {
        field : 'updateDatetime',
        title : '授权状态',
        formatter: dateTimeFormat,
        search: true,
        type: 'select'
    },  {
        field : 'updateDatetime',
        title : '状态时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '状态时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
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
