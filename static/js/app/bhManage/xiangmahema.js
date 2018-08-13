$(function() {
    // 报货管理-云仓管理-云仓查询
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'code',
        title: '箱码',
        search: true
    }, {
        field: 'status',
        title: '状态',
        key: 'pro_code_status',
        formatter: Dict.getNameForList('pro_code_status')
    }, {
        field: 'miniCode',
        title: '防伪码'
    }, {
        field: 'traceCode',
        title: '溯源码'
    }, {
        field: 'status',
        title: '状态',
        key: 'pro_code_status',
        formatter: Dict.getNameForList('pro_code_status')
    }];
    buildList({
        columns: columns,
        pageCode: '627885'
    });
    $('.fixed-table-container').css('width', '80%');
    //库存变动记录
});