$(function() {

    var userId = getQueryString('userId');

    var fields = [{
        field: 'userId',
        type: 'hidden',
        value: userId
    }, {
        title: '用户名',
        field: 'realName',
        required: true,
        readonly: true
    }, {
        title: '用户角色',
        field: 'roleCode',
        type: 'select',
        required: true,
        pageCode: '627045',
        keyName: 'code',
        valueName: 'name'
    }];

    buildDetail({
        fields: fields,
        code: { userId: userId },
        detailCode: '627127',
        editCode: '627117'
    });


});