$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'name',
        title : '名称',
        required : true
    }, {
        field : 'price',
        title : '价格',
        formatter: moneyFormat,
        required : true
    },{
        field : 'quantity',
        title : '数量',
        required : true
    },{
        field : 'advPic',
        title : '广告图',
        single : true,
        type : 'img',
        required : true
    },{
        field : 'pic',
        title : '缩略图',
        type : 'img',
        required : true
    },{
        field : 'slogan',
        title : '广告语',
        required : true
    },{
        field : 'remark',
        title : '备注'
    }];

    var edit = [{
        field : 'name',
        title : '名称',
        required : true
    }, {
        field : 'price',
        title : '价格',
        formatter: moneyFormat,
        required : true
    },{
        field : 'quantity',
        title : '数量',
        required : true
    },{
        field : 'isFree',
        title : '是否包邮',
        required : true,
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'advPic',
        title : '广告图',
        single : true,
        type : 'img',
        required : true
    },{
        field : 'pic',
        title : '缩略图',
        type : 'img',
        required : true
    },{
        field : 'slogan',
        title : '广告语',
        required : true
    },{
        field : 'remark',
        title : '备注'
    }];
	
	buildDetail({
		fields: code?edit:fields,
		code: code,
		detailCode: '627712',
		addCode: '627700',
		editCode: '627701',
        beforeSubmit : function (data) {
            data.updater = getUserName();
            data.price *=1000;
            return data
        }
	});
	hideLoading();
});