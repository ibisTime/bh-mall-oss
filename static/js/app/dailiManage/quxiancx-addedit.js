$(function() {
    var code = getQueryString('code');
    var remark = getQueryString('remark');
    var fields = [{
        field: 'accountNumber',
        readonly: true,
        title: '账号'
    }, {
        field: 'amount',
        title: '金额',
        readonly: true,
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        readonly: true,
        title: '开户支行'
    }, {
        field: 'payCardNo',
        readonly: true,
        title: '卡号'
    }, {
        field: 'loginName',
        readonly: true,
        title: '申请人',
        formatter: function(v, data) {
            return data.agent ? data.agent.realName : '-'
        }
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
        field: 'payUser',
        title: '审核人',
        readonly: true,
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