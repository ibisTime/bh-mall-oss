$(function() {
    var code = getQueryString('code');
    var fields = [{
        field: 'productName',
        title: '产品名称',
        required: true
    }, {
        field: 'quantity',
        title: '数量',
        required: true,
        formatter(v, data) {
            return data.quantity;
        }
    }, {
        field: 'specsName',
        title: '产品规格',
        required: true
    }, {
        field: 'changeProductName',
        title: '置换产品',
        required: true
    }, {
        field: 'canChangeQuantity',
        title: '置换数量',
        required: true,
        formatter(v, data) {
            return data.canChangeQuantity;
        }
    }, {
        field: 'changeSpecsName',
        title: '置换产品规格',
        required: true
    }, {
        field: 'changePrice',
        title: '换货价',
        amount: true,
        required: true,
        readonly: false
    }];

    var buttons = [{
        title: '确定',
        handler: function() {
            var data = $('#popForm').serializeObject();
            data.approver = getUserId();
            data.code = code;
            data.changePrice = $('#changePrice').val();
            reqApi({
                code: '627791',
                json: data
            }).done(function(data) {
                sucDetail();
            });

        }
    }, {
        title: '取消',
        handler: function() {
            goBack();
        }
    }];

    buildDetail({
        fields: fields,
        buttons,
        view: '1',
        code: code,
        detailCode: '627803'
    });

});