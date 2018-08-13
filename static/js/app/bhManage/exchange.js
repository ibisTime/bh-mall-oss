$(function() {
    // 报货管理-云仓管理-置换单


    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });

        var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'code',
            title: '订单编号'
        }, {
            field: 'productName',
            title: '产品名称'
        }, {
            field: 'quantity',
            title: '数量'
        }, {
            field: 'amount',
            title: '付款金额',
            formatter: moneyFormat
        }, {
            field: 'changeProductName',
            title: '置换产品',
            formatter: moneyFormat
        }, {
            field: 'canChangeQuantity',
            title: '置换数量',
            formatter: moneyFormat
        }, {
            field: 'changePrice',
            title: '换货价',
            formatter: moneyFormat
        }, {
            field: 'realName',
            title: '下单代理',
            formatter: function(v, data) {
                return data.agent ? data.agent.realName : '-'
            }
        }, {
            field: 'level',
            title: '下单代理等级',
            search: true,
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name',
            visible: false
        }, {
            field: 'status',
            title: '订单状态',
            search: true,
            type: 'select',
            key: 'change_product_status',
            formatter: Dict.getNameForList('change_product_status')
        }, {
            field: 'applyDatetime',
            title: '下单日期',
            formatter: dateTimeFormat
        }, {
            field: 'approveName',
            title: '审核人'
        }, {
            field: 'approveNote',
            title: '审核备注'
        }];
        buildList({
            columns: columns,
            searchParams: {
                status: 0
            },
            pageCode: '627800'
        });

        $('#checkBtn').off('click').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }

            if (selRecords[0].status == '0') {
                window.location.href = "./exchange_check.html?v=1&code=" + selRecords[0].code;
            } else {
                toastr.info('该状态下不可进行审核');
            }

        })


    })

});