$(function() {
// 代理管理-系统设置-推荐奖设置
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
		field : 'productName',
		title : '产品'
	}, {
        field : 'value1',
        title : '直推奖励(%)'
    }, {
        field : 'value2',
        title : '间推奖励(%)'
    }, {
        field : 'value3',
        title : '次推奖励(%)'
    }];

	// 隐藏掉搜索栏，不然的话一个空的搜索栏依旧占位，会有一行空白

	$('.search-form').css('display','none');

    // 提示文字

    $(".tools").before("<div style='color:red'>推荐奖励，是指推荐的同等级代理出货了，推荐人从上级获得的奖励；<br>推荐奖励，是持续的，非一次性。<br>举个例子：二级代理A推荐了二级代理B，二级代理B推荐了二级代理C。<br>此时若C出了100块钱的B产品；B获得2块钱，A获得1块钱。<br>注意：这3块钱均由ABC的同一个上级出</div>");

	buildList({
		columns: columns,
		pageCode: '627590',
		searchParams: {
			type: '0',
		},
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
});
