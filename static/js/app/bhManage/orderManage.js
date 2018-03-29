$(function() {
// 报货管理-内购商城-订单管理
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
        field : 'payAmount',
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
        field : 'updateDatetime2',
        title : '下单代理'
    }, {
        field : 'updateDatetime3',
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
    }];
	buildList({
		columns: columns,
		pageCode: '627731',
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

    // 物流信息
    $('#wuliuBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = './orderManage_wuliu.html?v=1&code='+selRecords[0].code
    })
});
