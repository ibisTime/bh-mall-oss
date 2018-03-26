$(function() {

    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'parentKey',
        title : '种类',
        search: true,
        type: 'select',
        listCode: '627076',
        params: {
            type: 0
        },
        keyName: 'dkey',
        valueName: 'dvalue'
    },{
        field : 'dkey',
        title : '字典键'
    },{
        field : 'dvalue',
        title : '字典值'
    },{
        field : 'updater',
        title : '更新人'
    },{
        field : 'updateDatetime',
        title : '更新时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
	buildList({
		columns: columns,
        pageCode: '627075',
        searchParams : {
            companyCode : OSS.company,
			type : '1'
        }
	// 	beforeEdit: function(r) {
	// 		location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
	// 	}
	});
});
