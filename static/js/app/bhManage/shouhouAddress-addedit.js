$(function() {
	var code = getQueryString('code');
	
//	var type = {};
//	Dict.getName('address_type').map(function(item) {
//		var key = item.dkey;
//		var value = item.dvalue;
//		item = {};
//		type[key] = value;
//	})

//	console.log(type);
    var fields = [{
        field : 'quyu',
        title : '区域',
        required: true,
        type : 'citySelect'
    }, {
        field : 'address',
        title : '具体地址',
        required: true
    }, {
        field : 'receiver',
        title : '收货人',
        required: true
    }, {
        field : 'mobile',
        title : '收货人电话',
        required: true
    }, {
        field : 'isDefault',
        title : '是否默认地址',
        type : 'select',
        data : {0:'否',1:'是'},
        required: true
    }, {
        field : 'type',
        title : '类型',
        value : '2',
        hidden : true
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627412',
		addCode: '627400',
		editCode: '627401',
		beforeSubmit : function(data) {
			data.userId = getUserId();
			return data
		}
	});
	hideLoading();
});