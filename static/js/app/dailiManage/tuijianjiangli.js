$(function() {
    // 代理管理-财务管理-推荐奖励
    var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'accountNumber',
            title: '账号'
        }, {
            field: 'realName',
            title: '代理人',
            search: true
        }, {
            field: 'mobile',
            title: '代理电话',
            formatter: function(v, data) {
                return data.agent ? data.agent.mobile : '-'
            }
        }, {
            field: 'teamName',
            title: '代理团队',
            formatter: function(v, data) {
                return data.agent ? data.agent.teamName : '-'
            }
        },
        {
            field: 'inAmount',
            title: '奖励收入',
            formatter: moneyFormat
        }, {
            field: 'outAmount',
            title: '奖励支出',
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            key: 'jour_status',
            formatter: Dict.getNameForList('jour_status'),
            search: true
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat
        }, {
            field: 'remark',
            title: '备注'
        }
    ];
    buildList({
        columns: columns,
        pageCode: '627490',
        searchParams: {
            bizType: 'AJ_TJJL',
            type: 'B'
        }
    });

    //支出明细
    $('#outRecordBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].transAmount > 0) {
            toastr.info("此记录为收入明细");
            return;
        }
        //      if(selRecords[0].outAmount != '0'){
        window.location.href = "./tuijianjiangli_addedit.html?out=1&userId=" + selRecords[0].userId + '&bizType=' + selRecords[0].bizType;
        //      }else {
        //          toastr.info('无支出明细')
        //      }
    });

    //收入明细
    $('#inRecordBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].transAmount < 0) {
            toastr.info("此记录为支出明细");
            return;
        }
        //      if(selRecords[0].inAmount != '0'){
        window.location.href = "./tuijianjiangli_addedit.html?in=1&userId=" + selRecords[0].userId + '&bizType=' + selRecords[0].bizType;
        //      }else {
        //          toastr.info('无收入明细')
        //      }
    })
});