$(function() {
    // 代理管理-代理管理-代理资料
    let userId = getQueryString('userId');
    var columns = [{
        field: '',
        title: ''
    }, {
        field: 'realName',
        title: '户名'
    }, {
        field: 'realName',
        title: '卡号'
    }, {
        field: 'realName',
        title: '开户行'
    }, {
        field: 'realName',
        title: '开户支行'
    }];
    buildList({
        columns: columns,
        pageCode: '627530',
        searchParams: {
            userId
        }
    });

    $('.toolbar').empty();

});