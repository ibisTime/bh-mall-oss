$(function() {
    // 代理管理-代理管理-代理轨迹
    let toorter = getQueryString('toorter');
    let userId = getQueryString('userId');
    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });


        var columns = [{
                field: '',
                title: '',
                checkbox: true
            }, {
                field: 'realName',
                title: '姓名',
                search: true
            }, {
                field: 'mobile',
                title: '手机号',
                search: true
            }, {
                field: 'wxId',
                title: '微信号',
                search: true
            }, {
                field: 'level',
                title: '当前等级',
                params: {
                    highLevel: 6
                },
                formatter: function(v, data) {
                    var level = '';
                    items.map(function(item) {
                        if (item.level == data.level) {
                            level = item.name
                        }
                    })
                    return level
                }
            }, {
                field: 'applyLevel',
                title: '申请等级',
                params: {
                    highLevel: 6
                },
                formatter: function(v, data) {
                    var level = '';
                    items.map(function(item) {
                        if (item.level == data.applyLevel) {
                            level = item.name
                        }
                    })
                    return level
                }
            }, {
                field: 'approveName',
                title: '审核人'
            }, {
                field: 'userReferrerName',
                title: '推荐人'
            }, {
                field: 'toUserName',
                title: '归属人'
            }, {
                field: 'introduceName',
                title: '介绍人'
            }, {
                field: 'type',
                title: '操作类型',
                key: 'agnecy_log_type',
                formatter: Dict.getNameForList('agnecy_log_type')

            }, {
                field: 'status',
                title: '状态',
                key: 'agent_log_status',
                formatter: Dict.getNameForList('agent_log_status')

            }, {
                field: 'approveDatetime',
                title: '授权时间',
                formatter: dateTimeFormat,
                field1: 'dateStart',
                title1: '授权时间',
                type: 'datetime',
                field2: 'dateEnd',
                twoDate: true,
            }
            /* , {
                            field: 'remark',
                            title: '备注'
                        } */
        ];
        buildList({
            columns: columns,
            pageCode: '627365',
            detailCode: '627367',
            searchParams: {
                userId
            }
        });
        if (toorter) {
            $('.toolbar').empty();
            let html = `<div><div class="per">
                    <li style="display:block;" id="detailBtn">
                        <span>
                            <img src="/static/images/t01.png">
                        </span>详情
                    </li>
                </div></div>`;
            let divHtml = $(html).find('.per').html();
            $('.toolbar').append(divHtml);

            $('#detailBtn').off().click(function() {
                var selRecords = $('#tableList').bootstrapTable('getSelections');
                if (selRecords.length <= 0) {
                    toastr.info("请选择记录");
                    return;
                }
                window.location.href = "./dailiguiji_addedit.html?v=1&userId=" + selRecords[0].userId + '&code=' + selRecords[0].code;
            })
        }
    })
});