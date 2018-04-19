$(function() {
// 报货管理-售后管理-售后单管理


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
		field : 'realName',
		title : '申请代理',
		formatter : function(v, data) {
			return data.user?data.user.realName : '-'
		}
	},{
        field: 'level',
        title: '下单代理等级',
        formatter : function(v, data) {
            var level = '';
            items.map(function(item) {
            	if(data.user && item.level == data.user.level) {
            		level = item.name
            	}
            })
            return level
        }
    }, {
        field : 'mobile',
        title : '代理电话',
		formatter : function(v, data) {
			return data.user?data.user.mobile : '-'
		}
    }, {
        field : 'updateDatetime',
        title : '代理微信',
		formatter : function(v, data) {
			return data.user?data.user.wxId : '-'
		}
    }, {
        field : 'refNo',
        title : '关联订单'
    }, {
        field : 'saleType',
        title : '售后类型',
        search : true,
        type : 'select',
        key :'after_sale_type',
        formatter : Dict.getNameForList('after_sale_type')
    }, {
        field : 'applyDatetime',
        title : '申请时间',
        formatter: dateTimeFormat
    }, {
        field : 'status',
        title : '状态',
        search : true,
        type : 'select',
        key :'after_sale_status',
        formatter : Dict.getNameForList('after_sale_status')
    }, {
        field : 'keyword',
        title : '关键字',
        search: true,
        visible: false
    }];
	buildList({
		columns: columns,
		pageCode: '627690'
	});
	// 处理
	$('#chuliBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

		if(selRecords[0].status == '0') {
			window.location.href = './shouhouOrder_addedit.html?v=1&code='+selRecords[0].code
		}else {
			toastr.info('该状态售后单不可进行处理');
		}
        
	})
        
      })
	
});
