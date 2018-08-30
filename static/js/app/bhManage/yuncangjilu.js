$(function() {
    // 报货管理-云仓管理-产品库存记录
    let toorter = getQueryString('toorter');
    let code = getQueryString('code');
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'productName',
        title: '产品名称',
        search: true
    }, {
        field: 'specsName',
        title: '规格名称'
    }, {
        field: 'type',
        title: '操作',
        key: 'ware_log_type',
        formatter: Dict.getNameForList('ware_log_type')
    }, {
        field: 'tranNumber',
        title: '变动库存',
        formatter(v, data) {
            return data.tranNumber;
        }
    }, {
        field: 'beforeNumber',
        title: '变动前库存',
        formatter(v, data) {
            return data.beforeNumber;
        }
    }, {
        field: 'afterNumber',
        title: '变动后库存',
        formatter(v, data) {
            return data.afterNumber;
        }
    }, {
        field: 'applyDatetime',
        title: '变动时间',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '变动时间',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        type: 'datetime'
    }, {
        field: 'realName',
        title: '操作人'
    }, {
        field: 'remark',
        title: '备注'
    }];
    buildList({
        columns: columns,
        pageCode: '627830',
        searchParams: {
            specsCode: code ? code : ''
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
            <li style="display:block;" id="gobackBtn">
                <span>
                    <img src="/static/images/t01.png">
                </span>返回
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
            window.location.href = "./productRecord_addedit.html?v=1&userId=" + selRecords[0].userId + '&code=' + selRecords[0].code;
        })
        $('#gobackBtn').off().click(function() {
            window.location.href = "./yuncangchaxun.html";
        })
    }
});