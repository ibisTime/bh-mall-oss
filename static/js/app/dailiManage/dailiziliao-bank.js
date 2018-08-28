$(function() {
    // 代理管理-代理管理-代理资料
    let userId = getQueryString('userId');
    var columns = [{
        field: 'realName',
        title: '户名'
    }, {
        field: 'bankName',
        title: '银行名称'
    }, {
        field: 'bankcardNumber',
        title: '卡号'
    }, {
        field: 'subbranch',
        title: '开户行'
    }, {
        field: 'payCardInfo',
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