$(function() {
    $("#code").val(getQueryString("code"));
    $("#name").val(decodeURI(getQueryString("name")));
    let toorter = getQueryString("toorter");
    let setUserId = getQueryString("userId");
    showPermissionControl();
    var manager;
    var newList = [];
    var countMap = {};
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '管理员',
        search: true,
        visible: false
    }];
    ///////////////////////////////////////////////////////////////////////////////////////////////
    function createList(list, first) {
        if (first) {
            newList = [];
            countMap = {};
        }
        for (var i = 0; i < list.length; i++) {
            list[i].parent = list.parent || null;
            if (list[i].userList && list[i].userList.length) {
                list[i].userList.parent = list[i];
                createList(list[i].userList);
            } else {
                var obj = {};
                var tmp = list[i];
                obj[tmp.level] = tmp.realName + tmp.mobile;
                countMap[tmp.userId] = countMap[tmp.userId] || {
                    count: 0,
                    index: newList.length,
                    level: tmp.level
                };
                countMap[tmp.userId].count++;
                while (tmp.parent) {
                    tmp = tmp.parent;
                    obj[tmp.level] = tmp.realName + tmp.mobile;
                    countMap[tmp.userId] = countMap[tmp.userId] || {
                        count: 0,
                        index: newList.length,
                        level: tmp.level
                    };
                    countMap[tmp.userId].count++;
                }
                newList.push(obj);
            }
        }
    }
    if (toorter) {
        $('.toolbar li').remove();
        let html = `<div><div class="per">
                    <li style="display:block;" id="exportBtn">
                        <span>
                            <img src="/static/images/t01.png">
                        </span>导出
                    </li>
                </div></div>`;
        let divHtml = $(html).find('.per').html();
        $('.toolbar').append(divHtml);
    }
    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });
        var ligerTreeData = [];
        reqApi({
            code: '627321',
            json: {
                userId: toorter ? setUserId : getUserId()
            }
        }).then(function(d) {
            d.forEach(function(d, i) {
                for (var v of items) {
                    d.level += '';
                    d.level = d.level.replace(v.level, v.name);
                }
                var tmpl = {
                    userId: d.userId,
                    realName: d.realName ? d.realName + ' (电话号：' + d.mobile + ' )' : '-' + d.mobile,
                    nickname: d.nickname ? d.nickname : '-',
                    level: d.level ? d.level : '-'
                };

                ligerTreeData.push(tmpl);

            });
            $("#treeMenu").ligerTree({
                nodeWidth: 300,
                data: ligerTreeData,
                // parentIcon: 'user',
                // childIcon: 'user' ,
                checkbox: false,
                isExpand: true,
                textFieldName1: 'level',
                textFieldName2: 'realName',
                onSelect: onSelect,
                onClick: onClick,
                onCollapse: collapseAll,
                onExpand: expandAll,
                combine: true
                    // isLeaf : hasChildren
                    // idFieldName: 'code',
                    // parentIDFieldName: 'parentCode',
            });
            manager = $("#treeMenu").ligerGetTreeManager();
        });

    });




    $('.toolbar').on('click', '#exportBtn', function() {
            /*if (!manager.getSelected()) {
                toastr.info('请选择一位代理');
                return;
            }*/
            var dw = dialog({
                // content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                // '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该喜报的位序</li></ul>' +
                // '</form>'
                content: '<div class="right-info">' +
                    '<form class="search-form">' +
                    '</form>' +
                    '<div class="tools" style = "display:block">' +
                    '<ul class="toolbar1">' +
                    //          '<li id="exBtn" style="display : block"><span><img src="/static/images/t01.png"></span>导出</li>'+
                    '<li></li>' +
                    '</ul>' +
                    '</div>' +
                    '<table id="tableList1"></table>' +
                    // '<ul></ul>'+
                    '<input id="exBtn" type="button" class="btn" style="margin-left:40px;display: inline-block;!important;" value="导出"/>' +
                    '<input id="cancelBtn" type="button" class="btn" style="margin-left:40px;display: inline-block;!important;" value="取消"/>' +
                    '</div>'

            });

            dw.showModal();
            $('#cancelBtn').click(function() {
                    dw.close().remove();
                })
                // var columns=[];
            reqApi({
                code: '627006',
            }, true).then(function(data) {
                var items = data.map(function(item) {
                    return {
                        field: item.level,
                        title: item.name,
                        align: 'center',
                        valign: 'middle'
                            //                  formatter : function (v, data) {
                            //                      if(data.level == item.level) {
                            //                          return data.realName+'-'+data.nickname;
                            //                      }else {
                            //                          return '-'
                            //                      }
                            //                  }
                    };
                });
                reqApi({
                    code: '627321'
                }).then(function(data) {
                    var selectData = data.userList;
                    buildList({
                        container: $('.ui-dialog-content'),
                        columns: items,
                        pageCode: '627321',
                        searchParams: {
                            userId: toorter ? setUserId : ''
                        },
                        tableId: 'tableList1',
                        exportDataType: 'combine',
                        // searchParams: {
                        //     userId: manager.getSelected().data.userId
                        // },
                        afterData: function(res) {
                            selectData = res.data;
                            createList(selectData, true);
                            //                  createList(res, true);
                            // console.log(newList, countMap);
                            setTimeout(function() {
                                var _table = $('#tableList1');
                                for (var k in countMap) {
                                    if (countMap[k].count > 1) {
                                        _table.bootstrapTable('mergeCells', {
                                            index: countMap[k].index,
                                            field: countMap[k].level,
                                            colspan: 1,
                                            rowspan: countMap[k].count
                                        });
                                    }
                                }
                            }, 100);
                            return {
                                rows: newList,
                                total: newList.length
                            }
                        }
                    });
                    $('th').css('vertical-align', 'middle');
                    if (toorter) {
                        $('.toolbar li').remove();
                        let html = `<div><div class="per">
                                    <li style="display:block;" id="exportBtn">
                                        <span>
                                            <img src="/static/images/t01.png">
                                        </span>导出
                                    </li>
                                </div></div>`;
                        let divHtml = $(html).find('.per').html();
                        $('.toolbar').append(divHtml);
                    }

                })

                $('.search-form').css('display', 'none');
                // $('.search-form').empty();
                // $('.search-form-li').empty();
                // $('.toolbar1').css('padding-bottom','80px');
                // $('.tableList1').css('position','absolute').css('top','50px');


                $('#exBtn').off('click').click(function() {
                    $('.export .btn').click();
                });

                $('#cancelBtn').click(function() {
                    dw.close().remove();
                    $('.fixed-table-container').remove()
                });
                hideLoading();
            });

        })
        // 选择时的事件

    function onClick(note) {
        // alert('onSelect:' + note.data.userId);
        // 1、请求接口获取子节点数据
        // 2、将子节点数据插入到节点树中
        var isChild = note.data.children;
        if (isChild && isChild.length > 0) {
            return;

        } else {
            reqApi({
                code: '627006',
            }, true).then(function(data) {
                var items = data.map(function(item) {
                    return {
                        level: item.level,
                        name: item.name
                    };
                });

                var ligerTreeData = [];
                reqApi({
                    code: '627321',
                    json: {
                        'userId': toorter ? setUserId : note.data.userId
                    }
                }).then(function(d) {
                    d.forEach(function(d, i) {
                        for (var v of items) {
                            d.level += '';
                            d.level = d.level.replace(v.level, v.name);
                        }

                        var tmpl = {
                            userId: d.userId,
                            realName: d.realName ? d.realName + ' (电话号：' + d.mobile + ' )' : '-' + d.mobile,
                            nickname: d.nickname ? d.nickname : '-',
                            level: d.level ? d.level : '-'

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


    function mergeCells(data, fieldName, colspan, target) {
        //声明一个map计算相同属性值在data对象出现的次数和
        var sortMap = {};
        for (var i = 0; i < data.length; i++) {
            for (var prop in data[i]) {
                if (prop == fieldName) {
                    var key = data[i][prop]
                    if (sortMap.hasOwnProperty(key)) {
                        sortMap[key] = sortMap[key] * 1 + 1;
                    } else {
                        sortMap[key] = 1;
                    }
                    break;
                }
            }
        }
        for (var prop in sortMap) {
            // console.log(prop,sortMap[prop])
        }
        var index = 0;
        for (var prop in sortMap) {
            var count = sortMap[prop] * 1;
            $(target).bootstrapTable('mergeCells', {
                index: index,
                field: fieldName,
                colspan: colspan,
                rowspan: count
            });
            index += count;
        }
    }

    $("#subBtn").click(function() {
        var menuList = new Array();
        var menuData = $("#treeMenu").ligerGetTreeManager().getChecked();
        for (var i = 0; i < menuData.length; i++) {
            menuList[i] = menuData[i]['data']['code'];
        }
        var data = {
            roleCode: $("#code").val(),
            menuCodeList: menuList,
            updater: getUserName()
        };
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