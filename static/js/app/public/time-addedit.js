$(function() {
	var code;
	reqApi({
		code: '627087',
		json: {
			ckey: 'service_time'
		},
		sync: true
	}).then(function(data) {
		code = data.id;
	});
	var view = !!getQueryString('v');
	
	var fields = [{
		field: 'remark',
		type: 'hidden',
		value: '服务时间'
	},{
		title: '内容',
		field: 'cvalue',
		type: 'textarea',
		required: true
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		editCode: '627081',
		detailCode: '627086',
		buttons: [{
			title: '保存',
			handler: function() {
				if ($('#jsForm').valid()) {
					var data = $('#jsForm').serializeObject();
					data['id'] = data['code'];
					reqApi({
						code: '627081',
						json: data
					}).done(function(data) {
						toastr.success('操作成功');
					});
				}
			}
		}]
	});
});