$(function() {
// 报货管理-溯源防伪
  var code;
  $('#search').click(function() {
    // var number = updateListSearch();

    reqApi({
      code: '627870',
      json: {}
    }, true).then(function (data) {
      var totalHtml = '<div class="downloadPic" width="4400px" style="display: inline-block;padding: 20px; width: 1100px"></div>'
      $('.right-info').append(totalHtml);
      if(data) {
        var boxHtml = '';
        var url = data.url;
        code = data.code;
        data.stList.forEach(function (item, i) {
          if (i % 8 == 0) {
            if (i == 0) {
              boxHtml += '<ul>';
            } else {
              boxHtml += '</ul><ul>';
            }
          }
          boxHtml += '<li class="ewm" width="8cm" height="12cm" style="display: inline-block; width: 2cm; height: 3cm; margin-right: 10px; font-size: 0;">'+
              '<div class="logo" style="width: 100%;height: 30px;background: #3b6c49;margin-bottom: 0.5rem;text-align: center;">' +
              '<img src="/static/images/maijiWhite.png" style="margin: 0 auto;height: 30px;"></div>'+
              '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.2rem;">'+
              '<p style="white-space: nowrap;transform: scale(0.53);margin-right: 57px;font-size: 12px;margin-top: -6px;">溯源码：'+ item.traceCode +'</p>'+
              '<p style="white-space: nowrap;transform: scale(0.43);margin-right: 59px;font-size: 12px;margin-top: -11px;">扫描二维码，查防伪，查溯源</p>'+
              '</div>'+
              '<div class="center" style="text-align: center;font-size: 0;margin-top: -4px;margin-bottom: 5px">'+
              '<div class="erweimaPic" style="width: 50px;height: 50px;display: inline-block;"></div>'+
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
            width : 50,
            height : 50,
            typeNumber : 4,
            colorDark : "#000000",
            colorLight : "#ffffff"
          }).makeCode(url);
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
        },{
          field : 'quantity',
          title : '张数',
          required: true,
          number: true,
          min: '0'
        }],
        buttons: [{
          title: '确定',
          handler: function () {
            if ($('#popForm').valid()) {
              // debugger;
              var data = $('#popForm').serializeObject();
              var urlArr = [];
              for(var j = 0 ;j < data.quantity; j++) {
                console.log(j);
                reqApi({
                  code: '627871',
                  json: {
                    number: data.number,
                    quantity: 1
                  }
                }).then(function (data) {
                  debugger;
                  var boxHtml = '';
                  var url = '';
                  // urlArr[j] = [];
                  // data.map(function (item) {
                    url = data[0].url;
                    code = data[0].code;
                    boxHtml += '<div class="downloadPic" width="4400px" style="display: inline-block; padding: 20px; width: 1100px"></div>';
                    // $('.right-info').append(boxHtml);
                  data[0].stList.forEach(function (a, i) {
                      // urlArr[j].push(url + '?traceCode='+ a.traceCode);
                      urlArr.push(url + '?traceCode='+ a.traceCode);
                      console.log(a.traceCode);
                      // console.log(urlArr[0][0]);
                      console.log(urlArr.length);
                      if (i % 8 == 0) {
                        if (i == 0) {
                          boxHtml += '<ul>';
                        } else {
                          boxHtml += '</ul><ul>';
                        }
                      }
                      boxHtml += '<li class="ewm" width="8cm" height="12cm" style="display: inline-block; width: 2cm; height: 3cm; margin-right: 10px; font-size: 0;">'+
                          '<div class="logo" style="width: 100%;height: 30px;background: #3b6c49;margin-bottom: 0.5rem;text-align: center;">' +
                          '<img src="/static/images/maijiWhite.png" style="margin: 0 auto;height: 30px;"></div>'+
                          '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.2rem;">'+
                          '<p style="white-space: nowrap;transform: scale(0.53);margin-right: 57px;font-size: 12px;margin-top: -6px;">溯源码：'+ a.traceCode +'</p>'+
                          '<p style="white-space: nowrap;transform: scale(0.43);margin-right: 59px;font-size: 12px;margin-top: -11px;">扫描二维码，查防伪，查溯源</p>'+
                          '</div>'+
                          '<div class="center" style="text-align: center;font-size: 0;margin-top: -4px;margin-bottom: 5px">'+
                          '<div class="erweimaPic erweimaPic'+urlArr.length+' style="width: 70px;height: 70px;display: inline-block;"></div>'+
                          '</div>'+
                          '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.5rem;margin-top: -4px;">'+
                          '<p style="font-size: 0.54rem;transform: scale(0.55);margin-right: 11px;">'+ a.securityCode +'</p>'+
                          '<div style="height: 0.5rem"></div>'+
                          '</div>'+
                          '</li>';
                    });
                  boxHtml += '</ul>';
                  $('.downloadPic').html(boxHtml);
                  for(var a=1; a<=$('.erweimaPic').length; a++) {
                    var ele = document.getElementsByClassName("erweimaPic"+a)[0];
                    new QRCode(ele, {
                      width : 70,
                      height : 70,
                      typeNumber : 4,
                      colorDark : "#000000",
                      colorLight : "#ffffff"
                    }).makeCode(urlArr[a-1]);
                  }
                  // $('.erweimaPic').each(function (i, ele) {
                  //   // console.log(urlArr);
                  //   // console.log(ele);
                  //   // console.log(i);
                  //
                  //   new QRCode(ele, {
                  //     width : 70,
                  //     height : 70,
                  //     typeNumber : 4,
                  //     colorDark : "#000000",
                  //     colorLight : "#ffffff"
                  //   }).makeCode(urlArr[i]);
                  // });
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

                  $('.right-info').append(boxHtml);
                  html2canvas($('.downloadPic')[0], {
                    scale: 10
                  }).then(function (canvas) {
                    var b64 = canvas.toDataURL("image/jpeg");
                    uploadByBase64(b64);
                  });
                })
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
      dw.__center();
    })



    // var width = $('.downloadPic').width() ; //这是我们准备画的div
    // var height =  $('.downloadPic').height() ;
    // $('.downloadPic')[0].style.width = width * 8;
    // $('.downloadPic')[0].style.height = height * 8;

  })
});

var pageIndex = 0;
function a() {
  // debugger;
  var num = $('.downloadPic').length;
  if(pageIndex < num) {
    pageIndex++;
    html2canvas($('.page'+pageIndex)[0], {
      scale: 10
    }).then(function (canvas) {
      var b64 = canvas.toDataURL("image/jpeg");
      uploadByBase64(b64);
      a();
    });
  }
}

function uploadByBase64(base64) {
  reqApi({
    code: '627091',
    json: {},
    cache: true
  }).done(function(data) {
    var token = data.uploadToken;
    base64 = base64.substr(base64.indexOf('base64,') + 7);
    var timestamp = (new Date()).valueOf()
    console.log(timestamp);
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
      var url = 'http://otoieuivb.bkt.clouddn.com/' + res.key;
      location.href = 'http://otoieuivb.bkt.clouddn.com/' + res.key + '?attname='+ res.key;
      console.log(url);

      // var img = document.createElement('img');
      // 将图片的src属性作为URL地址
      // var url = img.src;
      // var a = document.createElement('a')
      // var event = new MouseEvent('click')
      //
      // a.download = name || '下载图片名称'
      // a.href = url;
      //
      // a.dispatchEvent(event);
      // DownLoadReportIMG(url);
      // var url = 'http://otoieuivb.bkt.clouddn.com/' + res.key;
      // console.log(url);
      // var a = document.createElement('a');
      // var event = new MouseEvent('click');
      // a.download = '下载图片名称';
      // a.href = url;
      // a.dispatchEvent(event);
      // }
      // image.src = url
    });
  });
  // index++;
}