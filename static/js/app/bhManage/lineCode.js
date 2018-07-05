$(function() {
// 报货管理-溯源防伪
  var code;
  // 查询
  $('#search').click(function() {
    // var number = updateListSearch();

    reqApi({
      code: '627870',
      json: {}
    }, true).then(function (data) {
      $('.downloadPic').remove();
      totalHtml = '<div class="downloadPic" width="4400px" style="display: inline-block;padding: 20px; width: 1100px"></div>'
      $('.right-info').append(totalHtml);
      if(data) {
        var boxHtml = '';
        code = data.code;
        data.stList.forEach(function (item, i) {
          var url = data.url + '?code='+ item.traceCode;
          if (i % 8 == 0) {
            if (i == 0) {
              boxHtml += '<ul>';
            } else {
              boxHtml += '</ul><ul>';
            }
          }
          boxHtml += '<li class="ewm" width="8cm" height="12cm" style="display: inline-block; width: 2cm; height: 131px; margin-right: 6mm; margin-bottom: 6mm; font-size: 0;">'+
              '<div class="logo" style="width: 100%;height: 30px;background: #3b6c49;margin-bottom: 0.5rem;text-align: center;">' +
              '<img src="/static/images/maijiWhite.png" style="margin: 0 auto;height: 30px;"></div>'+
              '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.2rem;">'+
                '<p style="white-space: nowrap;transform: scale(0.45);margin-right: 45px;font-size: 12px;margin-top: -9px;">溯源码：'+ item.traceCode +'</p>'+
                '<p style="white-space: nowrap;transform: scale(0.43);margin-right: 59px;font-size: 12px;margin-top: -10px;">扫描二维码，查防伪，查溯源</p>'+
              '</div>'+
              '<div class="center" style="text-align: center;font-size: 0;margin-top: -4px;margin-bottom: 5px">'+
                '<div data-url="'+url+'" class="erweimaPic" style="width: 70px;height: 70px;display: inline-block;"></div>'+
              '</div>'+
              '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.5rem;margin-top: -4px;">'+
              '<p style="font-size: 0.54rem;transform: scale(0.55);margin-right: 11px;">'+ item.securityCode +'</p>'+
              '<div style="height: 0.5rem"></div>'+
              '</div>'+
              '</li>';
        });
        boxHtml += '</ul>';
        $('.downloadPic').html(boxHtml);
        $('.erweimaPic').each(function (i, ele) {
          new QRCode(ele, {
            width : 70,
            height : 70,
            typeNumber : 4,
            colorDark : "#000000",
            colorLight : "#ffffff"
          }).makeCode($(ele).data('url'));
        });

        $('.downloadPic').append('<div style="text-align: right;"><div class="box" style="width: 6cm; height: 4cm; display: inline-block;padding: 0 20px">' +
            '<div id="txm">' +
            '<div class="zzsc" style="display: inline-block;">' +
            '<div class="biglogo" style="width: 200px; height: 40px;text-align: center;">' +
            '<img src="/static/images/maijiGreen.png" alt="" style="width: 80px; height: 40px;">' +
            '</div>' +
            '<div style="display: flex;align-items: center;">' +
            '<div style="width: 40px;height: 0px;border: 1px solid #eee; flex: 1;"></div>' +
            '<span style="font-size: 18px;">扫描出货</span>' +
            '<div style="width: 40px;height: 0px;border: 1px solid #eee; flex: 1;"></div>' +
            '</div>'+
            '<canvas id="ean" width="360" height="150" style="width: 180px; height: 75px; margin-right: 10px"></canvas>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div></div>');
        $("#ean").EAN13(code,{
          color:'#000000'
        });
      }

    });
  });
  // 下载
  $('#download').click(function () {
    confirm('确定下载？').then(function () {
      var dw = dialog({
        content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
        '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入下载信息</ul>' +
        '</form>'
      });

      dw.showModal();

      buildDetail({
        container: $('#formContainer'),
        fields: [{
          field: 'number',
          title: '每页数量',
          required: true,
          number: true,
          min: '0'
        }
        // ,{
        //   field : 'quantity',
        //   title : '张数',
        //   required: true,
        //   number: true,
        //   min: '0'
        // }
        ],
        buttons: [{
          title: '确定',
          handler: function () {
            // gger;
            if ($('#popForm').valid()) {
              var data = $('#popForm').serializeObject();
                reqApi({
                  code: '627871',
                  json: {
                    number: data.number,
                    quantity: 1
                  }
                }).done(function (res) {
                  $('.downloadPic').remove();
                  dw.close().remove();
                  res.forEach(function (zhang, index) {
                    var code = zhang.code;
                    var boxHtml = '<div class="downloadPic page'+index+'" style="display: inline-block;padding: 20px; width: 1100px">';
                    zhang.stList.forEach(function (he, i) {
                      var url = zhang.url + '?code='+ he.traceCode;
                      // urlArr.push(url + '?traceCode='+ he.traceCode);
                      if (i % 8 == 0) {
                        if (i == 0) {
                          boxHtml += '<ul>';
                        } else {
                          boxHtml += '</ul><ul>';
                        }
                      }
                      // 二维码
                      boxHtml += '<li class="ewm" width="8cm" height="12cm" style="display: inline-block; width: 2cm; height: 135px; margin-right: 6mm; margin-bottom: 6mm; font-size: 0;">'+
                          '<div class="logo" style="width: 100%;height: 33px;background: #3b6c49;margin-bottom: 0.5rem;text-align: center;">' +
                          '<img src="/static/images/maijiWhite.png" style="margin: 2px auto 0;height: 30px;"></div>'+
                          '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.2rem;">'+
                          '<p style="white-space: nowrap;transform: scale(0.45);margin-right: 45px;font-size: 12px;margin-top: -9px;">溯源码：'+ he.traceCode +'</p>'+
                          '<p style="white-space: nowrap;transform: scale(0.38);margin-right: 52px;font-size: 12px;margin-top: -10px;;">扫描二维码，查防伪，查溯源</p>'+
                          '</div>'+
                          '<div class="center" style="text-align: center;font-size: 0;margin-top: -4px;margin-bottom: 5px;">'+
                          '<div data-url="'+url+'" class="erweimaPic" width="330" height="330" style="width: 70px;height: 70px;display: inline-block;"></div>'+
                          '</div>'+
                          '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.5rem;margin-top: -4px;">'+
                          '<p style="font-size: 0.54rem;transform: scale(0.55);margin-right: 11px;">'+ he.securityCode +'</p>'+
                          '<div style="height: 0.5rem"></div>'+
                          '</div>'+
                          '</li>';
                    });
                    boxHtml += '</ul>';
                    boxHtml += '<div style="text-align: right;">' +
                                  '<div class="box" style="width: 6cm; height: 4cm; display: inline-block;padding: 0 20px">' +
                                    '<div id="txm">' +
                                      '<div class="zzsc" style="display: inline-block;">' +
                                        '<div class="biglogo" style="width: 200px; height: 40px;text-align: center;">' +
                                          '<img src="/static/images/maijiGreen.png" alt="" style="width: 80px; height: 40px;">' +
                                        '</div>' +
                                      '<div style="display: flex;align-items: center;">' +
                                        '<div style="width: 40px;height: 0px;border: 1px solid #eee; flex: 1;"></div>' +
                                        '<span style="font-size: 18px;">扫描出货</span>' +
                                        '<div style="width: 40px;height: 0px;border: 1px solid #eee; flex: 1;"></div>' +
                                      '</div>'+
                                      '<canvas class="ean" data-code="'+code+'" width="360" height="150" style="width: 180px; height: 75px; margin-right: 10px"></canvas>' +
                                    '</div>' +
                                  '</div>' +
                                '</div></div>';
                    $('.right-info').append(boxHtml);
                  });
                  $('.erweimaPic').each(function (i, ele) {
                    new QRCode(ele, {
                      width : 70,
                      height : 70,
                      typeNumber : 4,
                      colorDark : "#000000",
                      colorLight : "#ffffff",
                      scale: 8
                    }).makeCode($(ele).data('url'));
                  });
                  // 条形码
                  $(".ean").each(function (i, ele) {
                    var $me = $(ele);
                    var code = $me.data('code') + '';
                    $me.EAN13(code, { color: '#000000' });
                  });
                  pageIndex = 0;
                  downUrl = [];
                  downloadPage();
                })
            }
          }
        }, {
          title: '取消',
          handler: function () {
            dw.close().remove();
          }
        }]
      });
      dw.__center();
    });
  });
});

var pageIndex = 0;
function downloadPage() {
  var num = $('.downloadPic').length;
  if (pageIndex < num) {
    var ele = $('.page' + pageIndex)[0];
    pageIndex++;
    html2canvas(ele, {
      scale: 15
    }).then(function (canvas) {
      var b64 = canvas.toDataURL("image/jpeg");
      uploadByBase64(b64);
      downloadPage();
    }).catch(function (reason) {
      console.log(reason);
    });
  }
}
var downUrl = [];
function uploadByBase64(base64) {
  reqApi({
    code: '627091',
    json: {},
    cache: true
  }).done(function(data) {
    var token = data.uploadToken;
    base64 = base64.substr(base64.indexOf('base64,') + 7);
    var timestamp = (new Date()).valueOf();
    var key = Base64.encode(timestamp + '0845.jpg');
    $.ajax({
      url: 'http://up-z2.qiniu.com/putb64/-1/key/' + key,
      type: 'post',
      data: base64,
      contentType: 'application/octet-stream',
      headers: {
        'Authorization': 'UpToken ' + token
      }
    }).done(function (res) {
      // console.log('1');
      // var iframe = document.createElement('iframe');
      // iframe.src = 'http://otoieuivb.bkt.clouddn.com/' + res.key + '?attname='+ res.key;
      // document.body.appendChild(iframe);
      location.href = 'http://otoieuivb.bkt.clouddn.com/' + res.key + '?attname='+ res.key;
    });
  });
}
// function download() {
//   downUrl.forEach(function (url, i) {
//     setTimeout(function () {
//       location.href = url;
//     }, (i - 1) * 1000);
//   });
// }