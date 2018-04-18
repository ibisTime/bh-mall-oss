$(function() {
// 代理管理-系统设置-介绍奖设置
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
		field : 'percent',
		title : '授权本等级直接获利',
		formatter : function(v, data) {
			return data.percent*100+'%'
		}
	}];

	// 隐藏掉搜索栏，不然的话一个空的搜索栏依旧占位，会有一行空白

	$('.search-form').css('display','none');

	// 提示文字

    $(".tools").before("<div style='color:red'>介绍奖励，是指推荐的高等级代理时，一次性从被推荐代理新上级获得的奖励；<br>介绍奖励，是一次性拿介绍门槛的点数。<br>举个例子：四级代理A介绍了二级代理B，二级代理B的新上级是一级代理C。<br>此时若二级代理的充值门槛是1万元，则C需一次性奖励A金额为6000元<br>注意：这钱是被推荐代理新上级出的，而且只给一次。</div>");

	buildList({
		columns: columns,
		pageCode: '627245'
	});
});
