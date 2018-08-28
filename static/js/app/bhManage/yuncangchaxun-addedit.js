$(function() {
    // 代理管理-系统设置-云仓订单详情
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'code1',
        title: '编号',
        search: true,
        formatter(v, data) {
            return data.code;
        }
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
        field: 'quantity',
        title: '库存'
    }, {
        field: 'amount',
        title: '总价',
        amount: true,
    }, {
        field: 'realName',
        title: '代理人',
        search: true
    }, {
        field: 'teamLeader',
        title: '团队长'
    }];


    buildDetail({
        fields: fields,
        code,
        view: view,
        detailCode: '627813'
    });
});