$(function() {
    $("#code").val(getQueryString("code"));
    $("#name").val(decodeURI(getQueryString("name")));

    showPermissionControl();


    var manager;
    reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function (item) {
            return {
                level: item.level,
                name: item.name
            };
        });
        var ligerTreeData = [];

        reqApi({
            code: '627352'
        }).then(function(d) {

            d.forEach(function(d, i){

                for(var v of items) {
                    d.level += '';
                    d.level = d.level.replace(v.level,v.name);
                }


                var tmpl = {
                    userId:d.userId,
                    loginName: d.loginName?d.loginName:'-',
                    nickname: d.nickname?d.nickname:'-',
                    level: d.level?d.level:'-'
                };

                ligerTreeData.push(tmpl);

            });
            console.log(ligerTreeData);
            $("#treeMenu").ligerTree({
                nodeWidth:300,
                data:ligerTreeData,
                // parentIcon: 'user',
                // childIcon: 'user' ,
                checkbox: true,
                isExpand: true,
                textFieldName1: 'level',
                textFieldName2: 'loginName',
                onSelect: onSelect,
                onClick: onClick,
                onCollapse: collapseAll,
                onExpand: expandAll,
                // isLeaf : hasChildren
                // idFieldName: 'code',
                // parentIDFieldName: 'parentCode',
            });
            manager = $("#treeMenu").ligerGetTreeManager();
        });

    });



    $('#exportBtn').click(function() {
        console.log(manager.getSelected().data.userId);


        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
            '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该喜报的位序</li></ul>' +
            '</form>'
        });

        dw.showModal();

        buildList({
            // container: $('#formContainer'),
            fields: [{
                field: 'orderNo',
                title: '顺序',
                required: true,
                number: true,
                min: '0'
            },{
                field : 'location1',
                title : '是否推荐',
                required: true,
                type: 'select',
                data : {'0':'否','1':'是'}
            }],
            buttons: [{
                title: '确定',
                handler: function () {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        reqApi({
                            code: '805433',
                            json: {
                                code: selRecords[0].code,
                                location : data.location1,
                                updater: getUserName(),
                                orderNo: data.orderNo
                            }
                        }).done(function () {
                            sucList();
                            dw.close().remove();
                        });
                    }
                }
            }, {
                title: '取消',
                handler: function () {
                    dw.close().remove();
                }
            }]
        });
    });
        // return ligerTreeData;



    //下拉菜单

    // 选择时的事件

    function onClick(note) {
        // alert('onSelect:' + note.data.userId);
        // 1、请求接口获取子节点数据
        // 2、将子节点数据插入到节点树中
        console.log(note.data);
        var isChild =note.data.children;
        if(isChild && isChild.length>0)
		{
			return

        }else {
            console.log('2');
            reqApi({
                code: '627006',
            }, true).then(function (data) {
                var items = data.map(function (item) {
                    return {
                        level: item.level,
                        name: item.name
                    };
                });

                var ligerTreeData = [];
                reqApi({
                    code: '627352',
                    json : {
                        'userId' : note.data.userId
                    }
                }).then(function(d) {
                    // console.log('111'+d);


                    d.forEach(function (d, i) {
                        for(var v of items) {
                            d.level += '';
                            d.level = d.level.replace(v.level,v.name);
                        }

                        var tmpl = {
                            userId: d.userId,
                            loginName: d.loginName ? d.loginName : '-',
                            nickname: d.nickname ? d.nickname : '-',
                            level: d.level?d.level:'-'

                        };

                        ligerTreeData.push(tmpl);

                    });
                    console.log(ligerTreeData);
                    manager.append(note, ligerTreeData);

                });
            })
        }




        // var manager = $("#treeMenu").ligerGetTreeManager();


    }

    function collapseAll() {
        manager.onExpand();
    }
    function expandAll() {
        manager.onCollapse();
    }

    function onSelect(note) {
		alert(note.data.userId);
    }


    $("#subBtn").click(function() {
        var menuList = new Array();
        var menuData = $("#treeMenu").ligerGetTreeManager().getChecked();
        for (var i = 0; i < menuData.length; i++){
            menuList[i] = menuData[i]['data']['code'];
        }
        var data = {roleCode:$("#code").val(),menuCodeList:menuList, updater: getUserName()};
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

