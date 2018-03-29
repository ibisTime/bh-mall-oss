$(function () {
    $('#username').editable();
});

// $(function() {
//
// 	var code = getQueryString('code');
//
//
//
//     reqApi({
//         code: '627006',
//     }, true).then(function (data) {
//         var items = data.map(function (item) {
//             return {
//                 level: item.level,
//                 name: item.name
//             };
//         });
//
//
//         var html='<div>';
//         var guigeHtml = '';
//         var dingjiaHtml = '';
//         var temp='';
//         for(var v of items) {
//             html+= '<label style="padding: 20px 40px"><b>*</b>'+v.name+'</label>'
//         }
//         html+='</div>';
//
//         var fields = [{
//             field : 'name',
//             title : '产品名称',
//             required : true
//         }, {
//             field : 'adPrice',
//             title : '建议价',
//             formatter: moneyFormat,
//             required : true
//         },{
//             field : 'price',
//             title : '市场价',
//             formatter: moneyFormat,
//             required : true
//         }, {
//             field : 'changePrice',
//             title : '换货价',
//             formatter: moneyFormat,
//             required : true
//         },{
//             field : 'advPic',
//             title : '广告图',
//             type: 'img',
//             required : true
//         }, {
//             field : 'pic',
//             title : '缩略图',
//             type: 'img',
//             single : true,
//             required : true
//         },  {
//             field : 'virNumber',
//             title : '虚拟数量',
//             required : true
//         }, {
//             field : 'realNumber',
//             title : '实际数量',
//             required : true
//         },{
//             field : 'slogan',
//             title : '广告语',
//             required : true
//         }, {
//             field : 'isTotal',
//             title : '是否计入出货',
//             type : 'select',
//             data : {'1':'是','0':'否'},
//             required : true
//         },
//         //     {
//         //     field : 'guigeName',
//         //     title : '规格名称',
//         //     required : true
//         // }, {
//         //     field : 'number',
//         //     title : '规格包含数量',
//         //     required : true
//         // }, {
//         //     field : 'weight',
//         //     title : '重量',
//         //     required : true
//         // }, {
//         //     field : 'isNormalOrder',
//         //     title : '是否允许普通单下单',
//         //     type : 'select',
//         //     data : {'1':'是','0':'否'},
//         //     required : true
//         // }, {
//         //     field : 'isPowerOrder',
//         //     title : '是否允许授权单下单',
//         //     type : 'select',
//         //     data : {'1':'是','0':'否'},
//         //     required : true
//         // }, {
//         //     field : 'isUpgradeOrder',
//         //     title : '是否允许升级单下单	',
//         //     type : 'select',
//         //     data : {'1':'是','0':'否'},
//         //     required : true
//         // },
//             {
//             field : 'remark',
//             title : '备注'
//         }];
//
//
//         var columns1 = [{
//             fields : 'guigeName',
//             title : '规格名称'
//         }];
//         buildDetail({
//             fields: fields,
//             code: code,
//             detailCode: '627927',
//             addCode: '627920',
//             editCode: '627921',
//             beforeSubmit : function (data) {
//                 //产品规格
//                 data.specList=[];
//                 var temp={};
//                 temp.isNormalOrder = $('#isNormalOrder').val();
//                 temp.isPowerOrder = $('#isPowerOrder').val();
//                 temp.isUpgradeOrder = $('#isUpgradeOrder').val();
//                 temp.guigeName = $('#guigeName').val();
//                 temp.number = $('#number').val();
//                 temp.isNormalOrder = $('#weight').val();
//                 data.specList.push(temp);
//                 console.log(data.specList);
//
//                 // 规格定价
//                 data.specsPriceList=[];
//
//                 for(var v of items) {
//                     v.price =$('#'+ v.level).val();
//                     delete v.name;
//                     delete data[v.level];
//                 }
//                 data.specsPriceList = items;
//
//
//
//                 console.log(data);
//                 return data;
//             }
//         });
//         hideLoading();
//
//
//
//         // $('#remark').parent().after(
//         //     '<div style="width:100%">' +
//         //     '<span style="font-size: 18px">规格定价</span>' +
//         //     '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
//         //         '<div style="border: 1px solid #ced9df">'+
//         //              html+
//         //             '<div id="dingjiaHtml"></div>'+
//         //         '</div>'+
//         //     '</div>')
//
//         $('#remark').parent().after(
//             '<div style="width:100%">' +
//             '<span style="font-size: 18px">产品规格</span>'+
//             '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
//             '<div style="border: 1px solid #ced9df">'+
//             '<div id="guigeHtml"></div>'+
//             '</div>'+
//             '</div>')
//
//         $('#familTable').bootstrapTable({
//             editable: false,//开启编辑模式
//             toolbar: '#tbar_famil',
//             search: true,
//             showColumns: true, // 开启自定义列显示功能
//             dataType: 'json',
//             striped: true,
//             sidePagination: 'server',//设置为服务器端分页
//             pagination: true,
//             pageList: [10, 25, 50, 100],
//             columns:[
//                 {checkbox:true,valign:'middle',width:'50px'},
//                 {
//                     field:'Number',title:'序号',align:'center',valign:'middle',width:'50px',
//                     formatter:function(value,row,index){
//                         return index + 1;
//                     }
//                 },
//                 {field:'cid',title:'分类',align:'center',valign:'middle',width:'100px',editable:{
//                     type:'select',
//                     title:'分类',
//                     source:[{value:"10001",text:"研发部"},{value:"10002",text:"销售部"},{value:"10003",text:"行政部"}]
//                 }},
//                 {field:'comment',title:'内容',align:'left',valign:'middle',editable:{
//                     type:'text',
//                     title:'修改评论',
//                     disabled:false,             //是否禁用编辑
//                     emptytext:"请输入评论内容",          //空值的默认文本
//                     mode:"popup",              //编辑框的模式：支持popup和inline两种模式，默认是popup""
//                     validate:function(value){ //字段验证
//                         if(! $.trim(value)){
//                             return '不能为空';
//                         }
//                     }
//                 }}
//             ],
//             onEditableSave: function (field, row, oldValue, $el) {
//                 $table.bootstrapTable("resetView");
//             },
//         });
//         //新增家庭成员
//
//         hideLoading();
//
//         // $('#remark').parent().before(
//         //     '<div style="width:100%;height:300px;">' +
//         //     '<span style="font-size: 18px">规格定价</span>' +
//         //     '<hr style="height:2px;border:none;border-top:1px ridge #ced9df;">' +
//         //     html+
//         //     '</div>')
//         $('#add1Btn').click(function () {
//             guigeHtml = '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 100px;margin:10px  10px">'+
//                 '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 140px;margin:10px  20px">'+
//                 '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 70px;margin:10px  20px">'+
//                 '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 150px;margin:10px  20px">'+
//                 '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 150px;margin:10px  20px">'+
//                 '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 150px;margin:10px  20px"><br>';
//
//             temp="";
//             for(var i=0;i<items.length;i++) {
//                 temp += '<input id="isNormalOrder" name="isNormalOrder" class="control-def" style="width : 70px;margin:10px  20px">'
//                 if(i==items.length-1) {
//                     temp+='<br>';
//                 }
//             }
//             dingjiaHtml=temp;
//             $('#guigeHtml').append(guigeHtml);
//             $('#dingjiaHtml').append(dingjiaHtml);
//         })
//     });
//
// });