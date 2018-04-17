$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');

    var fields = [{
        title: '流水编号',
        field: 'code1',
        formatter: function(v, data) {
            return data.code;
        },
        readonly: true
    }, {
        title: '户名',
        field: 'realName',
        readonly: true
    }, {
        title: '账号',
        field: 'accountNumber',
        readonly: true
    }, {
        field: 'currency',
        title: '币种',
        type: 'select',
        key: 'currency',
        formatter: Dict.getNameForList("currency"),
        readonly: true,
    }, {
        field: 'channelType',
        title: '渠道类型',
        type: 'select',
        key: 'channel_type',

        formatter: Dict.getNameForList('channel_type'),
        readonly: true
    }, {
        field: 'bizType',
        title: '业务类型',
        type: 'select',
        key: 'biz_type',

        formatter: Dict.getNameForList('biz_type'),
        readonly: true,
    }, {
        field: 'bizNote',
        title: '业务说明',
        readonly: true
    }, {
        field: 'transAmount',
        title: '变动金额',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'preAmount',
        title: '变动前金额',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'postAmount',
        title: '变动后金额',
        formatter: moneyFormat,
        readonly: true
    }, {
        field: 'createDatetime',
        title: '金额変动时间',
        formatter: dateTimeFormat,
        readonly: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        formatter: Dict.getNameForList('jour_status'),
        readonly: true
    }, {
        field: 'remark',
        title: '备注',
        readonly: true
    }];

    var options = {
        fields: fields,
        code: code,
        detailCode: '627495',
        view: view
    };

    buildDetail(options);

    var h = "<p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>0表示平账,负数表示需减钱,正数表示需加钱</p>";
    $(h).insertAfter("#checkAmount");
});