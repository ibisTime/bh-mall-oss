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
        formatter: moneyFormat,
        required : true
    }, {
        field : 'minChargeAmount',
        title : '本等级最低充值金额',
        formatter: moneyFormat,
        required : true
    }, {
        field : 'redAmount',
        title : '红线金额',
        formatter: moneyFormat,
        required : true
    },  {
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
			data.amount *= 1000;
			data.minChargeAmount *= 1000;
			data.redAmount *= 1000;
			return data;
        }
	});
	
});