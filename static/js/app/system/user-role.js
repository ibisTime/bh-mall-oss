$(function() {
	
	var userId = getQueryString('userId');
	
	var fields = [{
		field: 'userId',
		type: 'hidden',
		value: userId
	}, {
		title: '用户名',
		field: 'loginName',
		required: true,
		readonly: true
	}, {
		title: '角色编号',
		field: 'roleCode',
		type: 'select',
		required: true,
		pageCode: '627046',
		keyName: 'code',
		valueName: 'name'
	}, {
		title: '备注',
		field: 'remark',
		maxlength: 250
	}];
	
	buildDetail({
		fields: fields,
		code: {userId:userId},
		detailCode: '627357',
		editCode: '627311'
	});
	
	
});