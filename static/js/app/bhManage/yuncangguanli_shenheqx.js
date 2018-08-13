$(function() {
    var code = getQueryString('code');
    var userId = getQueryString('userId');

    var fields = [{
        field: 'code1',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        field: 'amobile',
        title: '订单金额',
        formatter: moneyFormat
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
        field: 'status',
        title: '订单状态',
        key: 'in_order_status',
        valueName: 'name',
        formatter: Dict.getNameForList("in_order_status")
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat
    }, {
        field: 'productCode',
        title: '商品编号'
    }, {
        field: 'productName',
        title: '商品名称'
    }, {
        field: 'specsName',
        title: '商品规格'
    }, {
        field: 'price',
        title: '产品单价'
    }, {
        field: 'remark',
        title: '备注',
        required: true
    }];

    var buttons = [{
        title: '确定',
        handler: function() {
            var data = $('#jsForm').serializeObject();
            data.code = code;
            data.result = "1";
            data.approver = getUserId();
            data.approveNote = $('#approveNote').val();
            reqApi({
                code: '627904',
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
        code: code,
        buttons,
        detailCode: '627917'
    });
});