$(function() {
    // 代理管理-财务管理-出货奖励
    var userId = getQueryString('userId');
    var in1 = getQueryString('in');
    var bizType = getQueryString('bizType');
    var kind = in1 != null ? '1' : '0';

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '订单编号',
        search: true
    }, {
        field: 'amount1',
        title: '订单金额',
        formatter: function(v, data) {
            if (data.inOrder) {
                return moneyFormat(data.inOrder.amount);
            }
            return moneyFormat(data.outOrder.amount);
        }
    }, {
        field: 'productCode',
        title: '出货产品',
        formatter: function(v, data) {
            if (data.inOrder) {
                return data.inOrder.productName
            }
            return data.outOrder.productName
        }
    }, {
        field: 'specsName',
        title: '产品规格',
        formatter: function(v, data) {
            if (data.inOrder) {
                return data.inOrder.specsName
            }
            return data.outOrder.specsName
        }
    }, {
        field: 'signer1',
        title: '收货人',
        formatter: function(v, data) {
            if (data.inOrder) {
                return data.inOrder.signer
            }
            return data.outOrder.signer
        }
    }, {
        field: 'mobile1',
        title: '收货人手机号',
        formatter: function(v, data) {
            if (data.inOrder) {
                return data.inOrder.mobile
            }
            return data.outOrder.mobile
        }
    }, {
        field: 'diyu',
        title: '收货地址',
        formatter: function(v, data) {
            if (data.inOrder) {
                return data.inOrder.area ? data.inOrder.province + ' ' + data.inOrder.city + ' ' + data.inOrder.area :
                    data.inOrder.city ? data.inOrder.province + ' ' + data.inOrder.city :
                    data.inOrder.province ? data.inOrder.province : '-'
            }
            return data.outOrder.area ? data.outOrder.province + ' ' + data.outOrder.city + ' ' + data.outOrder.area :
                data.outOrder.city ? data.outOrder.province + ' ' + data.outOrder.city :
                data.outOrder.province ? data.outOrder.province : '-'

        }
    }, {
        field: 'status',
        title: '订单状态',
        key: 'in_order_status',
        formatter: in1 ? Dict.getNameForList('in_order_status') : Dict.getNameForList('out_order_status')
    }];
    buildList({
        columns: columns,
        pageCode: '627492',
        searchParams: {
            bizType: bizType,
            userId: userId,
            kind: kind,
            type: 'B'
        }
    });
    $('.search-form').css('display', 'none');
    $('.toolbar').empty().append('<li style="display:block;" id="exportBtn"><span><img src="/static/images/t01.png"></span>导出</li>')
});