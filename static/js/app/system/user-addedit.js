$(function() {
    // hideLoading();
    var code = getQueryString('code');

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
        required: true
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '627327',
        addCode: '627110'
    });
    hideLoading();
});