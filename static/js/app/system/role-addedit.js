$(function() {
	var code = getQueryString('code');
	
	var fields = [{
		field: 'kind',
		type: 'hidden',
		value: '1'
	}, {
		field: 'updater',
		type: 'hidden',
		value: getUserName()
	}, {
		title: '角色名称',
		field: 'name',
		required: true,
		maxlength: 30
	},
		{
		title: '角色等级',
		field: 'level',
		required: true,
		type: 'select',
		key: 'role_level',
        keyCode:'627956'
	},
		{
		title: '备注',
		field: 'remark',
		maxlength: 250
	}];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
    hideLoading();
});