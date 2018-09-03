$(function() {
    // 代理管理-财务管理-出货奖励
    var userId = getQueryString('userId');
    var in1 = getQueryString('in');
    var bizType = getQueryString('bizType');
    var refNo = getQueryString('refNo');
    var kind = in1 != null ? '1' : '0';

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
        formatter: function(v, data) {
            return data.code;
        }
    }, {
        field: 'amount',
        title: '订单金额',
        amount: true
    }, {
        field: 'productName',
        title: '出货产品'
    }, {
        field: 'specsName',
        title: '产品规格'
    }, {
        field: 'signer',
        title: '收货人'
    }, {
        field: 'mobile',
        title: '收货人手机号'
    }, {
        field: 'diyu',
        title: '收货地址',
        formatter: function(v, data) {
            return data.area ? data.province + ' ' + data.city + ' ' + data.area :
                data.city ? data.province + ' ' + data.city :
                data.province ? data.province : '-'

        }
    }, {
        field: 'status',
        title: '订单状态',
        key: 'in_order_status',
        formatter: in1 ? Dict.getNameForList('in_order_status') : Dict.getNameForList('out_order_status')
    }];
    buildList({
        columns: columns,
        pageCode: '627496',
        searchParams: {
            bizType,
            userId: userId,
            kind: kind,
            type: 'B',
            refNo
        }
    });
    $('.search-form').css('display', 'none');
    $('.toolbar').empty().append('<li style="display:block;" id="exportBtn"><span><img src="/static/images/t01.png"></span>导出</li>');
    $('#exportBtn').click(function() {
        $('.export .btn').click();
    });
});