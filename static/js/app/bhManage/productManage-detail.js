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
            field: 'isFree',
            title: '是否包邮',
            type: 'select',
            data: {
                '1': '是',
                '0': '否'
            },
            required: true
        }, {
            field: 'quantity',
            title: '数量',
            formatter(v, data) {
                return data.quantity;
            }
        }, {
            field: 'status',
            title: '状态',
            search: true,
            type: 'select',
            key: 'inner_status',
            formatter: Dict.getNameForList("inner_status")
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
            view: '1',
            detailCode: '627712',
            addCode: '627700',
            editCode: '627701',
            beforeSubmit: function(data) {
                //产品规格
                data.specsList = specList;
                // 奖励机制
                data.awardList = awardList;

                return data
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
                    let singleNumber = item.singleNumber ? item.singleNumber : '-';
                    item.price = item.price / 1000;
                    var guigeTemp = '<div id="guigeDom' + a + '">' +
                        '<span style="width : 150px;padding:20px 60px;display: inline-block">' + item.name + '</span>' +
                        '<span style="width : 160px;padding:20px 40px;display: inline-block">' + item.number + '</span>' +
                        '<span style="width : 140px;padding:20px 40px;display: inline-block">' + item.stockNumber + '</span>' +
                        '<span style="width : 140px;padding:20px 40px;display: inline-block">' + item.weight + '</span>' +
                        '<span style="width : 140px;padding:20px 0px;display: inline-block">' + item.price + '</span>' +
                        '<span style="width : 140px;padding:20px 0px;display: inline-block">' + bool[item.isSingle] + '</span>' +
                        '<span style="width : 140px;padding:20px 0px;display: inline-block">' + singleNumber + '</span>' +
                        '</div>';


                    $('#guigeHtml').append(guigeTemp);
                    a++;
                });
            })
        }
        hideLoading();
        $('#remark').parent().after(
            '<div style="width:100%">' +
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




        var b = 0;
        var specList = [];
        var dingjiaDom = 0;

        var awardList = [];
        var v = 0;
    });

});