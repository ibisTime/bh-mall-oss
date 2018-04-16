$(function() {
// 代理管理-财务管理-余额管理




reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function(item){
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
		title : '代理',
		search: true
	},{
		field : 'mobile',
		title : '代理电话',
        search: true,
        formatter : function(v, data) {
			return data.user?data.user.mobile : '-'
		}
	},{
        field : 'wxId',
        title : '代理微信',
        search: true,
        formatter : function(v, data) {
			return data.user?data.user.wxId : '-'
		}
    },{
        field : 'level',
        title : '代理等级',
        search: true,
		type: 'select',
		formatter : function(v, data) {
			var level = ''
			items.map(function(item) {
				if(item.level == data.user.level) {
					level =  item.name
				}
			})
			return level
		}
    },{
        field : 'cvalue',
        title : '代理团队',
        formatter : function(v, data) {
			return data.user?data.user.teamName : '-'
		}
    },{
        field : 'amount',
        title : '余额',
		formatter: moneyFormat
    }];
	buildList({
		columns: columns,
		pageCode: '627450'
	});
        
        
        
        
        // 充值
	$('#inBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }

        window.location.href = './yueguanli_addedit.html?chongzhi=1&v=1&accountNumber='+selRecords[0].accountNumber;
    })
    // 扣款
    $('#outBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }

        window.location.href = './yueguanli_addedit.html?koukuan=1&v=1&accountNumber='+selRecords[0].accountNumber;
    })
        
        
        
    // 余额变动记录
    $('#yueChangeRecordBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }

        window.location.href = './liushui.html?accountNumber='+selRecords[0].accountNumber;
    })
        
      })
	
	

});
