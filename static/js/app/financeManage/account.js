$(function() {
    var accountNumber;
    reqApi({
        code: '627452',
        json: {
            'accountNumber' : 'A1321515156456'
        }
    }).done(function(data) {
        $("#amount-TG").text("￥" + moneyFormat(data.amount));
        accountNumber = data.accountNumber;
    });


    $("#accouBtn").click(function() {
        window.location.href = 'quxian.html?accountNumber=' + accountNumber;
    });

});