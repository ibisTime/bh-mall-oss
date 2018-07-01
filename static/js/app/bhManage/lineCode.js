$(function() {
// 报货管理-溯源防伪
  var code;
  $('#search').click(function() {
    $('#downloadPic').empty();
    var number = updateListSearch();

    reqApi({
      code: '627870',
      json: {
        number: number
      }
    }, true).then(function (data) {
      if(data) {
        // $('#downloadPic').css('display', 'inline-block');
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
          boxHtml += '<li class="ewm" style="display: inline-block; width: 140px;margin-right: 10px">'+
              '<div class="logo" style="width: 100%;height: 3rem;background: #3b6c49;margin-bottom: 0.5rem;"></div>'+
              '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.5rem;">'+
                '<p style="height: 10%;font-size: 10px;margin-bottom: 0.2rem;">溯源码：'+ item.traceCode +'</p>'+
                '<p style="height: 10%;font-size: 4px;margin-bottom: 0.2rem;">扫描二维码，查防伪，查溯源</p>'+
              '</div>'+
              '<div class="center" style="text-align: center;margin-bottom: 0.5rem;">'+
                '<div class="erweimaPic" style="width: 50px;height: 50px;display: inline-block;"></div>'+
              '</div>'+
              '<div class="text" style="width: 100%;text-align: center;margin-bottom: 0.5rem;">'+
              '<p style="height: 10%;font-size: 0.54rem;margin-bottom: 0.2rem;">'+ item.securityCode +'</p>'+
              '<div style="height: 0.5rem"></div>'+
              '</div>'+
              '</li>';
        });
        boxHtml += '</ul>';
        $('#downloadPic').html(boxHtml);
        $('.erweimaPic').each(function (i, ele) {
          console.log(ele);
          new QRCode(ele, {
            width : 50,
            height : 50,
            typeNumber : 4,
            colorDark : "#000000",
            colorLight : "#ffffff"
          }).makeCode(url);
        });

        $('#downloadPic').append('<div style="text-align: right;"><div class="box" style="max-width: 1190px;display: inline-block;">' +
            '<div id="txm">' +
            '<div class="zzsc" style="display: inline-block;">' +
            '<div class="biglogo" style="width: 200px; height: 100px"></div>' +
            '<div>' +
            '<div style="width: 80px;height: 0px;border: 1px solid #FFFFFF"></div><span style="font-size: 18px;margin: 0 62px">扫描出货</span><div style="display: inline-block; width: 80px;height: 0px;border: 1px solid #FFFFFF"></div>' +
            '</div>' +
            '<canvas id="ean" width="200" height="100"></canvas>' +
            '</div>' +
            '</div>' +
            '</div></div>');
        $("#ean").EAN13(code,{
          color:'#000000'
        });
      }

    });
  });
  $('#download').click(function () {
    reqApi({
      code: '627871',
      json: {
        code: code
      }
    }, true).then(function (data) {
      if(data.isSuccess) {
        html2canvas( $('#downloadPic')[0]).then(function(canvas){
          var b64 = canvas.toDataURL("image/png");
          document.location.href = b64.replace("image/png", 'image/octet-stream');
          // var url = canvas.toDataURL();
          // //以下代码为下载此图片功能
          // var triggerDownload = $("<a>").attr("href", url).attr("download", "img.png").appendTo("body");
          // triggerDownload[0].click();
          // triggerDownload.remove();
        });
      }
    })


  })

});
function updateListSearch() {
  var params = $('.search-form').serializeObject();
  console.log(params);
  return params.number;
}