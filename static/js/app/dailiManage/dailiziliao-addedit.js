$(function() {
	var code = getQueryString('code');
	var userId = getQueryString('userId');
	var edit = getQueryString('edit');
    var view = edit ? false : true
    var fields = [{
        field : 'loginName',
        title : '姓名',
        readonly : view
    },{
        field : 'level',
        title : '等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
    }, {
        field : 'updateDatetime9',
        title : '余额',
        formatter: moneyFormat
    }, {
        field : 'updateDatetime8',
        title : '联系电话'
    }, {
        field : 'updateDatetime7',
        title : '微信号'
    }, {
        field : 'updateDatetime6',
        title : '上级'
    }, {
        field : 'updateDatetime5',
        title : '上级电话'
    },{
        field : 'updateDatetime4',
        title : '团队名称'
    }, {
        field : 'updateDatetime3',
        title : '关联管理员'
    }, {
        field : 'updateDatetime2',
        title : '推荐人'
    }, {
        field : 'updateDatetime1',
        title : '推荐人电话'
    }, {
        field : 'status',
        title : '授权状态',
        formatter : Dict.getNameForList('agent_status')
    },  {
        field : 'updateDatetime',
        title : '状态时间',
        formatter: dateTimeFormat
    }];


    var edit1 = [{
        field : 'userId',
        title : '用户编号',
        value : userId,
        type : 'hidden'
    },{
        field : 'loginName',
        title : '姓名',
        readonly : view,
        required :true
    },{
        field : 'level',
        title : '等级',
        type: 'select',
        listCode: '627006',
        keyName: 'level',
        valueName: 'name',
        required :true
    },{
        field : 'mobile',
        title : '联系电话',
        required :true
    }, {
        field : 'wxId',
        title : '微信号',
        required :true
    },{
        field : 'quyu',
        title : '区域',
        type : 'citySelect',
        required :true
    },{
        field : 'address',
        title : '详细地址',
        type : 'doubleLine',
        required :true
    }];



	buildDetail({
		fields: edit? edit1 : fields,
        view : view,
		code: {
		    userId : userId
        },
		detailCode: '627357',
		editCode: '627255',
        beforeEdit : function (data) {
            data.userId = userId;
            return data;
        }
	});
	hideLoading();
});