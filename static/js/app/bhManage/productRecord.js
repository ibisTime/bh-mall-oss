$(function() {
    // 报货管理-云仓管理-产品库存记录
    let code = getQueryString('code');
    let toorter = getQueryString('toorter');
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'productName',
        title: '产品名称'
    }, {
        field: 'specsName',
        title: '产品规格',
        required: true
    }, {
        field: 'type',
        title: '变动类型',
        type: 'select',
        search: true,
        key: 'product_log_type',
        formatter: Dict.getNameForList('product_log_type')
    }, {
        field: 'tranCount',
        title: '变动库存',
        formatter(v, data) {
            return data.tranCount;
        }
    }, {
        field: 'preCount',
        title: '变动前库存',
        formatter(v, data) {
            return data.preCount;
        }
    }, {
        field: 'postCount',
        title: '变动后库存',
        formatter(v, data) {
            return data.postCount;
        }
    }, {
        field: 'updateDatetime',
        title: '变动时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '变动时间',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        type: 'datetime'
    }, {
        field: 'updater',
        title: '操作人'
    }, {
        field: 'remark',
        title: '备注'
    }];

    buildList({
        columns: columns,
        pageCode: '627610',
        searchParams: {
            productCode: code ? code : '',
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
            window.location.href = "./productRecord_addedit.html?v=1&direct=1&userId=" + selRecords[0].userId + '&code=' + selRecords[0].code;
        })
    }

    $('#detailBtn').off().click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = "./productRecord_addedit.html?v=1&direct=1" + '&code=' + selRecords[0].code;
    })
});