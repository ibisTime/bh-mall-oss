$(function() {
    var id = getQueryString('id');
    var fields = [{
            field: 'kind',
            type: 'hidden',
            value: '1'
        }, {
            title: '银行名称',
            field: 'bankName',
            required: true,
            maxlength: 30
        },
        {
            title: '银行别称',
            field: 'bankCode',
            required: true,
            maxlength: 30
        }
    ];

    buildDetail({
        fields: fields,
        code: {
            id
        },
        beforeSubmit: function(data) {
            data.updater = getUserId();
            return data;
        },
        detailCode: '627107',
        addCode: '627100',
        editCode: '627041'
    });
    hideLoading();
});