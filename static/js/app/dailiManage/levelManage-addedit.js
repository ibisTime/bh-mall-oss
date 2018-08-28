$(function() {
    var code = getQueryString('code');
    var name = getQueryString('name');
    var level = getQueryString('level');
    var view = getQueryString('v') || false;
    var fields = [{
            field: 'name',
            title: '等级名称',
            required: true,
            formatter(v, data) {
                return data.name;
            }

        }, {
            field: 'amount',
            title: '首次授权发货金额',
            formatter: moneyFormat,
            required: true
        }, {
            field: 'minChargeAmount',
            title: '本等级最低充值金额',
            formatter: moneyFormat
        }, {
            field: 'redAmount',
            title: '红线金额',
            formatter: moneyFormat
        }, {
            field: 'minSurplus',
            title: '门槛可有余额',
            formatter: moneyFormat
        },
        /* {
               field: 'isSend',
               title: '授权单是否允许自发',
               data: {
                   0: '否',
                   1: '是'
               },
               type: 'select',
               required: true
           },  */
        {
            field: 'isWare',
            title: '是否启用云仓',
            data: {
                0: '否',
                1: '是'
            },
            type: 'select',
            required: true
        }, {
            field: 'remark',
            title: '备注'
        }
    ];

    buildDetail({
        fields: fields,
        view: view,
        code: code,
        detailCode: '627007',
        editCode: '627002',
        beforeSubmit: function(data) {
            data.updater = getUserId();
            data.level = level;
            data.name = name;
            return data;
        }
    });

});