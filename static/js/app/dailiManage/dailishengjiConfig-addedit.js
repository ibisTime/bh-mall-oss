$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'name',
        title : '等级名称'
    },{
        field : 'level',
        title : '等级'
    },{
        field : 'cvalue',
        title : '本等级升级是否公司审核'
    },{
        field : 'cvalue',
        title : '本等级升级首单总额',
        formatter: moneyFormat
    },{
        field : 'cvalue',
        title : '半门槛升级推荐人数'
    },{
        field : 'cvalue',
        title : '本等级升级是否余额清零'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});