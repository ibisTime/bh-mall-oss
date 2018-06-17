$(function() {
	// 实际上是审核升级的审核页面
	var code = getQueryString('code');
    var userId = getQueryString('userId');
    console.log(window.location.href);
    console.log(userId);
	var view = true;
    var fields = [{
        field : 'realName',
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
        field : 'wxId',
        title : '微信号'
    }, {
        field : 'highUserName',
        title : '上级',
        formatter : function(v, data) {
			return data.highUser?data.highUser.realName : '-'
		}
    }, {
        field : 'teamName',
        title : '团队名称'
    },{
        field : 'diyu',
        title : '地域',
        formatter : function (v, data) {
            return data.area?data.province+' '+data.city+' '+data.area
                        :data.city?data.province+' '+data.city
                            :data.province?data.province : '-'
        }
    }, {
        field : 'applyDatetime',
        title : '申请时间',
        formatter: dateTimeFormat
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
                    code: '627258',
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
                    code: '627258',
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