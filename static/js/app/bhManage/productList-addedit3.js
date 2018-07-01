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
      title: '虚拟数量',
      required: true
    }, {
      field: 'realNumber',
      title: '实际数量',
      required: true
    }, {
      field: 'slogan',
      title: '广告语',
      required: true
    }, {
      field: 'isTotal',
      title: '是否计入出货',
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

        if (data.specList.length <= 0 || type0.length <= 0) {
          toastr.info('请检查您是否填写规格体系以及奖励机制');
          return
        }
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
      '<tr><th>规格</th><th>等级</th><th>价格</th><th>换货价</th><th>每日限购</th><th>每周限购</th><th>每月限购</th><th>是否可购买</th><th>云仓最少发货数量</th><th>起购数量</th></tr>' +
      '</thead>' +
      '<tbody id="dingjiaContent"></tbody>' +
      '</table>' +
      '</div>' +
      '</div>');

    $('#remark').parent().after(
      '<div style="width:100%">' +
      '<span style="font-size: 18px">产品规格<input id="add1Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
      '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
      '<div style="border: 1px solid #ced9df">' +
      '<label style="padding: 20px 40px"><b>*</b>规格名称</label>' +
      '<label style="padding: 20px 40px"><b>*</b>规格包含数量</label>' +
      '<label style="padding: 20px 40px"><b>*</b>重量(g)</label>' +
      '<label style="padding: 20px 40px"><b>*</b>是否允许普通单下单</label>' +
      '<label style="padding: 20px 40px"><b>*</b>是否允许授权单下单</label>' +
      '<label style="padding: 20px 40px"><b>*</b>是否允许升级单下单</label>' +
      '<div id="guigeHtml"></div>' +
      '</div>' +
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
      '<label style="padding: 20px 40px"><b>*</b>直接推荐奖励</label>' +
      '<label style="padding: 20px 40px"><b>*</b>间接推荐奖励</label>' +
      '<label style="padding: 20px 40px"><b>*</b>次推荐奖励</label>' +
      '</div>' +
      '<div id="awardContent"></div>' +
      '</div>' +
      '</div>')

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
          '<span style="width : 120px;padding:20px 40px;display: inline-block">' + item.weight + '</span>' +
          '<span style="width : 180px;padding:20px 40px;display: inline-block">' + bool[item.isNormalOrder] + '</span>' +
          '<span style="width : 170px;padding:20px 40px;display: inline-block">' + bool[item.isImpowerOrder] + '</span>' +
          '<span style="width : 170px;padding:20px 40px;display: inline-block">' + bool[item.isUpgradeOrder] + '</span>' +
          '<input id="delguigeBtn_' + a + '" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>' +
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
            '<td>' + item.specsPriceList[v].minQuantity + '</td>' +
            '</tr>'
          dingjiaHtml += dingjiaTemp;
        }
        $('#dingjiaContent').append(dingjiaHtml);
        a++;
      });
    });

    // 修改推荐奖励
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
          value: '0',
          hidden: true
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
          handler: function() {
            if ($('#popForm').valid()) {
              var data = $('#popForm').serializeObject();
              data.level = +index + 1;
              for (var v in awardList) {
                if (awardList[v].level - 1 == index && awardList[v].type == data.type) {
                  awardList[v].value1 = data.value1;
                  awardList[v].value2 = data.value2;
                  awardList[v].value3 = data.value3;
                }
              }
              var awardTemp =
              // '<div id="awardDom'+index+'">'+
              '<span style="width : 120px;padding:20px 40px;display: inline-block">' + items[data.level - 1].name + '</span>' +
                // '<span style="width : 120px;padding:20px 40px;display: inline-block">'+index.type+'</span>'+
                '<span style="width : 140px;padding:20px 40px;display: inline-block">' + (+data.value1 + '%') + '</span>' +
                '<span style="width : 140px;padding:20px 40px;display: inline-block">' + (+data.value2 + '%') + '</span>' +
                '<span style="width : 140px;padding:20px 40px;display: inline-block">' + (+data.value3 + '%') + '</span>' +
                '<input id="editAwardBtn_' + index + '" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'
                // '</div>'

              $('.editAwardBtn').click(function() {
                editAward(e);
              })
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
          required: true
        }, {
          field: 'weight',
          title: '重量',
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
          field: 'isImpowerOrder',
          title: '是否允许授权单下单',
          required: true,
          type: 'select',
          data: {
            '0': '否',
            '1': '是'
          }
        }, {
          field: 'isUpgradeOrder',
          title: '是否允许升级单下单',
          required: true,
          type: 'select',
          data: {
            '0': '否',
            '1': '是'
          }
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
              temp.isImpowerOrder = data.isImpowerOrder;
              temp.isUpgradeOrder = data.isUpgradeOrder;

              var guigeTemp = '<div id="guigeDom' + g + '">' +
                '<span style="width : 150px;padding:20px 60px;display: inline-block">' + temp.name + '</span>' +
                '<span style="width : 150px;padding:20px 40px;display: inline-block">' + temp.number + '</span>' +
                '<span style="width : 120px;padding:20px 40px;display: inline-block">' + temp.weight + '</span>' +
                '<span style="width : 180px;padding:20px 40px;display: inline-block">' + bool[temp.isNormalOrder] + '</span>' +
                '<span style="width : 170px;padding:20px 40px;display: inline-block">' + bool[temp.isImpowerOrder] + '</span>' +
                '<span style="width : 170px;padding:20px 40px;display: inline-block">' + bool[temp.isUpgradeOrder] + '</span>' +
                '<input id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:40px;display: inline-block;!important;" value="删除"/>'
              '</div>';

              $('#guigeHtml').append(guigeTemp);

              dw.close().remove();
              var circleList = []
              for (var p = 0; p < items.length - 1; p++) {
                if (items[p].level != 6) {
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
                        if (items[p].level != 6) {
                          xiangouList = xiangouList.concat([{
                            field: items[p].level,
                            title: '等级',
                            value: items[p].name,
                            readonly: true
                          }, {
                            field: 'dailyNumber' + p,
                            title: '日限购',
                            required: true
                          }, {
                            field: 'weeklyNumber' + p,
                            title: '周限购',
                            required: true
                          }, {
                            field: 'monthlyNumber' + p,
                            title: '月限购',
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
                            required: true
                          }, {
                            field: 'minQuantity' + p,
                            title: '起购数量',
                            required: true
                          }]);
                        }
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
                              for (var i = 0; i < items.length; i++) {
                                var v = items[i];
                                if (v.level != 6) {
                                  var dailyNumber = 'dailyNumber' + (v.level - 1);
                                  var weeklyNumber = 'weeklyNumber' + (v.level - 1);
                                  var monthlyNumber = 'monthlyNumber' + (v.level - 1);
                                  var isBuy = 'isBuy' + (v.level - 1);
                                  var minNumber = 'minNumber' + (v.level - 1);
                                  var minQuantity = 'minQuantity' + (v.level - 1);
                                  specsPriceList[i].dailyNumber = data[dailyNumber];
                                  specsPriceList[i].weeklyNumber = data[weeklyNumber];
                                  specsPriceList[i].monthlyNumber = data[monthlyNumber];
                                  specsPriceList[i].isBuy = data[isBuy];
                                  specsPriceList[i].minNumber = data[minNumber];
                                  specsPriceList[i].minQuantity = data[minQuantity];
                                }
                              }
                              temp.specsPriceList = specsPriceList;

                              // var dingjiaHtml = '<div id="dingjiaOutDom' + dingjiaDom + '">';
                              var dingjiaHtml = '';
                              for (var v = 0; v < specsPriceList.length - 1; v++) {
                                var dingjiaTemp = '<tr class="dingjiaDom' + v + '">' +
                                  '<td>' + temp.name + '</td>' +
                                  '<td>' + items[specsPriceList[v].level - 1].name + '</td>' +
                                  '<td>' + (+specsPriceList[v].price / 1000) + '</td>' +
                                  '<td>' + (+specsPriceList[v].changePrice / 1000) + '</td>' +
                                  '<td>' + (specsPriceList[v].dailyNumber) + '</td>' +
                                  '<td>' + (specsPriceList[v].weeklyNumber) + '</td>' +
                                  '<td>' + (specsPriceList[v].monthlyNumber) + '</td>' +
                                  '<td>' + (dictInfo[specsPriceList[v].isBuy]) + '</td>' +
                                  '<td>' + (specsPriceList[v].minNumber) + '</td>' +
                                  '<td>' + (specsPriceList[v].minQuantity) + '</td>' +
                                  '</tr>';
                                dingjiaHtml += dingjiaTemp;
                              }

                              // dingjiaHtml += '</div>';
                              $('#dingjiaContent').append(dingjiaHtml);

                              specList.push(temp);
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
                    '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value1 + '%') + '</span>' +
                    '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value2 + '%') + '</span>' +
                    '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value3 + '%') + '</span>' +
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
  });

});
