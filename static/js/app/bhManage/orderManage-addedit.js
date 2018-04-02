$(function() {
	var code = getQueryString('code');
	var view = getQueryString('v');
	var select = {'1':'是','0':'否'};
	var level = [];


    var fields = [
        {
            field : 'code1',
            title : '订单编号',
            formatter : function (v, data) {
                return data.code
            }
        },{
            field : 'applyDatetime',
            title : '下单日期',
            formatter: dateTimeFormat
        }, {
            field : 'payAmount',
            title : '付款金额',
            formatter: moneyFormat
        }, {
            field : 'updateDatetime',
            title : '订单状态',
            search: true,
            type: 'select'
        }, {
            field : 'orderType',
            title : '订单类型',
            search: true,
            type: 'select'
        }, {
            field : 'updateDatetime2',
            title : '下单代理'
        }, {
            field : 'updateDatetime3',
            title : '下单代理等级'
        }, {
            field : 'signer',
            title : '收货人'
        }, {
            field : 'mobile',
            title : '收货人电话'
        }, {
            field : 'remark',
            title : '备注'
        }];

    buildDetail({
        fields: fields,
        code: code,
        view : view,
        detailCode: '627733',
    });
    hideLoading();
});