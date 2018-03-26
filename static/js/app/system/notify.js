$(function() {

    var columns = [{
        field : '',
        title : '',
        checkbox : true
    },{
        field : 'parentKey',
        title : '公告标题',
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
        title : '针对人群'
    },{
        field : 'dvalue',
        title : '状态'
    },{
        field : 'updater',
        title : '最近修改人'
    },{
        field : 'updateDatetime',
        title : '最近修改时间',
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
