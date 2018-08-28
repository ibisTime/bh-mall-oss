$(function() {
    $("#code").val(getQueryString("code"));
    $("#name").val(decodeURI(getQueryString("name")));

    //下拉菜单
    $.when(
        reqApi({ // 所有菜单
            code: '627056',
            json: {
                kind: '1'
            }
        }),
        reqApi({ // 获得菜单
            code: '627065',
            json: {
                roleCode: $("#code").val()
            }
        }, true)).then(function(d1, d2) {
        var checkedCodes = [];
        d2.forEach(function(item) {
            checkedCodes.push(item.code);
        });
        d1.forEach(function(item) {
            item.ischecked = checkedCodes.indexOf(item.code) > -1;
        });
        $("#treeMenu").ligerTree({
            nodeWidth: 300,
            data: d1,
            checkbox: true,
            isExpand: true,
            idFieldName: 'code',
            parentIDFieldName: 'parentCode',
            textFieldName: 'name'
        });
    });

    $("#subBtn").click(function() {
        var menuList = new Array();
        var menuData = $("#treeMenu").ligerGetTreeManager().getChecked();
        for (var i = 0; i < menuData.length; i++) {
            menuList[i] = menuData[i]['data']['code'];
        }
        var data = { roleCode: $("#code").val(), menuCodeList: menuList, updater: getUserId() };
        reqApi({
            code: '627060',
            json: data
        }).done(function(data) {
            sucDetail();
        });
    });

    //返回
    $('#backBtn').click(function() {
        goBack();
    });

});