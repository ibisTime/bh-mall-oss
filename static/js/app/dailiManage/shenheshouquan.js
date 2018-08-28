$(function() {
    // 代理管理-代理管理-审核授权


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
        }, {
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
        }, {
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
            field: 'toUserName',
            title: '上级'
        }, {
            field: 'teamName',
            title: '团队名称'
        }, {
            field: 'impowerAmount',
            title: '授权金额',
            amount: true,
            formatter: moneyFormat
        }, {
            field: 'diyu',
            title: '地域',
            formatter: function(v, data) {
                return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                    data.city ? data.province + ' ' + data.city :
                    data.province ? data.province : '-'
            }
        }, {
            field: 'status',
            title: '授权状态',
            type: 'select',
            search: true,
            data: {
                '7': '授权待公司审核',
                '11': '授权退出'
            }
        }, {
            field: 'createDatetime',
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
                return data ? dateTimeFormat(data.applyDatetime) : '-'
            }
        }];
        buildList({
            columns: columns,
            pageCode: '627285',
            searchParams: {
                statusList: ['7', '11']
            }
        });




        $('#checkBtn').off().click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = "./shenheshouquan_check.html?v=1&userId=" + selRecords[0].userId;
        })

        $('#qxcheckBtn').off().click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = "./shenheshouquan_check.html?v=1&userId=" + selRecords[0].userId + '&qx=1';
        })

    })


});