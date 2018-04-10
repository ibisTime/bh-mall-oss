$(function() {
	var code = getQueryString('code');



    reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function (item) {
            return {
                level: item.level,
                name: item.name
            };
        });

        var bool = {'0': '否', '1': '是'};
        var html='<div>';
        var guigeHtml = '';
        var dingjiaHtml = '';
        var temp='';
        for(var v of items) {
            html+= '<label style="padding: 20px 40px"><b>*</b>'+v.name+'</label>'
        }
        html+='</div>';

        var fields = [{
            field : 'name',
            title : '产品名称',
            required : true
        }, {
            field : 'adPrice',
            title : '建议价',
            formatter: moneyFormat,
            required : true
        },{
            field : 'price',
            title : '市场价',
            formatter: moneyFormat,
            required : true
        },{
            field : 'advPic',
            title : '广告图',
            type: 'img',
            required : true
        }, {
            field : 'pic',
            title : '缩略图',
            type: 'img',
            single : true,
            required : true
        },  {
            field : 'virNumber',
            title : '虚拟数量',
            required : true
        }, {
            field : 'realNumber',
            title : '实际数量',
            required : true
        },{
            field : 'slogan',
            title : '广告语',
            required : true
        }, {
            field : 'isTotal',
            title : '是否计入出货',
            type : 'select',
            data : {'1':'是','0':'否'},
            required : true
        }, {
            field : 'remark',
            title : '备注'
        }];

        buildDetail({
            fields: fields,
            code: code,
            detailCode: '627557',
            addCode: '627540',
            editCode: '627541',
            beforeSubmit : function (data) {
                //产品规格
                data.specList = specList;
                // 奖励机制
                data.awardList = awardList;
                // 各种价格
                data.adPrice *= 1000;
                data.price *= 1000;
                // data.changePrice *= 1000;

                console.log(data);

                return data;
            }
        });
        hideLoading();



        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">规格定价</span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
                '<div style="border: 1px solid #ced9df">'+
                     html+
                    '<div id="dingjiaHtml"></div>'+
                '</div>'+
            '</div>')

        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">产品规格<input id="add1Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>'+
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
                '<div style="border: 1px solid #ced9df">'+
                    '<label style="padding: 20px 40px"><b>*</b>规格名称</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>规格包含数量</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>重量</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>是否允许普通单下单</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>是否允许授权单下单</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>是否允许升级单下单</label>'+
                    '<div id="guigeHtml"></div>'+
                '</div>'+

            '</div>')





        var awardHtml1 = '';
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">出货奖励机制<input id="add3Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">'+
            '<div id="awardTitle">'+
            '<label style="padding: 20px 40px"><b>*</b>等级</label>'+
            // '<label style="padding: 20px 40px"><b>*</b>类型</label>'+
            '<label style="padding: 20px 40px"><b>*</b>出货奖励</label>'+
            '</div>'+
            '<div id="awardCHContent"></div>'+
            '</div>'+
            '</div>')






        var awardHtml = '';
        $('#remark').parent().after(
            '<div style="width:100%">' +
                '<span style="font-size: 18px">推荐奖励机制<input id="add2Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
                '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
                '<div style="border: 1px solid #ced9df">'+
                    '<div id="awardTitle">'+
                        '<label style="padding: 20px 40px"><b>*</b>等级</label>'+
                        // '<label style="padding: 20px 40px"><b>*</b>类型</label>'+
                        '<label style="padding: 20px 40px"><b>*</b>直接推荐奖励</label>'+
                        '<label style="padding: 20px 40px"><b>*</b>间接推荐奖励</label>'+
                        '<label style="padding: 20px 40px"><b>*</b>次推荐奖励</label>'+
                    '</div>'+
                    '<div id="awardContent"></div>'+
                '</div>'+
            '</div>')






        var g = 0;
        var d = 0;
        var a = 0;
        var b = 0;
        var specList = [];
        // 添加产品规格
        $('#add1Btn').click(function () {
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
                    required: true
                }, {
                    field: 'weight',
                    title: '重量',
                    required: true
                },{
                    field: 'isNormalOrder',
                    title: '是否允许普通单下单',
                    required: true,
                    type: 'select',
                    data: {'0': '否', '1': '是'}
                },{
                    field : 'isPowerOrder',
                    title : '是否允许授权单下单',
                    required: true,
                    type: 'select',
                    data : {'0':'否','1':'是'}
                },{
                    field : 'isUpgradeOrder',
                    title : '是否允许升级单下单',
                    required: true,
                    type: 'select',
                    data : {'0':'否','1':'是'}
                }],
                buttons: [{
                    title: '确定',
                    handler: function () {

                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            temp.name = data.name;
                            temp.number = data.number;
                            temp.weight = data.weight;
                            temp.isNormalOrder = data.isNormalOrder;
                            temp.isPowerOrder = data.isPowerOrder;
                            temp.isUpgradeOrder = data.isUpgradeOrder;

                            var guigeTemp =
                                '<div id="guigeDom'+g+'">'+
                                    '<span style="width : 150px;padding:20px 60px;display: inline-block">'+temp.name+'</span>'+
                                    '<span style="width : 150px;padding:20px 40px;display: inline-block">'+temp.number+'</span>'+
                                    '<span style="width : 120px;padding:20px 40px;display: inline-block">'+temp.weight+'</span>'+
                                    '<span style="width : 180px;padding:20px 40px;display: inline-block">'+bool[temp.isNormalOrder]+'</span>'+
                                    '<span style="width : 170px;padding:20px 40px;display: inline-block">'+bool[temp.isPowerOrder]+'</span>'+
                                    '<span style="width : 170px;padding:20px 40px;display: inline-block">'+bool[temp.isUpgradeOrder]+'</span>'+
                                    '<input id="delguigeBtn_'+g+'" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>'
                                '</div>';

                            $('#guigeHtml').append(guigeTemp);
                            dw.close().remove();
                            var specsPriceList = [];
                            for(var p=0;p<items.length;p++) {
                                var value = items[p].name;
                                console.log(value);
                                var dw1 = dialog({
                                    content: '<form class="pop-form-dingjia" id="popFormDingjia" novalidate="novalidate">' +
                                    '<ul class="form-info" id="formContainer_dingjia"><li style="text-align:center;font-size: 15px;">'+p+'</li></ul>' +
                                    '</form>'
                                });

                                dw1.showModal();
                                buildDetail({
                                    container: $('#formContainer_dingjia'),
                                    fields: [{
                                        field: 'level',
                                        title: '等级',
                                        required: true,
                                        value: value,
                                        readonly: true
                                    }, {
                                        field: 'price',
                                        title: '价格',
                                        required : true
                                    }, {
                                        field: 'changePrice',
                                        title: '换货价',
                                        required: true
                                    }],
                                    buttons: [{
                                        title: '确定',
                                        handler: function () {
                                            dw1.close().remove();
                                            if ($('#popFormDingjia').valid()) {
                                                var data = $('#popFormDingjia').serializeObject();
                                                delete data.code;
                                                data.level = items[p].level;
                                                data.changePrice *= 1000;
                                                console.log(data);
                                                var arrTemp2 = data;
                                                specsPriceList.push(arrTemp2);


                                                // var dingjiaTemp = '<div id="dingjiaDom'+d+'">';
                                                // console.log(arrTemp2);
                                                // console.log(specsPriceList);
                                                // specsPriceList.map(function (item) {
                                                //     // specsPriceList.map(function (index1, item1) {
                                                //     dingjiaTemp += '<span style="width : 110px;padding:20px 50px;display: inline-block">'+item.price+'</span>'+
                                                //         '<span style="width : 110px;padding:20px 50px;display: inline-block">'+item.changePrice+'</span>'
                                                //     // awardHtml += awardTemp;
                                                // });
                                                // dingjiaTemp +=  '</div>';


                                                // $('#dingjiaHtml').append(dingjiaTemp);
                                                // d++;



                                                console.log(specList);

                                            }
                                        }
                                    }
                                        // , {
                                        //     title: '取消',
                                        //     handler: function () {
                                        //         dw1.close().remove();
                                        //     }
                                        // }
                                    ]
                                });
                                hideLoading();
                            }
                            // 删除规格定价
                            $('.delguigeBtn').click(function (e) {
                                $('#guigeHtml').empty();
                                $('#dingjiaHtml').empty();
                                // console.log(specList);

                                // var index = e.target.id.split('_')[1];
                                var id = e.target.id;
                                console.log(id);
                                // console.log(index);
                                // console.log(items);
                                // var value = items[index].name;
                                // console.log(specList);

                                for(var v=0;v<specList.length;v++) {
                                    console.log(v);
                                    console.log(specList);
                                    console.log($('#'+id).parent().children(":first").text());
                                    if(specList[v].name == $('#'+id).parent().children(":first").text()) {
                                        specList.splice(v,1);
                                        // $('#guigeDom'+v).empty();
                                        // $('#dingjiaDom'+v).empty();

                                        console.log(specList);
                                        specList.map(function (item) {
                                            var guigeTemp =
                                                '<div id="guigeDom'+a+'">'+
                                                '<span style="width : 150px;padding:20px 60px;display: inline-block">'+item.name+'</span>'+
                                                '<span style="width : 150px;padding:20px 40px;display: inline-block">'+item.number+'</span>'+
                                                '<span style="width : 120px;padding:20px 40px;display: inline-block">'+item.weight+'</span>'+
                                                '<span style="width : 150px;padding:20px 40px;display: inline-block">'+item.changePrice+'</span>'+
                                                '<span style="width : 180px;padding:20px 40px;display: inline-block">'+bool[item.isNormalOrder]+'</span>'+
                                                '<span style="width : 170px;padding:20px 40px;display: inline-block">'+bool[item.isPowerOrder]+'</span>'+
                                                '<span style="width : 170px;padding:20px 40px;display: inline-block">'+bool[item.isUpgradeOrder]+'</span>'+
                                                '<input id="delguigeBtn_'+a+'" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>'+
                                                '</div>';


                                            var dingjiaTemp = '<div id="dingjiaDom'+b+'">';
                                            console.log(arrTemp2);
                                            console.log(specsPriceList);
                                            dingjiaTemp += '<span style="width : 110px;padding:20px 50px;display: inline-block">'+item.specsPriceList.price+'</span></div>'

                                            $('#dingjiaHtml').append(dingjiaTemp);
                                            console.log(guigeTemp);
                                            $('#guigeHtml').append(guigeTemp);
                                            a++;
                                            d++
                                        })
                                    }
                                }

                                console.log(specList);
                            });
                            g++;
                        }
                    }
                }, {
                    title: '取消',
                    handler: function () {
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
            console.log(v);
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
                        value : value,
                        readonly : true
                    }, {
                        field: 'type',
                        title: '类型',
                        value :'0',
                        hidden : true
                    }, {
                        field: 'value1',
                        title: '直接推荐奖励',
                        required: true
                    }, {
                        field: 'value2',
                        title: '间接推荐奖励',
                        required: true
                    },{
                        field : 'value3',
                        title : '次推荐奖励',
                        required: true
                    }],
                    buttons: [{
                        title: '确定',
                        handler: function () {
                            if ($('#popForm').valid()) {
                                var data = $('#popForm').serializeObject();
                                var temp = {};
                                temp.level = items[v].level;
                                temp.type = data.type;
                                temp.value1 = data.value1;
                                temp.value2 = data.value2;
                                temp.value3 = data.value3;

                                awardList.push(temp);
                                if(v<items.length-1) {
                                    v +=1;
                                    dw.close().remove();
                                    jiangli();
                                }else {
                                    dw.close().remove();
                                    awardList.map(function (index,item) {
                                        // console.log(items[index.level].name);
                                        if(index.type == '0') {
                                            var awardTemp =
                                                '<div id="awardDom'+item+'">'+
                                                '<span style="width : 120px;padding:20px 40px;display: inline-block">'+items[index.level-1].name+'</span>'+
                                                // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
                                                '<span style="width : 140px;padding:20px 40px;display: inline-block">'+index.value1+'</span>'+
                                                '<span style="width : 140px;padding:20px 40px;display: inline-block">'+index.value2+'</span>'+
                                                '<span style="width : 140px;padding:20px 40px;display: inline-block">'+index.value3+'</span>'+
                                                '<input id="editAwardBtn_'+item+'" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'+
                                                '</div>'
                                            awardHtml += awardTemp;
                                        }

                                    });



                                    $('#awardContent').append(awardHtml);

                                    // 修改奖励机制按钮点击事件
                                    $('.editAwardBtn').click(function (e) {
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
                                                value : '0',
                                                hidden : true
                                            }, {
                                                field: 'value1',
                                                title: '直接推荐奖励',
                                                required: true
                                            }, {
                                                field: 'value2',
                                                title: '间接推荐奖励',
                                                required: true
                                            }, {
                                                field: 'value3',
                                                title: '次推荐奖励',
                                                required: true
                                            }],
                                            buttons: [{
                                                title: '确定',
                                                handler: function () {
                                                    if ($('#popForm').valid()) {
                                                        var data = $('#popForm').serializeObject();
                                                        data.level = +index+1;
                                                        console.log(data);
                                                        console.log(index);
                                                        for(var v in awardList) {
                                                            console.log(v);
                                                            if(awardList[v].level-1 == index) {
                                                                awardList[v] = data;
                                                                // awardList[v].level = +index+1;
                                                                console.log(awardList[v]);
                                                            }
                                                        }
                                                        console.log(awardList);
                                                        var awardTemp =
                                                            // '<div id="awardDom'+index+'">'+
                                                            '<span style="width : 120px;padding:20px 40px;display: inline-block">'+items[data.level-1].name+'</span>'+
                                                            // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
                                                            '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value1+'</span>'+
                                                            '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value2+'</span>'+
                                                            '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value3+'</span>'+
                                                            '<input id="editAwardBtn_'+index+'" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'
                                                            // '</div>'

                                                        console.log(awardTemp);
                                                        $('#awardDom'+index).empty().append(awardTemp);
                                                        dw.close().remove();
                                                    }

                                                }
                                            }, {
                                                title: '取消',
                                                handler: function () {
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
                        handler: function () {
                            dw.close().remove();
                        }
                    }]
                });
            $('#type').change(function(){
                var type = $('#type').val();
                if(type == '1') {
                    $('#value2').parent().css('display','none');
                    $('#value3').parent().css('display','none');
                }else {
                    $('#value2').parent().css('display','block');
                    $('#value3').parent().css('display','block');
                }
            });
                hideLoading();


        });


        var CH = 0;
        // 添加出货奖励机制
        $('#add3Btn').click(function CHjiangli() {
            console.log(CH);
            var value = items[CH].name;
            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该产品的出货奖励机制</li></ul>' +
                '</form>',
            });
            dw.showModal();



            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'level',
                    title: '等级',
                    required: true,
                    value : value,
                    readonly : true
                }, {
                    field: 'type',
                    title: '类型',
                    value :'1',
                    hidden : true
                }, {
                    field: 'value1',
                    title: '出货奖励',
                    required: true
                }],
                buttons: [{
                    title: '确定',
                    handler: function () {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            var temp = {};
                            temp.level = items[CH].level;
                            temp.type = data.type;
                            temp.value1 = data.value1;

                            awardList.push(temp);
                            if(CH<items.length-1) {
                                CH +=1;
                                dw.close().remove();
                                CHjiangli();
                            }else {
                                dw.close().remove();
                                awardList.map(function (index,item) {
                                    // console.log(items[index.level].name);
                                    if(index.type == '1') {
                                        var awardTemp =
                                            '<div id="awardCHDom'+item+'">'+
                                            '<span style="width : 120px;padding:20px 40px;display: inline-block">'+items[index.level-1].name+'</span>'+
                                            // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
                                            '<span style="width : 140px;padding:20px 40px;display: inline-block">'+index.value1+'</span>'+
                                            // '<span style="width : 140px;padding:20px 40px;display: inline-block">'+index.value2+'</span>'+
                                            // '<span style="width : 140px;padding:20px 40px;display: inline-block">'+index.value3+'</span>'+
                                            '<input id="editAwardCHBtn_'+item+'" type="button" class="btn editAwardCHBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'+
                                            '</div>'
                                        awardHtml1 += awardTemp;
                                    }

                                });



                                $('#awardCHContent').append(awardHtml1);

                                // 修改奖励机制按钮点击事件
                                $('.editAwardCHBtn').click(function (e) {
                                    var index = e.target.id.split('_')[1]-5;
                                    console.log(index);
                                    console.log(items);
                                    var value = items[index].name;
                                    var dw = dialog({
                                        content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                                        '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该产品的出货奖励机制</li></ul>' +
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
                                            value : '1',
                                            hidden : true
                                        }, {
                                            field: 'value1',
                                            title: '出货奖励',
                                            required: true
                                        }],
                                        buttons: [{
                                            title: '确定',
                                            handler: function () {
                                                if ($('#popForm').valid()) {
                                                    var data = $('#popForm').serializeObject();
                                                    data.level = +index+1;
                                                    console.log(data);
                                                    console.log(index);
                                                    for(var v in awardList) {
                                                        console.log(v);
                                                        if(awardList[CH].level-1 == index) {
                                                            awardList[CH] = data;
                                                            // awardList[v].level = +index+1;
                                                            console.log(awardList[CH]);
                                                        }
                                                    }
                                                    console.log(awardList);
                                                    var awardTemp =
                                                        // '<div id="awardDom'+index+'">'+
                                                        '<span style="width : 120px;padding:20px 40px;display: inline-block">'+items[data.level-1].name+'</span>'+
                                                        // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
                                                        '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value1+'</span>'+
                                                        // '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value2+'</span>'+
                                                        // '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value3+'</span>'+
                                                        '<input id="editAwardBtn_'+index+'" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'
                                                    // '</div>'

                                                    console.log(awardTemp);
                                                    console.log(index);
                                                    $('#awardCHDom'+(+index+5)).empty().append(awardTemp);
                                                    dw.close().remove();
                                                }

                                            }
                                        }, {
                                            title: '取消',
                                            handler: function () {
                                                dw.close().remove();
                                            }
                                        }]

                                    })
                                    hideLoading();
                                });
                                $('#add3Btn').addClass('hidden');


                            }
                        }
                    }
                }, {
                    title: '取消',
                    handler: function () {
                        dw.close().remove();
                    }
                }]
            });
            $('#type').change(function(){
                var type = $('#type').val();
                if(type == '1') {
                    $('#value2').parent().css('display','none');
                    $('#value3').parent().css('display','none');
                }else {
                    $('#value2').parent().css('display','block');
                    $('#value3').parent().css('display','block');
                }
            });
            hideLoading();


        });

    });
    
});