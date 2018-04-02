$(function() {
    var accountNumber;
    reqApi({
        code: '627453',
        json: {
            userId: 'SYS_USER_BH',
            currency : 'YJ_CNY'
        }
    }).done(function(data) {
        $("#amount-TG").text("￥" + moneyFormat(data[0].amount));
        accountNumber = data[0].accountNumber;
    });


    $("#accouBtn").click(function() {
        window.location.href = 'quxian.html?accountNumber=' + accountNumber;
    });

});