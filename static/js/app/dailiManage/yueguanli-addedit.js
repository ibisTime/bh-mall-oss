$(function() {
	var accountNumber = getQueryString('accountNumber');
	var chongzhi = getQueryString('chongzhi');
	var koukuan = getQueryString('koukuan');
    var view = getUrlParam('v');



reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function(item){
            return {
                level: item.level,
                name: item.name
            };
        });
        
        
        // 充值
    var in1 = [{
        field : 'realName',
        title : '代理'
    },{
        field : 'mobile',
        title : '代理电话',
        formatter : function(v, data) {
			return data.user?data.user.mobile : '-'
		}
    },{
        field : 'wxId',
        title : '代理微信',
        formatter : function(v, data) {
			return data.user?data.user.wxId : '-'
		}
    },{
        field : 'level',
        title : '代理等级',
        type: 'select',
		formatter : function(v, data) {
			var level = ''
			items.map(function(item) {
				if(item.level == data.user.level) {
					level =  item.name
				}
			})
			return level
		}
    },{
        field : 'cvalue',
        title : '代理团队',
        formatter : function(v, data) {
			return data.user?data.user.teamName : '-'
		}
    },{
        field : 'amount',
        title : '余额',
        formatter: moneyFormat
    },{
        field : 'changeAmount',
        title : '充值金额',
        readonly : false,
        required : true,
        number: true
    },{
        field : 'remark',
        title : '备注',
        readonly : false,
        required : true
    }];


    // 扣款
    var out = [{
        field : 'realName',
        title : '代理'
    },{
        field : 'mobile',
        title : '代理电话',
        formatter : function(v, data) {
			return data.user?data.user.mobile : '-'
		}
    },{
        field : 'wxId',
        title : '代理微信',
        formatter : function(v, data) {
			return data.user?data.user.wxId : '-'
		}
    },{
        field : 'level',
        title : '代理等级',
        type: 'select',
		formatter : function(v, data) {
			var level = ''
			items.map(function(item) {
				if(item.level == data.user.level) {
					level =  item.name
				}
			})
			return level
		}
    },{
        
        field : 'cvalue',
        title : '代理团队',
        formatter : function(v, data) {
			return data.user?data.user.teamName : '-'
		}
    },{
        field : 'amount',
        title : '余额',
        formatter: moneyFormat
    },{
        field : 'changeAmount',
        title : '扣款金额',
        readonly : false,
        required : true,
        number: true
    },{
        field : 'remark',
        title : '备注',
        readonly : false,
        required : true
    }];


    var buttons = [{
        title: '确认',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                // console.log($('.center-img-wrap').children('img').attr('src').split('/')[3].split('?')[0]);
                data.accountNumber = accountNumber;
                data.changeAmount *= 1000;
                data.changeAmount = chongzhi ? data.changeAmount : 0-(+data.changeAmount)
                reqApi({
                    code: '627454',
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
        fields: chongzhi? in1 : out ,
        buttons : buttons,
        view : view,
        code: {
            accountNumber : accountNumber
        },
        detailCode: '627452',
        addCode: '627920',
        editCode: '627921'
    });

    hideLoading();
        
        
        
      })
    
});