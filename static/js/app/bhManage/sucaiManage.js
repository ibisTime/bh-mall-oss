$(function() {
    // 报货管理-素材管理-素材管理
    var items = [];
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
                field: 'title',
                title: '标题'
            }, {
                field: 'type',
                title: '分类',
                search: true,
                type: 'select',
                formatter: Dict.getNameForList('material_type'),
                key: 'material_type'
            }, {
                field: 'pic',
                title: '图像',
                type: 'img',
                formatter: function(v, data) {
                    return data.pic && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + data.pic + '" >' || "-"
                }
            }, {
                field: 'orderNo',
                title: '排序',
                required: true
            },
            {
                field: 'status',
                title: '是否显示在列表',
                type: 'select',
                data: {
                    '1': '是',
                    '0': '否'
                }
            }, {
                field: 'updateDatetime',
                title: '添加时间',
                formatter: dateTimeFormat
            },
            {
                field: 'level',
                title: '可查看等级',
                type: 'select',
                // listCode: '627006',
                // keyName : 'level',
                // searchName :'level',
                // valueName: 'name'
                formatter: function(v, data) {
                    for (var v of items) {
                        data.level = data.level.replace(v.level, v.name);
                    }
                    return data.level;
                }
            }
        ];
        buildList({
            columns: columns,
            pageCode: '627430',
            deleteCode: '627422'
        });
        // 详情
        $('#ydetailBtn').off().click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }
            window.location.href = './sucaiManage_addedit.html?detail=ok&code=' + selRecords[0].code + '&v=1';
        });
    })

});