$(function() {
	var code = getQueryString('code');

    var fields = [{
        field : 'remark',
        title : '等级名称'
    },{
        field : 'cvalue',
        title : '等级',
        search: true,
        type: 'select'
    },{
        field : 'cvalue',
        title : '本等级是否可被意向'
    },{
        field : 'cvalue',
        title : '本等级是否可被介绍'
    },{
        field : 'cvalue',
        title : '本等级是否需要实名'
    },{
        field : 'cvalue',
        title : '本等级是否公司审核'
    },{
        field : 'cvalue',
        title : '本等级授权首单总额',
        formatter: moneyFormat
    },{
        field : 'cvalue',
        title : '本等级授权充值门槛',
        formatter: moneyFormat
    },{
        field : 'cvalue',
        title : '红线设置'
    },{
        field : 'cvalue',
        title : '本等级授权单是否汇总'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627927',
		addCode: '627920',
		editCode: '627921'
	});
	
});