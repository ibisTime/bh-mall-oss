$(function() {
// 报货管理-售后管理-售后地址

	var userId = getUserId();
	
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'type',
		title : '类型',
		type : 'select',
		key : 'address_type',
		formatter : Dict.getNameForList('address_type')
	},{
		field : 'province',
		title : '省'
	}, {
        field : 'city',
        title : '市'
    }, {
        field : 'area',
        title : '区'
    }, {
        field : 'address',
        title : '具体地址'
    }, {
        field : 'receiver',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话',
        mobile : true
    }, {
        field : 'isDefault',
        title : '是否默认地址',
        type : 'select',
        data : {'0':'否','1':'是'},
        required: true
    }];
	buildList({
		columns: columns,
		pageCode: '627411',
		searchParams: {
		 	userId : userId,
		 	type : '2'
		}
	});
});
