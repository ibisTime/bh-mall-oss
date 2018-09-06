$(function() {
    // 代理管理-代理管理-审核升级


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
                field: 'realName',
                title: '姓名'
            }, {
                field: 'level',
                title: '等级',
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
                field: 'level1',
                title: '目前等级',
                formatter: function(v, data) {
                    var level = ''
                    items.map(function(item) {
                        if (item.level == data.level) {
                            level = item.name
                        }
                    })
                    return level
                }
            }, {
                field: 'applyLevel',
                title: '需升级等级',
                type: 'select',
                listCode: '627006',
                keyName: 'level',
                valueName: 'name',
                visible: false
            },
            {
                field: 'applyLevel1',
                title: '需升级等级',
                formatter: function(v, data) {
                    var applyLevel = ''
                    items.map(function(item) {
                        if (item.level == data.applyLevel) {
                            applyLevel = item.name
                        }
                    })
                    return applyLevel
                }
            }, {
                field: 'mobile',
                title: '联系电话',
                formatter: function(v, data) {
                    if (data.user) {
                        return data.user.mobile;
                    }
                }
            }, {
                field: 'wxId',
                title: '微信号',
                formatter: function(v, data) {
                    if (data.user) {
                        return data.user.wxId;
                    }
                }
            }, {
                field: 'toUserName',
                title: '新上级'
            }, {
                field: 'teamName',
                title: '团队名称'
            }, {
                field: 'manageName',
                title: '关联管理员'
            }, {
                field: 'diyu',
                title: '地域',
                formatter: function(v, data) {
                    if (data.user) {
                        return data.user.area ? data.user.province + ' ' + data.user.city + ' ' + data.user.area :
                            data.user.city ? data.user.province + ' ' + data.user.city :
                            data.user.province ? data.user.province : '-'
                    } else {
                        return '-'
                    }
                }
            }, {
                field: 'applyDatetime',
                title: '申请时间',
                formatter: dateTimeFormat,
                field1: 'applyDateStart',
                title1: '申请时间',
                type: 'datetime',
                field2: 'applyDateEnd',
                twoDate: true,
                search: true,
                visible: false
            }, {
                field: 'createDatetime1',
                title: '申请时间',
                formatter: function(v, data) {
                    return dateTimeFormat(data.applyDatetime)
                }
            }, {
                field: 'status',
                title: '状态',
                key: 'sj_status',
                data: {
                    '13': '待公司审核',
                    '14': '通过',
                    '15': '不通过'
                }
            }
        ];
        buildList({
            columns: columns,
            pageCode: '627305',
            searchParams: {
                status: '13',
            }
        });


        $('#checkBtn').off().click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = "./shenheshengji_addedit.html?v=1&userId=" + selRecords[0].userId
        })


    })


});