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
        var temp = '',
            specsList = [],
            isRem = false;
        for (var v of items) {
            html += '<label style="padding: 20px 40px"><b>*</b>' + v.name + '</label>'
        }
        html += '</div>';
        var fields = [{
            field: 'name',
            title: '产品名称',
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
                data.specsList = [];
                if (allData && !isRem) {
                    data.specsList = allData.specsList;
                }
                if (specsList.length > 0) {
                    //产品规格
                    for (let i = 0, len = specsList.length; i < len; i++) {
                        data.specsList.push(specsList[i]);
                    }
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
                specsList = data.specsList;
                let a = 0;
                specsList.map(function(item) {
                    let singleNumber = item.singleNumber ? item.singleNumber : '-';
                    var guigeTemp = '<div id="guigeDom' + a + '">' +
                        '<span style="width : 150px;padding:20px 60px;display: inline-block">' + item.name + '</span>' +
                        '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.number + '</span>' +
                        '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.stockNumber + '</span>' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.weight + '</span>' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.price / 1000 + '</span>' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + bool[item.isSingle] + '</span>' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + singleNumber + '</span>' +
                        '<input id="delguigeBtn_' + a + '" type="button" class="btn delguigeBtn" style="display: inline-block;!important;margin-left:0px;" value="删除"/>' +
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
            isRem = true;
            var id = e.target.id;
            var text = $('#' + id).parent().children(":first").text();
            for (var v = 0; v < specsList.length; v++) {
                if (specsList[v].name == text) {
                    specsList.splice(v, 1);
                    break;
                }
            }

            $('#guigeHtml').empty();
            $('#dingjiaContent').empty();
            var a = 0;
            specsList.map(function(item) {
                let singleNumber = item.singleNumber ? item.singleNumber : '-';
                var guigeTemp = '<div id="guigeDom' + a + '">' +
                    '<span style="width : 150px;padding:20px 60px;display: inline-block">' + item.name + '</span>' +
                    '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.number + '</span>' +
                    '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.stockNumber + '</span>' +
                    '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.weight + '</span>' +
                    '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.price / 1000 + '</span>' +
                    '<span style="width : 120px;padding:20px 40px;display: inline-block">' + bool[item.isSingle] + '</span>' +
                    '<span style="width : 120px;padding:20px 40px;display: inline-block">' + singleNumber + '</span>' +
                    '<input id="delguigeBtn_' + a + '" type="button" class="btn delguigeBtn" style="display: inline-block;!important; margin-left: 0px;" value="删除"/>' +
                    '</div>';


                $('#guigeHtml').append(guigeTemp);
                a++;
            });
        });

        var b = 0;
        var specList = [];
        var dingjiaDom = 0;
        // 添加产品规格
        $('#add1Btn').click(function() {
            var g = specsList.length;
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
                            let singleNumber = temp.singleNumber ? temp.singleNumber : '-'
                            var guigeTemp = '<div id="guigeDom' + g + '">' +
                                '<span style="width : 150px;padding:20px 60px;display: inline-block">' + temp.name + '</span>' +
                                '<span style="width : 150px;padding:20px 40px;display: inline-block">' + temp.number + '</span>' +
                                '<span style="width : 150px;padding:20px 40px;display: inline-block">' + temp.stockNumber + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.weight + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.price / 1000 + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + bool[temp.isSingle] + '</span>' +
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + singleNumber + '</span>' +
                                '<input id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:0px;display: inline-block;!important;" value="删除"/>'
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
                            specsList.push(temp);
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