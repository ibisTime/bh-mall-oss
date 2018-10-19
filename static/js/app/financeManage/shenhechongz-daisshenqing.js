$(function() {
    let accountNumber = getQueryString('accountNumber');
    var fields = [{
        title: '代理',
        field: 'applyUser',
        required: true,
        type: 'select',
        pageCode: '627325',
        params: {
            noStatusList: ['0', '4']
        },
        keyName: 'userId',
        valueName: 'realName',
        onChange: function(v) {
            usid = v;
            $('#accountNumber').renderDropdown({
                listCode: '627451',
                params: {
                    userId: v,
                    updater: getUserId()
                },
                keyCode1: '627076',
                dict: [
                    ['currency', 'currency']
                ],
                valueName: '{{currencyName.DATA}}',
                keyName: 'accountNumber'
            })
        }
    }, {
        title: '账户',
        field: 'accountNumber',
        required: true,
        type: 'select',
        onChange(v) {
            let data = $('#amount1').renderDropdown({
                listCode: '627452',
                params: {
                    accountNumber: v
                }
            });
            let amount = data.amount / 1000;
            if (amount.toString().indexOf('.') > 0) {
                $('#amount1').text(amount);
            } else {
                $('#amount1').text(amount + '.00');
            }

        }
    }, {
        title: '充值金额',
        field: 'chargeAmount',
        amount: true,
        required: true
    }, {
        title: '打款图片',
        field: 'chargePdf',
        type: 'img',
        required: true
    }, {
        title: '申请人说明',
        field: 'applyNote',
        required: true
    }];

    setTimeout(() => {
        $('#accountNumber').text(accountNumber);
    }, 20);
    buildDetail({
        fields: fields,
        addCode: '627460',
        beforeSubmit: function(data) {
            data.type = 'AJ_CZ';
            data.updater = getUserId();
            // data.amount = parseInt(data.amount)
            return data
        }
    });
});