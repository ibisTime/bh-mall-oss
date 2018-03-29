$(function() {
	var code = getQueryString('code');
	var view = getQueryString('v');
	var select = {'1':'是','0':'否'};
	var level = [];


    var fields = [
        {
            field : 'code',
            title : '订单编号'
        },{
            field : 'cvalue',
            title : '下单日期',
            formatter: dateTimeFormat
        }, {
            field : 'fkAmount',
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
        }, {
            field : 'updateDatetime5',
            title : '团队',
            search: true,
            type: 'select',
            visible: false
        }, {
            field : 'updateDatetime6',
            title : '订单所在人',
            search: true,
            type: 'select',
            visible: false
        }];

    buildDetail({
        fields: fields,
        code: code,
        view : view,
        detailCode: '627730',
        beforeDetail : function (data) {
            delete data.id;
            return data;
        }
    });
    hideLoading();
});