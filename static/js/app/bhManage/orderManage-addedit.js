$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var select = { '1': '是', '0': '否' };
    var level = [];


    var fields = [{
            field: 'code1',
            title: '订单编号',
            formatter: function(v, data) {
                return data.code
            }
        }, {
            field: 'applyDatetime',
            title: '下单日期',
            formatter: dateTimeFormat
        }, {
            field: 'payAmount',
            title: '付款金额',
            amount: true,
            formatter: moneyFormat
        }, {
            field: 'yunfei',
            title: '运费',
            formatter(v, d) {
                if (d.yunfei) {
                    return moneyFormat(d.yunfei);
                }
                return 0;
            },
        },
        {
            field: 'status',
            title: '订单状态',
            type: 'select',
            formatter: Dict.getNameForList('inner_order_status')
        },
        {
            field: 'realName',
            title: '下单代理'
        },
        {
            field: 'level',
            title: '下单代理等级',
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name'
        },
        {
            field: 'signer',
            title: '收货人'
        },
        {
            field: 'mobile',
            title: '收货人电话'
        },
        {
            field: 'address1',
            title: '收货地址',
            formatter: function(v, data) {
                let ress = data.area ? data.province + ' ' + data.city + ' ' + data.area :
                    data.city ? data.province + ' ' + data.city : data.province ? data.province : '-';
                ress += ' ' + data.address
                return ress;
            }
        },
        {
            field: 'remark',
            title: '备注'
        }
    ];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627733',
    });
    hideLoading();
});