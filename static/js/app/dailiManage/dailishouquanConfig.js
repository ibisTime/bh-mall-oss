$(function() {
    // 代理管理-系统设置-代理授权设置
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'level',
        title: '等级名称',
        type: 'select',
        listCode: '627008',
        keyName: 'level',
        searchName: 'level',
        valueName: 'name'
    }, {
        field: 'level',
        title: '等级名称',
        search: true,
        type: 'select'
    }, {
        field: 'isIntent',
        title: '本等级是否可被意向',
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'isJsAward',
        title: '本等级是否可被介绍',
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'isRealName',
        title: '本等级是否需要实名',
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'isCompanyImpower',
        title: '授权是否需要公司审核',
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'minCharge',
        title: '门槛款',
        formatter: moneyFormat
    }, {
        field: 'updateName',
        title: '更新人',
        readonly: true
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        searchParams: {
            orderColumn: 'level',
            orderDir: 'asc',
            highLevel: 6
        },
        pageCode: '627005' //627015
    });
    /*
    ,{
        field : 'isCompanyImpower',
        title : '本等级是否公司审核',
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'minCharge',
        title : '本等级授权充值门槛',
        formatter: moneyFormat
    },{
        field : 'isCompanyApprove',
        title : '本等级升级是否公司审核',
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'reNumber',
        title : '半门槛升级推荐人数'
    },{
        field : 'isReset',
        title : '本等级升级是否余额清零',
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field: 'amount',
        title: '首次授权发货金额',
        formatter: moneyFormat
    },{
        field: 'minChargeAmount',
        title: '本等级最低充值金额',
        formatter: moneyFormat
    },{
        field: 'redAmount',
        title: '红线金额',
        formatter: moneyFormat
    },{
        field: 'minSurplus',
        title: '门槛可有余额',
        formatter: moneyFormat
    },{
        field: 'isSend',
        title: '授权单是否允许自发',
        data: {
            0: '否',
            1: '是'
        },
        type: 'select'
    },{
        field: 'isWareHouse',
        title: '是否启用云仓',
        data: {
            0: '否',
            1: '是'
        },
        type: 'select'
    },{
        field: 'updater',
        title: '更新人'
    }
     */
    // 修改
    $('#editBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = './dailishouquanConfig_addedit.html?level=' + selRecords[0].level + '&v=0&code=' + selRecords[0].code + '&name=' + selRecords[0].name;
    })
});