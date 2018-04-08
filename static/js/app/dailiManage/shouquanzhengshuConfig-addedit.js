$(function() {
	var id = getQueryString('id');
    var view = true;
    var fields = [{
        field : 'cvalue',
        title : '证书',
        type : 'img',
        single : true
    }];
	
	buildDetail({
		fields: fields,
		code: {
		    id : id
        },
		detailCode: '627086',
		editCode: '627081',
        beforeSubmit : function (data) {
            data.id = id;
            data.updater = getUserName();
            return data;
        }
	});
	
});