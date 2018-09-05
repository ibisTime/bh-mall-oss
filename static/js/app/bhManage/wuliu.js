$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var fields = [{
        field: 'logisticsCompany',
        title: '物流公司',
        key: 'kd_company',
        formatter: Dict.getNameForList('kd_company')
    }, {
        field: 'logisticsCode',
        title: '物流单号'
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627664'
    });

});