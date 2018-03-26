$(function() {
// 代理管理-代理管理-代理资料
    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'name',
        title : '姓名'
    },{
        field : 'level',
        title : '等级',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: moneyFormat
    }, {
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '上级'
    }, {
        field : 'updateDatetime',
        title : '上级电话'
    },{
        field : 'updateDatetime',
        title : '团队名称'
    }, {
        field : 'updateDatetime',
        title : '关联管理员'
    }, {
        field : 'updateDatetime',
        title : '推荐人'
    }, {
        field : 'updateDatetime',
        title : '推荐人电话'
    }, {
        field : 'updateDatetime',
        title : '授权状态',
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
