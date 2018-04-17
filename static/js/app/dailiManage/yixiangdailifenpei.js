$(function() {
// 代理管理-代理管理-意向代理分配


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
		field : 'nickname',
		title : '昵称',
		formatter : function(v, data) { 
			return data.user?data.user.nickname : '-'
		}
	},{
		field : 'applyLevel',
		title : '申请等级',
        search: true,
		type: 'select',
        listCode : '627006',
        keyName : 'level',
        valueName : 'name',
        visible : false
	},
	{
		field : 'applyLevel1',
		title : '申请等级',
        formatter : function(v, data) {
        	var level = ''
        	items.map(function(item) {
        		if(item.level == data.applyLevel) {
					level =  item.name
				}
        	})
        	return level
        }
	},
	{
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
        field : 'diyu',
        title : '地域',
        formatter : function (v, data) {
            return data.user.area?data.user.province+' '+data.user.city+' '+data.user.area
                        :data.user.city?data.user.province+' '+data.user.city
                            :data.user.province?data.user.province : '-'
        }
    }, {
        field : 'status',
        title : '代理状态',
        formatter : Dict.getNameForList('agent_status')
    }, {
        field : 'source',
        title : '来源',
        formatter : function(v, data) {
			return data.user?data.user.source : '-'
		}
    }, {
    	// 显示
        field : 'applyDatetime1',
        title : '申请时间',
        formatter: function (v, data) {
        	return dateTimeFormat(data.user.applyDatetime)
        },
        
    },  {
    	// 查询
        field : 'applyDatetime',
        title : '申请时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '申请时间',
        type: 'datetime',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        visible : false
    }, {
        field : 'remark',
        title : '备注'
    }];
	buildList({
		columns: columns,
		pageCode: '627354',
        searchParams : {
		    status : '3,4'
        }
	});
        
        
        
    // 忽略意向
    $('#hulveBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].status == '3') {
        	window.location.href = "./yixiangdailifenpei_hulveyixiang.html?v=1&userId="+selRecords[0].applyUser+"&name="+encodeURI(encodeURI(selRecords[0].name));
        }else {
        	toastr.info('该状态下不可忽略意向');
        }
        
    });

    // 审核分配
    $('#checkBtn').off().click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].status == '3') {
			window.location.href = "./yixiangdailifenpei_hulveyixiang.html?v=1&fenpei=1&userId="+selRecords[0].applyUser+"&name="+encodeURI(encodeURI(selRecords[0].name));
        }else {
        	toastr.info('该状态下不可忽略意向');
        }
        
        
        
        
    });

    // 修改资料
    $('#editBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./yixiangdailifenpei_edit.html?v=0&userId="+selRecords[0].applyUser;
    });
    
    
    
    
      })
	
	
});
