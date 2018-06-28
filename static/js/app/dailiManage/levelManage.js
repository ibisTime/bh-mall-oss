$(function () {
	// 代理管理-系统设置-出货奖设置
	var columns = [{
		field: '',
		title: '',
		checkbox: true
	}, {
		field: 'level',
		title: '代理等级'
	}, {
		field: 'level',
		title: '等级名称',
		type: 'select',
		search: true,
		visible: false,
		listCode: '627006',
		keyName: 'level',
		searchName: 'level',
		valueName: 'name',
	}, {
		field: 'name',
		title: '等级名称'
	}, {
		field: 'amount',
		title: '首次授权发货金额',
		formatter: moneyFormat
	}, {
		field: 'minChargeAmount',
		title: '本等级最低充值金额',
		formatter: moneyFormat
	}, {
		field: 'redAmount',
		title: '红线金额',
		formatter: moneyFormat
	}, {
		field: 'minSurplus',
        title: '门槛可有余额',
		formatter: moneyFormat
	}, {
		field: 'isSend',
		title: '授权单是否允许自发',
		data: {
			0: '否',
			1: '是'
		},
		type: 'select'
	}, {
		field: 'isWareHouse',
		title: '是否启用云仓',
		data: {
			0: '否',
			1: '是'
		},
		type: 'select'
	}, {
		field: 'updater',
		title: '更新人'
	}, {
		field: 'remark',
		title: '备注'
	}];

	buildList({
		columns: columns,
		pageCode: '627005',
		searchParams: {
			orderColumn: 'level',
			orderDir: 'asc'
		}
	});
	// $('#detailBtn').off('click').click(function () {
	//
	// })
	// 详情
	$('#detailBtn').off().click(function () {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if (selRecords.length <= 0) {
			toastr.info("请选择记录");
			return;
		}
		window.location.href = './levelManage_addedit.html?v=true&level=' + selRecords[0].level;
	});
	// 修改
	$('#editBtn').click(function () {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		window.location.href = './levelManage_addedit.html?level=' + selRecords[0].level;
	});
});
