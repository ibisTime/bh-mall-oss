$(function() {
    var code = getQueryString('code');
    var level = getQueryString('level');
    var name = getQueryString('name');
    var view = getQueryString('v');
    view === '1' ? view = true : view = false;

    var fields = [{
        field: 'name',
        title: '等级名称',
        readonly: true
    }, {
        field: 'level1',
        title: '等级',
        search: true,
        type: 'select',
        readonly: true,
        formatter: function(v, data) {
            return data.level
        }
    }, {
        field: 'isIntent',
        title: '本等级是否可被意向',
        required: true,
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'isJsAward',
        title: '本等级是否可被介绍',
        required: true,
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'isRealName',
        title: '本等级是否需要实名',
        required: true,
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'isCompanyImpower',
        title: '本等级是否公司审核',
        required: true,
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'minCharge',
        title: '本等级授权充值门槛',
        required: true,
        amount: true
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627007',
        editCode: '627001',
        beforeSubmit: function(data) {
            data.level = level;
            data.name = name;
            return data;
        }
    });
});