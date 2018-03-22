$(function() {
	var code = getQueryString('code');

    var columns = [{
        field : 'name',
        title : '姓名'
    },{
        field : 'level',
        title : '等级'
    }, {
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '地域'
    }, {
        field : 'updateDatetime',
        title : '代理状态'
    }, {
        field : 'updateDatetime',
        title : '来源'
    }, {
        field : 'updateDatetime',
        title : '申请时间',
        formatter: dateTimeFormat
    }, {
        field : 'remark',
        title : '备注'
    }, {
        field: 'reason',
        title: '忽略理由',
        maxlength: 250,
        required: true
    }];
    // 接口还没有
    options.buttons = [{
        title: '确认',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = {};
                data['userId'] = userId;
                data["reason"] = $("#reason").val();
                reqApi({
                    code: "805195",
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '返回',
        handler: function() {
            goBack();
        }
    }];
	buildDetail({
		fields: columns,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});