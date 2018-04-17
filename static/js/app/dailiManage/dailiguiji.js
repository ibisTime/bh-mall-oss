$(function() {
// 代理管理-代理管理-代理轨迹


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
	}, {
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
	},{
		field : 'mobile',
        title : '手机号',
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
        field : 'type',
        title : '操作类型',
        key : 'agnecy_log_type',
        formatter : Dict.getNameForList('agnecy_log_type')
    },{
        field : 'updateDatetime',
        title : '推荐人'
    },{
        field : 'approver',
        title : '审核人'
    }, {
        field : 'approveDatetime',
        title : '审核时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '审核时间',
        type: 'datetime',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    },  {
        field : 'remark',
        title : '备注'
    },{
    	field : 'keyword',
    	title : '关键字',
    	search : true,
    	visible : false
    }];
	buildList({
		columns: columns,
		pageCode: '627359'
	});
        
   })
});
