$(function() {
// 代理管理-代理管理-代理轨迹
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'loginName',
		title : '姓名'
	},{
		field : 'mobile',
		title : '联系电话',
        search: true,
        type: 'select'
	}, {
        field : 'updateDatetime',
        title : '微信号',
        search: true,
        type: 'select'
    }, {
        field : 'level',
        title : '授权等级',
        search: true,
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
    }, {
        field : 'updateDatetime',
        title : '授权时间',
        formatter: dateTimeFormat
    }, {
        field : 'updater',
        title : '操作人'
    }, {
        field : 'updateDatetime',
        title : '推荐人'
    }];
	buildList({
		columns: columns,
		pageCode: '627355',
		searchParams: {
			kind: 'B',

		}
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
    $('#detailBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }

        window.location.href = "./dailiguiji_addedit.html?v=1&userId="+selRecords[0].userId;
    })
});
