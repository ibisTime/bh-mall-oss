$(function() {
	var code = getQueryString('code');
	var view = getQueryString('v');

    var fields = [{
        field : 'productName',
        title : '产品名称'
    },{
        field : 'type',
        title : '变动类型',
        type : 'select',
        key : 'product_log_type',
        formatter : Dict.getNameForList('product_log_type')
    }, {
        field : 'tranCount',
        title : '变动库存'
    }, {
        field : 'preCount',
        title : '变动前库存',
        formatter : function (v, data) {
            return data.preCount
        }
    }, {
        field : 'postCount',
        title : '变动后库存'
    }, {
        field : 'updateDatetime',
        title : '变动时间',
        formatter: dateTimeFormat
    }, {
        field : 'updater',
        title : '操作人',
    }, {
        field : 'remark',
        title : '备注'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
        view : view,
		detailCode: '627612'
	});
	
});