$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var up = getQueryString('up');
    var level = getQueryString('level');
    var referee = getQueryString('referee');
    var admin = getQueryString('admin');
    var view = true;
    var up1 = [{
        field: 'realName',
        title: '姓名',
        readonly: view
    }, {
        field: 'levelName',
        title: '等级'
    }, {
        field: 'mobile1',
        title: '联系电话',
        formatter: function(v, data) {
            return data.mobile;
        }
    }, {
        field: 'wxId',
        title: '微信号'
    }, {
        field: 'teamName',
        title: '团队名称'
    }, {
        field: 'manageName',
        title: '关联管理员'
    }, {
        field: 'refereeUserName',
        title: '推荐人',
        formatter: function(v, data) {
            return data.refereeUser ? data.refereeUser.realName : '-'
        }
    }, {
        field: 'mobile',
        title: '推荐人电话',
        formatter: function(v, data) {
            return data.refereeUser ? data.refereeUser.mobile : '-'
        }
    }, {
        field: 'status',
        title: '授权状态',
        formatter: Dict.getNameForList('agent_status')
    }, {
        field: 'high',
        title: '理由',
        formatter: function(v, data) {
            return data.highUser ? data.highUser.realName : '-'
        }
    }];


    var referee1 = [{
        field: 'realName',
        title: '姓名',
        readonly: view
    }, {
        field: 'level',
        title: '等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
    }, {
        field: 'mobile',
        title: '联系电话'
    }, {
        field: 'wxId',
        title: '微信号'
    }, {
        field: 'highUserName',
        title: '上级'
    }, {
        field: 'highUserMobile',
        title: '上级电话'
    }, {
        field: 'teamName',
        title: '团队名称'
    }, {
        field: 'manageName',
        title: '关联管理员'
    }, {
        field: 'status',
        title: '授权状态',
        formatter: Dict.getNameForList('agent_status')
    }, {
        field: 'remark',
        title: '备注',
        readonly: false,
        required: true

    }];

    if (up) {

        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['updater'] = getUserId();
                    data["userId"] = userId;
                    data.remark = $('#remark').val();
                    reqApi({
                        code: "627316",
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
            fields: referee1,
            view: view,
            buttons: buttons,
            code: {
                userId: userId
            },
            detailCode: '627327',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();

    } else {
        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['updater'] = getUserId();
                    data["userId"] = userId;
                    reqApi({
                        code: "627261",
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
        }]

    }

});