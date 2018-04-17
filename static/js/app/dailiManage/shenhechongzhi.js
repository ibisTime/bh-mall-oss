$(function() {
// 代理管理-财务管理-审核充值
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'code',
		title : '编号'
	},{
		field : 'accountName',
		title : '充值人',
        search: true,
        formatter : function (v, data) {
            return data.user?data.user.realName:'-'
        }
	}, {
        field : 'teamName',
        title : '充值人团队',
        formatter : function (v, data) {
            return data.user?data.user.teamName:'-'
        }
    },{
        field : 'amount',
        title : '金额',
        formatter: moneyFormat
    },{
        field : 'applyDatetime',
        title : '申请时间',
		formatter: dateTimeFormat
    }, {
        field : 'status',
        title : '状态',
        search: true,
        type: 'select',
        key : 'charge_status',
        formatter : Dict.getNameForList('charge_status')
    }, {
        field : 'payUser',
        title : '审核人'
    }, {
        field : 'payDatetime',
        title : '审核时间',
        formatter: dateTimeFormat
    }];
	buildList({
		columns: columns,
		pageCode: '627470',
		searchParams: {
			companyCode: OSS.company,
		}
	});
	$("#checkBtn").off('click').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].status === '1') {
            window.location.href = "./shenhechongzhi_check.html?code="+selRecords[0].code;
        }else {
            toastr.info('该状态不可进行审核')
        }
    })
});
