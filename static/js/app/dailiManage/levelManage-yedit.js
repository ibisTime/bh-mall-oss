$(function() {
    var code = getQueryString('code');
    var level = getQueryString('level');
    var name = getQueryString('name');
    var view = getQueryString('v');
    view === '1' ? view = true : view = false;

    var fields = [{
            field: 'name1',
            title: '等级名称',
            readonly: true,
            formatter(v, data) {
                return data.name;
            }
        }, {
            field: 'level1',
            title: '等级',
            search: true,
            type: 'select',
            readonly: true,
            formatter: function(v, data) {
                return data.level
            }
        }, {
            field: 'amount',
            title: '首次授权发货金额',
            amount: true
        }, {
            field: 'minChargeAmount',
            title: '本等级最低充值金额',
            amount: true
        }, {
            field: 'redAmount',
            title: '红线金额',
            amount: true
        }, {
            field: 'minSurplus',
            title: '门槛可有余额',
            amount: true
        },
        /* {
               field: 'isSend',
               title: '授权单是否允许自发',
               data: {
                   0: '否',
                   1: '是'
               },
               type: 'select'
           },  */
        {
            field: 'isWare',
            title: '是否启用云仓',
            data: {
                0: '否',
                1: '是'
            },
            type: 'select'
        }, {
            field: 'updater',
            title: '更新人',
            readonly: true
        }, {
            field: 'remark',
            title: '备注'
        }, {
            field: 'code1',
            type: 'hidden',
            formatter(v, data) {
                return data.code;
            }
        }
    ];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627007',
        editCode: '627000',
        beforeSubmit: function(data) {
            data.level = level;
            data.name = name;
            data.updater = getUserId();
            return data;
        }
    });
});