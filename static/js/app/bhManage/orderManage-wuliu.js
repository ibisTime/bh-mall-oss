$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var select = { '1': '是', '0': '否' };
    var level = [];


    var fields = [{
        field: 'code1',
        title: '订单编号',
        formatter(v, d) {
            return d.code;
        }
    }, {
        field: 'applyDatetime',
        title: '下单日期',
        formatter: dateTimeFormat
    }, {
        field: 'deliveName',
        title: '发货人'
    }, {
        field: 'signer',
        title: '收货人'
    }, {
        field: 'mobile',
        title: '收货人电话'
    }, {
        field: 'logisticsCompany',
        title: '物流公司',
        key: 'kd_company',
        formatter: Dict.getNameForList('kd_company')
    }, {
        field: 'logisticsCode',
        title: '物流编号'
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627733',
        beforeDetail: function(data) {
            delete data.id;
            return data;
        }
    });
    hideLoading();
});