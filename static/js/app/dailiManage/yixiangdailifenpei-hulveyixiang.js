$(function() {
	var code = getQueryString('code');
	var userId = getQueryString('userId');
	var fenpei = getQueryString('fenpei');
	var view = getQueryString('v');


	console.log(fenpei);
    var columns = [{
        field : 'realName',
        title : '姓名'
    },{
        field : 'level',
        title : '等级',
        listCode : '627006',
        keyName : 'level',
        valueName : 'name'
    }, {
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'wxId',
        title : '微信号'
    }, {
        field : 'diyu',
        title : '地域',
        formatter : function (v, data) {
            return data.area?data.province+' '+data.city+' '+data.area
                        :data.city?data.province+' '+data.city
                            :data.province?data.province : '-'
        }
    }, {
        field : 'status',
        title : '代理状态',
        formatter : Dict.getNameForList('agent_status')
    }, {
        field : 'source',
        title : '来源'
    }, {
        field : 'createDatetime',
        title : '申请时间',
        formatter: dateTimeFormat
    }, {
        field : 'remark',
        title : '备注'
    }, {
        field: 'reason',
        title: '忽略理由',
        maxlength: 250,
        readonly : false,
        required: true
    }];


// 审核分配
    var fenpei1 = [{
        field : 'realName',
        title : '姓名'
    },{
        field : 'level',
        title : '等级',
        listCode : '627006',
        keyName : 'level',
        valueName : 'name'
    }, {
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'wxId',
        title : '微信号'
    }, {
        field : 'diyu',
        title : '地域',
        formatter : function (v, data) {
            return data.area?data.province+' '+data.city+' '+data.area
                        :data.city?data.province+' '+data.city
                            :data.province?data.province : '-'
        }
    }, {
        field : 'status',
        title : '代理状态',
        formatter : Dict.getNameForList('agent_status')
    }, {
        field : 'source',
        title : '来源'
    }, {
        field : 'createDatetime',
        title : '申请时间',
        formatter: dateTimeFormat
    }, {
        field : 'toUserId',
        title : '代理',
        readonly : false,
        listCode : '627356',
        type : 'select',
        params : {
            kind  : 'B'
        },
        keyName : 'userId',
        searchName :'userId',
        valueName: 'loginName',
        required : true
    }, {
        field : 'manager',
        title : '管理员',
        readonly : false,
        listCode : '627356',
        type : 'select',
        params : {
            kind  : 'P'
        },
        keyName : 'userId',
        searchName :'userId',
        valueName: 'loginName',
        required : true
    }, {
        field: 'reason',
        title: '理由',
        maxlength: 250,
        readonly : false,
    }];
    // 接口还没有
    if(fenpei) {
        var buttons = [{
            title: '确认',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data['approver'] = getUserName();
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
                userId : userId
            },
            view :view,
            buttons : buttons,
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
                    var data = {};
                    data['remark'] = $('#remark').val();
                    data['approver'] = getUserName();
                    data["userId"] = userId;
                    reqApi({
                        code: "627254",
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
                userId : userId
            },
            view :view,
            buttons : buttons,
            detailCode: '627357',
            addCode: '627920',
            editCode: '627921'
        });
        hideLoading();

    }

});