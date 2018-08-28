$(function() {
    // 代理管理-财务管理-审核充值
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号'
    }, {
        field: 'accountName',
        title: '充值人',
        search: true
    }, {
        field: 'teamName',
        title: '充值人团队'
    }, {
        field: 'amount',
        title: '金额',
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        search: true,
        type: 'select',
        key: 'charge_status',
        formatter: Dict.getNameForList('charge_status')
    }, {
        field: 'payUserName',
        title: '审核人'
    }, {
        field: 'payDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '627473',
        searchParams: {
            companyCode: OSS.company,
            level: '1'
        }
    });
});