$(function() {
	var code = getQueryString('code');
    var view = true;
    var fields = [{
        field : 'name',
        title : '姓名',
        readonly : view
    },{
        field : 'cvalue',
        title : '等级'
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
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});