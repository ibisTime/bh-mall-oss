$(function() {
    // 代理管理-系统设置-代理升级设置
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'level',
        title: '等级名称',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        searchName: 'level',
        valueName: 'name',
        params: {
            highLevel: 6
        }
    }, {
        field: 'level',
        title: '等级名称',
        search: true,
        type: 'select'
    }, {
        field: 'isCompanyImpower',
        title: '本等级升级是否公司审核',
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'amount',
        title: '本等级升级首单总额',
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'reNumber',
        title: '半门槛升级推荐人数'
    }, {
        field: 'isReset',
        title: '本等级升级是否余额清零',
        type: 'select',
        data: { '1': '是', '0': '否' }
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
        pageCode: '627005'
    });
    // 修改
    $('#editBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = './dailishengjiConfig_addedit.html?level=' + selRecords[0].level + '&v=0&code=' + selRecords[0].code + '&name=' + selRecords[0].name;
    })
});