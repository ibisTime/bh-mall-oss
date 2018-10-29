$(function() {
    // 报货管理-云仓管理-全部订单


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
            title: '订单编号',
            search: true
        }, {
            field: 'productName',
            title: '产品名称',
        }, {
            field: 'quantity',
            title: '购买数量',
            formatter(v, data) {
                return data.quantity;
            }
        }, {
            field: 'specsName',
            title: '产品规格',
        }, {
            field: 'amount',
            title: '付款金额',
            amount: true
        }, {
            field: 'status',
            title: '订单状态',
            search: true,
            type: 'select',
            key: 'out_order_status',
            formatter: Dict.getNameForList('out_order_status')
        }, {
            field: 'kind',
            title: '订单类型',
            search: true,
            type: 'select',
            key: 'out_order_type',
            formatter: Dict.getNameForList('out_order_type')
        }, {
            field: 'keyword',
            title: '下单代理',
            search: true,
            visible: false
        }, {
            field: 'realName',
            title: '下单代理'
        }, {
            field: 'level',
            title: '下单代理等级',
            search: true,
            type: 'select',
            listCode: '627008',
            keyName: 'level',
            valueName: 'name',
            visible: false
        }, {
            field: 'level1',
            title: '下单代理等级',
            formatter: function(v, data) {
                var level = '';
                items.map(function(item) {
                    if (item.level == data.level) {
                        level = item.name
                    }
                })
                return level
            }
        }, {
            field: 'highUserName',
            title: '上级代理'
        }, {
            field: 'teamLeader',
            title: '团队长名称'
        }, {
            field: 'teamName',
            title: '团队名称',
            search: true,
            formatter: function(v, data) {
                return data.teamName
            }
        }, {
            field: 'signer',
            title: '收货人'
        }, {
            field: 'mobile',
            title: '收货人电话'
        }, {
            field: 'applyDatetime',
            title: '下单日期',
            formatter: dateTimeFormat,
            field1: 'dateStart',
            title1: '下单日期',
            type: 'datetime',
            field2: 'dateEnd',
            twoDate: true
        }, {
            field: 'remark',
            title: '备注'
        }, {
            field: 'keyword',
            title: '产品名称',
            visible: false
        }, {
            field: 'impowerDatetime',
            title: '日期',
            formatter: dateTimeFormat,
            field1: 'dateStart',
            title1: '日期',
            field2: 'dateEnd',
            twoDate: true,
            search: true,
            visible: false
        }];
        buildList({
            columns: columns,
            pageCode: '627662',
            searchParams: {
                toUserId: getUserId()
            }
        });
        // 物流信息
        $("#wuliuBtn").off("click").click(function() {
            var e = $("#tableList").bootstrapTable("getSelections");
            return e.length <= 0 ? void toastr.info("请选择记录") : void("3" == e[0].status || "4" == e[0].status ? window.location.href = "./wuliu.html?v=1&code=" + e[0].code : toastr.info("只有待收货和已收货的订单可以查看物流"))
        })

        // 订单作废
        $('#cancellationBtn').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            if (selRecords[0].status == '0' || selRecords[0].status == '1') {
                window.location.href = './waitOrder_cancellation.html?cancel=1&code=' + selRecords[0].code
            } else {
                toastr.info('该状态下不能订单作废')
            }
        });

    })


});