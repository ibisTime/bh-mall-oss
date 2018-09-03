$(function() {
    var code = getQueryString('code');
    var id = getQueryString('id');
    var yf = false;
    var fields = [{
        field: 'remark',
        title: '参数名',
        pageCode: '627965',
        keyName: 'ckey',
        valueName: 'ckey',
        readonly: true
    }, {
        field: 'cvalue',
        title: '参数值',
        formatter(v, d) {
            if (d.type == 'yunfei') {
                yf = true;
                return parseInt(d.cvalue) / 1000;
            } else {
                return d.cvalue;
            }
        }
    }, {
        field: 'updateDatetime',
        title: '最近修改时间',
        formatter: dateTimeFormat,
        readonly: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        detailCode: '627086',
        editCode: '627081',
        beforeSubmit: function(data) {
            if (yf) {
                data.cvalue = $('#cvalue').val() * 1000;
            }
            data.remark = $('#remark').text();
            data.updater = getUserId();
            return data;
        }
    });

});