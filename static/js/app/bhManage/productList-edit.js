$(function() {
	var code = getQueryString('code');
	var detailData = {};
	var specList = [];
	var awardList = [];
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
            formatter : function(v, data) {
                return (data.adPrice/1000).toFixed(2)
            },
            required : true
        },{
            field : 'price',
            title : '市场价',
            formatter : function(v, data) {
                return (data.price/1000).toFixed(2)
            },
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
                data.specList = detailData.specsList;
                // 奖励机制
                data.awardList = detailData.awardList;
                // 各种价格
                data.adPrice *= 1000;
                data.price *= 1000;
                // data.changePrice *= 1000;

                // console.log(data);

                var type0 = [];
                var type1 = [];
                                
                function ftype0(item){
                    if(item.type == '0') {
                        return item
                    }
                }

                function ftype1(item){
                    if(item.type == '1') {
                        return item
                    }
                }
            
                type0 = awardList.filter(ftype0); 
                type1 = awardList.filter(ftype1); 

				if(data.specList.length <=0 || type0.length <=0 || type1.length <=0) {
					toastr.info('请检查您是否填写规格体系以及奖励机制')
				}else{
					return data;
				}
                return data;
            },
            afterData : function(data) {
//          	console.log(data);
            	
            	
            	
            	detailData = data;
            	
            	// 插入规格和定价
            	var g=0;
            	detailData.specsList.map(function (item) {
            		var guigeTemp =
                                '<div id="guigeDom'+g+'">'+
                                    '<span style="width : 150px;padding:20px 60px;display: inline-block">'+item.name+'</span>'+
                                    '<span style="width : 150px;padding:20px 40px;display: inline-block">'+item.number+'</span>'+
                                    '<span style="width : 120px;padding:20px 40px;display: inline-block">'+item.weight+'</span>'+
                                    '<span style="width : 180px;padding:20px 40px;display: inline-block">'+bool[item.isNormalOrder]+'</span>'+
                                    '<span style="width : 170px;padding:20px 40px;display: inline-block">'+bool[item.isImpowerOrder]+'</span>'+
                                    '<span style="width : 170px;padding:20px 40px;display: inline-block">'+bool[item.isUpgradeOrder]+'</span>'+
                                    '<input id="delguigeBtn_'+g+'" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>'
                                '</div>';

                    $('#guigeHtml').append(guigeTemp);
                    
                    
                    
                    var dingjiaHtml = '<div id=dingjiaOutDom'+dingjiaDom+'">';
                    for(var v = 0 ;v<item.priceList.length ;v++ ) {
		                var dingjiaTemp =
		                    '<div class="dingjiaDom'+v+'">'+
		                        '<span style="width : 120px;padding:20px 40px;display: inline-block">'+item.name+'</span>'+
		                        '<span style="width : 120px;padding:20px 30px;display: inline-block">'+items[item.priceList[v].level-1].name+'</span>'+
		                        '<span style="width : 120px;padding:20px 30px;display: inline-block">'+moneyFormat(item.priceList[v].price)+'</span>'+
		                        '<span style="width : 120px;padding:20px 30px;display: inline-block">'+moneyFormat(item.priceList[v].changePrice)+'</span>'+
		                    '</div>'
		                dingjiaHtml += dingjiaTemp;
		            }
		
					dingjiaHtml += '</div>';
					$('#dingjiaContent').append(dingjiaHtml);
					
					
					
					
		             g++;       
            	})
            	
            	// 插入推荐奖励
            	detailData.directAwardList.map(function (index, item) {
            		var awardTemp =
                        '<div id="awardDom'+item+'">'+
                            '<span style="width : 120px;padding:20px 40px;display: inline-block">'+items[index.level-1].name+'</span>'+
                            '<span style="width : 140px;padding:20px 70px;display: inline-block">'+(+index.value1*100+'%')+'</span>'+
                            '<span style="width : 140px;padding:20px 70px;display: inline-block">'+(+index.value2*100+'%')+'</span>'+
                            '<span style="width : 140px;padding:20px 70px;display: inline-block">'+(+index.value3*100+'%')+'</span>'+
                            '<input id="editAwardBtn_'+item+'" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'+
                        '</div>'
                    awardHtml += awardTemp;

            	})
            	$('#awardContent').append(awardHtml);
            	
            	
            	
            	// 插入出货奖励
            	detailData.sendAwardList.map(function (index, item) {
            		var awardTemp =
                        '<div id="awardCHDom'+item+'">'+
                            '<span style="width : 120px;padding:20px 40px;display: inline-block">'+items[index.level-1].name+'</span>'+
                            '<span style="width : 140px;padding:20px 40px;display: inline-block">'+(+index.value1*100+'%')+'</span>'+
                            '<input id="editAwardCHBtn_'+item+'" type="button" class="btn editAwardCHBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'+
                        '</div>'
                    awardHtml1 += awardTemp;

            	})
            	$('#awardCHContent').append(awardHtml1);
            	
            	
            	// 规格定价数据格式转换
            	detailData.specsList.map(function (item) {
            		return {
            			code : item.code,
            			isNormalOrder : item.isNormalOrder,
            			isPowerOrder : item.isImpowerOrder,
            			isUpgradeOrder : item.isUpgradeOrder,
            			name : item.name,
            			number : item.number,
            			weight : item.weight,
            			specsPriceList : item.priceList.map(function (item1) {
            				return {
            					changePrice : item1.changePrice,
            					code : item1.code,
            					level : item1.level,
            					price : item1.price
            				}
            			})
            		}
            	}) 
            	
            	detailData.specsList.map(function (item) {
            		item.specsPriceList = item.priceList;
            		delete item.priceList;
            	})
            	
            	
            	// 奖励数据格式转换
            	
            	detailData.directAwardList.map(function (item) {
            		awardList.push(item);
            	})
            	
            	
            	detailData.sendAwardList.map(function (item) {
            		awardList.push(item);
            	})
            	detailData.awardList = awardList;
            }
        });
        hideLoading();

		// 定价
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">规格定价</span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            	'<div style="border: 1px solid #ced9df">'+
            		'<div id="dingjiaTitle">'+
            			'<label style="padding: 20px 40px"><b>*</b>规格</label>'+
            			'<label style="padding: 20px 40px"><b>*</b>等级</label>'+
            			'<label style="padding: 20px 40px"><b>*</b>价格</label>'+
            			'<label style="padding: 20px 40px"><b>*</b>换货价</label>'+
            		'</div>'+
            		'<div id="dingjiaContent"></div>'+
            	'</div>'+
            '</div>')

		// 规格
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">产品规格<input id="add1Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>'+
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
                '<div style="border: 1px solid #ced9df">'+
                    '<label style="padding: 20px 40px"><b>*</b>规格名称</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>规格包含数量</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>重量(g)</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>是否允许普通单下单</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>是否允许授权单下单</label>'+
                    '<label style="padding: 20px 40px"><b>*</b>是否允许升级单下单</label>'+
                    '<div id="guigeHtml"></div>'+
                '</div>'+

            '</div>')




		// 出货奖励
        var awardHtml1 = '';
        $('#remark').parent().after(
            '<div style="width:100%">' +
            '<span style="font-size: 18px">出货奖励机制(请输入0-1之间的小数(%))</span>' +
            '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
            '<div style="border: 1px solid #ced9df">'+
            '<div id="awardTitle">'+
            '<label style="padding: 20px 40px"><b>*</b>等级</label>'+
            '<label style="padding: 20px 40px"><b>*</b>出货奖励</label>'+
            '</div>'+
            '<div id="awardCHContent"></div>'+
            '</div>'+
            '</div>')





		// 推荐奖励
        var awardHtml = '';
        $('#remark').parent().after(
            '<div style="width:100%">' +
                '<span style="font-size: 18px">推荐奖励机制(请输入0-1之间的小数(%))</span>' +
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



		// 删除规格定价
		$('#guigeHtml').on('click', '.delguigeBtn', function delguige(e) {
			
			specList = detailData.specsList;
            var id = e.target.id;
            var text = $('#'+id).parent().children(":first").text();
            for(var v=0;v<specList.length;v++) {
                if(specList[v].name == text) {
                    specList.splice(v,1);
                  	break;
                }
            }
            
            $('#guigeHtml').empty();
            $('#dingjiaContent').empty();
            var a = 0;
            specList.map(function (item) {
                var guigeTemp =
                    '<div id="guigeDom'+a+'">'+
                        '<span style="width : 150px;padding:20px 60px;display: inline-block">'+item.name+'</span>'+
                        '<span style="width : 150px;padding:20px 40px;display: inline-block">'+item.number+'</span>'+
                        '<span style="width : 120px;padding:20px 40px;display: inline-block">'+item.weight+'</span>'+
                        '<span style="width : 180px;padding:20px 40px;display: inline-block">'+bool[item.isNormalOrder]+'</span>'+
                        '<span style="width : 170px;padding:20px 40px;display: inline-block">'+bool[item.isImpowerOrder]+'</span>'+
                        '<span style="width : 170px;padding:20px 40px;display: inline-block">'+bool[item.isUpgradeOrder]+'</span>'+
                        '<input id="delguigeBtn_'+a+'" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>'+
                    '</div>';
                            
                            
            	$('#guigeHtml').append(guigeTemp);

				var dingjiaHtml = '<div id="dingjiaOutDom'+a+'">';
                for(var v = 0 ;v<item.specsPriceList.length ;v++ ) {
                    var dingjiaTemp =
                        '<div class="dingjiaDom'+v+'">'+
                            '<span style="width : 120px;padding:20px 40px;display: inline-block">'+item.name+'</span>'+
                            '<span style="width : 140px;padding:20px 40px;display: inline-block">'+items[item.specsPriceList[v].level-1].name+'</span>'+
                            '<span style="width : 140px;padding:20px 40px;display: inline-block">'+moneyFormat(item.specsPriceList[v].price)+'</span>'+
                            '<span style="width : 140px;padding:20px 40px;display: inline-block">'+moneyFormat(item.specsPriceList[v].changePrice)+'</span>'+
                        '</div>'
                    dingjiaHtml += dingjiaTemp;
                }

				dingjiaHtml += '</div>';
				$('#dingjiaContent').append(dingjiaHtml);
				a++;
            });
        });
            
        
        
        // 修改推荐奖奖励
        $('#awardContent').on('click', '.editAwardBtn', function editAward(e) {
        	
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
												    // console.log(data);
												    // console.log(index);
												    for(var v in awardList) {
												        // console.log(v);
												        if(awardList[v].level-1 == index && awardList[v].type == data.type) {
												            awardList[v].value1 = data.value1;
												            awardList[v].value2 = data.value2;
												            awardList[v].value3 = data.value3;
												            // awardList[v].level = +index+1;
												            // console.log(awardList[v]);
												        }
												    }
												    // console.log(awardList);
												    var awardTemp =
												        // '<div id="awardDom'+index+'">'+
												        '<span style="width : 120px;padding:20px 40px;display: inline-block">'+items[data.level-1].name+'</span>'+
												        // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
												        '<span style="width : 140px;padding:20px 70px;display: inline-block">'+(+data.value1*100+'%')+'</span>'+
												        '<span style="width : 140px;padding:20px 70px;display: inline-block">'+(+data.value2*100+'%')+'</span>'+
												        '<span style="width : 140px;padding:20px 70px;display: inline-block">'+(+data.value3*100+'%')+'</span>'+
												        '<input id="editAwardBtn_'+index+'" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'
												        // '</div>'
												
												
												
													$('。editAwardBtn').click(function() {
														editAward(e);
													})
												    // console.log(awardTemp);
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
				
        })
        
        
        // 修改出货奖励
        $('#awardCHContent').on('click', '.editAwardCHBtn', function editAwardCH(e) {
        	var index = e.target.id.split('_')[1];
                                    console.log(index);
                                    console.log(items);
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
                                                        if(awardList[v].level-1 == index && awardList[v].type == data.type) {
                                                            awardList[v].value1 = data.value1;
                                                            // awardList[v].level = +index+1;
                                                            console.log(awardList[v]);
                                                        }
                                                    }
                                                    console.log(awardList);
                                                    var awardTemp =
                                                        // '<div id="awardDom'+index+'">'+
                                                        '<span style="width : 120px;padding:20px 40px;display: inline-block">'+items[data.level-1].name+'</span>'+
                                                        // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
                                                        '<span style="width : 140px;padding:20px 40px;display: inline-block">'+(+data.value1*100+'%')+'</span>'+
                                                        // '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value2+'</span>'+
                                                        // '<span style="width : 140px;padding:20px 40px;display: inline-block">'+data.value3+'</span>'+
                                                        '<input id="editAwardCHBtn_'+index+'" type="button" class="btn editAwardCHBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'
                                                    // '</div>'

                                                 
                                                    console.log(index);
                                                    $('#awardCHDom'+index).empty().append(awardTemp);
                                                    dw2.close().remove();
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



        var b = 0;
        
        var dingjiaDom = 0;
        // 添加产品规格
        $('#add1Btn').click(function () {
        	specList = detailData.specsList;
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
                            var circleList = []
                            for(var p=0;p<items.length;p++) {
                            	var field1 = {
                            		field : items[p].level,
                            		title : '等级',
                            		value : items[p].name,
                            		readonly : true
                            	};
                            	var field2 = {
                            		field : 'price'+p,
                            		title : '价格',
                            		required : true
                            	};
                            	var field3 = {
                            		field : 'changePrice'+p,
                            		title : '换货价',
                            		required : true
                            	};
                            	
                            	circleList.push(field1,field2,field3);
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
                                        handler: function () {
                                            
                                            if ($('#popFormDingjia').valid()) {
                                                var data = $('#popFormDingjia').serializeObject();
                                                dw1.close().remove();
                                                var specsPriceList = []
                                                for(var v of items) {
                                                	var price1= 'price'+(v.level-1);
                                                	var changePrice1= 'changePrice'+(v.level-1);
                                                	
                                                	var temp1 = {};
                                                	temp1.level = v.level;
                                                	temp1.price = data[price1]*1000;
                                                	temp1.changePrice = data[changePrice1]*1000;
                                                	
                                                	specsPriceList.push(temp1);
                                                }
                                                temp.specsPriceList = specsPriceList;
                                                
                                                
                                                
                                                var dingjiaHtml = '<div id=dingjiaOutDom'+dingjiaDom+'">';
                                                for(var v = 0 ;v<specsPriceList.length ;v++ ) {
                                                	var dingjiaTemp =
                                                		'<div class="dingjiaDom'+v+'">'+
                                                			'<span style="width : 120px;padding:20px 40px;display: inline-block">'+temp.name+'</span>'+
                                                			'<span style="width : 140px;padding:20px 40px;display: inline-block">'+items[specsPriceList[v].level-1].name+'</span>'+
                                                			'<span style="width : 140px;padding:20px 40px;display: inline-block">'+moneyFormat(specsPriceList[v].price)+'</span>'+
                                                			'<span style="width : 140px;padding:20px 40px;display: inline-block">'+moneyFormat(specsPriceList[v].changePrice)+'</span>'+
                                                		'</div>'
                                            		dingjiaHtml += dingjiaTemp;
                                                }

												dingjiaHtml += '</div>';
												$('#dingjiaContent').append(dingjiaHtml);
                                                
												specList.push(temp)
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
                                dingjiaDom++;
                            
                            
//                          g++;
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

    });
    
});