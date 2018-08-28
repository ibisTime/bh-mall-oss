$(function() {
    // 报货管理-云仓管理-云仓查询
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'refCode',
        title: '箱码',
        search: true
    }, {
        field: 'status',
        title: '状态',
        key: 'pro_code_status',
        formatter: Dict.getNameForList('pro_code_status')
    }, {
        field: 'miniCode',
        title: '防伪码',
        search: true
    }, {
        field: 'traceCode',
        title: '溯源码',
        search: true
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

    // 新增
    $('#addxmBtn').click(function() {
        var dw = dialog({
            content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入下载信息</ul>' +
                '</form>'
        });

        dw.showModal();

        buildDetail({
            container: $('#formContainer'),
            fields: [{
                field: 'miniNumber',
                title: '箱码数量',
                required: true,
                number: true,
                min: '0'
            }, {
                field: 'proNumber',
                title: '盒码数量',
                required: true,
                number: true,
                min: '0'
            }],
            buttons: [{
                title: '确定',
                handler: function() {
                    if ($('#popForm').valid()) {
                        var data = $('#popForm').serializeObject();
                        reqApi({
                            code: '627872',
                            json: {
                                miniNumber: data.miniNumber,
                                proNumber: data.proNumber
                            }
                        }).done(function(res) {
                            dw.close().remove();
                            window.location.reload()
                        })
                    }
                }
            }, {
                title: '取消',
                handler: function() {
                    dw.close().remove();
                }
            }]
        });
        dw.__center();
    });
});