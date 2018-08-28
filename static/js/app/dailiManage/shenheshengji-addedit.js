$(function() {
    // 实际上是审核升级的审核页面
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var view = true;
    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });
        var fields = [{
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
            field: 'applyLevel',
            title: '需升级等级',
            formatter: function(v, data) {
                var level = '';
                items.map(function(item) {
                    if (item.level == data.applyLevel) {
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
            field: 'manageName',
            title: '关联管理员'
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
            formatter: dateTimeFormat
        }, {
            field: 'remark',
            title: '理由',
            required: true,
            readonly: false
        }];

        var buttons = [{
            title: '通过',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data.approver = getUserId();
                    data.result = '1';
                    data.userId = userId;
                    data.remark = $('#remark').val();
                    reqApi({
                        code: '627291',
                        json: data
                    }).done(function(data) {
                        sucDetail();
                    });
                }
            }
        }, {
            title: '不通过',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data.approver = getUserId();
                    data.result = '0';
                    data.userId = userId;
                    data.remark = $('#remark').val();
                    reqApi({
                        code: '627291',
                        json: data
                    }).done(function() {
                        sucDetail();
                    });
                }
            }
        }, {
            title: '返回',
            handler: function() {
                goBack();
            }
        }];

        buildDetail({
            fields: fields,
            view: view,
            buttons: buttons,
            code: {
                userId: userId
            },
            detailCode: '627307',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();
    })
});