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
        data.specList = detailData.specsList;
        // 奖励机制
        data.awardList = detailData.awardList;
        data.code = code;

        var type0 = [];

        function ftype0(item) {
          if (item.type == '0') {
            return item
          }
        }

        type0 = awardList.filter(ftype0);

        if (data.specList.length <= 0 || type0.length <= 0) {
          toastr.info('请检查您是否填写规格体系以及奖励机制')
        } else {
          return data;
        }
        return data;
      },
      afterData: function(data) {
        detailData = data;
        var spList = data.specsList;
        var obj = {};
        for (var i = 0; i < spList.length; i++) {
          obj[spList[i].code] = spList[i].name;
        }
        globalSpecialList = obj;
        // 插入规格和定价
        var g = 0;
        detailData.specsList.map(function(item) {
          var guigeTemp = '<tr id="guigeDom' + g + '">' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.number + '</td>' +
            '<td>' + item.weight + '</td>' +
            '<td>' + bool[item.isNormalOrder] + '</td>' +
            '<td>' + bool[item.isImpowerOrder] + '</td>' +
            '<td>' + bool[item.isUpgradeOrder] + '</td>' +
            '<td>' + bool[item.isSingle] + '</td>' +
            '<td>' + globalSpecialList[item.refCode] + '</td>' +
            '<td>' + item.singleNumber + '</td>' +
            '<td>' +
            '<input id="delguigeBtn_' + g + '" data-name="' + item.name + '" type="button" class="btn delguigeBtn" style="margin-left:0px;margin-top: 0;" value="删除"/>' +
            '<input id="editBtn_' + g + '" data-code="' + item.code + '" data-name="' + item.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
            '</td>' +
            '</tr>';
          $('#guigeHtml').append(guigeTemp);

          // var dingjiaHtml = '<div id="dingjiaOutDom'+dingjiaDom+'">';
          var dingjiaHtml = '';
          for (var v = 0; v < item.priceList.length; v++) {
            var dingjiaTemp = '<tr data-index="' + dingjiaDom + '" class="dingjiaDom' + v + '">' +
              '<td>' + item.name + '</td>' +
              '<td>' + items[item.priceList[v].level - 1].name + '</td>' +
              '<td>' + moneyFormat(item.priceList[v].price) + '</td>' +
              '<td>' + moneyFormat(item.priceList[v].changePrice) + '</td>' +
              '<td>' + item.priceList[v].dailyNumber + '</td>' +
              '<td>' + item.priceList[v].weeklyNumber + '</td>' +
              '<td>' + item.priceList[v].monthlyNumber + '</td>' +
              '<td>' + bool[item.priceList[v].isBuy] + '</td>' +
              '<td>' + item.priceList[v].minNumber + '</td>' +
              '<td>' + item.priceList[v].minQuantity + '</td>' +
              '<td>' +
              '<input data-index="' + dingjiaDom + '" data-sindex="' + v + '" data-code="' + item.code + '" data-name="' + item.name + '" type="button" class="btn specEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
              '</td>' +
              '</tr>';
            dingjiaHtml += dingjiaTemp;
          }

          // dingjiaHtml += '</div>';
          $('#dingjiaContent').append(dingjiaHtml);
          g++;
        })

        // 插入推荐奖励
        detailData.directAwardList.map(function(index, item) {
          var awardTemp = '<div id="awardDom' + item + '">' +
            '<span style="width : 120px;padding:20px 40px;display: inline-block">' + items[index.level - 1].name + '</span>' +
            '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value1 * 100 + '%') + '</span>' +
            '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value2 * 100 + '%') + '</span>' +
            '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+index.value3 * 100 + '%') + '</span>' +
            '<input id="editAwardBtn_' + item + '" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>' +
            '</div>'
          awardHtml += awardTemp;
        })
        $('#awardContent').append(awardHtml);

        // 规格定价数据格式转换
        detailData.specsList.map(function(item) {
          return {
            code: item.code,
            isNormalOrder: item.isNormalOrder,
            isImpowerOrder: item.isImpowerOrder,
            isUpgradeOrder: item.isUpgradeOrder,
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

        detailData.specsList.map(function(item) {
          item.specsPriceList = item.priceList;
          delete item.priceList;
        })


        // 奖励数据格式转换

        detailData.directAwardList.map(function(item) {
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
      '<div style="border: 1px solid #ced9df">' +
      '<table id="dingjiaTitle" style="width: 100%;">' +
      '<thead>' +
      '<tr><th>规格</th><th>等级</th><th>价格</th><th>换货价</th><th>每日限购</th><th>每周限购</th><th>每月限购</th><th>是否可购买</th><th>云仓最少发货数量</th><th>起购数量</th><th>操作</th></tr>' +
      '</thead>' +
      '<tbody id="dingjiaContent"></tbody>' +
      '</table>' +
      '</div>' +
      '</div>');

    // 规格
    $('#remark').parent().after(
      '<div style="width:100%">' +
      '<span style="font-size: 18px">产品规格<input id="add1Btn" type="button" class="btn" style="margin-left:20px;display: inline-block;!important;" value="添加"/></span>' +
      '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
      '<table style="border: 1px solid #ced9df;width: 100%;">' +
      '<thead>' +
      '<tr><th>规格名称</th><th>规格包含数量</th><th>重量(g)</th><th>是否允许普通单下单</th><th>是否允许授权单下单</th><th>是否允许升级单下单</th><th>是否可拆单</th><th>关联拆单编号</th><th>拆单数量</th><th>操作</th></tr>' +
      '</thead>' +
      '<tbody id="guigeHtml"></tbody>' +
      '</table>' +
      '</div>');

    // 推荐奖励
    var awardHtml = '';
    $('#remark').parent().after(
      '<div style="width:100%">' +
      '<span style="font-size: 18px">推荐奖励机制(请输入0-1之间的小数(%))</span>' +
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

    // 修改产品规格
    $('#guigeHtml').on('click', '.delguigeEditBtn', function(e) {
      specList = detailData.specsList;
      var g = specList.length - 1;
      var code = $(this).data('code');
      var name = $(this).data('name');
      if (code) {
        for (var i = specList.length - 1; i >= 0; i--) {
          if (specList[i].code == code) {
            g = i;
            break;
          }
        }
      } else {
        for (var i = specList.length - 1; i >= 0; i--) {
          if (specList[i].name == name) {
            g = i;
            break;
          }
        }
      }
      var useData = specList[g];
			useData.name0 = useData.name;
			useData.isImpowerOrder0 = useData.isImpowerOrder;

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
          field: 'isImpowerOrder0',
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
          field: 'refCode',
          title: '关联拆单编号',
          type: 'select',
          data: globalSpecialList
        }, {
          field: 'singleNumber',
          title: '拆单数量'
        }],
        useData: useData,
        buttons: [{
          title: '确定',
          handler: function() {
            if ($('#popForm').valid()) {
              var temp = $('#popForm').serializeObject();
              temp.code = useData.code || '';
							temp.name = temp.name0;
							temp.isImpowerOrder = temp.isImpowerOrder0;
              var guigeTemp = '<tr id="guigeDom' + g + '">' +
                '<td>' + temp.name + '</td>' +
                '<td>' + temp.number + '</td>' +
                '<td>' + temp.weight + '</td>' +
                '<td>' + bool[temp.isNormalOrder] + '</td>' +
                '<td>' + bool[temp.isImpowerOrder] + '</td>' +
                '<td>' + bool[temp.isUpgradeOrder] + '</td>' +
                '<td>' + bool[temp.isSingle] + '</td>' +
                '<td>' + globalSpecialList[temp.refCode] + '</td>' +
                '<td>' + temp.singleNumber + '</td>' +
                '<td>' +
                '<input data-name="' + temp.name + '" id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:0px;margin-top: 0;" value="删除"/>' +
                '<input id="editBtn_' + g + '" data-code="' + temp.code + '" data-name="' + temp.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
                '</td>' +
                '</tr>';

              $('#guigeDom' + g).replaceWith(guigeTemp);

              dw.close().remove();
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

    // 删除规格定价
    $('#guigeHtml').on('click', '.delguigeBtn', function delguige(e) {
      specList = detailData.specsList;
      var id = e.target.id;
      var text = $(this).data('name');
      for (var v = 0; v < specList.length; v++) {
        if (specList[v].name == text) {
          specList.splice(v, 1);
          break;
        }
      }
      for (var key in globalSpecialList) {
        if (globalSpecialList[key] == text) {
          delete globalSpecialList[key];
        }
      }

      $('#guigeHtml').empty();
      $('#dingjiaContent').empty();
      var a = 0;
      specList.map(function(item) {
        var guigeTemp = '<tr id="guigeDom' + a + '">' +
          '<td>' + item.name + '</td>' +
          '<td>' + item.number + '</td>' +
          '<td>' + item.weight + '</td>' +
          '<td>' + bool[item.isNormalOrder] + '</td>' +
          '<td>' + bool[item.isImpowerOrder] + '</td>' +
          '<td>' + bool[item.isUpgradeOrder] + '</td>' +
          '<td>' + bool[item.isSingle] + '</td>' +
          '<td>' + item.refCode + '</td>' +
          '<td>' + item.singleNumber + '</td>' +
          '<td>' +
          '<input id="delguigeBtn_' + a + '" data-name="' + item.name + '" type="button" class="btn delguigeBtn" style="margin-left:0px;margin-top:0px;" value="删除"/>' +
          '<input id="editBtn_' + a + '" data-code="' + item.code + '" data-name="' + item.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
          '</td>' +
          '</tr>';


        $('#guigeHtml').append(guigeTemp);

        // var dingjiaHtml = '<div id="dingjiaOutDom'+a+'">';
        var dingjiaHtml = '';
        var priceList = item.specsPriceList || item.priceList;
        for (var v = 0; v < priceList.length; v++) {
          var dingjiaTemp = '<tr data-index="' + a + '" class="dingjiaDom' + v + '">' +
            '<td>' + item.name + '</td>' +
            '<td>' + items[priceList[v].level - 1].name + '</td>' +
            '<td>' + moneyFormat(priceList[v].price) + '</td>' +
            '<td>' + moneyFormat(priceList[v].changePrice) + '</td>' +
            '<td>' + priceList[v].dailyNumber + '</td>' +
            '<td>' + priceList[v].weeklyNumber + '</td>' +
            '<td>' + priceList[v].monthlyNumber + '</td>' +
            '<td>' + bool[priceList[v].isBuy] + '</td>' +
            '<td>' + priceList[v].minNumber + '</td>' +
            '<td>' + priceList[v].minQuantity + '</td>' +
            '</tr>'
          dingjiaHtml += dingjiaTemp;
        }

        // dingjiaHtml += '</div>';
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
                '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+data.value1 * 100 + '%') + '</span>' +
                '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+data.value2 * 100 + '%') + '</span>' +
                '<span style="width : 140px;padding:20px 70px;display: inline-block">' + (+data.value3 * 100 + '%') + '</span>' +
                '<input id="editAwardBtn_' + index + '" type="button" class="btn editAwardBtn" style="margin-left:40px;display: inline-block;!important;" value="修改"/>'
                // '</div>'



              $('。editAwardBtn').click(function() {
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

		// 规格定价修改
    $('#dingjiaTitle').on('click', '.specEditBtn', function(e) {
      var me = $(this);
      var index = me.data('index');
      var sIndex = me.data('sindex');
      var specs = detailData.specsList[index];
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
        required: true
      }, {
        field: 'weeklyNumber',
        title: '周限购',
        required: true
      }, {
        field: 'monthlyNumber',
        title: '月限购',
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
        required: true
      }, {
        field: 'minQuantity',
        title: '起购数量',
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
              detailData.specsList.splice(index, 1, specs);
              $('.dingjiaDom' + sIndex + '[data-index=' + index + ']').replaceWith(
                '<tr data-index="' + dingjiaDom + '" class="dingjiaDom' + v + '">' +
                '<td>' + specs.name + '</td>' +
                '<td>' + levelName + '</td>' +
                '<td>' + moneyFormat(priceInfo.price) + '</td>' +
                '<td>' + moneyFormat(priceInfo.changePrice) + '</td>' +
                '<td>' + priceInfo.dailyNumber + '</td>' +
                '<td>' + priceInfo.weeklyNumber + '</td>' +
                '<td>' + priceInfo.monthlyNumber + '</td>' +
                '<td>' + bool[priceInfo.isBuy] + '</td>' +
                '<td>' + priceInfo.minNumber + '</td>' +
                '<td>' + priceInfo.minQuantity + '</td>' +
                '<td>' +
                '<input data-index="' + index + '" data-sindex="' + sIndex + '" data-code="' + priceInfo.code + '" data-name="' + specs.name + '" type="button" class="btn specEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
                '</td>' +
                '</tr>'
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

    var b = 0;

    var dingjiaDom = 0;
    // 添加产品规格
    $('#add1Btn').click(function() {
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
          field: 'refCode',
          title: '关联拆单编号',
          type: 'select',
          data: globalSpecialList
        }, {
          field: 'singleNumber',
          title: '拆单数量'
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
              temp.isSingle = data.isSingle;
              temp.refCode = data.refCode;
              temp.singleNumber = data.singleNumber;

              var guigeTemp = '<tr id="guigeDom' + g + '">' +
                '<td>' + temp.name + '</td>' +
                '<td>' + temp.number + '</td>' +
                '<td>' + temp.weight + '</td>' +
                '<td>' + bool[temp.isNormalOrder] + '</td>' +
                '<td>' + bool[temp.isImpowerOrder] + '</td>' +
                '<td>' + bool[temp.isUpgradeOrder] + '</td>' +
                '<td>' + bool[temp.isSingle] + '</td>' +
                '<td>' + globalSpecialList[temp.refCode] + '</td>' +
                '<td>' + temp.singleNumber + '</td>' +
                '<td>' +
                '<input data-name="' + temp.name + '" id="delguigeBtn_' + g + '" type="button" class="btn delguigeBtn" style="margin-left:0px;margin-top: 0;" value="删除"/>' +
                '<input id="editBtn_' + g + '" data-code="' + temp.code + '" data-name="' + temp.name + '" type="button" class="btn delguigeEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
                '</td>' +
                '</tr>';

              $('#guigeHtml').append(guigeTemp);

              dw.close().remove();
              var circleList = []
              for (var p = 0; p < items.length; p++) {
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
                          temp1.price = data[price1] * 1000;
                          temp1.changePrice = data[changePrice1] * 1000;

                          specsPriceList.push(temp1);
                        }
                      }

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

                              // var dingjiaHtml = '<div id=dingjiaOutDom' + dingjiaDom + '">';
                              var dingjiaHtml = '';
                              for (var v = 0; v < specsPriceList.length; v++) {
                                var dingjiaTemp = '<tr data-index="' + dingjiaDom + '" class="dingjiaDom' + v + '">' +
                                  '<td>' + temp.name + '</td>' +
                                  '<td>' + items[specsPriceList[v].level - 1].name + '</td>' +
                                  '<td>' + (moneyFormat(specsPriceList[v].price)) + '</td>' +
                                  '<td>' + (moneyFormat(specsPriceList[v].changePrice)) + '</td>' +
                                  '<td>' + (specsPriceList[v].dailyNumber) + '</td>' +
                                  '<td>' + (specsPriceList[v].weeklyNumber) + '</td>' +
                                  '<td>' + (specsPriceList[v].monthlyNumber) + '</td>' +
                                  '<td>' + (dictInfo[specsPriceList[v].isBuy]) + '</td>' +
                                  '<td>' + (specsPriceList[v].minNumber) + '</td>' +
                                  '<td>' + (specsPriceList[v].minQuantity) + '</td>' +
																	'<td>' +
										              '<input data-index="' + dingjiaDom + '" data-sindex="' + v + '" data-code="" data-name="' + temp.name + '" type="button" class="btn specEditBtn" style="margin-left:0px;margin-top: 0;" value="修改"/>' +
										              '</td>' +
                                  '</tr>';
                                dingjiaHtml += dingjiaTemp;
                              }

                              $('#dingjiaContent').append(dingjiaHtml);

                              detailData.specsList.push(temp)
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

  });

});
