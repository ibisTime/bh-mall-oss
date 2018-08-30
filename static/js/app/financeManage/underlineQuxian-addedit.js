$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v') || false;
    var fields = [{
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'amount',
        title: '余额',
        formatter: moneyFormat
    }, {
        field: 'fee',
        title: '手续费',
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '开户支行'
    }, {
        field: 'payCardNo',
        title: '卡号'
    }, {
        field: 'accountName',
        title: '申请人',
        search: true
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        search: true,
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status')
    }, {
        field: 'approveName',
        title: '审核人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }, {
        field: 'approveNote',
        title: '审核备注'
    }, {
        field: 'payUserName',
        title: '回录人'
    }, {
        field: 'payDatetime',
        title: '回录时间',
        formatter: dateTimeFormat
    }, {
        field: 'payNote',
        title: '回录备注'
    }];

    buildDetail({
        fields: fields,
        view: view,
        code: code,
        detailCode: '627512'
    });

});