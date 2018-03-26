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
        field : 'cvalue',
        title : '下单日期',
        formatter: dateTimeFormat
    }, {
        field : 'fkAmount',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
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
        title : '下单代理等级'
    }, {
        field : 'updateDatetime',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话'
    }, {
        field : 'remark',
        title : '备注'
    }, {
        field : 'updateDatetime',
        title : '团队',
        search: true,
        type: 'select',
        visible: false
    }, {
        field : 'updateDatetime',
        title : '订单所在人',
        search: true,
        type: 'select',
        visible: false
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
