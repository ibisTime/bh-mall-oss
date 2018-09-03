$(function() {
    // 代理管理-系统设置-云仓订单详情
    var code = getQueryString('code');
    var view = getQueryString('view');

    var fields = [{
        field: 'code1',
        title: '编号',
        search: true,
        formatter(v, data) {
            return data.code;
        }
    }, {
        field: 'realName',
        title: '代理人',
        search: true
    }, {
        field: 'teamLeader',
        title: '团队长'
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'specsName',
        title: '产品规格',
        required: true
    }, {
        field: 'price',
        title: '单价',
        formatter: moneyFormat,
        amount: true
    }, {
        field: 'amount',
        title: '总价',
        amount: true,
    }, {
        field: 'quantity',
        title: '库存',
        readonly: false,
        required: true
    }, {
        field: 'remark',
        title: '备注',
        readonly: false,
        required: true
    }];

    var buttons = [{
        title: '确定',
        handler: function() {
            var data = $('#jsForm').serializeObject();
            data.code = code;
            data.updater = getUserId();
            data.quantity = $('#quantity').val();
            data.remark = $('#remark').val();
            reqApi({
                code: '627806',
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
        code,
        buttons,
        view: view,
        detailCode: '627813'
    });
});