$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '户名',
        search: true
    }, {
        field: 'currency',
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
        field: 'reamrk',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '802520',
        beforeDetail: function(data) {
            location.href = "ledger_addedit.html?v=1&code=" + data.code;
        },
        beforeEdit: function(r) {
            if (r.status != '1') {
                toastr.info('该记录不是待对账状态');
                return false;
            }
            return true;
        },
        searchParams: {
            channelType: 'out',
            companyCode: OSS.company
        },
        beforeSearch: function(data) {
            if (data.workDate) {
                data.workDate = data.workDate.replace(/-/g, "");;
                return data;
            } else {
                return data;
            }
        }
    });

});