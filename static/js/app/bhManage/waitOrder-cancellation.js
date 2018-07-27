$(function() {
    var code = getQueryString('code');
    var cancel = getQueryString('cancel');
    var view = getQueryString('v');


    if(cancel == '1') {
        view = true
    }
    
    
    reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function (item) {
            return {
                level: item.level,
                name: item.name
            };
        });
        
        
        var fields = [{
        field : 'code1',
        title : '订单编号',
        formatter : function (v, data) {
            return data.code
        }
    },{
        field : 'productName',
        title : '产品名称',
    },{
        field : 'amount',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'status',
        title : '订单状态',
        type: 'select',
        formatter: Dict.getNameForList('order_status')

    }, {
        field : 'kind',
        title : '订单类型',
        type: 'select',
        formatter: Dict.getNameForList('order_type')

    }, {
        field: 'realName',
        title: '下单代理',
        formatter : function(v, data) {
            return data.user?data.user.realName : '-'
        }
    },{
        field: 'level',
        title: '下单代理等级',
        formatter : function(v, data) {
            var level = '';
            items.map(function(item) {
                if(item.level == data.user.level) {
                    level = item.name
                }
            })
            return level
        }
    },{
        field : 'signeName',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话'
    }, {
        field : 'applyDatetime',
        title : '下单日期',
        formatter: dateTimeFormat
    }, {
        field : 'remark',
        title : '备注',
        readonly : !cancel,
        required : true
    }];

  var buttons = [{
        title: '确定',
        handler: function() {

            var data = $('#popForm').serializeObject();
            data.code = code;
            data.result = "1";
            data.remark = $('#remark').val();
            data.updater = getUserName();
            reqApi({
                code: '627650',
                json: data
            }).done(function(data) {
                sucDetail();
                dw.close().remove();
            });
        }
    },{
        title: '取消',
        handler: function() {
            dw.close().remove();
        }
    }];

    buildDetail({
        fields: fields,
        code: code,
        view : view,
        buttons : cancel?buttons: null,
        detailCode: '627664',
        addCode: '627920',
        editCode: '627921'
    });
        
      })
    
    
});