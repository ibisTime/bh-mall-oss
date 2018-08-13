$(function() {
    var code = getQueryString('code');
    var id = getQueryString('id');
    var fields = [{
        field: 'bankName',
        required: false,
        title: '银行名称'
    }, {
        field: 'bankCode',
        title: '银行别称',
        readonly: false
    }];

    buildDetail({
        fields: fields,
        code: {
            code,
            id
        },
        editCode: '627102',
        detailCode: '627107',
        beforeSubmit: function(data) {
            data.updater = getUserId();
            return data
        }
    });
});