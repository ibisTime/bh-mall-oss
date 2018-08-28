$(function() {
    // 报货管理-溯源防伪-防伪溯源
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'refCode',
        title: '箱码'
    }, {
        field: 'miniCode',
        title: '防伪码'
    }, {
        field: 'traceCode',
        title: '溯源码'
    }, {
        field: 'orderCode',
        title: '关联订单编号',
        search: true
    }, {
        field: 'useDatetime',
        title: '使用时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        key: 'code_status',
        type: 'select',
        formatter: Dict.getNameForList('code_status')
    }];
    buildList({
        columns: columns,
        pageCode: '627885',
        searchParams: {
            statusList: ['2', '3']
        }
    });
    $('#fangweijiluBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].orderCode) {
            window.location.href = "./fangweisuyuan-suyuan.html?v=1&code=" + selRecords[0].orderCode;
        } else {
            toastr.info("该盒码还未使用过");
            return;
        }

    })
    $('#suyuanjiluBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if (selRecords[0].orderCode) {
            window.location.href = "./fangweisuyuan-suyuan.html?v=1&code=" + selRecords[0].orderCode;
        } else {
            toastr.info("该盒码还未使用过");
            return;
        }

    })

});