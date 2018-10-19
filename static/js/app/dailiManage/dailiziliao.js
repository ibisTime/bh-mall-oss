$(function() {
    // 代理管理-代理管理-代理资料

    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'realName',
            title: '姓名',
            search: true
        }, {
            field: 'level',
            title: '等级',
            search: true,
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name',
            params: {
                highLevel: 6
            }
        }, {
            field: 'mkAmount',
            title: '门槛账户余额',
            amount: true
        }, {
            field: 'wareAmount',
            title: '云仓余额',
            amount: true
        }, {
            field: 'mobile',
            title: '联系电话'
        },
        {
            field: 'wxId',
            title: '微信号'
        }, {
            field: 'idNo',
            title: '身份证号'
        }, {
            field: 'highUserName',
            title: '上级'
        }, {
            field: 'highUserMobile',
            title: '上级电话'
        }, {
            field: 'teamName',
            title: '团队名称',
            search: true
        }, {
            field: 'userRefreeName',
            title: '推荐人'
        }, {
            field: 'userRefreeMobile',
            title: '推荐人电话'
        }, 
        {
            field: 'status',
            title: '授权状态',
            type: 'select',
            search: true,
            key: 'agent_status',
            formatter: Dict.getNameForList('agent_status')
        }, {
            field: 'quyu',
            title: '区域',
            formatter: function(v, data) {
                return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                    data.city ? data.province + ' ' + data.city :
                    data.province ? data.province : '-'
            }
        }, {
            field: 'address',
            title: '详细地址'
        }
    ];
    buildList({
        columns: columns,
        pageCode: '627325',
        searchParams: {
            kind: 'B',
            noStatusList: ['0', '4']
        }
    });
    

    // 修改上级
    $('#changeUpBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (!selRecords[0].level) {
            toastr.info("你还没有被授权");
            return;
        }
        window.location.href = "./dailiziliao_change.html?v=1&up=1&userId=" + selRecords[0].userId + '&level=' + selRecords[0].level + '&high=' + selRecords[0].highUserId;
    });
    // 修改推荐人
    $('#changeRefereeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (!selRecords[0].level) {
            toastr.info("你还没有被授权");
            return;
        }
        window.location.href = "./dailiziliao_change.html?v=1&isref=1&userId=" + selRecords[0].userId + "&level=" + selRecords[0].level + "&referrer=" + selRecords[0].referrer;
    });
    // 修改管理员
    $('#changeAdminBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (!selRecords[0].level) {
            toastr.info("你还没有被授权");
            return;
        }
        window.location.href = "./dailiziliao_change.html?v=1&admin=1&userId=" + selRecords[0].userId;
    })

    // 修改资料
    $('#editBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailiziliao_addedit.html?v=0&edit=1&userId=" + selRecords[0].userId;
    })

    // 取消授权
    $('#removeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailiziliao_remove.html?v=1&up=1&userId=" + selRecords[0].userId + '&level=' + selRecords[0].level;
    })

    // 详情
    $('#detailBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailiziliao_addedit.html?v=1&userId=" + selRecords[0].userId;
    })

    // 新增代理
    $('#addDailiBtn').click(function() {
        window.location.href = "./dailiziliao_addDaili.html"
    })

    // 银行卡
    $('#bankCardBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = "./dailiziliao_bank.html?v=1&userId=" + selRecords[0].userId;
        })
        // 代理轨迹
    $('#dailiguijiBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = "./dailiguiji.html?v=1&userId=" + selRecords[0].userId + '&toorter=ok';
        })
        // 代理结构
    $('#dailijiegouBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./dailijiegou.html?v=1&userId=" + selRecords[0].userId + '&toorter=ok';
    })
});