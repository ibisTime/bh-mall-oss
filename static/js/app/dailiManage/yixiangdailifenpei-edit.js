$(function() {
	var code = getQueryString('code');
	var userId = getQueryString('userId');
	var view = getQueryString('v');
    view = view == '0'? false : true;

    var edit1 = [{
        field : 'userId',
        title : '用户编号',
        value : userId,
        type : 'hidden'
    },{
        field : 'loginName',
        title : '登录名',
        readonly : true,
        required :true
    },{
        field : 'nickname',
        title : '昵称',
        required :true
    },{
        field : 'level',
        title : '等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
        required :true
    },{
        field : 'mobile',
        title : '联系电话',
        required :true
    }, {
        field : 'wxId',
        title : '微信号',
        required :true
    },{
        field : 'quyu',
        title : '区域',
        type : 'citySelect',
        required :true
    },{
        field : 'address',
        title : '详细地址',
        type : 'doubleLine',
        required :true
    }];



	buildDetail({
		fields: edit1,
        view : view,
		code: {
		    userId : userId
        },
		detailCode: '627357',
		editCode: '627255',
        beforeEdit : function (data) {
            data.userId = userId;
            return data;
        }
	});
	hideLoading();
});