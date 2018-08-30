$(function() {
    var code = getQueryString('code');
    var view = !!getQueryString('v');
    var istguan = getQueryString('tguan');
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
        field: 'type1',
        title: '账户类型',
        readonly: true,
        formatter(v, d) {
            if (istguan) {
                return '托管账户';
            } else {
                return '盈亏账户';
            }
        }
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
        field: 'payCardInfo',
        title: '支付渠道信息',
        readonly: true,
        formatter(v, d) {
            return d.withdraw ? d.withdraw.payCardInfo : '-'
        }
    }, {
        field: 'payCardNo',
        title: '支付渠道账号',
        readonly: true,
        formatter(v, d) {
            return d.withdraw ? d.withdraw.payCardNo : '-'
        }
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

    var buttons = [{
        title: '返回',
        handler: function() {
            goBack();
        }
    }];

    var options = {
        fields: fields,
        code: {
            code,
            updater: getUserId()
        },
        detailCode: '627495',
        view: view,
        buttons
    };

    buildDetail(options);

    var h = "<p class='huilv' style='padding: 5px 0 0 194px;display: block;color:red;'>0表示平账,负数表示需减钱,正数表示需加钱</p>";
    $(h).insertAfter("#checkAmount");
});