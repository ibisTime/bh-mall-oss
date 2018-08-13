$(function() {
    // 报货管理-云仓管理-产品列表
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号'
    }, {
        field: 'productName',
        title: '产品'
    }, {
        field: 'quantity',
        title: '数量'
    }, {
        field: 'amount',
        title: '订单金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '订单状态',
        search: true,
        type: 'select',
        key: 'in_order_status',
        valueName: 'name',
        formatter: Dict.getNameForList("in_order_status")
    }, {
        field: 'realName',
        title: '下单代理'
    }, {
        field: 'level',
        title: '下单代理等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
    }, {
        field: 'toUserName',
        title: '上级代理'
    }, {
        field: 'leaderName',
        title: '团队长'
    }, {
        field: 'applyDatetime',
        title: '下单时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '下单时间',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        type: 'datetime'
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '627915',
        searchParams: {
            level: '1'
        }
    });

    //审核取消
    $('#shenheqxBtn').off('click').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./yuncangguanli_shenheqx.html?code=" + selRecords[0].code;

    });

});