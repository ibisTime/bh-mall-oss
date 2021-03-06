$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v') || false;
    var fields = [{
        field: 'code1',
        title: '编号',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        field: 'accountName',
        title: '充值人'
    }, {
        field: 'teamName',
        title: '充值人团队'
    }, {
        field: 'amount',
        title: '金额',
        amount: true,
        required: true
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        required: true,
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        key: 'charge_status',
        formatter: Dict.getNameForList('charge_status')
    }, {
        field: 'payUserName',
        title: '审核人'
    }, {
        field: 'payDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }, {
        field: 'payNote',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        view: view,
        code: code,
        detailCode: '627472',
        editCode: '627002',
        beforeSubmit: function(data) {
            data.level = level;
            data.updater = getUserId();
            return data;
        }
    });

});