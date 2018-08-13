$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var fenpei = getQueryString('fenpei');
    var view = getQueryString('v');

    var columns = [{
        field: 'realName',
        title: '姓名'
    }, {
        field: 'level',
        title: '等级',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
    }, {
        field: 'mobile',
        title: '联系电话'
    }, {
        field: 'wxId',
        title: '微信号'
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
        title: '代理状态',
        formatter: Dict.getNameForList('agent_status')
    }, {
        field: 'source',
        title: '来源'
    }, {
        field: 'createDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }, {
        field: 'reason',
        maxlength: 250,
        readonly: false,
        required: true
    }];


    // 审核分配
    var fenpei1 = [{
        field: 'realName',
        title: '姓名'
    }, {
        field: 'level',
        title: '等级',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
    }, {
        field: 'mobile',
        title: '联系电话'
    }, {
        field: 'wxId',
        title: '微信号'
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
        title: '代理状态',
        formatter: Dict.getNameForList('agent_status')
    }, {
        field: 'source',
        title: '来源'
    }, {
        field: 'createDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'toUserId',
        title: '意向归属人',
        readonly: false,
        listCode: '627266',
        type: 'select',
        params: {
            kind: 'B',
            statusList: [7, 12, 13, 14]
        },
        keyName: 'userId',
        valueName: 'realName'
    }, {
        field: 'manager',
        title: '管理员',
        readonly: false,
        listCode: '627266',
        type: 'select',
        params: {
            kind: 'P'
        },
        keyName: 'userId',
        valueName: 'realName',
        required: true
    }, {
        field: 'reason',
        title: '理由',
        maxlength: 250,
        readonly: false,
    }];
    // 接口还没有
    if (fenpei) {
        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['approver'] = getUserId();
                    data["userId"] = userId;
                    reqApi({
                        code: "627252",
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
            fields: fenpei1,
            code: {
                userId: userId
            },
            view: view,
            buttons: buttons,
            detailCode: '627267',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();

    } else {
        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = {};
                    data['remark'] = $('#remark').val();
                    data['approver'] = getUserId();
                    data["userId"] = userId;
                    reqApi({
                        code: "627253",
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
            fields: columns,
            code: {
                userId: userId
            },
            view: view,
            buttons: buttons,
            detailCode: '627267',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();

    }

});