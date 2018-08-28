$(function() {
    var code = getQueryString('code');
    var remark = getQueryString('remark');
    var fields = [{
        field: 'code1',
        title: '编号',
        readonly: true,
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        field: 'accountNumber',
        title: '账号',
        readonly: true
    }, {
        field: 'amount',
        title: '金额',
        amount: true,
        readonly: true,
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '开户支行',
        readonly: true
    }, {
        field: 'payCardNo',
        title: '卡号',
        readonly: true
    }, {
        field: 'accountName',
        title: '申请人',
        readonly: true
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        readonly: true,
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        readonly: true,
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status')
    }, {
        field: 'approveName',
        title: '审核人',
        readonly: true
    }, {
        field: 'payDatetime',
        title: '审核时间',
        readonly: true,
        formatter: dateTimeFormat
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '627512',
        beforeSubmit: function(data) {
            data.remark = remark;
            return data
        }
    });
});