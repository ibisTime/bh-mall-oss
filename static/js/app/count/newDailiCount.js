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
            title: '姓名'
        }, {
            field: 'level',
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
            title: '手机号'
        }, {
            field: 'wxId',
            title: '微信号'
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