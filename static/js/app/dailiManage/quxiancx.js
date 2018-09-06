$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'accountNumber',
        title: '账号'
    }, {
        field: 'amount',
        title: '金额',
        amount: true,
        formatter: moneyFormat
    }, {
        field: 'fee',
        title: '手续费',
        formatter: moneyFormat
    }, {
        field: 'payCardInfo',
        readonly: true,
        title: '开户支行'
    }, {
        field: 'payCardNo',
        title: '卡号'
    }, {
        field: 'accountName',
        title: '申请人',
        search: true
    }, {
        field: 'applyDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'withdraw_status',
        formatter: Dict.getNameForList('withdraw_status')
    }, {
        field: 'approveName',
        title: '审核人'
    }, {
        field: 'payUserName',
        title: '回录人'
    }, {
        field: 'approveDatetime',
        title: '审核时间',
        formatter: dateTimeFormat
    }, {
        field: 'payDatetime',
        title: '回录时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '627510',
        // beforeDetail: function(data) {
        //     location.href = "ledger_addedit.html?v=1&code=" + data.code;
        // },
        // beforeEdit: function(r) {
        //     if (r.status != '1') {
        //         toastr.info('该记录不是待对账状态');
        //         return false;
        //     }
        //     return true;
        // },
        searchParams: {
            // channelType: 'out',
            companyCode: OSS.company
        },
        // beforeSearch: function(data) {
        //     if (data.workDate) {
        //         data.workDate = data.workDate.replace(/-/g, "");;
        //         return data;
        //     } else {
        //         return data;
        //     }
        // }
    });

});