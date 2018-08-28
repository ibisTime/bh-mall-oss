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
        field: 'isCompanyApprove',
        title: '本等级升级是否公司审核',
        required: true,
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'amount',
        title: '本等级升级首单总额',
        amount: true
    }, {
        field: 'reNumber',
        title: '半门槛升级推荐人数',
        required: true
    }, {
        field: 'isReset',
        title: '本等级升级是否余额清零',
        required: true,
        type: 'select',
        data: { '1': '是', '0': '否' }
    }, {
        field: 'remark',
        title: '备注'
    }, {
        field: 'code1',
        type: 'hidden',
        formatter(v, data) {
            return data.code;
        }
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '627007',
        editCode: '627002',
        beforeSubmit: function(data) {
            data.level = level;
            data.name = name;
            data.updater = getUserId();
            return data;
        }
    });

});