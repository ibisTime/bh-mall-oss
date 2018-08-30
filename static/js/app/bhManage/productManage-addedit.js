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
        var bool = {
            '0': '否',
            '1': '是'
        };
        var html = '<div>';
        var guigeHtml = '';
        var dingjiaHtml = '';
        var allData = '';
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
            field: 'orderNo',
            title: '排序'
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
            field: 'slogan',
            title: '广告语',
            required: true
        }, {
            field: 'remark',
            title: '备注'
        }];
        buildDetail({
            fields: fields,
            code: code,
            detailCode: '627712',
            addCode: '627700',
            editCode: '627702',
            beforeSubmit: function(data) {
                if (allData) {
                    data.specsList = allData.specsList;
                }
                if (specList.length > 0) {
                    //产品规格
                    data.specsList = specList;
                }
                if (awardList.length > 0) {
                    // 奖励机制
                    data.awardList = awardList;
                }

                data.updater = getUserId();

                data.specsList.forEach(item => {
                    if (!item.singleNumber) {
                        item.singleNumber = 0
                    }
                })

                return data
            },
            afterData: function(data) {
                allData = data;
            }
        });
        if (code) {
            reqApi({
                code: '627712',
                json: {
                    code: code
                }
            }, true).then(function(data) {
                let specsList = data.specsList;
                let a = 0;
                specsList.map(function(item) {
                    item.price = item.price / 1000;
                    var guigeTemp = '<div id="guigeDom' + a + '">' +
                        '<span style="width : 150px;padding:20px 60px;display: inline-block">' + item.name + '</span>' +
                        '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.number + '</span>' +
                        '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.stockNumber + '</span>' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.weight + '</span>' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.price + '</span>' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + bool[item.isSingle] + '</span>' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.singleNumber + '</span>' +
                        '<input id="delguigeBtn_' + a + '" type="button" class="btn delguigeBtn" style="display: inline-block;!important;" value="删除"/>' +
                        '</div>';
                    $('#guigeHtml').append(guigeTemp);
                    a++;
                });
            })
        }
        hideLoading();
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">产品规格<input id="add1Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">' +
            '<label style="padding: 20px 40px"><b>*</b>规格名称</label>' +
            '<label style="padding: 20px 40px"><b>*</b>规格包含数量</label>' +
            '<label style="padding: 20px 40px"><b>*</b>库存</label>' +
            '<label style="padding: 20px 40px"><b>*</b>重量(g)</label>' +
            '<label style="padding: 20px 40px"><b>*</b>价格</label>' +
            '<label style="padding: 20px 40px"><b>*</b>是否允许拆单</label>' +
            '<label style="padding: 20px 40px"><b>*</b>拆单数量</label>' +
            '<div id="guigeHtml"></div>' +
            '</div>' +
            '</div>');


        // 删除产品规格
        $('#guigeHtml').on('click', '.delguigeBtn', function delguige(e) {
            var id = e.target.id;
            var text = $('#' + id).parent().children(":first").text();
            for (var v = 0; v < specList.length; v++) {
                if (specList[v].name == text) {
                    specList.splice(v, 1);
                    break;
                }
            }

            $('#guigeHtml').empty();
            $('#dingjiaContent').empty();
            var a = 0;
            specList.map(function(item) {
                var guigeTemp = '<div id="guigeDom' + a + '">' +
                    '<span style="width : 150px;padding:20px 60px;display: inline-block">' + item.name + '</span>' +
                    '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.number + '</span>' +
                    '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.stockNumber + '</span>' +
                    '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.weight + '</span>' +
                    '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.price + '</span>' +
                    '<span style="width : 120px;padding:20px 40px;display: inline-block">' + bool[item.isSingle] + '</span>' +
                    '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.singleNumber + '</span>' +
                    '<input id="delguigeBtn_' + a + '" type="button" class="btn delguigeBtn" style="display: inline-block;!important; margin-left: 0px;" value="删除"/>' +
                    '</div>';


                $('#guigeHtml').append(guigeTemp);

                // var dingjiaHtml = '<tr id="dingjiaOutDom' + a + '">';
                var dingjiaHtml = '';
                for (var v = 0; v < item.specsPriceList.length; v++) {
                    var dingjiaTemp = '<tr class="dingjiaDom' + v + '">' +
                        '<td>' + item.name + '</td>' +
                        '<td>' + items[item.specsPriceList[v].level - 1].name + '</td>' +
                        '<td>' + moneyFormat(item.specsPriceList[v].price) + '</td>' +
                        '<td>' + moneyFormat(item.specsPriceList[v].changePrice) + '</td>' +
                        '<td>' + item.specsPriceList[v].dailyNumber + '</td>' +
                        '<td>' + item.specsPriceList[v].weeklyNumber + '</td>' +
                        '<td>' + item.specsPriceList[v].monthlyNumber + '</td>' +
                        '<td>' + bool[item.specsPriceList[v].isBuy] + '</td>' +
                        '<td>' + item.specsPriceList[v].minNumber + '</td>' +
                        '<td>' + item.specsPriceList[v].singleNumber + '</td>' +
                        '</tr>'
                    dingjiaHtml += dingjiaTemp;
                }
                $('#dingjiaContent').append(dingjiaHtml);
                a++;
            });
        });

        // 修改出货奖励
        $('#awardCHContent').on('click', '.editAwardCHBtn', function editAwardCH(e) {
            var index = (+e.target.id.split('_')[1]);
            var value = items[index].name;
            var dw2 = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该产品的出货奖励机制</li></ul>' +
                    '</form>',
            });
            dw2.showModal();

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
                    value: '1',
                    hidden: true
                }, {
                    field: 'value1',
                    title: '出货奖励',
                    required: true
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            data.level = +index + 1;
                            for (var v in awardList) {
                                if (awardList[v].level - 1 == index && awardList[v].type == data.type) {
                                    awardList[v].value1 = data.value1;
                                }
                            }
                            var awardTemp =
                                // '<div id="awardDom'+index+'">'+
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + items[data.level - 1].name + '</span>' +
                                // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
                                '<span style="width : 140px;padding:20px 40px;display: inline-block">' + (+data.value1 + '%') + '</span>' +
                                // '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value2+'</span>'+
                                // '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value3+'</span>'+
                                '<input id="editAwardCHBtn_' + index + '" type="button" class="btn editAwardCHBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'
                                // '</div>'
                            $('#awardCHDom' + index).empty().append(awardTemp);
                            dw2.close().remove();
                        }

                    }
                }, {
                    title: '取消',
                    handler: function() {
                        goBack();
                    }
                }]

            })
            hideLoading();
        });
        var b = 0;
        var specList = [];
        var dingjiaDom = 0;
        // 添加产品规格
        $('#add1Btn').click(function() {
            var g = specList.length;
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
                    field: 'stockNumber',
                    title: '库存',
                    required: true
                }, {
                    field: 'weight',
                    title: '重量(g)',
                    required: true
                }, {
                    field: 'price',
                    title: '价格',
                    amount: true,
                    required: true
                }, {
                    field: 'isSingle',
                    title: '是否允许拆单',
                    required: true,
                    type: 'select',
                    data: {
                        '1': '是',
                        '0': '否'
                    }
                }, {
                    field: 'singleNumber',
                    title: '拆单数量'
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {

                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            if (data.singleNumber <= 0 && data.isSingle != 0) {
                                $('#singleNumber').css('border', '1px solid red');
                                toastr.info('拆单数量不能小于或等于0');
                                return;
                            } else {
                                $('#singleNumber').css('border', '1px solid #ced9df');
                            }
                            temp.name = data.name;
                            temp.number = data.number;
                            temp.stockNumber = data.stockNumber;
                            temp.singleNumber = data.singleNumber;
                            temp.weight = data.weight;
                            temp.price = data.price;
                            temp.isSingle = data.isSingle;

                            var guigeTemp = '<div id="guigeDom' + g + '">' +
                                '<span style="width : 150px;padding:20px 60px;display: inline-block">' + temp.name + '</span>' +
                                '<span style="width : 150px;padding:20px 40px;display: inline-block">' + temp.number + '</span>' +
                                '<span style="width : 150px;padding:20px 40px;display: inline-block">' + temp.stockNumber + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.weight + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.price / 1000 + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + bool[temp.isSingle] + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.singleNumber + '</span>' +
                                '<input id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>'
                            '</div>';

                            $('#guigeHtml').append(guigeTemp);

                            dw.close().remove();
                            var circleList = []
                            for (var p = 0; p < items.length; p++) {
                                var field1 = {
                                    field: items[p].level,
                                    title: '等级',
                                    value: items[p].name,
                                    readonly: true
                                };
                                var field2 = {
                                    field: 'price' + p,
                                    title: '价格',
                                    required: true
                                };
                                var field3 = {
                                    field: 'changePrice' + p,
                                    title: '换货价',
                                    required: true
                                };

                                circleList.push(field1, field2, field3);
                            }
                            specList.push(temp);
                            hideLoading();
                            dingjiaDom++;
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
    });

});