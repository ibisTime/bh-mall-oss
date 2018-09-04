$(function() {
    var code = getQueryString('code');


    var fields = [{
        field: 'code1',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code
        }
    }, {
        field: 'applyDatetime',
        title: '下单日期',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '订单状态',
        type: 'select',
        formatter: Dict.getNameForList('inner_order_status')
    }, {
        field: 'realName',
        title: '下单代理'
    }, {
        field: 'level',
        title: '下单代理等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
    }, {
        field: 'signer',
        title: '收货人'
    }, {
        field: 'mobile',
        title: '收货人电话'
    }, {
        field: 'address',
        title: '收货地址'
    }, {
        field: 'remark',
        title: '备注',
        readonly: false,
        required: true
    }];

    var buttons = [{
        title: '通过',
        handler: function() {

            var data = $('#popForm').serializeObject();
            data.code = code;
            data.result = "1";
            data.remark = $('#remark').val();
            data.approver = getUserId();
            data.updater = getUserId();
            reqApi({
                code: '627725',
                json: data
            }).done(function(data) {
                sucDetail();
            });

        }
    }, {
        title: '不通过',
        handler: function() {
            var data = $('#popForm').serializeObject();
            data.code = code;
            data.result = "0";
            data.remark = $('#remark').val();
            data.approver = getUserId();
            data.updater = getUserId();
            reqApi({
                code: '627725',
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
        view: '1',
        code: code,
        buttons,
        detailCode: '627733'
    });
    hideLoading();
});