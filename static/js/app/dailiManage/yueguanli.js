$(function() {
// 代理管理-财务管理-余额管理
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'name',
		title : '代理',
		search: true
	},{
		field : 'mobile',
		title : '代理电话',
        search: true
	},{
        field : 'wx',
        title : '代理微信',
        search: true
    },{
        field : 'level',
        title : '代理等级',
        search: true,
		type: 'select'
    },{
        field : 'cvalue',
        title : '代理团队'
    },{
        field : 'amount',
        title : '余额',
		formatter: moneyFormat
    }];
	buildList({
		columns: columns,
		pageCode: '627450'
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
	// 充值
	$('#inBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }

        window.location.href = './yueguanli_addedit.html?chongzhi=1&v=1&accountNumber='+selRecords[0].accountNumber;
    })
    // 扣款
    $('#outBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if(selRecords.length <= 0){
            toastr.info("请选择记录");
            return;
        }

        window.location.href = './yueguanli_addedit.html?koukuan=1&v=1&accountNumber='+selRecords[0].accountNumber;
    })

});
