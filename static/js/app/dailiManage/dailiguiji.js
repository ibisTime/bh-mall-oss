$(function() {
// 代理管理-代理管理-代理轨迹
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'loginName',
		title : '姓名'
	}, {
        field : 'level',
        title : '代理等级',
        search: true,
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
    },{
		field : 'mobile',
		title : '联系电话'
	}, {
        field : 'wxId',
        title : '微信号'
    }, {
        field : 'approveDatetime',
        title : '审核时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '日期',
        type: 'datetime',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
    }, {
        field : 'type',
        title : '操作类型',
        key : 'agnecy_log_type',
        formatter : Dict.getNameForList('agnecy_log_type')
    },{
        field : 'approver',
        title : '审核人'
    }, {
        field : 'updateDatetime',
        title : '推荐人'
    }, {
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
//  $('#detailBtn').click(function () {
//      var selRecords = $('#tableList').bootstrapTable('getSelections');
//      if (selRecords.length <= 0) {
//          toastr.info("请选择记录");
//          return;
//      }
//
//      window.location.href = "./dailiguiji_addedit.html?v=1&userId="+selRecords[0].userId;
//  })
});
