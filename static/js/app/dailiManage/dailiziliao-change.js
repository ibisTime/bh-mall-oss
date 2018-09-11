$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var up = getQueryString('up');
    var level = getQueryString('level');
    var referrer = getQueryString('referrer');
    var isreferrer = getQueryString('isref');
    var admin = getQueryString('admin');
    var highUserId = getQueryString('high');
    var view = true;
    var up1 = [{
            field: 'realName',
            title: '姓名',
            readonly: view
        }, {
            field: 'level',
            title: '等级',
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name'
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
            field: 'highUserName',
            title: '当前上级'
        }, {
            field: 'highUser',
            title: '新上级',
            type: 'select',
            pageCode: level == 1 ? 627125 : 627325,
            params: {
                kind: 'B',
                noStatusList: [0, 4],
                noUserId: highUserId,
                highLevel: level
            },
            keyName: 'userId',
            valueName: '{{realName.DATA}}' + '-' + '{{mobile.DATA}}',
            readonly: false,
            required: true
        }
    ];


    var referrer1 = [{
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
        field: 'userreferrer',
        title: '新推荐人姓名',
        pageCode: '627325',
        params: {
            kind: 'B',
            noStatusList: [0, 4],
            noUserList: [userId, referrer],
            level: level
        },
        type: 'select',
        keyName: 'userId',
        valueName: '{{realName.DATA}}-{{mobile.DATA}}', //'{{mobile.DATA}}-{{kindName.DATA}}-{{nickname.DATA}}'
        readonly: false
    }];


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
                userId: userId,
                updater: getUserId()
            },
            detailCode: '627327',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();
    } else if (isreferrer) {
        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['updater'] = getUserId();
                    data["userId"] = userId;
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
            fields: referrer1,
            view: view,
            buttons: buttons,
            code: {
                userId: userId,
                updater: getUserId()
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
                userId: userId,
                updater: getUserId()
            },
            detailCode: '627327',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();

    }

});