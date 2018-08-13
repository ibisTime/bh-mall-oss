$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var up = getQueryString('up');
    var level = getQueryString('level');
    var referee = getQueryString('referee');
    var admin = getQueryString('admin');
    var highUserId = getQueryString('high');
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
        },
        //     {
        //     field : 'updateDatetime',
        //     title : '上级'
        // }, {
        //     field : 'updateDatetime',
        //     title : '上级电话'
        // },
        {
            field: 'teamName',
            title: '团队名称'
        }, {
            field: 'manageName',
            title: '关联管理员'
        }, {
            field: 'userRefreeName',
            title: '推荐人'
        }, {
            field: 'userRefreeMobile',
            title: '推荐人电话'
        }, {
            field: 'status',
            title: '授权状态',
            formatter: Dict.getNameForList('agent_status')
        }, {
            field: 'high',
            title: '当前上级',
            formatter: function(v, data) {
                return data.highUser ? data.highUser.realName : '-'
            }
        }, {
            field: 'highUser',
            title: '新上级',
            type: 'select',
            listCode: level == 1 ? 627126 : 627326,
            valueName: '{{realName.DATA}}' + '-' + '{{mobile.DATA}}',
            readonly: false,
            required: true
        }
    ];


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
            title: '上级',
            formatter: function(v, data) {
                return data.highUser ? data.highUser.realName : '-'
            }
        }, {
            field: 'higghUserMobile',
            title: '上级电话',
            formatter: function(v, data) {
                return data.highUser ? data.highUser.mobile : '-'
            }
        }, {
            field: 'teamName',
            title: '团队名称'
        }, {
            field: 'manageName',
            title: '关联管理员'
        },
        // {
        //     field : 'updateDatetime',
        //     title : '推荐人'
        // }, {
        //     field : 'updateDatetime',
        //     title : '推荐人电话'
        // },
        {
            field: 'status',
            title: '授权状态',
            formatter: Dict.getNameForList('agent_status')
        }, {
            field: 'userReferee',
            title: '新推荐人姓名',
            listCode: '627326',
            type: 'select',
            valueName: '{{realName.DATA}}-{{mobile.DATA}}', //'{{mobile.DATA}}-{{kindName.DATA}}-{{nickname.DATA}}'
            readonly: false
        }
    ];


    var admin1 = [{
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
        title: '上级',
        formatter: function(v, data) {
            return data.highUser ? data.highUser.realName : '-'
        }
    }, {
        field: 'higghUserMobile',
        title: '上级电话',
        formatter: function(v, data) {
            return data.highUser ? data.highUser.mobile : '-'
        }
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
        field: 'refereeUserMobile',
        title: '推荐人电话',
        formatter: function(v, data) {
            return data.refereeUser ? data.refereeUser.mobile : '-'
        }
    }, {
        field: 'status',
        title: '授权状态',
        formatter: Dict.getNameForList('agent_status')
    }, {
        field: 'manager',
        title: '新管理员姓名',
        listCode: '627126',
        type: 'select',
        params: {
            kind: 'P'
        },
        keyName: 'userId',
        searchName: 'userId',
        valueName: '{{realName.DATA}}' + '-' + '{{mobile.DATA}}',
        readonly: false
    }];

    if (up) {

        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['updater'] = getUserId();
                    data["userId"] = userId;
                    data['highUser'] = highUserId;
                    reqApi({
                        code: "627312",
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
            fields: up1,
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
    } else if (referee) {
        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['updater'] = getUserName();
                    data["userId"] = userId;
                    data['userReferee'] = userId;
                    reqApi({
                        code: "627313",
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
                    data['updater'] = getUserName();
                    data["userId"] = userId;
                    reqApi({
                        code: "627317",
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
            fields: admin1,
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

    }

});