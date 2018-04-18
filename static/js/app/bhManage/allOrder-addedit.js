$(function() {
	var code = getQueryString('code');
	var view = getQueryString('v');
	
	
	reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function (item) {
            return {
                level: item.level,
                name: item.name
            };
        });
        
        
        
        var fields = [{
        field : 'code1',
        title : '订单编号',
        formatter : function (v, data) {
            return data.code
        }
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
        type: 'select',
        key : 'order_status',
        formatter : Dict.getNameForList('order_status')
    }, {
        field : 'kind',
        title : '订单类型',
        type: 'select',
        key :'order_type',
        formatter : Dict.getNameForList('order_type')
    },{
            field: 'realName',
            title: '下单代理',
            formatter : function(v, data) {
            	return data.user?data.user.realName : '-'
            }
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
	
	buildDetail({
		fields: fields,
		code: code,
        view : view,
		detailCode: '627664',
		addCode: '627920',
		editCode: '627921'
	});
	
        
        
        
      })

    
});