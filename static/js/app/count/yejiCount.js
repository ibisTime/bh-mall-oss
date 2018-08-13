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
            field: 'yjAmount',
            title: '余额',
            formatter: moneyFormat
        }, {
            field: 'sendAward',
            title: '出货总额'
        }, {
            field: 'refreeAward',
            title: '推荐总额'
        }, {
            field: 'intrAward',
            title: '介绍总额'
        }];
        buildList({
            columns: columns,
            pageCode: '627850'
                // searchParams: {
                // 	type: 'android_b',
                // 	companyCode: OSS.company,
                // 	orderColumn:'id',
                // 	orderDir: 'asc'
                // },
                // beforeEdit: function(r) {
                // 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
                // }
        });
    });
})