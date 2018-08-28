$(function() {
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
            field: 'realName',
            title: '姓名',
            search: true
        }, {
            field: 'level',
            title: '等级',
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name',
            visible: false,
            search: true,
            params: {
                highLevel: 6
            }
        }, {
            field: 'level1',
            title: '等级',
            formatter: function(v, data) {
                var level = '';
                items.map(function(item) {
                    if (item.level == data.level) {
                        level = item.name
                    }
                })
                return level
            }
        }, {
            field: 'mobile',
            title: '手机号',
            search: true
        }, {
            field: 'wxId',
            title: '微信号'
        }, {
            // 查询
            field: 'impowerDatetime',
            title: '时间',
            formatter: dateTimeFormat,
            field1: 'dateStart',
            title1: '时间',
            type: 'datetime',
            field2: 'dateEnd',
            twoDate: true,
            search: true,
            visible: false
        }, {
            field: 'impowerDatetime',
            title: '授权时间',
            formatter: dateTimeFormat
        }];
        buildList({
            columns: columns,
            pageCode: '627850'
        });
    });
})