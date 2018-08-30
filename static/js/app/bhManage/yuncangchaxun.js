$(function() {
    // 报货管理-云仓管理-云仓查询
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
            field: 'code',
            title: '编号',
            search: true
        }, {
            field: 'productName',
            title: '产品名称'
        }, {
            field: 'specsName',
            title: '产品规格'
        }, {
            field: 'price',
            title: '单价',
            formatter: moneyFormat,
            amount: true
        }, {
            field: 'quantity',
            title: '库存'
        }, {
            field: 'amount',
            title: '总价',
            amount: true
        }, {
            field: 'keyword',
            title: '代理人',
            search: true,
            formatter: function(v, data) {
                return data.agent.realName;
            }
        }, {
            field: 'level',
            title: '代理人等级',
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
            field: 'level1',
            title: '代理人等级',
            formatter: function(v, data) {
                var level = '';
                items.map(function(item) {
                    if (item.level == data.agent.level) {
                        level = item.name
                    }
                })
                return level
            }
        }, {
            field: 'teamLeader',
            title: '团队长'
        }];
        buildList({
            columns: columns,
            pageCode: '627810'
        });

        //库存变动记录
        $('#kucunbdBtn').off('click').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = "./yuncangjilu.html?code=" + selRecords[0].productCode + '&userId=' + selRecords[0].userId + '&toorter=ok';
        });

    });
})