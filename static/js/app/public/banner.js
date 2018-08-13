$(function() {
    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        title: 'banner名称',
        field: 'name'
    }, {
        title: '图片',
        field: 'pic',
        type: 'img',
        formatter: function(v, data) {
            return data.pic && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + data.pic + '" >' || "-"
        }
    }, {
        title: 'url',
        field: 'url'
    }, {
        title: '状态',
        field: 'status',
        type: 'select',
        search: true,
        key: 'banner_status',
        formatter: Dict.getNameForList('banner_status')
    }, {
        title: '位置',
        field: 'location',
        formatter: function(v) {
            if (v == "index_banner") {
                return '首页';
            }
        },
        type: 'select',
        search: true

    }, {
        title: '顺序',
        field: 'orderNo',

    }, {
        title: '备注',
        field: 'remark',
    }];
    buildList({
        router: 'banner',
        columns: columns,
        pageCode: '627035',
        deleteCode: '627031',
        searchParams: {
            companyCode: OSS.company,
            type: 2
        }
    });

    // 发布、撤下
    $('#releaseBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        window.location.href = 'banner_release.html?id=' + selRecords[0].code + "&code=" + selRecords[0].code;
    });

});