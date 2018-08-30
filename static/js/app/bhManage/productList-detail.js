$(function() {
    var code = getQueryString('code');
    var detailData = {};
    var specList = [];
    var awardList = [];
    var globalSpecialList;
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
        var temp = '';
        for (var v of items) {
            html += '<label style="padding: 20px 40px"><b>*</b>' + v.name + '</label>'
        }
        html += '</div>';

        var fields = [{
            field: 'name',
            title: '产品名称',
            required: true,
            readonly: true
        }, {
            field: 'adPrice',
            title: '建议价',
            amount: true,
            required: true,
            readonly: true
        }, {
            field: 'price',
            title: '市场价',
            amount: true,
            required: true,
            readonly: true
        }, {
            field: 'advPic',
            title: '广告图',
            type: 'img',
            required: true,
            readonly: true
        }, {
            field: 'pic',
            title: '缩略图',
            type: 'img',
            single: true,
            required: true,
            readonly: true
        }, {
            field: 'slogan',
            title: '广告语',
            required: true,
            readonly: true
        }, {
            field: 'isTotal',
            title: '是否计入出货奖励',
            type: 'select',
            data: {
                '1': '是',
                '0': '否'
            },
            required: true,
            readonly: true
        }, {
            field: 'remark',
            title: '备注',
            readonly: true
        }];
        var buttons = [{
            title: '返回',
            handler: function() {
                goBack();
            }
        }];

        buildDetail({
            fields: fields,
            code: code,
            buttons,
            detailCode: '627557',
            afterData: function(data) {
                detailData = data;
                var spList = data.specsList;
                var obj = {},
                    isshow = true;
                if (!spList) {
                    return;
                }
                for (let i = 0; i < spList.length; i++) {
                    obj[spList[i].code] = spList[i].name;
                }
                globalSpecialList = obj;
                // 插入规格和定价
                for (let i = 0, len = spList.length; i < len; i++) {
                    var guigeTemp = `<tr id="guigeDom${i}">
                        <td> ${spList[i].name} </td>
                        <td> ${spList[i].number} </td>
                        <td> ${spList[i].stockNumber} </td>
                        <td> ${spList[i].weight} </td>
                        <td> ${bool[spList[i].isNormalOrder]} </td>
                        <td> ${bool[spList[i].isSqOrder]} </td>
                        <td> ${bool[spList[i].isSjOrder]} </td>
                        <td> ${bool[spList[i].isSingle]} </td>
                        <td> ${globalSpecialList[spList[i].refCode] ? globalSpecialList[spList[i].refCode] : '-'} </td>
                        <td> ${spList[i].singleNumber ? spList[i].singleNumber : '-'} </td>
                        </tr>`;
                    $('#guigeHtml').append(guigeTemp);
                    if (detailData.specsList.length <= 1) {
                        $('.delguigeBtn').attr('disabled', true);
                    } else {
                        $('.delguigeBtn').attr('disabled', false);
                    }
                    var dingjiaHtml = '';
                    if (!spList[i].priceList) {
                        isshow = false;
                        break;
                    } else {
                        isshow = true;
                    }
                    dingjiaDom = i;
                    for (let v = 0; v < spList[i].priceList.length; v++) {
                        var dingjiaTemp = `<tr data-index="${dingjiaDom}" class="dingjiaDom${v}">
                            <td> ${spList[i].name ? spList[i].name : '-'} </td>
                            <td> ${items[spList[i].priceList[v].level - 1].name ? items[spList[i].priceList[v].level - 1].name : '-'} </td>
                            <td> ${moneyFormat(spList[i].priceList[v].price)} </td>
                            <td> ${moneyFormat(spList[i].priceList[v].changePrice)} </td>
                            <td> ${spList[i].priceList[v].dailyNumber} </td>
                            <td> ${spList[i].priceList[v].weeklyNumber} </td>
                            <td> ${spList[i].priceList[v].monthlyNumber} </td>
                            <td> ${bool[spList[i].priceList[v].isBuy]} </td>
                            <td> ${spList[i].priceList[v].minNumber} </td>
                            <td> ${spList[i].priceList[v].startNumber} </td>
                            </tr>`;
                        dingjiaHtml += dingjiaTemp;
                    }

                    // dingjiaHtml += '</div>';
                    $('#dingjiaContent').append(dingjiaHtml);
                }
                // 插入推荐奖励
                detailData.directAwardList.map(function(index, item) {
                    var awardTemp = '<div id="awardDom' + item + '">' +
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">' + items[index.level - 1].name + '</span>' +
                        '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value1) + '</span>' +
                        '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value2) + '</span>' +
                        '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value3) + '</span>' +
                        '</div>'
                    awardHtml += awardTemp;
                })
                $('#awardContent').append(awardHtml);

                // 规格定价数据格式转换
                if (isshow) {
                    detailData.specsList.map(function(item) {
                        return {
                            code: item.code,
                            isNormalOrder: item.isNormalOrder,
                            isSqOrder: item.isSqOrder,
                            isSjOrder: item.isSjOrder,
                            name: item.name,
                            number: item.number,
                            weight: item.weight,
                            specsPriceList: item.priceList.map(function(item1) {
                                return {
                                    changePrice: item1.changePrice,
                                    code: item1.code,
                                    level: item1.level,
                                    price: item1.price
                                }
                            })
                        }
                    })
                }

                detailData.specsList.map(function(item) {
                    item.specsPriceList = item.priceList;
                    delete item.priceList;
                })


                // 奖励数据格式转换

                detailData.directAwardList.map(function(item) {
                    awardList.push(item);
                })

                if (detailData.specsList.length <= 1) {
                    $('.delguigeBtn').attr('disabled', true);
                } else {
                    $('.delguigeBtn').attr('disabled', false);
                }

                detailData.awardList = awardList;
            }
        });
        hideLoading();

        // 定价
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">规格定价</span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">' +
            '<table id="dingjiaTitle" style="width: 100%;">' +
            '<thead>' +
            '<tr><th>规格</th><th>等级</th><th>价格</th><th>换货价</th><th>每日限购</th><th>每周限购</th><th>每月限购</th><th>是否可购买</th><th>云仓最少发货数量</th><th>起购数量</th></tr>' +
            '</thead>' +
            '<tbody id="dingjiaContent"></tbody>' +
            '</table>' +
            '</div>' +
            '</div>');

        // 规格
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">产品规格</span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<table style="border: 1px solid #ced9df;width: 100%;">' +
            '<thead>' +
            '<tr><th>规格名称</th><th>规格包含数量</th><th>库存</th><th>重量(g)</th><th>是否允许普通单下单</th><th>是否允许授权单下单</th><th>是否允许升级单下单</th><th>是否可拆单</th><th>关联拆单编号</th><th>拆单数量</th></tr>' +
            '</thead>' +
            '<tbody id="guigeHtml"></tbody>' +
            '</table>' +
            '</div>');

        // 推荐奖励
        var awardHtml = '';
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">推荐奖励机制(0-100之间的数(%))</span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">' +
            '<div id="awardTitle">' +
            '<label style="padding: 20px 40px"><b></b>等级</label>' +
            '<label style="padding: 20px 40px"><b></b>直接推荐奖励(%)</label>' +
            '<label style="padding: 20px 40px"><b></b>间接推荐奖励(%)</label>' +
            '<label style="padding: 20px 40px"><b></b>次推荐奖励(%)</label>' +
            '</div>' +
            '<div id="awardContent"></div>' +
            '</div>' +
            '</div>')

    });

});