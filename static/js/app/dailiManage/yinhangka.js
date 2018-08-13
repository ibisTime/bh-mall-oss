$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'bankName',
        title: '银行名称',
        search: true
    }, {
        field: 'bankCode',
        title: '银行简称'
    }, {
        field: 'updateName',
        title: '最新修改人'
    }, {
        field: 'updateDatetime',
        title: '最新修改时间',
        formatter: dateTimeFormat
    }];
    buildList({
        //router: 'role',
        columns: columns,
        pageCode: '627105',
        deleteCode: '627042'
    });

    $('#changeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "role_menu.html?id=" + selRecords[0].id + '&code=' + selRecords[0].code;
    });
})