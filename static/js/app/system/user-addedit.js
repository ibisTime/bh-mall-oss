$(function() {

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: 'P'
    }, {
        title: '手机号',
        field: 'mobile',
        mobile: true,
        required: true
    }, {
        title: '用户名',
        field: 'realName',
        required: true
    }, {
        title: '登录密码',
        field: 'loginPwd',
        type: 'password',
        required: true
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        addCode: '627110',
        beforeSubmit(data) {
            data.updater = getUserId();
            return data;
        }
    });
    hideLoading();
});