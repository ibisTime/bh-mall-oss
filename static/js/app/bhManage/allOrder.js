$(function() {
// 报货管理-云仓管理-全部订单


reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function (item) {
            return {
                level: item.level,
                name: item.name
            };
        });
        
        var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'code',
        title : '订单编号'
    },{
    	field : 'productName',
    	title : '产品名称',
    },{
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
        field: 'realName',
        title: '下单代理',
        formatter : function(v, data) {
            return data.user?data.user.realName : '-'
        }
    }, {
        field: 'level',
        title: '下单代理等级',
        search: true,
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
        visible : false
    }, {
        field: 'level1',
        title: '下单代理等级',
        formatter : function(v, data) {
            var level = '';
            items.map(function(item) {
            	if(item.level == data.user.level) {
            		level = item.name
            	}
            })
            return level
        }
    },{
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
    }, {
        field : 'updateDatetime4',
        title : '关键字',
        search: true,
        visible: false
    }];
	buildList({
		columns: columns,
		pageCode: '627662'
	});
        
        
      })
    
});
