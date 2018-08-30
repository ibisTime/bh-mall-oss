$(function() {
    var id = getQueryString('id');
    var remark = getQueryString('remark');
    var fields = [{
        title: '参数说明',
        field: 'remark',
        required: true,
        maxlength: 20,
        readonly: true,
    }, {
        title: '参数值',
        field: 'cvalue',
        type: "textarea",
        required: true,
    }];

    buildDetail({
        fields: fields,
        code: {
            id: id
        },
        detailCode: '627086',
        editCode: '627081',
        beforeSubmit: function(data) {
            data.remark = remark;
            data.updater = getUserId();
            return data;
        }
    });
});