$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    },{
        field: 'remark',
        title: '规则名称'
    },{
        field: 'cvalue',
        title: '数值'
    }];
    buildList({
        columns: columns,
        pageCode: '627085',
        searchParams : {
            type: 'AT_QX',
            companyCode : OSS.company
        }
    });
    // 修改
    $('#editBtn').off().click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        // debugger;
        window.location.href = "./quxianRules_addedit.html?v=0&id=" + selRecords[0].id+"&remark="+selRecords[0].remark;
    });
});