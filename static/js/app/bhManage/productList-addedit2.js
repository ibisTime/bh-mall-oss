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
        }, {
            field: 'remark',
            title: '备注'
        }];

        buildDetail({
            fields: fields,
            code: code,
            detailCode: '627557',
            addCode: '627540',
            editCode: '627541',
            beforeSubmit: function(data) {
                //产品规格
                data.specList = specList;
                // 奖励机制
                data.awardList = awardList;
                // 各种价格
                data.adPrice *= 1000;
                data.price *= 1000;
                data.changePrice *= 1000;

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
            '<label style="padding: 20px 40px"><b>*</b>换货价</label>' +
            '<label style="padding: 20px 40px"><b>*</b>是否允许普通单下单</label>' +
            '<label style="padding: 20px 40px"><b>*</b>是否允许授权单下单</label>' +
            '<label style="padding: 20px 40px"><b>*</b>是否允许升级单下单</label>' +
            '<div id="guigeHtml"></div>' +
            '</div>' +

            '</div>')

        var awardHtml = '';
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">奖励机制<input id="add2Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">' +
            '<div id="awardTitle">' +
            '<label style="padding: 20px 40px"><b>*</b>等级</label>' +
            '<label style="padding: 20px 40px"><b>*</b>类型</label>' +
            '<label style="padding: 20px 40px"><b>*</b>直接推荐/出货奖励</label>' +
            '<label style="padding: 20px 40px"><b>*</b>间接推荐奖励</label>' +
            '<label style="padding: 20px 40px"><b>*</b>次推荐奖励</label>' +
            '</div>' +
            '<div id="awardContent"></div>' +
            '</div>' +
            '</div>')




        var specList = [];
        // 添加产品规格
        $('#add1Btn').click(function() {
            var temp = {}

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入规格</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'name',
                    title: '规格名称',
                    required: true
                }, {
                    field: 'number',
                    title: '规格包含数量',
                    required: true,
                    formatter(v, data) {
                        return data.number;
                    }
                }, {
                    field: 'weight',
                    title: '重量',
                    required: true
                }, {
                    field: 'changePrice',
                    title: '换货价',
                    required: true
                }, {
                    field: 'isNormalOrder',
                    title: '是否允许普通单下单',
                    required: true,
                    type: 'select',
                    data: { '0': '否', '1': '是' }
                }, {
                    field: 'isPowerOrder',
                    title: '是否允许授权单下单',
                    required: true,
                    type: 'select',
                    data: { '0': '否', '1': '是' }
                }, {
                    field: 'isUpgradeOrder',
                    title: '是否允许升级单下单',
                    required: true,
                    type: 'select',
                    data: { '0': '否', '1': '是' }
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            temp.name = data.name;
                            temp.number = data.number;
                            temp.weight = data.weight;
                            temp.isNormalOrder = data.isNormalOrder;
                            temp.isPowerOrder = data.isPowerOrder;
                            temp.isUpgradeOrder = data.isUpgradeOrder;
                            var g = 0;
                            var guigeTemp =
                                '<div id="guigeDom' + g + '">' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.name + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.number + '</span>' +
                                '<span style="width : 180px;padding:20px 40px;display: inline-block">' + temp.weight + '</span>' +
                                '<span style="width : 180px;padding:20px 40px;display: inline-block">' + temp.isNormalOrder + '</span>' +
                                '<span style="width : 180px;padding:20px 40px;display: inline-block">' + temp.isPowerOrder + '</span>' +
                                '<span style="width : 180px;padding:20px 40px;display: inline-block">' + temp.isUpgradeOrder + '</span>' +
                                '</div>';

                            $('#guigeHtml').append(guigeTemp);
                            g++;
                            var dw1 = dialog({
                                content: '<form class="pop-form-dingjia" id="popFormDingjia" novalidate="novalidate">' +
                                    '<ul class="form-info" id="formContainer_dingjia"><li style="text-align:center;font-size: 15px;">规格定价</li></ul>' +
                                    '</form>'
                            });
                            dw.close().remove();
                            dw1.showModal();

                            var temp_field = [];

                            items.map(function(item) {
                                var temp_field_item = {};
                                temp_field_item.field = item.level;
                                temp_field_item.title = item.name;
                                temp_field_item.required = true;
                                temp_field.push(temp_field_item);

                            });
                            buildDetail({
                                container: $('#formContainer_dingjia'),
                                fields: temp_field,
                                buttons: [{
                                    title: '确定',
                                    handler: function() {

                                        if ($('#popFormDingjia').valid()) {
                                            var data = $('#popFormDingjia').serializeObject();
                                            delete data.code;
                                            var arrTemp2 = data;
                                            var specsPriceList = [];


                                            for (var key in data) {
                                                var temp2 = {};
                                                temp2.level = key;
                                                temp2.price = data[key];
                                                specsPriceList.push(temp2);
                                            }
                                            temp.specsPriceList = specsPriceList;
                                            specList.push(temp);
                                            dw1.close().remove();
                                            var d = 0;
                                            var dingjiaTemp = '<div id="dingjiaDom' + d + '">';
                                            console.log(arrTemp2);
                                            console.log(specsPriceList);
                                            specsPriceList.map(function(item) {
                                                // specsPriceList.map(function (index1, item1) {
                                                dingjiaTemp += '<span style="width : 110px;padding:20px 40px;display: inline-block">' + item.price + '</span>'
                                                    // awardHtml += awardTemp;
                                            });
                                            dingjiaTemp += '</div>';


                                            $('#dingjiaHtml').append(dingjiaTemp);
                                            d++;
                                        }
                                    }
                                }, {
                                    title: '取消',
                                    handler: function() {
                                        dw1.close().remove();
                                    }
                                }]
                            });
                            hideLoading();
                        }
                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });
            hideLoading();
        });


        var awardList = [];
        var v = 0;

        // 添加奖励机制
        $('#add2Btn').click(function jiangli() {
            console.log(v);
            var value = items[v].name;
            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该产品的奖励机制</li></ul>' +
                    '</form>',

                // fixed : true,
                // top : '-100000px',
                // left : '0'
            });
            // dw.__offset()
            dw.showModal();



            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'level',
                    title: '等级',
                    required: true,
                    value: value,
                    readonly: true
                }, {
                    field: 'type',
                    title: '类型',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '推荐奖励',
                        '1': '出货奖励'
                    }
                }, {
                    field: 'value1',
                    title: '直接推荐/出货奖励',
                    required: true
                }, {
                    field: 'value2',
                    title: '间接推荐奖励'
                }, {
                    field: 'value3',
                    title: '次推荐奖励'
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            var temp = {};
                            temp.level = items[v].level;
                            temp.type = data.type;
                            temp.value1 = data.value1;
                            temp.value2 = data.value2;
                            temp.value3 = data.value3;

                            awardList.push(temp);
                            if (v < items.length - 1) {
                                v += 1;
                                dw.close().remove();
                                jiangli();
                            } else {
                                dw.close().remove();
                                awardList.map(function(index, item) {
                                    // console.log(items[index.level].name);
                                    var awardTemp =
                                        '<div id="awardDom' + item + '">' +
                                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + items[index.level - 1].name + '</span>' +
                                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + index.type + '</span>' +
                                        '<span style="width : 140px;padding:20px 40px;display: inline-block">' + index.value1 + '</span>' +
                                        '<span style="width : 140px;padding:20px 40px;display: inline-block">' + index.value2 + '</span>' +
                                        '<span style="width : 140px;padding:20px 40px;display: inline-block">' + index.value3 + '</span>' +
                                        '<input id="editAwardBtn_' + item + '" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>' +
                                        '</div>'
                                    awardHtml += awardTemp;

                                });



                                $('#awardContent').append(awardHtml);

                                // 修改奖励机制按钮点击事件
                                $('.editAwardBtn').click(function(e) {
                                    var index = e.target.id.split('_')[1];
                                    var value = items[index].name;
                                    var dw = dialog({
                                        content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                                            '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该产品的奖励机制</li></ul>' +
                                            '</form>',
                                    });
                                    dw.showModal();

                                    buildDetail({
                                        container: $('#formContainer'),
                                        fields: [{
                                            field: 'level',
                                            title: '等级',
                                            required: true,
                                            value: value,
                                            readonly: true
                                        }, {
                                            field: 'type',
                                            title: '类型',
                                            required: true,
                                            type: 'select',
                                            data: {
                                                '0': '推荐奖励',
                                                '1': '出货奖励'
                                            }
                                        }, {
                                            field: 'value1',
                                            title: '直接推荐/出货奖励',
                                            required: true
                                        }, {
                                            field: 'value2',
                                            title: '间接推荐奖励'
                                        }, {
                                            field: 'value3',
                                            title: '次推荐奖励'
                                        }],
                                        buttons: [{
                                            title: '确定',
                                            handler: function() {
                                                if ($('#popForm').valid()) {
                                                    var data = $('#popForm').serializeObject();
                                                    data.level = +index + 1;
                                                    console.log(data);
                                                    console.log(index);
                                                    // awardList.map(function (item) {
                                                    //     console.log(item);
                                                    //
                                                    //     if(item.level-1 == index) {
                                                    //         console.log(item);
                                                    //         item = data;
                                                    //         item.level = +index+1;
                                                    //         console.log(item);
                                                    //     }
                                                    //     console.log(awardList);
                                                    //
                                                    // });
                                                    for (var v in awardList) {
                                                        console.log(v);
                                                        if (awardList[v].level - 1 == index) {
                                                            awardList[v] = data;
                                                            // awardList[v].level = +index+1;
                                                            console.log(awardList[v]);
                                                        }
                                                    }
                                                    console.log(awardList);
                                                    dw.close().remove();
                                                }

                                            }
                                        }, {
                                            title: '取消',
                                            handler: function() {
                                                dw.close().remove();
                                            }
                                        }]

                                    })
                                    hideLoading();
                                });
                                $('#add2Btn').addClass('hidden');


                            }
                        }
                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw.close().remove();
                    }
                }]
            });
            $('#type').change(function() {
                var type = $('#type').val();
                if (type == '1') {
                    $('#value2').parent().css('display', 'none');
                    $('#value3').parent().css('display', 'none');
                } else {
                    $('#value2').parent().css('display', 'block');
                    $('#value3').parent().css('display', 'block');
                }
            });
            hideLoading();


        });

    });

});