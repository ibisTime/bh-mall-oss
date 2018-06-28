$(function() {
	var level = getQueryString('level');
	var view = getQueryString('v') || false;
    var fields = [{
        field : 'name',
        title : '等级名称',
		required : true
    }, {
        field : 'amount',
        title : '首次授权发货金额',
        amount: true,
        required : true
    }, {
        field : 'minChargeAmount',
        title : '本等级最低充值金额',
        amount: true,
        required : true
    }, {
        field : 'redAmount',
        title : '红线金额',
        amount: true,
        required : true
    }, {
        field: 'minSurplus',
        title: '门槛可有余额',
        amount: true,
        required : true
    }, {
        field: 'isSend',
        title: '授权单是否允许自发',
        data: {
            0: '否',
            1: '是'
        },
        type: 'select',
        required : true
    }, {
        field: 'isWareHouse',
        title: '是否启用云仓',
        data: {
            0: '否',
            1: '是'
        },
        type: 'select',
        required : true
    }, {
        field : 'remark',
        title : '备注'
    }];
	
	buildDetail({
		fields: fields,
		view : view,
		code: {
			level : level
		},
		detailCode: '627007',
		editCode: '627002',
		beforeSubmit : function (data) {
			data.level = level;
			data.updater = getUserName();
			return data;
        }
	});
	
});