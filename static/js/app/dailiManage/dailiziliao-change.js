$(function() {
	var code = getQueryString('code');
	var userId = getQueryString('userId');
	var up = getQueryString('up');
	var level = getQueryString('level');
	var referee = getQueryString('referee');
	var admin = getQueryString('admin');
    var view = true;
    var up1 = [{
        field : 'loginName',
        title : '姓名',
        readonly : view
    },{
        field : 'level',
        title : '等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    },
    //     {
    //     field : 'updateDatetime',
    //     title : '上级'
    // }, {
    //     field : 'updateDatetime',
    //     title : '上级电话'
    // },
        {
        field : 'updateDatetime',
        title : '团队名称'
    }, {
        field : 'updateDatetime',
        title : '关联管理员'
    }, {
        field : 'updateDatetime',
        title : '推荐人'
    }, {
        field : 'updateDatetime',
        title : '推荐人电话'
    }, {
        field : 'updateDatetime',
        title : '授权状态'
    },  {
        field : 'updateDatetime',
        title : '状态时间',
        formatter: dateTimeFormat
    },{
        field :'highUser',
        title : '上级',
        listCode: '627356',
        type : 'select',
        params : {
            highLevel : level
        },
        keyName : 'userId',
        searchName :'userId',
        valueName: 'loginName',
        readonly : false
    }];


    var referee1 = [{
        field : 'loginName',
        title : '姓名',
        readonly : view
    },{
        field : 'level',
        title : '等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    },
        {
            field : 'updateDatetime',
            title : '上级'
        }, {
            field : 'updateDatetime',
            title : '上级电话'
        },
        {
            field : 'updateDatetime',
            title : '团队名称'
        }, {
            field : 'updateDatetime',
            title : '关联管理员'
        },
        // {
        //     field : 'updateDatetime',
        //     title : '推荐人'
        // }, {
        //     field : 'updateDatetime',
        //     title : '推荐人电话'
        // },
        {
            field : 'updateDatetime',
            title : '授权状态'
        },  {
            field : 'updateDatetime',
            title : '状态时间',
            formatter: dateTimeFormat
        },  {
            field : 'userReferee',
            title : '推荐人',
            listCode: '627356',
            type : 'select',
            params : {
                level : level
            },
            keyName : 'userId',
            searchName :'userId',
            valueName: 'loginName',
            readonly : false
        }];


    var admin1 = [{
        field : 'loginName',
        title : '姓名',
        readonly : view
    },{
        field : 'level',
        title : '等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    },
        {
            field : 'updateDatetime',
            title : '上级'
        }, {
            field : 'updateDatetime',
            title : '上级电话'
        },
        {
            field : 'updateDatetime',
            title : '团队名称'
        },
        {
            field : 'updateDatetime',
            title : '关联管理员'
        },
        {
            field : 'updateDatetime',
            title : '推荐人'
        }, {
            field : 'updateDatetime',
            title : '推荐人电话'
        }, {
            field : 'updateDatetime',
            title : '授权状态'
        },  {
            field : 'updateDatetime',
            title : '状态时间',
            formatter: dateTimeFormat
        }, {
            field : 'manager',
            title : '管理员',
            listCode: '627356',
            type : 'select',
            params : {
                kind : 'P'
            },
            keyName : 'userId',
            searchName :'userId',
            valueName: 'loginName',
            readonly : false
        }];
	
	if(up) {

        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['updater'] = getUserName();
                    data["userId"] = userId;
                    reqApi({
                        code: "627259",
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
            view : view,
            buttons : buttons,
            code: {
                userId : userId
            },
            detailCode: '627357',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();
    }else if(referee){
        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['updater'] = getUserName();
                    data["userId"] = userId;
                    reqApi({
                        code: "627260",
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
            view : view,
            buttons : buttons,
            code: {
                userId : userId
            },
            detailCode: '627357',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();

    }else {
        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['updater'] = getUserName();
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
        }];
        buildDetail({
            fields: admin1,
            view : view,
            buttons : buttons,
            code: {
                userId : userId
            },
            detailCode: '627357',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();

    }
	
});