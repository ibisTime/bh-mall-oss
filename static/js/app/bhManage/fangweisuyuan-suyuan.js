$(function() {
	var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        field : 'logisticsCode',
        title : '物流单号'
    },{
        field : 'logisticsCompany',
        title : '物流公司'
    }];
	
	buildDetail({
		fields: fields,
		code: code,
    view: view,
		detailCode: '627664'
	});
	
});