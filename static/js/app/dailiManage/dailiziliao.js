$(function() {
// 代理管理-代理管理-代理资料

    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'loginName',
        title : '姓名',

    },{
        field : 'level',
        title : '等级',
        search: true,
        type: 'select',
        listCode: '627006',
        // params: {
        //     companyCode : OSS.company,
        //     kind : 'S',
        //     start : 1,
        //     limit : 1000
        // },
        keyName: 'level',
        valueName: 'name',
        // formatter: function (v, data) {
        //     for(var v of items) {
        //         if(data.level) {
        //             data.level = data.level.replace(v.level,v.name);
        //
        //         }
        //     }
        //     return data.level;
        // }
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: moneyFormat
    }, {
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '上级'
    }, {
        field : 'updateDatetime',
        title : '上级电话'
    },{
        field : 'updateDatetime',
        title : '团队名称'
    }, {
        field : 'updateDatetime',
        title : '关联管理员'
    }, {
        field : 'updateDatetime',
        title : '推荐人'
    }, {
        field : 'updateDatetime',
        title : '推荐人电话'
    }, {
        field : 'updateDatetime',
        title : '授权状态',
        search: true,
        type: 'select'
    },  {
        field : 'updateDatetime',
        title : '状态时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '状态时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }];
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
