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
});
