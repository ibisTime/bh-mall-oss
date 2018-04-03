$(function() {
	// 实际上是审核授权的审核页面
	var code = getQueryString('code');
	var userId = getQueryString('userId');
	var view = true;
    var fields = [{
        field : 'loginName',
        title : '姓名'
    },{
        field : 'level',
        title : '等级',
        search: true,
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
    }, {
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '上级'
    }, {
        field : 'updateDatetime',
        title : '团队名称'
    }, {
        field : 'sqAmount',
        title : '授权金额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '地域'
    }, {
        field : 'approveDatetime',
        title : '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    },{
    	field : 'remark',
		title : '备注',
		readonly : false
	}];


    var buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.approver = getUserName();
                data.result = '1';
                data.userId = userId;
                data.remark = $('#remark').val();
                reqApi({
                    code: '627257',
                    json: data
                }).done(function(data) {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                data.approver = getUserName();
                data.result = '0';
                data.userId = userId;
                data.remark = $('#remark').val();
                reqApi({
                    code: '627257',
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
		fields: fields,
		view : view,
		buttons : buttons,
		code: {
			userId : userId
		},
		detailCode: '627357',
		addCode: '627920',
		editCode: '627921'
	});
	hideLoading();
});