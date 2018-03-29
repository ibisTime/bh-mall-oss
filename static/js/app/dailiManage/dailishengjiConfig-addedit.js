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
        field : 'isCompanyApprove',
        title : '本等级升级是否公司审核',
        required : true,
        type : 'select',
        data : {'1':'是','0':'否'}
    },
    //     {
    //     field : 'upgradeFirstAmount',
    //     title : '本等级升级首单总额',
    //     formatter: moneyFormat
    // },
        {
        field : 'reNumber',
        title : '半门槛升级推荐人数',
        required : true
    },{
        field : 'isReset',
        title : '本等级升级是否余额清零',
        required : true,
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'remark',
        title : '备注'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
        view : view,
		detailCode: '627027',
		editCode: '627022',
        beforeSubmit : function (data) {
            data.level = level;
            return data;
        }
	});
	
});