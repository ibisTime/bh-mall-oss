$(function() {
	var code = getQueryString('code');
	var userId = getQueryString('userId');
    var fields = [{
        field : 'kind',
        title : '类型',
        value : 'B',
        hidden : true
    },{
        field : 'mobile',
        title : '手机号',
        mobile : true,
        required : true
    }, {
        field : 'loginPwd',
        title : '登录密码',
        required : true
    }, {
        field : 'fromInfo',
        title : '意向来源'
    }];

	buildDetail({
		fields: fields,
        addCode: '627312'
	});
	hideLoading();
});