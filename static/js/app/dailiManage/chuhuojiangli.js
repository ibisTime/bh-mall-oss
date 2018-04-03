$(function() {
// 代理管理-财务管理-出货奖励
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'remark',
		title : '出货人',
		search: true
	},{
		field : 'mobile',
		title : '出货人手机'
	}, {
        field : 'level',
        title : '出货人等级'
    }, {
        field : 'updateDatetime',
        title : '出货人团队'
    }, {
        field : 'product',
        title : '出货产品',
        search: true,
		type: 'select'
    }, {
        field : 'updateDatetime',
        title : '奖励收入',
		formatter: moneyFormat
    }, {
        field : 'updateDatetime',
        title : '奖励支出',
        formatter: moneyFormat
    },{
        field: 'realName',
        title: '户名',
        search: true
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'channelType',
        title: '渠道',
        type: 'select',
        key: 'channel_type',
        formatter: Dict.getNameForList('channel_type'),
        search: true
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',
        formatter: Dict.getNameForList('biz_type'),
        search: true
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        formatter: Dict.getNameForList('jour_status'),
        search: true
    }, {
        field: 'createDatetime',
        title: '创建时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
	buildList({
		columns: columns,
		pageCode: '627490',
		searchParams: {
            bizType: 'AJ_CHJL',
		}
	});
	//
	$('#outRecordBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./"
    })
});
