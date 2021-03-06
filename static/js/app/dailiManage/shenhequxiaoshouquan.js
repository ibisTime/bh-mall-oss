$(function() {
    // 代理管理-代理管理-审核取消授权


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
                visible: false
            },
            {
                field: 'level1',
                title: '等级',
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
                field: 'mobile',
                title: '联系电话'
            }, {
                field: 'wxId',
                title: '微信号'
            }, {
                field: 'highUserName',
                title: '上级',
                formatter: function(v, data) {
                    return data.highUser ? data.highUser.realName : '-'
                }
            }, {
                field: 'teamName',
                title: '团队名称'
            }, {
                field: 'diyu',
                title: '地域',
                formatter: function(v, data) {
                    return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                        data.city ? data.province + ' ' + data.city :
                        data.province ? data.province : '-'
                }
            }, {
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
                field: 'createDatetime1',
                title: '申请时间',
                formatter: function(v, data) {
                    return dateTimeFormat(data.applyDatetime)
                }
            }
        ];
        buildList({
            columns: columns,
            pageCode: '627285',
            searchParams: {
                status: '6'
            }
        });
        $('#checkBtn').off('click').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            console.log('111' + selRecords[0].userId);
            window.location.href = "./shenhequxiaoshouquan_addedit.html?v=1&userId=" + selRecords[0].userId
        })


    })

});