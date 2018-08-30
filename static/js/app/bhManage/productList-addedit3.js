$(function() {
    var code = getQueryString('code');
    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var detailData = [],
            awardDetail = [];
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
        var guigeHtml = '';
        var dingjiaHtml = '';
        var temp = '';
        var dingjiaDom = 0;
        var fields = [{
            field: 'name',
            title: '产品名称',
            required: true
        }, {
            field: 'adPrice',
            title: '建议价',
            amount: true,
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
            title: '虚拟库存',
            'Z+': true,
            required: true
        }, {
            field: 'realNumber',
            title: '实际库存',
            'Z+': true,
            required: true
        }, {
            field: 'slogan',
            title: '广告语',
            required: true
        }, {
            field: 'isTotal',
            title: '是否计入出货奖励',
            type: 'select',
            data: {
                '1': '是',
                '0': '否'
            },
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
                var type0 = [];

                function ftype0(item) {
                    if (item.type == '0') {
                        return item
                    }
                }
                type0 = awardList.filter(ftype0);
                if (data.specList.length <= 0 || awardList.length <= 0) {
                    toastr.info('请检查您是否填写规格体系以及奖励机制');
                    return
                }
                data.updater = getUserId();
                return data
            }
        });
        hideLoading();

        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">规格定价</span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">' +
            '<table id="dingjiaTitle" style="width: 100%;">' +
            '<thead>' +
            '<tr><th>规格</th><th>等级</th><th>价格</th><th>换货价</th><th>每日限购</th><th>每周限购</th><th>每月限购</th><th>是否可购买</th><th>云仓最少发货数量</th><th>起购数量</th><th>操作</th></tr>' +
            '</thead>' +
            '<tbody id="dingjiaContent"></tbody>' +
            '</table>' +
            '</div>' +
            '</div>');

        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">产品规格<input id="add1Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<table style="border: 1px solid #ced9df;width: 100%;">' +
            '<thead>' +
            '<tr><th>规格名称</th><th>规格包含数量</th><th>库存</th><th>重量(g)</th><th>是否允许普通单下单</th><th>是否允许授权单下单</th><th>是否允许升级单下单</th><th>是否可拆单</th><th>拆单数量</th><th>操作</th></tr>' +
            '</thead>' +
            '<tbody id="guigeHtml"></tbody>' +
            '</table>' +
            // '<div style="border: 1px solid #ced9df;">' +
            // '<div style="display: flex;">' +
            // '<label style="padding: 20px 20px"><b>*</b>规格名称</label>' +
            // '<label style="padding: 20px 20px"><b>*</b>规格包含数量</label>' +
            // '<label style="padding: 20px 20px"><b>*</b>库存</label>' +
            // '<label style="padding: 20px 20px"><b>*</b>重量(g)</label>' +
            // '<label style="padding: 20px 20px"><b>*</b>是否允许普通单下单</label>' +
            // '<label style="padding: 20px 20px"><b>*</b>是否允许授权单下单</label>' +
            // '<label style="padding: 20px 20px"><b>*</b>是否允许升级单下单</label>' +
            // '<label style="padding: 20px 20px"><b>*</b>是否可拆单</label>' +
            // '<label style="padding: 20px 20px"><b>*</b>拆单数量</label>' +
            // '<label style="padding: 20px 40px"><b>*</b>操作</label>' +
            // '</div>' +
            // '<div id="guigeHtml"></div>' +
            // '</div>' +
            '</div>');

        // var awardHtml1 = '';
        // $('#remark').parent().after(
        //     '<div style="width:100%">' +
        //     '<span style="font-size: 18px">出货奖励机制(请输入1~100之间的数字)<input id="add3Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
        //     '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
        //     '<div style="border: 1px solid #ced9df">' +
        //     '<div id="awardTitle">' +
        //     '<label style="padding: 20px 40px"><b>*</b>等级</label>' +
        //     '<label style="padding: 20px 40px"><b>*</b>出货奖励</label>' +
        //     '</div>' +
        //     '<div id="awardCHContent"></div>' +
        //     '</div>' +
        //     '</div>')

        var awardHtml = '';
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">推荐奖励机制(请输入1~100之间的数字)<input id="add2Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">' +
            '<div id="awardTitle">' +
            '<label style="padding: 20px 40px"><b>*</b>等级</label>' +
            '<label style="padding: 20px 40px"><b>*</b>直接推荐奖励(%)</label>' +
            '<label style="padding: 20px 40px"><b>*</b>间接推荐奖励(%)</label>' +
            '<label style="padding: 20px 40px"><b>*</b>次推荐奖励(%)</label>' +
            '</div>' +
            '<div id="awardContent"></div>' +
            '</div>' +
            '</div>')

        // 删除产品规格
        $('#guigeHtml').on('click', '.delguigeBtn', function delguige(e) {
            dingjiaDom--;
            var id = e.target.id;
            var text = $('#' + id).parent().children(":first").text();
            for (var v = 0; v < specList.length; v++) {
                if (specList[v].name == text) {
                    specList.splice(v, 1);
                    break;
                }
            }
            specList = [...new Set(specList)];
            detailData = specList;
            $('#guigeHtml').empty();
            $('#dingjiaContent').empty();
            let a = 0;
            specList.map(function(item) {
                var guigeTemp = '<div id="guigeDom' + a + '" style="display:flex;">' +
                    '<span style="width : 150px;padding:20px 60px;display: inline-block">' + item.name + '</span>' +
                    '<span style="width : 150px;padding:20px 40px;display: inline-block">' + item.number + '</span>' +
                    '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.weight + '</span>' +
                    '<span style="width : 180px;padding:20px 40px;display: inline-block">' + bool[item.isNormalOrder] + '</span>' +
                    '<span style="width : 170px;padding:20px 40px;display: inline-block">' + bool[item.isSqOrder] + '</span>' +
                    '<span style="width : 170px;padding:20px 40px;display: inline-block">' + bool[item.isSjOrder] + '</span>' +
                    '<span style="width : 170px;padding:20px 40px;display: inline-block">' + bool[item.isSingle] + '</span>' +
                    '<span style="width : 170px;padding:20px 40px;display: inline-block">' + item.singleNumber + '</span>' +
                    '<input id="delguigeBtn_' + a + '" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>' +
                    '<input id="editBtn_' + a + '" data-name="' + item.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;" value="修改"/>' +
                    '</div>';


                $('#guigeHtml').append(guigeTemp);

                // var dingjiaHtml = '<tr id="dingjiaOutDom' + a + '">';
                var dingjiaHtml = '';
                a++;

                for (var v = 0; v < item.specsPriceList.length; v++) {
                    var dingjiaTemp = '<tr class="dingjiaDom' + v + '"  data-index=' + a + '>' +
                        '<td>' + item.name + '</td>' +
                        '<td>' + items[item.specsPriceList[v].level - 1].name + '</td>' +
                        '<td>' + moneyFormat(item.specsPriceList[v].price) + '</td>' +
                        '<td>' + moneyFormat(item.specsPriceList[v].changePrice) + '</td>' +
                        '<td>' + item.specsPriceList[v].dailyNumber + '</td>' +
                        '<td>' + item.specsPriceList[v].weeklyNumber + '</td>' +
                        '<td>' + item.specsPriceList[v].monthlyNumber + '</td>' +
                        '<td>' + bool[item.specsPriceList[v].isBuy] + '</td>' +
                        '<td>' + item.specsPriceList[v].minNumber + '</td>' +
                        '<td>' + item.specsPriceList[v].startNumber + '</td>' +
                        `<td>
                            <input data-index="${a}"
                            data-sindex="${v}"
                            data-name="${item.name}"
                            type="button" class="btn specEditBtn"
                            style="margin-left:0px;margin-top: 0;" value="修改"/>
                        </td>` +
                        '</tr>'
                    dingjiaHtml += dingjiaTemp;
                }
                $('#dingjiaContent').append(dingjiaHtml);
            });
        });

        // 修改推荐奖励
        $('#awardContent').on('click', '.editAwardBtn', function editAward(e) {
            var index = e.target.id.split('_')[1];
            var value = items[index].name;
            let awardList = awardDetail[index];
            let value1 = (awardList.value1);
            let value2 = (awardList.value2);
            let value3 = (awardList.value3);
            let dw = dialog({
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
                    value: '0',
                    hidden: true
                }, {
                    field: 'value1',
                    title: '直接推荐奖励(%)',
                    'Z': true,
                    required: true,
                    value: value1
                }, {
                    field: 'value2',
                    title: '间接推荐奖励(%)',
                    'Z': true,
                    required: true,
                    value: value2
                }, {
                    field: 'value3',
                    title: '次推荐奖励(%)',
                    'Z': true,
                    required: true,
                    value: value3
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            data.level = +index + 1;
                            for (var v in awardDetail) {
                                if (awardDetail[v].level - 1 == index && awardDetail[v].type == data.type) {
                                    awardDetail[v].value1 = data.value1;
                                    awardDetail[v].value2 = data.value2;
                                    awardDetail[v].value3 = data.value3;
                                }
                            }
                            var awardTemp =
                                // '<div id="awardDom'+index+'">'+
                                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + items[data.level - 1].name + '</span>' +
                                // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
                                '<span style="width : 140px;padding:20px 40px;display: inline-block">' + (+data.value1) + '</span>' +
                                '<span style="width : 140px;padding:20px 40px;display: inline-block">' + (+data.value2) + '</span>' +
                                '<span style="width : 140px;padding:20px 40px;display: inline-block">' + (+data.value3) + '</span>' +
                                '<input id="editAwardBtn_' + index + '" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'
                                // '</div>'

                            $('#awardDom' + index).empty().append(awardTemp);
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
        })

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
                        dw.close().remove();
                    }
                }]

            })
            hideLoading();
        });
        var b = 0;
        var specList = [];

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
                    'Z+': true,
                    required: true
                }, {
                    field: 'stockNumber',
                    title: '库存',
                    'Z+': true,
                    required: true
                }, {
                    field: 'weight',
                    title: '重量(g)',
                    'Z+': true,
                    required: true
                }, {
                    field: 'isNormalOrder',
                    title: '是否允许普通单下单',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    }
                }, {
                    field: 'isSqOrder',
                    title: '是否允许授权单下单',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    }
                }, {
                    field: 'isSjOrder',
                    title: '是否允许升级单下单',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    }
                }, {
                    field: 'isSingle',
                    title: '是否可拆单',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    }
                }, {
                    field: 'singleNumber',
                    title: '拆单数量',
                    'Z+': true
                }],
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            if (temp.isSingle == 0) {
                                data.singleNumber = 0;
                            }
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
                            temp.weight = data.weight;
                            temp.isNormalOrder = data.isNormalOrder;
                            temp.isSqOrder = data.isSqOrder;
                            temp.isSjOrder = data.isSjOrder;
                            temp.isSingle = data.isSingle;
                            temp.singleNumber = data.singleNumber ? data.singleNumber : '';
                            // var guigeTemp = '<div id="guigeDom' + g + '" style="display:flex;">' +
                            //     '<span style="width : 120px;padding:20px 50px;display: inline-block">' + temp.name + '</span>' +
                            //     '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.number + '</span>' +
                            //     '<span style="width : 260px;padding:20px 40px;display: inline-block">' + temp.stockNumber + '</span>' +
                            //     '<span style="width : 260px;padding:20px 40px;display: inline-block">' + temp.weight + '</span>' +
                            //     '<span style="width : 260px;padding:20px 40px;display: inline-block">' + bool[temp.isNormalOrder] + '</span>' +
                            //     '<span style="width : 220px;padding:20px 40px;display: inline-block">' + bool[temp.isSqOrder] + '</span>' +
                            //     '<span style="width : 220px;padding:20px 40px;display: inline-block">' + bool[temp.isSjOrder] + '</span>' +
                            //     '<span style="width : 240px;padding:20px 40px;display: inline-block">' + bool[temp.isSingle] + '</span>' +
                            //     '<span style="width : 200px;padding:20px 40px;display: inline-block">' + temp.singleNumber + '</span>' +
                            //     '<input id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>' +
                            //     '<input id="editBtn_' + g + '" data-name="' + temp.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;" value="修改"/>' +
                            //     '</div>';
                            var guigeTemp = '<tr id="guigeDom' + g + '">' +
                                '<td>' + temp.name + '</td>' +
                                '<td>' + temp.number + '</td>' +
                                '<td>' + temp.stockNumber + '</td>' +
                                '<td>' + temp.weight + '</td>' +
                                '<td>' + bool[temp.isNormalOrder] + '</td>' +
                                '<td>' + bool[temp.isSqOrder] + '</td>' +
                                '<td>' + bool[temp.isSjOrder] + '</td>' +
                                '<td>' + bool[temp.isSingle] + '</td>' +
                                '<td>' + temp.singleNumber + '</td>' +
                                '<td style="display: flex;">' +
                                '<input data-name="' + temp.name + '" id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:0px;margin-top: 0;" value="删除"/>' +
                                '<input id="editBtn_' + g + '" data-code="' + temp.code + '" data-name="' + temp.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
                                '</td>' +
                                '</tr>';
                            $('#guigeHtml').append(guigeTemp);

                            dw.close().remove();
                            var circleList = []
                            for (var p = 0; p < items.length - 1; p++) {
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

                            var dw1 = dialog({
                                content: '<form class="pop-form-dingjia" id="popFormDingjia" novalidate="novalidate">' +
                                    '<ul class="form-info" id="formContainer_dingjia"><li style="text-align:center;font-size: 15px;">请输入规格定价</li></ul>' +
                                    '</form>'
                            });

                            dw1.showModal();
                            buildDetail({
                                container: $('#formContainer_dingjia'),
                                fields: circleList,
                                buttons: [{
                                    title: '确定',
                                    handler: function() {
                                        if ($('#popFormDingjia').valid()) {
                                            var data = $('#popFormDingjia').serializeObject();
                                            dw1.close().remove();
                                            var specsPriceList = []
                                            for (var v of items) {
                                                if (v.level != 6) {
                                                    var price1 = 'price' + (v.level - 1);
                                                    var changePrice1 = 'changePrice' + (v.level - 1);

                                                    var temp1 = {};
                                                    temp1.level = v.level;
                                                    temp1.price = +data[price1] * 1000;
                                                    temp1.changePrice = +data[changePrice1] * 1000;

                                                    specsPriceList.push(temp1);
                                                }
                                            }
                                            // temp.specsPriceList = specsPriceList;

                                            var xiangouList = [];
                                            var dictInfo = {
                                                0: '否',
                                                1: '是'
                                            };
                                            for (var p = 0; p < items.length - 1; p++) {
                                                xiangouList = xiangouList.concat([{
                                                    field: items[p].level,
                                                    title: '等级',
                                                    value: items[p].name,
                                                    readonly: true
                                                }, {
                                                    field: 'dailyNumber' + p,
                                                    title: '日限购',
                                                    'Z': true,
                                                    required: true
                                                }, {
                                                    field: 'weeklyNumber' + p,
                                                    title: '周限购',
                                                    'Z': true,
                                                    required: true
                                                }, {
                                                    field: 'monthlyNumber' + p,
                                                    title: '月限购',
                                                    'Z': true,
                                                    required: true
                                                }, {
                                                    field: 'isBuy' + p,
                                                    title: '是否可购买',
                                                    type: 'select',
                                                    data: dictInfo,
                                                    required: true
                                                }, {
                                                    field: 'minNumber' + p,
                                                    title: '云仓最少发货数量',
                                                    'Z': true,
                                                    required: true
                                                }, {
                                                    field: 'startNumber' + p,
                                                    title: '起购数量',
                                                    'Z': true,
                                                    required: true
                                                }]);
                                            }

                                            var dw2 = dialog({
                                                content: '<form class="pop-form-dingjia" id="popFormXiangou" novalidate="novalidate">' +
                                                    '<ul class="form-info" id="formContainer_xiangou"><li style="text-align:center;font-size: 15px;">请输入限购设置</li></ul>' +
                                                    '</form>'
                                            });

                                            dw2.showModal();
                                            buildDetail({
                                                container: $('#formContainer_xiangou'),
                                                fields: xiangouList,
                                                buttons: [{
                                                    title: '确定',
                                                    handler: function() {
                                                        if ($('#popFormXiangou').valid()) {
                                                            var data = $('#popFormXiangou').serializeObject();
                                                            dw2.close().remove();
                                                            // var specsPriceList = []
                                                            for (var i = 0; i < items.length - 1; i++) {
                                                                let v = items[i];
                                                                let dailyNumber = 'dailyNumber' + (v.level - 1);
                                                                let weeklyNumber = 'weeklyNumber' + (v.level - 1);
                                                                let monthlyNumber = 'monthlyNumber' + (v.level - 1);
                                                                let isBuy = 'isBuy' + (v.level - 1);
                                                                let minNumber = 'minNumber' + (v.level - 1);
                                                                let startNumber = 'startNumber' + (v.level - 1);
                                                                specsPriceList[i].dailyNumber = data[dailyNumber];
                                                                specsPriceList[i].weeklyNumber = data[weeklyNumber];
                                                                specsPriceList[i].monthlyNumber = data[monthlyNumber];
                                                                specsPriceList[i].isBuy = data[isBuy];
                                                                specsPriceList[i].minNumber = data[minNumber];
                                                                specsPriceList[i].startNumber = data[startNumber];
                                                            }
                                                            temp.specsPriceList = specsPriceList;

                                                            // var dingjiaHtml = '<div id="dingjiaOutDom' + dingjiaDom + '">';
                                                            var dingjiaHtml = '';
                                                            for (var v = 0; v < specsPriceList.length; v++) {
                                                                var dingjiaTemp = '<tr class="dingjiaDom' + v + '" data-index=' + dingjiaDom + '>' +
                                                                    '<td class="shopName' + dingjiaDom + '">' + temp.name + '</td>' +
                                                                    '<td>' + items[specsPriceList[v].level - 1].name + '</td>' +
                                                                    '<td>' + (+specsPriceList[v].price / 1000) + '</td>' +
                                                                    '<td>' + (+specsPriceList[v].changePrice / 1000) + '</td>' +
                                                                    '<td>' + (specsPriceList[v].dailyNumber) + '</td>' +
                                                                    '<td>' + (specsPriceList[v].weeklyNumber) + '</td>' +
                                                                    '<td>' + (specsPriceList[v].monthlyNumber) + '</td>' +
                                                                    '<td>' + (dictInfo[specsPriceList[v].isBuy]) + '</td>' +
                                                                    '<td>' + (specsPriceList[v].minNumber) + '</td>' +
                                                                    '<td>' + (specsPriceList[v].startNumber) + '</td>' +
                                                                    `<td>
                                                                        <input data-index="${dingjiaDom}"
                                                                        data-sindex="${v}"
                                                                        data-name="${temp.name}"
                                                                        type="button" class="btn specEditBtn"
                                                                        style="margin-left:0px;margin-top: 0;" value="修改"/>
                                                                    </td>`
                                                                '</tr>';
                                                                dingjiaHtml += dingjiaTemp;
                                                            }

                                                            // dingjiaHtml += '</div>';
                                                            $('#dingjiaContent').append(dingjiaHtml);

                                                            specList.push(temp);
                                                            detailData.push(temp);
                                                        }
                                                    }
                                                }]
                                            });
                                            hideLoading();
                                        }
                                    }
                                }]
                            });
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
        // 添加推荐奖励机制
        $('#add2Btn').click(function jiangli() {
            var value = items[v].name;
            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该产品的推荐奖励机制</li></ul>' +
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
                    value: '0',
                    hidden: true
                }, {
                    field: 'value1',
                    title: '直接推荐奖励(%)',
                    'Z': true,
                    required: true
                }, {
                    field: 'value2',
                    title: '间接推荐奖励(%)',
                    'Z': true,
                    required: true
                }, {
                    field: 'value3',
                    title: '次推荐奖励(%)',
                    'Z': true,
                    required: true
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
                            awardDetail.push(temp);
                            if (v < items.length - 2) {
                                v += 1;
                                dw.close().remove();
                                jiangli();
                            } else {
                                dw.close().remove();
                                var type0 = [];

                                function ftype0(item) {
                                    if (item.type == '0') {
                                        return item
                                    }
                                }
                                type0 = awardList.filter(ftype0);
                                type0.map(function(index, item) {
                                    // if (item < 5) {
                                    var awardTemp = '<div id="awardDom' + item + '">' +
                                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + items[index.level - 1].name + '</span>' +
                                        '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value1) + '</span>' +
                                        '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value2) + '</span>' +
                                        '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value3) + '</span>' +
                                        '<input id="editAwardBtn_' + item + '" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>' +
                                        '</div>'
                                    awardHtml += awardTemp;
                                    // }
                                });
                                $('#awardContent').append(awardHtml);
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

        // 修改产品规格
        $('#guigeHtml').on('click', '.delguigeEditBtn', function(e) {
            specList = [...new Set(specList)];
            var g = specList.length - 1;
            var code = $(this).data('code');
            var name = $(this).data('name');
            for (var i = specList.length - 1; i >= 0; i--) {
                if (specList[i].name == name) {
                    g = i;
                    break;
                }
            }
            var useData = specList[g];
            useData.name0 = useData.name;
            useData.isSqOrder = useData.isSqOrder;

            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入规格</li></ul>' +
                    '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'name0',
                    title: '规格名称',
                    required: true
                }, {
                    field: 'number',
                    title: '规格包含数量',
                    'Z+': true,
                    required: true
                }, {
                    field: 'stockNumber',
                    title: '库存',
                    'Z+': true,
                    required: true
                }, {
                    field: 'weight',
                    title: '重量(g)',
                    'Z+': true,
                    required: true
                }, {
                    field: 'isNormalOrder',
                    title: '是否允许普通单下单',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    }
                }, {
                    field: 'isSqOrder',
                    title: '是否允许授权单下单',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    }
                }, {
                    field: 'isSjOrder',
                    title: '是否允许升级单下单',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    }
                }, {
                    field: 'isSingle',
                    title: '是否可拆单',
                    required: true,
                    type: 'select',
                    data: {
                        '0': '否',
                        '1': '是'
                    }
                }, {
                    field: 'singleNumber',
                    'Z+': true,
                    title: '拆单数量'
                }],
                useData: useData,
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popForm').valid()) {
                            var temp = $('#popForm').serializeObject();
                            if (temp.isSingle == 0) {
                                data.singleNumber = 0;
                            }
                            if (temp.singleNumber <= 0 && temp.isSingle != 0) {
                                $('#singleNumber').css('border', '1px solid red');
                                toastr.info('拆单数量不能小于或等于0');
                                return;
                            } else {
                                $('#singleNumber').css('border', '1px solid #ced9df');
                            }
                            temp.code = useData.code || '';
                            temp.name = temp.name0;
                            temp.isSqOrder = temp.isSqOrder;
                            // var guigeTemp = '<div id="guigeDom' + g + '" style="display:flex;">' +
                            //     '<span style="width : 200px;padding:20px 20px;display: inline-block">' + temp.name + '</span>' +
                            //     '<span style="width : 200px;padding:20px 20px;display: inline-block">' + temp.number + '</span>' +
                            //     '<span style="width : 200px;padding:20px 20px;display: inline-block">' + temp.stockNumber + '</span>' +
                            //     '<span style="width : 200px;padding:20px 20px;display: inline-block">' + temp.weight + '</span>' +
                            //     '<span style="width : 260px;padding:20px 20px;display: inline-block">' + bool[temp.isNormalOrder] + '</span>' +
                            //     '<span style="width : 260px;padding:20px 20px;display: inline-block">' + bool[temp.isSqOrder] + '</span>' +
                            //     '<span style="width : 260px;padding:20px 20px;display: inline-block">' + bool[temp.isSjOrder] + '</span>' +
                            //     '<span style="width : 260px;padding:20px 20px;display: inline-block">' + bool[temp.isSingle] + '</span>' +
                            //     '<span style="width : 260px;padding:20px 20px;display: inline-block">' + temp.singleNumber + '</span>' +
                            //     '<input id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>' +
                            //     '<input id="editBtn_' + g + '" data-name="' + temp.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;" value="修改"/>' +
                            //     '</div>';
                            var guigeTemp = '<tr id="guigeDom' + g + '">' +
                                '<td>' + temp.name + '</td>' +
                                '<td>' + temp.number + '</td>' +
                                '<td>' + temp.stockNumber + '</td>' +
                                '<td>' + temp.weight + '</td>' +
                                '<td>' + bool[temp.isNormalOrder] + '</td>' +
                                '<td>' + bool[temp.isSqOrder] + '</td>' +
                                '<td>' + bool[temp.isSjOrder] + '</td>' +
                                '<td>' + bool[temp.isSingle] + '</td>' +
                                '<td>' + temp.singleNumber + '</td>' +
                                '<td style="display:flex;">' +
                                '<input data-name="' + temp.name + '" id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:0px;margin-top: 0;" value="删除"/>' +
                                '<input id="editBtn_' + g + '" data-code="' + temp.code + '" data-name="' + temp.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
                                '</td>' +
                                '</tr>';

                            $('#guigeDom' + g).replaceWith(guigeTemp);

                            dw.close().remove();

                            specList[g] = {
                                ...specList[g],
                                ...temp
                            }
                            Array.from($('.shopName' + (g + 1))).forEach((item) => {
                                $(item).text(temp.name);
                            })
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

        // 规格定价修改
        $('#dingjiaTitle').on('click', '.specEditBtn', function(e) {
            e.stopPropagation();
            var me = $(this);
            var index = me.data('index');
            let sIndex = me.data('sindex');
            let detail = [...new Set(detailData)];
            var specs = detail[index - 1];
            var specList = specs.specsPriceList || specs.priceList;
            var priceInfo = specList[sIndex];
            var levelName = items.find(function(i) {
                return i.level == priceInfo.level;
            }).name;
            priceInfo.price0 = priceInfo.price;
            var xiangouList = [{
                field: 'level0',
                title: '等级',
                value: levelName,
                readonly: true
            }, {
                field: 'price0',
                title: '价格',
                amount: true,
                required: true
            }, {
                field: 'changePrice',
                title: '换货价',
                amount: true,
                required: true
            }, {
                field: 'dailyNumber',
                title: '日限购',
                'Z': true,
                required: true
            }, {
                field: 'weeklyNumber',
                title: '周限购',
                'Z': true,
                required: true
            }, {
                field: 'monthlyNumber',
                title: '月限购',
                'Z': true,
                required: true
            }, {
                field: 'isBuy',
                title: '是否可购买',
                type: 'select',
                data: bool,
                required: true
            }, {
                field: 'minNumber',
                title: '云仓最少发货数量',
                'Z': true,
                required: true
            }, {
                field: 'startNumber',
                title: '起购数量',
                'Z': true,
                required: true
            }];

            var dw2 = dialog({
                content: '<form class="pop-form-dingjia" id="popFormXiangou" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer_xiangou"><li style="text-align:center;font-size: 15px;">请输入限购设置</li></ul>' +
                    '</form>'
            });

            dw2.showModal();
            buildDetail({
                container: $('#formContainer_xiangou'),
                fields: xiangouList,
                useData: priceInfo,
                buttons: [{
                    title: '确定',
                    handler: function() {
                        if ($('#popFormXiangou').valid()) {
                            var specsPrice = $('#popFormXiangou').serializeObject();
                            specsPrice.price = specsPrice.price0;
                            dw2.close().remove();
                            specsPrice.code = priceInfo.code || '';
                            specsPrice.level = priceInfo.level;
                            priceInfo = specsPrice;
                            specList.splice(sIndex, 1, priceInfo);
                            detailData.splice(index, 1, specs);
                            let dataList = specs.specsPriceList[sIndex];
                            let startNumber = dataList.startNumber;
                            $('.dingjiaDom' + sIndex + '[data-index=' + index + ']').replaceWith(
                                `<tr data-index=${index} class="dingjiaDom${sIndex}">
                                <td class="shopName${index - 1}"> ${specs.name} </td>
                                <td> ${levelName} </td>
                                <td> ${moneyFormat(priceInfo.price)} </td>
                                <td> ${moneyFormat(priceInfo.changePrice)} </td>
                                <td> ${priceInfo.dailyNumber} </td>
                                <td> ${priceInfo.weeklyNumber} </td>
                                <td> ${priceInfo.monthlyNumber} </td>
                                <td> ${bool[priceInfo.isBuy]} </td>
                                <td> ${priceInfo.minNumber} </td>
                                <td> ${startNumber} </td>
                                <td>
                                <input data-index=${index} data-sindex=${sIndex} data-code=${priceInfo.code} data-name=${specs.name} type="button" class="btn specEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>
                                </td>
                                </tr>`
                            );
                        }
                    }
                }, {
                    title: '取消',
                    handler: function() {
                        dw2.close().remove();
                    }
                }]
            });
            hideLoading();
        });
    });

});