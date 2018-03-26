$(function() {
// 代理管理-代理管理-意向代理分配
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'name',
		title : '姓名'
	},{
		field : 'level',
		title : '等级',
        search: true,
		type: 'select'
	}, {
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '地域'
    }, {
        field : 'updateDatetime',
        title : '代理状态'
    }, {
        field : 'updateDatetime',
        title : '来源'
    }, {
        field : 'updateDatetime',
        title : '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }, {
        field : 'remark',
        title : '备注'
    }];
	buildList({
		columns: columns,
		pageCode: '627955',
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
    $('#hulveyixiangBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "yixiangdailifenpei_hulveyixiang.html?code="+selRecords[0].code+"&name="+encodeURI(encodeURI(selRecords[0].name));
    });
});
