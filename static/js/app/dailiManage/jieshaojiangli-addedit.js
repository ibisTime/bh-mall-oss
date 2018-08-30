$(function() {
    // 代理管理-财务管理-出货奖励
    var userId = getQueryString('userId');
    var gin = getQueryString('in');
    var bizType = getQueryString('bizType');

    var kind = gin != null ? '1' : '0'
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'realName',
        title: '姓名',
        formatter: function(v, data) {
            return data.agent.realName
        }
    }, {
        field: 'nickname',
        title: '昵称',
        formatter: function(v, data) {
            return data.agent.nickname
        }
    }, {
        field: 'status',
        title: '代理状态',
        formatter: gin ? Dict.getNameForList('in_order_status') : Dict.getNameForList('out_order_status')
    }, {
        field: 'createDatetime',
        title: '时间',
        formatter: dateTimeFormat
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '627492',
        searchParams: {
            bizType,
            userId: userId,
            kind: kind,
            type: 'B'
        }
    });
    $('.search-form').css('display', 'none');
    $('.toolbar').empty().append('<li style="display:block;" id="exportBtn"><span><img src="/static/images/t01.png"></span>导出</li>')

});