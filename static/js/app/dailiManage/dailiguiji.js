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
                title: '代理姓名',
                search: true,
                visible: false
            }, {
                field: 'mobile',
                title: '代理手机号',
                search: true,
                visible: false
            }, {
                field: 'wxId',
                title: '代理微信号',
                search: true,
                visible: false
            }, {
                field: 'realName',
                title: '姓名'
            }, {
                field: 'mobile',
                title: '手机号'
            }, {
                field: 'wxId',
                title: '微信号',
            }, {
                field: 'level',
                title: '授权等级',
                type: 'select',
                listCode: '627006',
                keyName: 'level',
                valueName: 'name',
                visible: false
            },
            {
                field: 'level1',
                title: '授权等级',
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
                field: 'approveDatetime',
                title: '授权时间',
                formatter: dateTimeFormat,
                field1: 'dateStart',
                title1: '授权时间',
                type: 'datetime',
                field2: 'dateEnd',
                twoDate: true,
            }, {
                field: 'approveName',
                title: '审核人'
            }, {
                field: 'referrerName',
                title: '推荐人'
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