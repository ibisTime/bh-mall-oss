$(function() {
    var accountNumber = getQueryString('accountNumber');
    var fields = [{
        title: '取现金额',
        field: 'amount',
        required : true
    }, {
        title: '支付渠道账号信息（如开户支行）',
        field: 'payCardInfo',
        required: true
    },  {
        title: '支付渠道账号（如银行卡号）',
        field: 'payCardNo',
        required: true,
    },  {
        title: '申请说明',
        field: 'applyNote'
    }];

    buildDetail({
        fields: fields,
        code: {
            accountNumber : accountNumber
        },
        detailCode: '627512',
        editCode: '627501',
        beforeSubmit:function(data){
            data.accountNumber = accountNumber;
            data.amount *= 1000;
            data.applyUser = getUserId();
            return data
        }
    });
});