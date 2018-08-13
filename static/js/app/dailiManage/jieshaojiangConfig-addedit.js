$(function() {
    // 代理管理-系统设置-介绍奖设置
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        field: 'level',
        title: '代理等级',
        type: 'select',
        listCode: '627008',
        keyName: 'level',
        searchName: 'level',
        valueName: 'name',
        readonly: code,
        required: true
    }, {
        field: 'introLevel',
        title: '介绍等级',
        type: 'select',
        listCode: '627008',
        keyName: 'level',
        searchName: 'level',
        valueName: 'name',
        readonly: code,
        required: true
    }, {
        field: 'percent',
        title: '介绍奖励(%)',
        required: true
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627247',
        addCode: '627240',
        editCode: '627241'
    });
});