$(function() {
// 代理管理-代理管理-审核升级


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
		field : 'realname',
		title : '姓名',
		formatter : function(v, data) { 
			return data.user?data.user.realName : '-'
		}
	},{
		field : 'level',
		title : '等级',
        search: true,
		type: 'select',
        listCode : '627006',
        keyName : 'level',
        valueName : 'name',
        visible : false
	},
	{
		field : 'level1',
		title : '等级',
        formatter : function(v, data) {
        	var level = ''
        	items.map(function(item) {
        		if(item.level == data.user.level) {
					level =  item.name
				}
        	})
        	return level
        }
	}, {
		field : 'applyLevel',
		title : '需升级等级',
        search: true,
		type: 'select',
        listCode : '627006',
        keyName : 'level',
        valueName : 'name',
        visible : false
	},
	{
		field : 'applyLevel1',
		title : '需升级等级',
        formatter : function(v, data) {
        	var applyLevel = ''
        	items.map(function(item) {
        		if(item.level == data.user.applyLevel) {
					applyLevel =  item.name
				}
        	})
        	return applyLevel
        }
	},  {
        field : 'mobile',
        title : '联系电话',
        formatter : function(v, data) {
			return data.user?data.user.mobile : '-'
		}
    }, {
        field : 'wxId',
        title : '微信号',
        formatter : function(v, data) {
			return data.user?data.user.wxId : '-'
		}
    }, {
        field : 'highUserName',
        title : '上级',
        formatter : function(v, data) {
			return data.user.highUser?data.user.highUser.realName : '-'
		}
    }, {
        field : 'teamName',
        title : '团队名称',
        formatter : function(v, data) {
			return data.user?data.user.teamName : '-'
		}
    }, {
        field : 'manageName',
        title : '关联管理员',
        formatter : function(v, data) {
        	return data.user?data.user.manageName : '-'
        }
    }, {
        field : 'diyu',
        title : '地域',
        formatter : function (v, data) {
            return data.user.area?data.user.province+' '+data.user.city+' '+data.user.area
                        :data.user.city?data.user.province+' '+data.user.city
                            :data.user.province?data.user.province : '-'
        }
    }, {
        field : 'createDatetime',
        title : '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true,
        visible : false
    }, {
        field : 'createDatetime1',
        title : '申请时间',
        formatter: function(v, data) {
        	return data.user?dateTimeFormat(data.user.applyDatetime) : '-'
        }
    }];
	buildList({
		columns: columns,
        pageCode: '627354',
        searchParams: {
            status : '12'
        }
	});
        
        
        $('#checkBtn').off().click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./shenheshengji_addedit.html?v=1&userId="+selRecords[0].applyUser
    })
        
        
      })
	
	
});
