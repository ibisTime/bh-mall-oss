$(function() {
    // 代理管理-财务管理-余额管理
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
            title: '代理姓名',
            search: true
        }, {
            field: 'mobile',
            title: '代理电话',
            formatter: function(v, data) {
                return data.agent ? data.agent.mobile : '-'
            }
        }, {
            field: 'wxId',
            title: '代理微信',
            formatter: function(v, data) {
                return data.agent ? data.agent.wxId : '-'
            }
        }, {
            field: 'level',
            title: '代理等级',
            search: true,
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name',
            visible: false
        }, {
            field: 'level1',
            title: '代理等级',
            formatter: function(v, data) {
                var level = ''
                items.map(function(item) {
                    if (data.agent && item.level == data.agent.level) {
                        level = item.name
                    }
                })
                return level
            }
        }, {
            field: 'teamName',
            title: '代理团队',
            formatter: function(v, data) {
                return data.agent ? data.agent.teamName : '-'
            }
        }, {
            field: 'amount',
            title: '余额',
            formatter: moneyFormat
        }, {
            field: 'status',
            title: '状态',
            type: 'select',
            search: true,
            key: 'account_status',
            formatter: Dict.getNameForList('account_status')
        }, {
            field: 'currency',
            title: '类型',
            type: 'select',
            search: true,
            key: 'currency',
            formatter: Dict.getNameForList('currency')
        }, {
            field: 'createDatetime',
            title: '创建时间',
            formatter: dateTimeFormat,
            field1: 'dateStart',
            title1: '创建时间',
            type: 'datetime',
            field2: 'dateEnd',
            twoDate: true,
            search: true,
            visible: false,
            type: 'datetime'
        }, {
            field: 'createDatetime1',
            title: '创建时间',
            formatter: function(v, data) {
                return dateTimeFormat(data.createDatetime)
            }
        }];
        buildList({
            columns: columns,
            pageCode: '627450',
            searchParams: {
                type: 'B'
            }
        });




        // 充值
        $('#inBtn').click(function() {
                var selRecords = $('#tableList').bootstrapTable('getSelections');
                if (selRecords.length <= 0) {
                    toastr.info("请选择记录");
                    return;
                }

                window.location.href = './yueguanli_addedit.html?chongzhi=1&v=1&accountNumber=' + selRecords[0].accountNumber;
            })
            // 扣款
        $('#outBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }

            window.location.href = './yueguanli_addedit.html?koukuan=1&v=1&accountNumber=' + selRecords[0].accountNumber;
        })



        // 余额变动记录
        $('#yueChangeRecordBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }

            window.location.href = './liushui.html?accountNumber=' + selRecords[0].accountNumber;
        })

    })



});