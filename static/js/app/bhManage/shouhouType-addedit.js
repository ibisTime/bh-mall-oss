$(function() {
    var code = getQueryString('code');

    var fields = [{
        field: 'dvalue',
        title: '类型名称',
        required: 'true'
    }, {
        field: 'dkey',
        title: '分类',
        required: 'true'
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '627077',
        addCode: '627070',
        editCode: '627072',
        beforeSubmit: function(data) {
            data.parentKey = 'after_sale_type',
                data.updater = getUserId(),
                data.type = '1'
            return data;
        }
    });
    hideLoading();
});