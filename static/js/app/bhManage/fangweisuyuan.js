$(function() {
// 报货管理-溯源防伪-防伪溯源
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '系统',
		search: true,
		type: 'select'
	},{
		field : 'cvalue',
		title : '箱码'
	}, {
        field : 'updateDatetime',
        title : '箱码是否使用',
        search: true,
        type: 'select'
    }, {
        field : 'updateDatetime',
        title : '防伪码'
    }, {
        field : 'updateDatetime',
        title : '溯源码'
    }, {
        field : 'updateDatetime',
        title : '溯源码是否使用'
    }, {
        field : 'updateDatetime',
        title : '盒码状态',
        search: true,
        type: 'select',
        visible: false
    }];
	buildList({
		columns: columns,
		// pageCode: '627955',
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
