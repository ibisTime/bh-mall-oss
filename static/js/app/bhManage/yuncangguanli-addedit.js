$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'productMessage',
        title: '产品信息',
        formatter() {
            $('#productMessage').prev('label').css({
                'width': 'auto',
                'margin-left': '50px',
                'font-size': '16px'
            }).parent('li').css('border-bottom', '1px solid #ccc');
            return '';
        }
    }, {
        field: 'productCode',
        title: '产品编号'
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'specsName',
        title: '产品规格'
    }, {
        field: 'price',
        title: '产品单价',
        amount: true
    }, {
        field: 'orderMessage',
        title: '订单信息',
        formatter() {
            $('#orderMessage').prev('label').css({
                'width': 'auto',
                'margin-left': '50px',
                'font-size': '16px'
            }).parent('li').css('border-bottom', '1px solid #ccc');
            return '';
        }
    }, {
        field: 'code1',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        field: 'quantity',
        title: '产品数量',
        formatter(v, data) {
            return data.quantity;
        }
    }, {
        field: 'amount',
        title: '订单金额',
        readonly: view,
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
        field: 'toUserName',
        title: '上级代理'
    }, {
        field: 'teamLeader',
        title: '团队长'
    }, {
        field: 'status',
        title: '订单状态',
        search: true,
        type: 'select',
        key: 'in_order_status',
        valueName: 'name',
        formatter: Dict.getNameForList("in_order_status")
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat
    }, {
        field: 'applyNote',
        title: '卖家嘱托'
    }];


    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627917'
    });
});