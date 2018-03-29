$(function() {
// 代理管理-财务管理-审核充值
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'code',
		title : '编号'
	},{
		field : 'cvalue',
		title : '充值人',
        search: true,
        type: 'select'
	}, {
        field : 'cvalue',
        title : '充值人团队'
    },{
        field : 'amount',
        title : '金额',
        formatter: moneyFormat
    },{
        field : 'updateDatetime',
        title : '申请时间',
		formatter: dateTimeFormat
    }, {
        field : 'status',
        title : '状态',
        search: true,
        type: 'select'
    }, {
        field : 'cvalue',
        title : '审核人'
    }, {
        field : 'cvalue',
        title : '审核时间',
        formatter: dateTimeFormat
    }];
	buildList({
		columns: columns,
		pageCode: '627470',
		searchParams: {
			companyCode: OSS.company,
		},
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
});
