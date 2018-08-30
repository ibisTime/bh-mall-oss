$(function() {
    var code = getQueryString('code');
    var detail = getQueryString('detail');
    var view = getQueryString('v');
    var select = { '1': '是', '0': '否' };
    var level = [];
    let all = [{ 'key': 0, 'value': '是' }];
    // var items = Dict.getName("hotel_ss").map(function(item){
    //     return {
    //         key: item.dkey,
    //         value: item.dvalue
    //     };
    // });

    reqApi({
        code: '627006'
    }, true).then(function(data) {
        for (var v = 0; v < data.length; v++) {
            var temp = {};
            temp.key = data[v].level;
            temp.value = data[v].name;
            level.push(temp)
        }
        var fields = [
            //     {
            //     field : 'title',
            //     title : '是否类目标题',
            //     type : 'select',
            //     data : select,
            //     required : true
            // },
            {
                field: 'title',
                title: '标题',
                required: true
            }, {
                field: detail ? 'type1' : 'type',
                title: '分类',
                required: true,
                // key: 'material_type',
                // formatter: Dict.getNameForList("material_type")
                listCode: '627076',
                params: {
                    parentKey: 'material_type'
                },
                keyName: 'dkey',
                valueName: 'dvalue',
                type: detail ? 'hidden' : 'select'
            }, {
                field: detail ? 'type' : 'type1',
                title: '分类',
                key: 'material_type',
                formatter: Dict.getNameForList("material_type"),
                listCode: '627076',
                valueName: 'dvalue',
                type: detail ? 'select' : 'hidden'
            }, {
                field: 'pic',
                title: '图片',
                type: 'img',
                required: true,
                single: true
            }, {
                field: 'status',
                title: '是否显示列表',
                type: 'select',
                data: select,
                required: true
            }, {
                field: 'orderNo',
                title: '排序',
                required: true
            }, {
                field: 'level',
                title: '可查看等级',
                type: 'checkbox',
                items: level,
                required: true
            }, {
                field: 'allbtn',
                title: '全选'
            }
        ];

        buildDetail({
            fields: fields,
            code: code,
            view: detail ? view : '',
            detailCode: '627432',
            addCode: '627420',
            editCode: '627421',
            beforeSubmit: function(data) {
                if (data.level.length > 1) {
                    data.level = data.level.join(',');
                }
                data.updater = getUserId();
                return data;
            },
            afterData(data) {
                let levList = data.level.split(',');
                if (levList.length == 6) {
                    $('#allbtn').prop('checked', 'true');
                    isAll = !isAll;
                }
                levList = levList.map(item => {
                    return parseInt(item);
                })
                levList.forEach(item => {
                    $(`#level_checkbox${item - 1}`).prop('checked', 'true');
                })
                return data;
            }
        });
        hideLoading();
        let isAll = true;
        $('#allbtn').css({
            display: 'inline-block',
            width: '15px',
            height: '15px'
        }).prop('type', 'checkbox');
        $('#allbtn').click(() => {
            if (isAll) {
                for (let i = 0; i < level.length; i++) {
                    $('#level_checkbox' + i).prop('checked', 'true');
                }
            } else {
                for (let i = 0; i < level.length; i++) {
                    $('#level_checkbox' + i).removeProp('checked');
                }
            }
            isAll = !isAll;
        });
        $('#level_checkbox0').parents('li').click(function() {
            let i = 0;
            Array.from($(this).children('input')).forEach(item => {
                i++;
                if (!$(item).prop('checked')) {
                    $('#allbtn').removeProp('checked');
                    isAll = true;
                    i--;
                }
                if (i == level.length) {
                    $('#allbtn').prop('checked', 'true');
                    isAll = false;
                }
            })
        })
    })

});