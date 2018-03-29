$(function() {
	var level = getQueryString('level');
	var view = getQueryString('v') || false;
    var fields = [{
        field : 'code1',
        title : '编号',
        formatter : function (v, data) {
            return data.code
        }
    },{
        field : 'cvalue',
        title : '充值人',
        search: true,
        type: 'select'
    }, {
        field : 'cvalue',
        title : '充值人团队'
    },{
        field : 'amount',
        title : '金额',
        formatter: moneyFormat
    },{
        field : 'updateDatetime',
        title : '申请时间',
        formatter: dateTimeFormat
    }, {
        field : 'status',
        title : '状态',
        search: true,
        type: 'select'
    }, {
        field : 'cvalue',
        title : '审核人'
    }, {
        field : 'cvalue',
        title : '审核时间',
        formatter: dateTimeFormat
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