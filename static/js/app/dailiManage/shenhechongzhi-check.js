$(function() {
	var code = getQueryString('code');
	var view = getQueryString('v') || true;
    var fields = [{
        field : 'code1',
        title : '编号',
        formatter : function (v, data) {
            return data.code
        }
    },{
        field : 'cvalue1',
        title : '充值人',
        formatter : function (v, data) {
            return data.user?data.user.loginName:'-'
        }
    }, {
        field : 'cvalue',
        title : '充值人团队',
        formatter : function(v, data) {
        	return data.user?data.user.teamName : '-'
        }
    },{
        field : 'amount',
        title : '金额',
        formatter: moneyFormat
    },{
        field : 'applyDatetime',
        title : '申请时间',
        formatter: dateTimeFormat
    }, {
        field : 'status',
        title : '状态',
        search: true,
        type: 'select',
        key : 'charge_status',
        formatter : Dict.getNameForList('charge_status')
    },{
        field : 'payNote',
        title : '理由',
        readonly : false,
        required : true
    } ];

    var buttons = [{
        title: '通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                var codeList = [];
                codeList.push(code);
                data.payUser = getUserId();
                data.payResult = '1';
                data.codeList = codeList;
                // data.approveNote = $('#approveNote').val();
                reqApi({
                    code: '627461',
                    json: data
                }).done(function() {
                    sucDetail();
                });
            }
        }
    }, {
        title: '不通过',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                var codeList = [];
                codeList.push(code);
                data.payUser = getUserId();
                data.payResult = '0';
                data.codeList = codeList;
                // data.approveNote = $('#approveNote').val();
                reqApi({
                    code: '627461',
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
		code: code,
        buttons : buttons,
		detailCode: '627472'
	});
	hideLoading();
});