$(function() {
    var code = getQueryString('code');



    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });


        var html = '<div>';
        var guigeHtml = '';
        var dingjiaHtml = '';
        var temp = '';
        for (var v of items) {
            html += '<label style="padding: 20px 40px"><b>*</b>' + v.name + '</label>'
        }
        html += '</div>';

        var fields = [{
                field: 'name',
                title: '产品名称',
                required: true
            }, {
                field: 'adPrice',
                title: '建议价',
                formatter: moneyFormat,
                required: true
            }, {
                field: 'price',
                title: '市场价',
                amount: true,
                required: true
            }, {
                field: 'changePrice',
                title: '换货价',
                formatter: moneyFormat,
                required: true
            }, {
                field: 'advPic',
                title: '广告图',
                type: 'img',
                required: true
            }, {
                field: 'pic',
                title: '缩略图',
                type: 'img',
                single: true,
                required: true
            }, {
                field: 'virNumber',
                title: '虚拟数量',
                required: true,
                formatter(v, data) {
                    return data.virNumber;
                }
            }, {
                field: 'realNumber',
                title: '实际数量',
                required: true,
                formatter(v, data) {
                    return data.realNumber;
                }
            }, {
                field: 'slogan',
                title: '广告语',
                required: true
            }, {
                field: 'isTotal',
                title: '是否计入出货奖励',
                type: 'select',
                data: { '1': '是', '0': '否' },
                required: true
            },
            //     {
            //     field : 'guigeName',
            //     title : '规格名称',
            //     required : true
            // }, {
            //     field : 'number',
            //     title : '规格包含数量',
            //     required : true
            // }, {
            //     field : 'weight',
            //     title : '重量',
            //     required : true
            // }, {
            //     field : 'isNormalOrder',
            //     title : '是否允许普通单下单',
            //     type : 'select',
            //     data : {'1':'是','0':'否'},
            //     required : true
            // }, {
            //     field : 'isPowerOrder',
            //     title : '是否允许授权单下单',
            //     type : 'select',
            //     data : {'1':'是','0':'否'},
            //     required : true
            // }, {
            //     field : 'isUpgradeOrder',
            //     title : '是否允许升级单下单	',
            //     type : 'select',
            //     data : {'1':'是','0':'否'},
            //     required : true
            // },
            {
                field: 'remark',
                title: '备注'
            }
        ];

        buildDetail({
            fields: fields,
            code: code,
            detailCode: '627927',
            addCode: '627920',
            editCode: '627921',
            beforeSubmit: function(data) {
                //产品规格
                data.specList = [];
                var temp = {};
                temp.isNormalOrder = $('#isNormalOrder').val();
                temp.isPowerOrder = $('#isPowerOrder').val();
                temp.isUpgradeOrder = $('#isUpgradeOrder').val();
                temp.guigeName = $('#guigeName').val();
                temp.number = $('#number').val();
                temp.isNormalOrder = $('#weight').val();
                data.specList.push(temp);
                console.log(data.specList);

                // 规格定价
                data.specsPriceList = [];

                for (var v of items) {
                    v.price = $('#' + v.level).val();
                    delete v.name;
                    delete data[v.level];
                }
                data.specsPriceList = items;



                console.log(data);
                return data;
            }
        });
        hideLoading();



        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">规格定价</span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">' +
            html +
            '<div id="dingjiaHtml"></div>' +
            '</div>' +
            '</div>')

        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">产品规格<input id="add1Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">' +
            '<label style="padding: 20px 40px"><b>*</b>规格名称</label>' +
            '<label style="padding: 20px 40px"><b>*</b>规格包含数量</label>' +
            '<label style="padding: 20px 40px"><b>*</b>重量</label>' +
            '<label style="padding: 20px 40px"><b>*</b>是否允许普通单下单</label>' +
            '<label style="padding: 20px 40px"><b>*</b>是否允许授权单下单</label>' +
            '<label style="padding: 20px 40px"><b>*</b>是否允许升级单下单</label>' +
            '<div id="guigeHtml"></div>' +
            '</div>' +


            // '<li class="clearfix"><label><b>*</b>是否允许普通单下单</label><input id="isNormalOrder" name="isNormalOrder" class="control-def"></li>'+
            // '<li class="clearfix"><label><b>*</b>是否允许授权单下单</label><input id="isPowerOrder" name="isPowerOrder" class="control-def"></li>'+
            // '<li class="clearfix"><label><b>*</b>是否允许升级单下单</label><input id="isUpgradeOrder" name="isUpgradeOrder" class="control-def"></li>'+
            // '<li class="clearfix"><label><b>*</b>规格名称</label><input id="guigeName" name="guigeName" class="control-def"></li>'+
            // '<li class="clearfix"><label><b>*</b>规格包含数量</label><input id="number" name="number" class="control-def"></li>'+
            // '<li class="clearfix"><label><b>*</b>重量</label><input id="weight" name="weight" class="control-def"></li>'+
            '</div>')



        // $('#remark').parent().before(
        //     '<div style="width:100%;height:300px;">' +
        //     '<span style="font-size: 18px">规格定价</span>' +
        //     '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
        //     html+
        //     '</div>')
        $('#add1Btn').click(function() {
            guigeHtml = '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 100px;margin:10px  10px">' +
                '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 140px;margin:10px  20px">' +
                '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 70px;margin:10px  20px">' +
                '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 150px;margin:10px  20px">' +
                '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 150px;margin:10px  20px">' +
                '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 150px;margin:10px  20px"><br>';

            temp = "";
            for (var i = 0; i < items.length; i++) {
                temp += '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 70px;margin:10px  20px">'
                if (i == items.length - 1) {
                    temp += '<br>';
                }
            }
            dingjiaHtml = temp;
            $('#guigeHtml').append(guigeHtml);
            $('#dingjiaHtml').append(dingjiaHtml);
        })
    });

});