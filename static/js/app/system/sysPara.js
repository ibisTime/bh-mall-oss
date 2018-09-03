$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'remark',
        title: '参数名'
    }, {
        field: 'cvalue',
        title: '参数值',
        formatter(v, d) {
            if (d.type == 'yunfei') {
                return parseInt(d.cvalue) / 1000;
            } else {
                return d.cvalue;
            }
        }
    }, {
        field: 'updateDatetime',
        title: '最近修改时间',
        formatter: dateTimeFormat
    }];
    buildList({
        columns: columns,
        pageCode: '627085',
        searchParams: {
            companyCode: OSS.company
        }
    });
});