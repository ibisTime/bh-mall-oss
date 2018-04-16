$(function() {
	var code = getQueryString('code');
    var view = true;
    var fields = [{
        field : 'level',
        title : '代理等级',
        type : 'select',
        listCode: '627006',
        keyName : 'level',
        searchName :'level',
        valueName: 'name',
        readonly: view
    },{
        field : 'productName',
        title : '产品',
        readonly: view
    }, {
        field : 'value1',
        title : '直推奖励',

        required : true
    }, {
        field : 'value2',
        title : '间推奖励',

    }, {
        field : 'value3',
        title : '次推奖励',

    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627592',
		editCode: '627580',
        // beforeSubmit : function (data) {
        //     data.value1?data.value1*=1000:'';
        //     data.value2?data.value2*=1000:'';
        //     data.value3?data.value3*=1000:'';
        //     return data;
        // }
	});
	
});