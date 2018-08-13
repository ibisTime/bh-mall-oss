$(function() {
    var userId = getQueryString('userId');

    var fields = [{
        field: 'userId',
        type: 'hidden',
        value: userId
    }, {
        field: 'adminUserId',
        type: 'hidden',
        value: getUserId()
    }, {
        title: '用户名',
        field: 'realName',
        required: true,
        readonly: true
    }, {
        title: '新密码',
        field: 'newLoginPwd',
        type: 'password',
        required: true
    }];

    buildDetail({
        fields: fields,
        code: { userId: userId },
        detailCode: '627127',
        editCode: '627115'
    });
});