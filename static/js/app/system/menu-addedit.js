$(function() {
	
	var code = getQueryString('code');
	
	var fields = [{
		field : 'parentCode',
		title : '父菜单编号',
		type : 'select',
		// listCode: '805001',
		listCode: '627917',
		params: {
			type: '1',
			roleCode: sessionStorage.getItem('roleCode')
		},
		keyName: 'code',
		valueName: '{{code.DATA}} {{name.DATA}}',
		required: true
	}, {
		field: 'name',
		title: '菜单名称',
		required: true,
		maxlength: 32
	}, {
		field: 'url',
		title: '菜单地址',
		required: true,
		maxlength: 64
	}, {
		field: 'type',
		title: '类型',
		required: true,
		type: 'select',
		data: {'1': '菜单', '2': '按钮'}
	}, {
		field: 'orderNo',
		title: '菜单顺序号',
		required: true,
		number: true
	}, {
		field: 'remark',
		title: '备注',
		maxlength: 250
	}
	// , {
     //    field: 'hhh',
     //    title: '备注',
     //    maxlength: 250,
	// 	type: 'img',
     //    required: true,
     //    single: true,
     //    readonly: false
	// }
	];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627902',
		addCode: '627903',
		editCode: '627905'
	});
	hideLoading();
});