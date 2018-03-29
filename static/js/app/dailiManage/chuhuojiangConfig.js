$(function() {
// 代理管理-系统设置-出货奖设置
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'level',
		title : '代理等级',
        type : 'select',
        listCode: '627006',
        keyName : 'level',
        searchName :'level',
        valueName: 'name'
	},{
		field : 'productCode',
		title : '产品'
	}, {
        field : 'value1',
        title : '出货奖励',
		formatter: moneyFormat
    }];

	// 隐藏掉搜索栏，不然的话一个空的搜索栏依旧占位，会有一行空白

	$('.search-form').css('display','none');

    // 提示文字

    $(".tools").before("<div style='color:red'>出货奖励，是指本等级本身出货时，上级额外奖励给本等级的金额。<br>出货奖励，是持续的，非一次性。<br>举个例子：二级代理张三上级是一级代理李四<br>此时若张三出了100块钱的B产品；李四需要给张三出货奖励4块钱。</div>");

	buildList({
		columns: columns,
		pageCode: '627590',
        searchParams: {
            type: '1',
        }
	});
});
