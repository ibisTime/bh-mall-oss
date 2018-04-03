$(function() {
    // 报货管理-云仓管理-待处理订单
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'code',
		title : '订单编号'
	},{
		field : 'cvalue',
		title : '下单日期',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '下单日期',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
	}, {
        field : 'fkAmount',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'orderStatus',
        title : '订单状态',
		search: true,
		type: 'select'
    }, {
        field : 'orderType',
        title : '订单类型',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '下单代理'
    }, {
        field : 'updateDatetime',
        title : '下单代理等级',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话'
    }, {
        field : 'remark',
        title : '备注'
    }];
	buildList({
		columns: columns,
        pageCode: '627665'
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
});
