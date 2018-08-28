$(function() {
    let usid = '';
    var fields = [{
        title: '代理',
        field: 'applyUser',
        required: true,
        type: 'select',
        listCode: '627326',
        params: {
            status: '8'
        },
        keyName: 'userId',
        valueName: '{{realName.DATA}} - {{mobile.DATA}}',
        onChange: function(v) {
            usid = v;
            $('#accountNumber').renderDropdown({
                listCode: '627451',
                params: {
                    userId: v,
                    updater: getUserId(),
                    currencyList: ['C_CNY', 'TX_CNY']
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
        title: '账户余额',
        field: 'amount1',
        required: true,
        readonly: true
    }, {
        title: '取现金额',
        field: 'amount',
        amount: true,
        required: true
    }, {
        title: '支付渠道账号信息（如开户支行）',
        field: 'payCardInfo',
        required: true
    }, {
        title: '支付渠道账号（如银行卡号）',
        field: 'payCardNo',
        required: true,
    }, {
        title: '申请说明',
        field: 'applyNote',
        required: true
    }];

    buildDetail({
        fields: fields,
        addCode: '627501',
        beforeSubmit: function(data) {
            data.updater = getUserId();
            // data.amount = parseInt(data.amount)
            return data
        }
    });
});