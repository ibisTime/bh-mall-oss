$(function() {
	var code = getQueryString('code');
	var id = getQueryString('id');
    var fields = [{
        field : 'remark',
        title : '参数名',
        pageCode: '627965',
        keyName: 'ckey',
        valueName: 'ckey',
        readonly: true
    },{
        field : 'cvalue',
        title : '参数值'
    }, {
        field : 'updateDatetime',
        title : '最近修改时间',
        formatter: dateTimeFormat,
		readonly: true
    }];
	
	buildDetail({
		fields: fields,
		code: code,
		detailCode: '627086',
        editCode: '627081',
        beforeSubmit : function(data) {
            data.remark = $('#remark').text();
            return data;
        }
	});
	
});