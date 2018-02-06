$(function() {

	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '代理等级'
	},{
		field : 'cvalue',
		title : '产品'
	}, {
        field : 'updateDatetime',
        title : '出货奖励',
		formatter: moneyFormat
    }];
    // 提示文字
    $(".tools").before("<div style='color:red'>出货奖励，是指本等级本身出货时，上级额外奖励给本等级的金额。<br>出货奖励，是持续的，非一次性。<br>举个例子：二级代理张三上级是一级代理李四<br>此时若张三出了100块钱的B产品；李四需要给张三出货奖励4块钱。</div>");

	buildList({
		columns: columns,
		pageCode: '627955',
		// searchParams: {
		// 	type: 'android_b',
		// 	companyCode: OSS.company,
		// 	orderColumn:'id',
		// 	orderDir: 'asc'
		// },
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
});
