$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'code1',
        title: '订单编号',
        value: code,
        hidden: true
    }, {
        field: 'mobile',
        title: '收货电话',
        required: true
    }, {
        field: 'signer',
        title: '收货人',
        required: true
    }, {
        field: 'quyu',
        title: '区域',
        type: 'citySelect',
        required: true
    }, {
        field: 'address',
        title: '收货地址',
        type: 'doubleLine',
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627664',
        addCode: '627643',
        editCode: '627643'
            /* ,
                    beforeSubmit: function(data) {
                        data.signer = data.signeName;
                        delete data.signeName;
                        return data;
                    } */
    });

});