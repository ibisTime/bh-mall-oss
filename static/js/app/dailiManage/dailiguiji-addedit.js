$(function() {
    // 代理管理-系统设置-介绍奖设置
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'realName',
        title: '姓名',
        readonly: view
    }, {
        field: 'mobile',
        title: '联系电话',
        readonly: view
    }, {
        field: 'wxId',
        title: '微信号',
        readonly: view
    }, {
        field: 'applyLevel',
        title: '申请等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
        visible: false
    }, {
        field: 'approveName',
        title: '操作人',
        readonly: view
    }, {
        field: 'userReferrerName',
        title: '推荐人',
        readonly: view
    }, {
        field: 'approveName',
        title: '审核人'
    }, {
        field: 'toUserName',
        title: '归属人'
    }, {
        field: 'introduceName',
        title: '介绍人'
    }, {
        field: 'type',
        title: '操作类型',
        key: 'agnecy_log_type',
        formatter: Dict.getNameForList('agnecy_log_type')

    }, {
        field: 'status',
        title: '状态',
        key: 'agent_log_status',
        formatter: Dict.getNameForList('agent_log_status')

    }, {
        field: 'approveDatetime',
        title: '授权时间',
        formatter: dateTimeFormat,
        readonly: view
    }];
    buildDetail({
        fields: fields,
        code: {
            code,
            updater: getUserId()
        },
        view: view,
        detailCode: '627367',
        editCode: '627241'
    });
});