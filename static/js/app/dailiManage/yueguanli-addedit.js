$(function() {
	var accountNumber = getQueryString('accountNumber');
	var chongzhi = getQueryString('chongzhi');
	var koukuan = getQueryString('koukuan');
    var view = getUrlParam('v');

    // 充值
    var in1 = [{
        field : 'name',
        title : '代理',
        search: true
    },{
        field : 'mobile',
        title : '代理电话',
        search: true
    },{
        field : 'wx',
        title : '代理微信',
        search: true
    },{
        field : 'level',
        title : '代理等级',
        search: true,
        type: 'select'
    },{
        field : 'cvalue',
        title : '代理团队'
    },{
        field : 'amount',
        title : '余额',
        formatter: moneyFormat
    },{
        field : 'applyNote',
        title : '充值说明',
        readonly : false,
        required : true
    },{
        field : 'chargeAmount',
        title : '充值金额',
        readonly : false,
        required : true
    },{
        field : 'chargePdf',
        title : '充值截图',
        readonly : false,
        type : 'img',
        single : true,
        required : true
    }];


    // 扣款
    var out = [{
        field : 'name',
        title : '代理',
        search: true
    },{
        field : 'mobile',
        title : '代理电话',
        search: true
    },{
        field : 'wx',
        title : '代理微信',
        search: true
    },{
        field : 'level',
        title : '代理等级',
        search: true,
        type: 'select'
    },{
        field : 'cvalue',
        title : '代理团队'
    },{
        field : 'amount',
        title : '余额',
        formatter: moneyFormat
    },{
        field : 'applyNote',
        title : '扣款说明',
        readonly : false,
        required : true
    },{
        field : 'chargeAmount',
        title : '扣款金额',
        readonly : false,
        required : true
    },{
        field : 'chargePdf',
        title : '扣款截图',
        readonly : false,
        type : 'img',
        single : true,
        required : true
    }];


    var buttons = [{
        title: '确认',
        handler: function() {
            if ($('#jsForm').valid()) {
                var data = $('#jsForm').serializeObject();
                // console.log($('.center-img-wrap').children('img').attr('src').split('/')[3].split('?')[0]);
                data.chargePdf = $('.center-img-wrap').children('img').attr('src').split('/')[3].split('?')[0];
                data.accountNumber = accountNumber;
                data.chargeAmount *= 1000;
                data.applyUser = getUserId();
                data.accountNumber = accountNumber;
                data.type=chongzhi?'AJ_CZ':'AJ_KK'

                reqApi({
                    code: '627460',
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
});