$(function() {
// 代理管理-系统设置-代理授权设置
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'level',
		title : '等级名称',
        type: 'select',
        listCode: '627006',
        keyName : 'level',
        searchName :'level',
        valueName: 'name'
	},{
		field : 'level',
		title : '等级',
        search: true,
		type: 'select'
	},{
        field : 'isIntent',
        title : '本等级是否可被意向',
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'isIntro',
        title : '本等级是否可被介绍',
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'isRealName',
        title : '本等级是否需要实名',
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'isCompanyImpower',
        title : '本等级是否公司审核',
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'impowerAmount',
        title : '本等级授权首单总额',
        formatter: moneyFormat
    },{
        field : 'minCharge',
        title : '本等级授权充值门槛',
        formatter: moneyFormat
    },{
        field : 'redPercent',
        title : '红线设置',
        formatter: moneyFormat
    },{
        field : 'isSummary',
        title : '本等级授权单是否汇总',
        type : 'select',
        data : {'1':'是','0':'否'}
    },{
        field : 'remark',
        title : '备注'
    }];
	buildList({
		columns: columns,
		pageCode: '627015'
	});
	// 修改
	$('#editBtn').off('click').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = './dailishouquanConfig_addedit.html?level='+selRecords[0].level+'&v=0&code='+selRecords[0].code;
    })
});
