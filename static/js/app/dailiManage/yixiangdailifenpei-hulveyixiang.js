$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var fenpei = getQueryString('fenpei');
    var lev = Number(getQueryString('lev'));
    var view = getQueryString('v');
    reqApi({
        code: '627006'
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
            field: 'applyLevel',
            title: '申请等级',
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
            field: 'diyu',
            title: '地域',
            formatter: function(v, data) {
                return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                    data.city ? data.province + ' ' + data.city :
                    data.province ? data.province : '-'
            }
        }, {
            field: 'address',
            title: '详细地址'
        }, {
            field: 'status',
            title: '代理状态',
            formatter: Dict.getNameForList('yx_status')
        }, {
            field: 'fromInfo',
            title: '来源'
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            formatter: dateTimeFormat
        }, {
            field: 'reason',
            title: '忽略理由',
            maxlength: 250,
            readonly: false,
            required: true
        }];


        // 审核分配
        var fenpei1 = [{
                field: 'realName',
                title: '姓名'
            }, {
                field: 'applyLevel',
                title: '申请等级',
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
                field: 'diyu',
                title: '地域',
                formatter: function(v, data) {
                    return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                        data.city ? data.province + ' ' + data.city :
                        data.province ? data.province : '-'
                }
            }, {
                field: 'address',
                title: '详细地址'
            }, {
                field: 'status',
                title: '代理状态',
                formatter: Dict.getNameForList('yx_status')
            }, {
                field: 'fromInfo',
                title: '来源'
            }, {
                field: 'applyDatetime',
                title: '申请时间',
                formatter: dateTimeFormat
            },
            /* {
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
               },  */
            {
                field: 'toUserId',
                title: '代理',
                readonly: false,
                pageCode: '627325',
                type: 'select',
                params: {
                    kind: 'B',
                    statusList: [8],
                    noUserId: userId,
                    highLevel: lev
                },
                keyName: 'userId',
                valueName: '{{realName.DATA}}'
            }, {
                field: 'reason',
                title: '理由',
                maxlength: 250,
                readonly: false,
                required: true
            }
        ];
        // 接口还没有
        if (fenpei) {
            var buttons = [{
                title: '通过',
                handler: function() {
                    if ($('#jsForm').valid()) {
                        var data = $('#jsForm').serializeObject();
                        data.approver = getUserId();
                        data.result = '1';
                        data.userId = userId;
                        data.remark = $('#reason').val();
                        reqApi({
                            code: '627251',
                            json: data
                        }).done(function(data) {
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
                        data['remark'] = $('#reason').val();
                        data['approver'] = getUserId();
                        data["userId"] = userId;
                        reqApi({
                            code: "627255",
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
    })
});