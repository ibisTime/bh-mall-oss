$(function() {
	var code = getQueryString('code');
    var view = true;
    var fields = [{
        field : 'loginName',
        title : '姓名',
        readonly : view
    },{
        field : 'level',
        title : '等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
    }, {
        field : 'updateDatetime',
        title : '余额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '上级'
    }, {
        field : 'updateDatetime',
        title : '上级电话'
    },{
        field : 'updateDatetime',
        title : '团队名称'
    }, {
        field : 'updateDatetime',
        title : '关联管理员'
    }, {
        field : 'updateDatetime',
        title : '推荐人'
    }, {
        field : 'updateDatetime',
        title : '推荐人电话'
    }, {
        field : 'updateDatetime',
        title : '授权状态'
    },  {
        field : 'updateDatetime',
        title : '状态时间',
        formatter: dateTimeFormat
    }];
	
	buildDetail({
		fields: fields,
        view : view,
		code: {
		    userId : code
        },
		detailCode: '627357',
		addCode: '627920',
		editCode: '627921'
	});
	
});