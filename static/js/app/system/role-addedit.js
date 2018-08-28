$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'kind',
        type: 'hidden',
        value: '1'
    }, {
        field: 'updater',
        type: 'hidden',
        value: getUserId()
    }, {
        title: '角色名称',
        field: 'name',
        required: true,
        maxlength: 30
    }, {
        title: '备注',
        field: 'remark',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '627047',
        addCode: '627040',
        editCode: '627041'
    });
    hideLoading();
});