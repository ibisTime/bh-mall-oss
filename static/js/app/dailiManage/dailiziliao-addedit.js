$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var edit = getQueryString('edit');
    var view = edit ? false : true;
    var le = '';
    var isReal = {
        '0': '否',
        '1': '是'
    }
    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                isRealName: item.isRealName
            };
        });
        var fields = [{
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
                field: 'level1',
                title: '是否需要上传身份证照片',
                formatter(v, d) {
                    let isRealName = '';
                    items.forEach(item => {
                        if (d.level == item.level) {
                            isRealName = isReal[item.isRealName];
                        }
                    })
                    return isRealName;
                }
            }, {
                field: 'idHand',
                title: '身份证照片',
                type: 'img'
            }, {
                field: 'mobile',
                title: '联系电话'
            }, {
                field: 'mkAmount',
                title: '门槛余额',
                formatter: moneyFormat
            }, {
                field: 'wareAmount',
                title: '云仓余额',
                formatter: moneyFormat
            }, {
                field: 'wxId',
                title: '微信号'
            }, {
                field: 'quyu',
                title: '区域',
                formatter: function(v, data) {
                    return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                        data.city ? data.province + ' ' + data.city :
                        data.province ? data.province : '-'
                }
            }, {
                field: 'address',
                title: '详细地址',
                type: 'doubleLine',
                required: true
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
                field: 'introduceName',
                title: '介绍人'
            }, {
                field: 'introduceMobile',
                title: '介绍人电话'
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
            }
            //  ,{
            //      field : 'updateDatetime',
            //      title : '状态时间',
            //      formatter: dateTimeFormat
            //  }
        ];


        var edit1 = [{
            field: 'userId',
            title: '用户编号',
            value: userId,
            type: 'hidden'
        }, {
            field: 'realName',
            title: '姓名',
            readonly: view,
            required: true
        }, {
            field: 'level',
            title: '等级',
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name',
            required: true,
            readonly: true
        }, {
            field: 'teamName',
            title: '团队名称',
            required: true
        }, {
            field: 'mobile',
            title: '联系电话',
            required: true
        }, {
            field: 'wxId',
            title: '微信号',
            required: true
        }, {
            field: 'quyu',
            title: '区域',
            type: 'citySelect',
            required: true
        }, {
            field: 'address',
            title: '详细地址',
            type: 'doubleLine',
            required: true
        }];

        var buttons = [{
            title: '确定',
            handler: function() {
                var data = $('#jsForm').serializeObject();
                data.userId = userId;
                reqApi({
                    code: '627314',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });

            }
        }, {
            title: '取消',
            handler: function() {
                goBack();
            }
        }];



        buildDetail({
            fields: edit ? edit1 : fields,
            view: view,
            buttons: edit ? buttons : '',
            code: {
                userId: userId
            },
            detailCode: '627327'
        });
        hideLoading();
    });
})