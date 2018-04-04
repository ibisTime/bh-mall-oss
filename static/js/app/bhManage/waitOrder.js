$(function() {
    // 报货管理-云仓管理-待处理订单


    reqApi({
        code: '627006',
    }, true).then(function (data) {
        var items = data.map(function (item) {
            return {
                level: item.level,
                name: item.name
            };
        });


    })
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'code',
		title : '订单编号'
	},{
		field : 'cvalue',
		title : '下单日期',
        formatter: dateTimeFormat,
        field1: 'applyDateStart',
        title1: '下单日期',
        type: 'date',
        field2: 'applyDateEnd',
        twoDate: true,
        search: true
	}, {
        field : 'amount',
        title : '付款金额',
        formatter: moneyFormat
    }, {
        field : 'status',
        title : '订单状态',
		search: true,
		type: 'select',
        formatter : Dict.getNameForList('order_status')
    },{
        field : 'updateDatetime',
        title : '下单代理'
    }, {
        field : 'level',
        title : '下单代理等级',
        search: true,
        type: 'select',
        listCode : '627006',
        keyName : 'level',
        valueName : 'name'
    }, {
        field : 'updateDatetime',
        title : '收货人'
    }, {
        field : 'mobile',
        title : '收货人电话'
    }, {
        field : 'remark',
        title : '备注'
    }];
	buildList({
		columns: columns,
        pageCode: '627662',
        searchParams : {
            statusList : '0,1'
        },
        singleSelect : false
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
	// 批量审单
    $('#shendanBtn').click(function () {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        confirm('确定批量审单？').then(function () {
            var dw = dialog({
                content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该喜报的位序</li></ul>' +
                '</form>'
            });

            dw.showModal();

            buildDetail({
                container: $('#formContainer'),
                fields: [{
                    field: 'orderNo',
                    title: '顺序',
                    required: true,
                    number: true,
                    min: '0'
                },{
                    field : 'location1',
                    title : '是否推荐',
                    required: true,
                    type: 'select',
                    data : {'0':'否','1':'是'}
                }],
                buttons: [{
                    title: '确定',
                    handler: function () {
                        if ($('#popForm').valid()) {
                            var data = $('#popForm').serializeObject();
                            reqApi({
                                code: '805433',
                                json: {
                                    code: selRecords[0].code,
                                    location : data.location1,
                                    updater: getUserName(),
                                    orderNo: data.orderNo
                                }
                            }).done(function () {
                                sucList();
                                dw.close().remove();
                            });
                        }
                    }
                }, {
                    title: '取消',
                    handler: function () {
                        dw.close().remove();
                    }
                }]
            });
    })
});
