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
    	field : 'productName',
    	title : '产品名称'
    },{
        field : 'payAmount',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'status',
        title : '订单状态',
        search: true,
        type: 'select',
        key : 'inner_order_status',
        formatter : Dict.getNameForList('inner_order_status')
    }, {
        field : 'realName',
        title : '下单代理'
    }, {
        field : 'level',
        title : '下单代理等级',
        type : 'select',
        listCode : '627006',
        keyName : 'level',
        valueName : 'name'
    }, {
        field : 'signer',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话'
    }, {
        field : 'applyDatetime',
        title : '下单日期',
        formatter: dateTimeFormat
    }, {
        field : 'remark',
        title : '备注'
    }];
	buildList({
		columns: columns,
		pageCode: '627731'
	});

    // 物流信息
//  $('#wuliuBtn').click(function () {
//      var selRecords = $('#tableList').bootstrapTable('getSelections');
//      if (selRecords.length <= 0) {
//          toastr.info("请选择记录");
//          return;
//      }
//
//      window.location.href = './orderManage_wuliu.html?v=1&code='+selRecords[0].code
//  })
});
