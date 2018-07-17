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
        field : 'leaderName',
        title : '团队长名称'
    }, {
        field : 'teamName',
        title : '团队名称',
        formatter: function (v, data) {
          return data.user.teamName
        }
    }, {
        field : 'signeName',
        title : '收货人'
    }, {
        field : 'province',
        title : '省'
    }, {
        field : 'city',
        title : '市'
    }, {
        field : 'area',
        title : '区'
    }, {
        field : 'address',
        title : '详细地址'
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
        field : 'keyword',
        title : '关键字',
        search: true,
        visible: false
    }];
	buildList({
		columns: columns,
		pageCode: '627662'
	});
  $('#wuliuBtn').off('click').click(function() {
    var selRecords = $('#tableList').bootstrapTable('getSelections');
    if (selRecords.length <= 0) {
      toastr.info("请选择记录");
      return;
    }
    if(selRecords[0].status == '3' || selRecords[0].status == '4') {
      window.location.href = "./wuliu.html?v=1&code="+selRecords[0].code;
    }else {
      toastr.info('只有待收货和已收货的订单可以查看物流');
    }

  })
        
      })
    
});
