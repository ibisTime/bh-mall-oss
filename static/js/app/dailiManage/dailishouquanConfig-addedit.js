$(function() {
    var code = getQueryString('code');
	var level = getQueryString('level');
	var view = getQueryString('v');
	view === '1'?view=true:view=false;

    var fields = [{
        field : 'level',
        title : '等级名称',
        type: 'select',
        listCode: '627006',
        keyName : 'level',
        searchName :'level',
        valueName: 'name',
        readonly : true
    },{
        field : 'level1',
        title : '等级',
        search: true,
        type: 'select',
        readonly : true,
        formatter : function (v, data) {
            return data.level
        }
    },{
        field : 'isIntent',
        title : '本等级是否可被意向',
        required : true,
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'isIntro',
        title : '本等级是否可被介绍',
        required : true,
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'isRealName',
        title : '本等级是否需要实名',
        required : true,
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'isCompanyImpower',
        title : '本等级是否公司审核',
        required : true,
        type : 'select',
        data : {'1':'是','0':'否'}
    },
    //     {
    //     field : 'impowerAmount',
    //     title : '本等级授权首单总额',
    //     required : true,
    //     formatter: moneyFormat
    // },
        {
        field : 'minCharge',
        title : '本等级授权充值门槛',
        required : true,
        formatter: moneyFormat
    },
    //     {
    //     field : 'redPercent',
    //     title : '红线设置',
    //     required : true,
    //     formatter: moneyFormat
    // },
    //     {
    //     field : 'isSummary',
    //     title : '本等级授权单是否汇总',
    //     type : 'select',
    //     data : {'1':'是','0':'否'},
    //     required : true
    // },
        {
        field : 'remark',
        title : '备注'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
        view : view,
		detailCode: '627017',
		editCode: '627012',
        beforeSubmit : function (data) {
            alert(1);
            data.level = level;
            data.minCharge *= 1000;
            // data.minCharge = (data.minCharge * 1000).toString();

            return data;
        }
	});
});