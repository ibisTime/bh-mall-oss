$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');

    var fields = [{
        field: 'realName',
        title: '姓名',
        readonly: true
    }, {
        field: 'loginName',
        title: '登录名',
        readonly: true
    }, {
        field: 'mobile',
        title: '联系电话',
        readonly: true
    }, {
        field: 'updater',
        title: '更新人',
        readonly: true
    }, {
        field: 'updateDatetime',
        title: '更新时间',
        formatter: dateTimeFormat,
        readonly: true
    }];
    var buttons = [{
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    buildDetail({
        fields: fields,
        buttons,
        code: {
            userId
        },
        detailCode: '627127'
    });
});