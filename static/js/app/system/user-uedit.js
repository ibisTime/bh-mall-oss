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
        title: '角色',
        field: 'roleCode',
        type: 'select',
        required: true,
        listCode: '627046',
        keyName: 'code',
        valueName: 'name'
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: { userId: userId },
        detailCode: '627127',
        editCode: '627117'
    });


});