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
        field: 'level',
        title: '授权等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
        visible: false
    }, {
        field: 'approveDatetime',
        title: '授权时间',
        formatter: dateTimeFormat,
        readonly: view
    }, {
        field: 'approveName',
        title: '操作人',
        readonly: view
    }, {
        field: 'userReferrerName',
        title: '推荐人',
        readonly: view
    }];
    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627367',
        editCode: '627241'
    });
});