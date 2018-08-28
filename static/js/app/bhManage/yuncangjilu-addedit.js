$(function() {
    // 库存记录
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'realName',
        title: '操作人',
    }, {
        field: 'applyDatetime',
        title: '变动时间',
        formatter: dateTimeFormat
    }, {
        field: 'beforeNumber',
        title: '变动前库存',
        formatter(v, data) {
            return data.beforeNumber;
        }
    }, {
        field: 'tranNumber',
        title: '变动库存',
        formatter(v, data) {
            return data.tranNumber;
        }
    }, {
        field: 'afterNumber',
        title: '变动后库存',
        formatter(v, data) {
            return data.afterNumber;
        }
    }, {
        field: 'remark',
        title: '备注'
    }];


    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627833'
    });
});