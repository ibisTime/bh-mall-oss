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
            $("#treeMenu").ligerTree({
                nodeWidth:300,
                data:ligerTreeData,
                // parentIcon: 'user',
                // childIcon: 'user' ,
                checkbox: false,
                isExpand: true,
                textFieldName1: 'level',
                textFieldName2: 'loginName',
                onSelect: onSelect,
                onClick: onClick,
                onCollapse: collapseAll,
                onExpand: expandAll,
                combine : true
                // isLeaf : hasChildren
                // idFieldName: 'code',
                // parentIDFieldName: 'parentCode',
            });
            manager = $("#treeMenu").ligerGetTreeManager();
        });

    });



    $('#exportBtn').off('click').click(function () {


        var dw = dialog({
            // content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
            // '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该喜报的位序</li></ul>' +
            // '</form>'
            content:
            '<div class="right-info">'+
            '<form class="search-form">'+
            '</form>'+
            '<div class="tools">'+
            '<ul class="toolbar1">'+
            '<li style="display:inline-block;width:100px；border:1px solid red" id="exBtn"><span><img src="/static/images/t01.png"></span>导出</li>'+
            '<li></li>'+
            '</ul>'+
            '</div>'+
            '<table id="tableList1"></table>'+
            // '<ul></ul>'+
            '<input id="cancelBtn" type="button" class="btn" style="margin-left:40px;display: inline-block;!important;" value="取消"/>'+
            '</div>'

        });

        dw.showModal();
        $('#cancelBtn').click(function () {
            dw.close().remove();
        })
        // var columns=[];
        reqApi({
            code: '627006',
        }, true).then(function (data) {
            var items = data.map(function (item) {
                return {
                    field: item.level,
                    title: item.name,
                    formatter : function (v, data) {
                        if(data.level == item.level) {
                            return data.realName+'-'+data.nickname;
                        }else {
                            return '-'
                        }
                    }
                };
            });


            buildList({
                container: $('.ui-dialog-content'),
                columns: items,
                pageCode: '627352',
                tableId : 'tableList1',
                searchParams: {
                    userId : manager.getSelected().data.userId
                },
                onLoadSuccess : function(data) {
                    var data = $('#table').bootstrapTable('getData', true);
                    //合并单元格
                    console.log(data);
                    mergeCells(data, "companyTypeName", 1, $('#table'));

                },
            });
            $('.search-form').empty();
            $('.search-form-li').empty();
            // $('#exportBtn').css('display','none');
            // var tempHtml =  '<ul><li class="search-form-li"><input id="exBtn" type="button" class="btn" value="导出"></li></ul>';
            // $('.search-form').append(tempHtml);

            $('#exBtn').off('click').click(function () {
                // $('#tableList1').tableExport({ type: 'excel', escape: 'false' })
                $('.export .btn').click();
            });

            $('#cancelBtn').click(function () {
                dw.close().remove();
                $('.fixed-table-container').remove()
            });
            hideLoading();
        });

    });




    //下拉菜单

    // 选择时的事件

    function onClick(note) {
        // alert('onSelect:' + note.data.userId);
        // 1、请求接口获取子节点数据
        // 2、将子节点数据插入到节点树中
        var isChild =note.data.children;
        if(isChild && isChild.length>0)
		{
			return

        }else {
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
		// alert(note.data.userId);
    }


    function mergeCells(data,fieldName,colspan,target){
        //声明一个map计算相同属性值在data对象出现的次数和
        var sortMap = {};
        for(var i = 0 ; i < data.length ; i++){
            for(var prop in data[i]){
                if(prop == fieldName){
                    var key = data[i][prop]
                    if(sortMap.hasOwnProperty(key)){
                        sortMap[key] = sortMap[key] * 1 + 1;
                    } else {
                        sortMap[key] = 1;
                    }
                    break;
                }
            }
        }
        for(var prop in sortMap){
            console.log(prop,sortMap[prop])
        }
        var index = 0;
        for(var prop in sortMap){
            var count = sortMap[prop] * 1;
            $(target).bootstrapTable('mergeCells',{index:index, field:fieldName, colspan: colspan, rowspan: count});
            index += count;
        }
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

