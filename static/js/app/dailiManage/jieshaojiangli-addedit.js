$(function() {
    // 代理管理-财务管理-出货奖励
    var userId = getQueryString('userId');
    var gin = getQueryString('in');
    var refNo = getQueryString('refNo');

    var kind = gin != null ? '1' : '0'
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName1',
        title: '出货人',
        formatter(v, data) {
            return data.agent ? data.agent.realName : '-'
        }
    }, {
        field: 'inAmount',
        title: '奖励金额',
        amount: true
    }, {
        field: 'status',
        title: '状态',
        type: 'select',
        key: 'jour_status',
        formatter: Dict.getNameForList('jour_status'),
        search: true
    }, {
        field: 'createDatetime1',
        title: '时间',
        formatter(v, d) {
            return dateTimeFormat(d.agent.createDatetime);
        }
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '627492',
        searchParams: {
            bizType: 'AJ_JSJL',
            userId: userId,
            kind: kind,
            type: 'B',
            refNo
        }
    });
    $('.search-form').css('display', 'none');
    $('.toolbar').empty().append('<li style="display:block;" id="exportBtn"><span><img src="/static/images/t01.png"></span>导出</li>')
    $('#exportBtn').click(function() {
        $('.export .btn').click();
    });
});