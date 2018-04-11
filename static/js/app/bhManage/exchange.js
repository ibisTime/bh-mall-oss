$(function() {
// 报货管理-云仓管理-全部订单
    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'code',
        title : '订单编号'
    },{
        field : 'applyDatetime',
        title : '下单日期',
        formatter: dateTimeFormat
    }, {
        field : 'amount',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'status',
        title : '订单状态',
        search: true,
        type: 'select',
        key : 'order_status',
        formatter : Dict.getNameForList('order_status')
    }, {
        field : 'kind',
        title : '订单类型',
        search: true,
        type: 'select',
        key :'order_type',
        formatter : Dict.getNameForList('order_type')
    }, {
        field : 'updateDatetime1',
        title : '下单代理'
    }, {
        field : 'updateDatetime2',
        title : '下单代理等级'
    }, {
        field : 'signer',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话'
    }, {
        field : 'remark',
        title : '备注'
    }, {
        field : 'updateDatetime4',
        title : '关键字',
        search: true,
        type: 'select',
        visible: false
    }];
	buildList({
		columns: columns,
		pageCode: '627800',
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
