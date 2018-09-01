$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');
    var direct = getQueryString('direct');
    var fields = [{
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'specsName',
        title: '产品规格',
        required: true
    }, {
        field: 'type',
        title: '变动类型',
        type: 'select',
        key: 'product_log_type',
        formatter: Dict.getNameForList('product_log_type')
    }, {
        field: direct ? 'tranCount' : 'tranNumber',
        title: '变动库存',
        formatter: function(v, data) {
            return direct ? data.tranCount : data.tranNumber;
        }
    }, {
        field: direct ? 'preCount' : 'beforeNumber',
        title: '变动前库存',
        formatter: function(v, data) {
            return direct ? data.preCount : data.beforeNumber;
        }
    }, {
        field: direct ? 'postCount' : 'afterNumber',
        title: '变动后库存',
        formatter: function(v, data) {
            return direct ? data.postCount : data.afterNumber;
        }
    }, {
        field: direct ? 'updateDatetime' : 'applyDatetime',
        title: '变动时间',
        formatter: dateTimeFormat
    }, {
        field: direct ? 'updateName' : 'realName',
        title: '操作人',
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildDetail({
        fields: fields,
        code: {
            code,
            updater: getUserId()
        },
        view: view,
        detailCode: direct ? '627612' : '627833'
    });
    //627833  627612
});