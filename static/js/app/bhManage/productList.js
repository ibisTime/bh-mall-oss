$(function() {
// 报货管理-云仓管理-产品列表
	var columns = [{
		field : '',
		title : '',
		checkbox : true
	},{
		field : 'code',
		title : '产品编号',
		search: true
	},{
		field : 'name',
		title : '名称'
	},
    //     {
    //     field : 'updateDatetime',
    //     title : '建议微信价',
		// formatter: moneyFormat
    // },
        {
        field : 'price',
        title : '市场价',
        formatter: moneyFormat
    }, {
        field : 'virNumber',
        title : '虚拟库存'
    }, {
        field : 'realNumber',
        title : '实际库存'
    }, {
        field : 'status',
        title : '状态',
		search: true,
		type: 'select',
        key: 'product_status',
        formatter: Dict.getNameForList("product_status")
    }, {
	    field : 'isFree',
        title : '是否包邮',
        type: 'select',
        data : {'1':'是','0':'否'}
    },  {
        field : 'isTotal',
        title : '是否计入出货',
        type : 'select',
        data : {'1':'是','0':'否'}
    }, {
        field : 'orderNo',
        title : '排序'
    }, {
        field : 'updateDatetime',
        title : '添加时间',
        formatter: dateTimeFormat
    }];
	buildList({
		columns: columns,
		pageCode: '627554',
		// searchParams: {
		// 	type: 'android_b',
		// 	companyCode: OSS.company,
		// 	orderColumn:'id',
		// 	orderDir: 'asc'
		// },
		// beforeEdit: function(r) {
		// 	location.href = '../biz/rule4_addedit.html?code=' + r.id +"&t="+ r.type;
		// }
	});
    // 上架
    $('#upBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].status == '1' || selRecords[0].status == '3') {
            confirm('确定上架？').then(function () {
                var dw = dialog({
                    content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
                    '<ul class="form-info" id="formContainer"><li style="text-align:center;font-size: 15px;">请输入该产品的位序</li></ul>' +
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
                        field : 'isFree1',
                        title : '是否包邮',
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
                                    code: '627543',
                                    json: {
                                        code: selRecords[0].code,
                                        updater: getUserName(),
                                        orderNo: data.orderNo,
                                        isFree: data.isFree1
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
                hideLoading()
            })
        }
        else
        {
            toastr.info('该状态不可上架')
        }
    });
    // 下架
    $('#downBtn').click(function() {
        var selRecords = $('#tableList').bootstrapTable('getSelections');
        if (selRecords.length <= 0) {
            toastr.info("请选择记录");
            return;
        }
        if(selRecords[0].status == '2') {
            confirm('确定下架？').then(function () {
                reqApi({
                    code: 627544,
                    json: {
                        code: selRecords[0].code,
                        updater : getUserName()
                    }
                }).then(function(){
                    sucList();
                });
            })
        } else {
            toastr.info('该状态不可下架')
        }


    });

});
