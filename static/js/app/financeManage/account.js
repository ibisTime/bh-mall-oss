$(function() {
    var accountNumber, id, accountNumberYK;


    reqApi({
        code: '627451',
        json: {
            type: 'P'
        }
    }).done(function(data) {
        if (data[0].accountNumber) {
            accountNumber = data[0].accountNumber;
        }
        if (data[1].accountNumber) {
            accountNumberYK = data[1].accountNumber;
        }
        code = data[0].userId;
        reqApi({
            code: '627452',
            json: {
                'accountNumber': accountNumber
            }
        }).done(function(data1) {
            $("#amount-TG").text("￥" + moneyFormat(data1.amount));

        });
        $("#amount-YK").text("￥" + moneyFormat(data[1].amount));
    });



    $("#accouBtn").click(function() {
        window.location.href = 'quxian.html?accountNumber=' + accountNumber;
    });

    $('#accoutGrantBtn').click(function() {
        window.location.href = './liushui1.html?accountNumber=' + accountNumber + '&tguan=1';
    })

    $('#accoutGrantYKBtn').click(function() {
        window.location.href = './liushui1.html?accountNumber=' + accountNumberYK;
    })


});