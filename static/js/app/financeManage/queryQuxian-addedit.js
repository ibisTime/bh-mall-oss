$(function() {
    var code = getQueryString('code');
    var remark = getQueryString('remark');
    var fields = [{
        field: 'code',
        title: '编号',
        search : true
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'amount',
        title: '金额',
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        title: '开户支行'
    }, {
        field: 'payCardNo',
        title: '卡号'
    }, {
        field: 'loginName',
        title: '申请人',
        formatter : function (v, data) {
            return data.user?data.user.loginName : '-'
        }
    },{
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type : 'select',
        key : 'withdraw_status',
        formatter : Dict.getNameForList('withdraw_status')
    }, {
        field: 'payUser',
        title: '审核人'
    }, {
        field: 'payDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '627512',
        beforeSubmit:function(data){
            data.remark = remark;
            return data
        }
    });
});