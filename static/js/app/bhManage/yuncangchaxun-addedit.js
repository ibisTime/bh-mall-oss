$(function() {
    // 代理管理-系统设置-云仓订单详情
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'productName',
        title: '名称'
    }, {
        field: 'price',
        title: '单价',
        formatter: moneyFormat
    }, {
        field: 'quantity',
        title: '库存'
    }, {
        field: 'amount',
        title: '总价'
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