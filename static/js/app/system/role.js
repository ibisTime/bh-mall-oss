$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'name',
        title: '角色名称',
        search: true
    }, {
        field: 'updateName',
        title: '更新人'
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        //router: 'role',
        columns: columns,
        pageCode: '627045',
        deleteCode: '627042'
    });

    $('#changeBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "role_menu.html?code=" + selRecords[0].code + "&name=" + encodeURI(encodeURI(selRecords[0].name));
    });
})