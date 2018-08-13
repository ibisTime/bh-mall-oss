$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'code1',
        title: '订单编号',
        value: code,
        hidden: true
    }, {
        field: 'deliver',
        title: '发货人',
        value: getUserId(),
        hidden: true
    }, {
        field: 'isCompanySend',
        title: '是否云仓发货',
        type: 'select',
        data: { '0': '否', '1': '是' },
        required: true
    }, {
        field: 'logisticsCode',
        title: '物流编号',
        required: true
    }, {
        field: 'logisticsCompany',
        title: '物流公司',
        type: 'select',
        key: 'kd_company',
        formatter: Dict.getNameForList('kd_company'),
        required: true
    }, {
        field: 'pdf',
        title: '物流单',
        type: 'img',
        single: true
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        beforeSubmit: function(data) {
            data.updater = getUserId();
            return data;
        },
        detailCode: '627664',
        addCode: '627645',
        editCode: '627645'
    });

});