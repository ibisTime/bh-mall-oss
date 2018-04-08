$(function() {
// 代理管理-代理管理-审核授权
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'loginName',
		title : '姓名'
	},{
		field : 'level',
		title : '等级',
        search: true,
		type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name'
	}, {
        field : 'mobile',
        title : '联系电话'
    }, {
        field : 'updateDatetime',
        title : '微信号'
    }, {
        field : 'updateDatetime',
        title : '上级'
    }, {
        field : 'updateDatetime',
        title : '团队名称'
    }, {
        field : 'sqAmount',
        title : '授权金额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '地域'
    }, {
        field : 'approveDatetime',
        title : '申请时间',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '申请时间',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
    }];
	buildList({
		columns: columns,
		pageCode: '627354',
		searchParams: {
            status : '11'
		},
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
	$('#checkBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./shenheshouquan_check.html?v=1&userId="+selRecords[0].userId;
    })
});
