$(function() {
	var code = getQueryString('code');
	var select = {'1':'是','0':'否'};
	var level = [];

    // var items = Dict.getName("hotel_ss").map(function(item){
    //     return {
    //         key: item.dkey,
    //         value: item.dvalue
    //     };
    // });

    reqApi({
        code: '627006'
    }, true).then(function (data) {
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
            field : 'title',
            title : '标题',
            required : true
        },{
            field : 'type',
            title : '分类',
            required : true,
            type: 'select',
            // key: 'material_type',
            // formatter: Dict.getNameForList("material_type")
                listCode: '627076',
                params : {
                    parentKey : 'material_type'
                },
                keyName: 'dkey',
                valueName: 'dvalue'
        }, {
            field : 'pic',
            title : '图片',
            type : 'img',
            required : true,
            single : true
        }, {
            field : 'status',
            title : '是否显示列表',
            type : 'select',
            data : select,
            required : true
        }, {
            field : 'orderNo',
            title : '排序',
            required : true
        }, {
            field : 'level',
            title : '可查看等级',
            type : 'checkbox',
            items :level,
            required : true
        }];

        buildDetail({
            fields: fields,
            code: code,
            detailCode: '627432',
            addCode: '627420',
            editCode: '627421',
            beforeSubmit:function (data) {
                if(data.level.length>1) {
                    data.level = data.level.join(',');
                }
                return data;
            },
        });
        hideLoading();


    })

});