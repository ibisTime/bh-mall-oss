$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');
    var lev = getQueryString('lev');
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
            title: '姓名'
        }, {
            field: 'applyLevel',
            title: '申请等级',
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name',
            params: {
                highLevel: 6
            }
        }, {
            field: 'mobile',
            title: '联系电话'
        }, {
            field: 'wxId',
            title: '微信号'
        }, {
            field: 'quyu',
            title: '区域',
            type: 'citySelect',
            required: true
        }, {
            field: 'address',
            title: '详细地址'
        }, {
            field: 'status',
            title: '代理状态',
            formatter: Dict.getNameForList('yx_status'),
            readonly: true
        }, {
            field: 'fromInfo',
            title: '来源',
            readonly: true
        }, {
            field: 'applyDatetime',
            title: '申请时间',
            formatter: dateTimeFormat
        }, {
            field: 'remark',
            title: '备注'
        }];



        // 接口还没有
        var buttons = [{
            title: '确定',
            handler: function() {
                if ($('#jsForm').valid()) {
                    var data = $('#jsForm').serializeObject();
                    data.approver = getUserId();
                    data.updater = getUserId();
                    data.userId = userId;
                    // data.remark = $('#remark').val();
                    reqApi({
                        code: '627257',
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
            fields: columns,
            code: {
                userId: userId
            },
            buttons: buttons,
            detailCode: '627267'
        });
        hideLoading();
    })
});