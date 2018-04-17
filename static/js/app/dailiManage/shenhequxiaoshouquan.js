$(function() {
// 代理管理-代理管理-审核取消授权


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
        field : 'name',
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
	},{
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
    },{
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
        field1: 'dateStart',
        title1: '申请时间',
        type: 'datetime',
        field2: 'dateEnd',
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
            status : '15'
        },
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
    $('#checkBtn').off('click').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./shenhequxiaoshouquan_addedit.html?v=1&userId="+selRecords[0].applyUser
    })
        
        
      })
    
});
