$(function() {
    var id = getQueryString('id');
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
            id : id
        },
        addCode: "627504",
        detailCode: '805916',
        editCode: '805911',
        beforeSubmit:function(data){
            data.accountNumber = accountNumber;
            data.amount *= 1000;
            data.applyUser = getUserId();

            var myDate = new Date();//获取当前年
            var year=myDate.getFullYear();//获取当前月
            var month=myDate.getMonth()+1;//获取当前日
            var date=myDate.getDate();
            var h=myDate.getHours();       //获取当前小时数(0-23)
            var m=myDate.getMinutes();     //获取当前分钟数(0-59)
            var s=myDate.getSeconds();

            var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);


            data.payDatetime = now;
            return data;
        }
    });

    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    hideLoading();
});