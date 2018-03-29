$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '编号',
        search : true
    }, {
        field: 'currency',
        title: '账号'
    }, {
        field: 'channelType',
        title: '金额',
        formatter: moneyFormat
    }, {
        field: 'bizType',
        title: '开户支行'
    }, {
        field: 'transAmount',
        title: '卡号'
    }, {
        field: 'preAmount',
        title: '申请人'
    },{
        field: 'createDatetime',
        title: '申请时间',
        formatter: dateTimeFormat
    }, {
        field: 'reamrk',
        title: '状态'
    }, {
        field: 'reamrk',
        title: '审核人'
    }, {
        field: 'reamrk',
        title: '审核时间',
        formatter: dateTimeFormat
    }, {
        field: 'reamrk',
        title: '回录人'
    }, {
        field: 'reamrk',
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