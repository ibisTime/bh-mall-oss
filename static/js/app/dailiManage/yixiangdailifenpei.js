$(function() {
    // 代理管理-代理管理-意向代理分配


    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });

        var columns = [{
                field: '',
                title: '',
                checkbox: true
            }, {
                field: 'realname',
                title: '姓名',
                formatter: function(v, data) {
                    return data ? data.realName : '-'
                }
            }, {
                field: 'nickname',
                title: '昵称',
                formatter: function(v, data) {
                    return data ? data.nickname : '-'
                }
            }, {
                field: 'applyLevel',
                title: '申请等级',
                search: true,
                type: 'select',
                listCode: '627006',
                keyName: 'level',
                valueName: 'name',
                visible: false,
                params: {
                    highLevel: 6
                }
            },
            {
                field: 'applyLevel1',
                title: '申请等级',
                formatter: function(v, data) {
                    var level = ''
                    items.map(function(item) {
                        if (item.level == data.applyLevel) {
                            level = item.name
                        }
                    })
                    return level
                }
            },
            {
                field: 'mobile',
                title: '联系电话',
                formatter: function(v, data) {
                    return data ? data.mobile : '-'
                }
            }, {
                field: 'wxId',
                title: '微信号',
                formatter: function(v, data) {
                    return data ? data.wxId : '-'
                }
            }, {
                field: 'diyu',
                title: '地域',
                formatter: function(v, data) {
                    if (data) {

                        return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                            data.city ? data.province + ' ' + data.city :
                            data.province ? data.province : '-';

                    } else {
                        return '-'
                    }
                }
            }, {
                field: 'status',
                title: '代理状态',
                formatter: function(v, d) {
                    var dictObj = {
                        0: '有意愿',
                        1: '已忽略',
                        2: '已接受',
                        3: '已分配'
                    };
                    if (d.applyLevel != 1 && v == '0') {
                        return '待审核分配';
                    }
                    return dictObj[v];
                }
            }, {
                field: 'fromInfo',
                title: '来源',
                key: 'source',
                formatter: Dict.getNameForList('source')
            }, {
                // 显示
                field: 'applyDatetime1',
                title: '申请时间',
                formatter: function(v, data) {
                    return data ? dateTimeFormat(data.applyDatetime) : '-';
                },

            }, {
                // 查询
                field: 'applyDatetime',
                title: '申请时间',
                formatter: dateTimeFormat,
                field1: 'dateStart',
                title1: '申请时间',
                type: 'datetime',
                field2: 'dateEnd',
                twoDate: true,
                search: true,
                visible: false
            }, {
                field: 'remark',
                title: '备注'
            }
        ];
        buildList({
            columns: columns,
            pageCode: '627265'
        });
        // 忽略意向
        $('#hulveBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            if (selRecords[0].status == '0') {
                window.location.href = "./yixiangdailifenpei_hulveyixiang.html?v=1&userId=" + selRecords[0].userId + "&name=" + encodeURI(encodeURI(selRecords[0].name));
            } else {
                toastr.info('该状态下不可忽略意向');
            }

        });
        // 修改资料
        $('#yeditBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            // if (selRecords[0].applyLevel != 1 && selRecords[0].status == '0') {
            //     toastr.info("该状态下无法修改资料");
            //     return;
            // }
            // console.log(selRecords[0])
            window.location.href = "./yixiangdailifenpei_yedit.html?v=1&userId=" + selRecords[0].userId + "&name=" + encodeURI(encodeURI(selRecords[0].name)) + "&lev=" + selRecords[0].level;
        });
        // 接受意向
        $('#edityxBtn').off().click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            if (selRecords[0].applyLevel > 1) {
                toastr.info('非最高等级代理不可接受，请分配到其他代理');
                return;
            }
            window.location.href = "./yixiangdailifenpei_edit.html?v=1&jshou=ok&userId=" + selRecords[0].userId + "&name=" + encodeURI(encodeURI(selRecords[0].name));
        })

        // 审核分配
        $('#checkBtn').off().click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            if (selRecords[0].applyLevel == 1) {
                toastr.info('该等级下不可分配');
                return;
            };
            if (selRecords[0].status == '0') {
                window.location.href = "./yixiangdailifenpei_hulveyixiang.html?v=1&fenpei=1&userId=" + selRecords[0].userId + "&name=" + encodeURI(encodeURI(selRecords[0].name)) + '&lev=' + selRecords[0].applyLevel;
            } else {
                toastr.info('该状态下不可忽略意向');
            }
        });

        // 详情
        $('#editBtn').off('click').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = "./yixiangdailifenpei_edit.html?v=0&userId=" + selRecords[0].userId;
        });
    });
});