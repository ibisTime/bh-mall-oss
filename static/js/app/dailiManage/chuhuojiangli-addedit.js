$(function() {
// 代理管理-财务管理-出货奖励
    var userId = getQueryString('userId');
    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'code',
        title : '订单编号',
        search: true
    },{
        field : 'amount',
        title : '订单金额',
        formatter : function (v, data) {
            return moneyFormat(data.orderInformation.amount)
        }
    },{
        field : 'mobile',
        title : '收货人手机号',
        formatter : function (v, data) {
            return data.orderInformation.mobile
        }
    }, {
        field : 'productCode',
        title : '出货产品',
        type: 'select'
    }, {
        field : 'signer',
        title : '收货人',
        formatter : function (v, data) {
            return data.orderInformation.signer
        }
    }, {
        field : 'status',
        title : '订单状态',
        formatter: Dict.getNameForList('order_status')
    }];
    buildList({
        columns: columns,
        pageCode: '627492',
        searchParams: {
            type : '1',
            userId : userId
        }
    });
    $('.search-form').css('display','none');
    $('.toolbar').empty().append('<li style="display:block;" id="exportBtn"><span><img src="/static/images/t01.png"></span>导出</li>')
    // //支出明细
    // $('#outRecordBtn').click(function () {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
    //     if(selRecords[0].outAmount != '0'){
    //         window.location.href = "./chuhuojiangli_addedit.html?out=1&userId="+selRecords[0].userId
    //     }else {
    //         toastr.info('无支出明细')
    //     }
    // });
    //
    // //收入明细
    // $('#inRecordBtn').click(function () {
    //     var selRecords = $('#tableList').bootstrapTable('getSelections');
    //     if (selRecords.length <= 0) {
    //         toastr.info("请选择记录");
    //         return;
    //     }
    //     if(selRecords[0].inAmount != '0'){
    //         window.location.href = "./chuhuojiangli_addedit.html?in=1&userId="+selRecords[0].userId
    //     }else {
    //         toastr.info('无收入明细')
    //     }
    // })
});
