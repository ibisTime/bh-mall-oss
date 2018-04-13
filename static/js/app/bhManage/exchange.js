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
        key : 'change_product_status',
        formatter : Dict.getNameForList('change_product_status')
    },{
        field : 'updateDatetime1',
        title : '下单代理'
    }, {
        field : 'level',
        title : '下单代理等级',
        type : 'select',
        listCode : '627006',
        keyName : 'level',
        valueName : 'name'
    }, {
        field : 'remark',
        title : '备注'
    }, {
        field : 'keyword',
        title : '关键字',
        search: true,
        visible: false
    }];
	buildList({
		columns: columns,
		pageCode: '627800'
	});
	
	$('#checkBtn').off('click').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        
        if(selRecords[0].status == '0') {
        	window.location.href = "./exchange_check.html?v=1&code="+selRecords[0].code;
        }else {
        	toastr.info('该状态下不可进行审核');
        }

	})
});
