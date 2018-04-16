$(function() {
// 代理管理-代理管理-代理资料

    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'realName',
        title : '姓名'

    },{
        field : 'level',
        title : '等级',
        search: true,
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
    },{
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'wxId',
        title : '微信号'
    }, {
        field : 'highUserName',
        title : '上级',
        formatter : function(v, data) {
			return data.highUser?data.highUser.realName : '-'
		}
    }, {
        field : 'highUserNameMobile',
        title : '上级电话',
        formatter : function(v, data) {
			return data.highUser?data.highUser.mobile : '-'
		}
    },{
        field : 'teamName',
        title : '团队名称',
        formatter : function(v, data) {
			return data.highUser?data.highUser.teamName : '-'
		}
    }, {
        field : 'manageName',
        title : '关联管理员'
    }, {
        field : 'refereeUserName',
        title : '推荐人',
        formatter : function (v, data) {
            return data.refereeUser?data.refereeUser.realName: '-'
        }
    }, {
        field : 'mobile',
        title : '推荐人电话',
        formatter : function (v, data) {
            return data.refereeUser?data.refereeUser.mobile: '-'
        }
    }, {
        field : 'status',
        title : '授权状态',
        type: 'select',
        formatter : Dict.getNameForList('agent_status')
    }
//  ,  {
//      field : 'applyDatetime',
//      title : '申请时间',
//      formatter: dateTimeFormat,
//      field1: 'dateStart',
//      title1: '申请时间',
//      type: 'date',
//      field2: 'dateEnd',
//      twoDate: true,
//      search: true
//  }
    ];
    buildList({
        columns: columns,
        pageCode: '627355',
        searchParams: {
            kind : 'B'
        },
        // beforeEdit: function(r) {
        // 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
        // }
    });
    
    
    // 修改上级
    $('#changeUpBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailiziliao_change.html?v=1&up=1&userId="+selRecords[0].userId+'&level='+selRecords[0].level;
    });
    // 修改推荐人
    $('#changeRefereeBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailiziliao_change.html?v=1&referee=1&userId="+selRecords[0].userId;
    });
    // 修改管理员
    $('#changeAdminBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailiziliao_change.html?v=1&admin=1&userId="+selRecords[0].userId;
    })

    // 修改资料
    $('#editBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailiziliao_addedit.html?v=0&edit=1&userId="+selRecords[0].userId;
    })

    // 详情
    $('#detailBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailiziliao_addedit.html?v=1&userId="+selRecords[0].userId;
    })
});
