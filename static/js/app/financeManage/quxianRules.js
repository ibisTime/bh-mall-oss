$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    },{
        field: 'type',
        title: '角色'
    },{
        field: 'ckey',
        title: '规则分类',
        // type: 'select',
        // listCode: '805906',
        // params :{
        //     parentKey : 'level'
        // },
        // keyName : 'dkey',
        // valueName: 'dvalue'
    },{
        field: 'remark',
        title: '数值'
    },{
        field: 'cvalue',
        title: '备注'
    }];
    buildList({
        router: 'param',
        columns: columns,
        pageCode: '805915',
        searchParams : {
            typeList : ['YY_ZJ','YY_JS','YY_MD']
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
        window.location.href = "../system/bookRules_addedit.html?v=0&id=" + selRecords[0].id;
    });
});