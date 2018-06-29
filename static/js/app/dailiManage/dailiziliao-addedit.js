$(function() {
	var code = getQueryString('code');
	var userId = getQueryString('userId');
	var edit = getQueryString('edit');
    var view = edit ? false : true
    var fields = [{
        field : 'realName',
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
        field : 'mobile',
        title : '联系电话'
    }, {
        field: 'mkAmount',
        title: '门槛余额',
        amount: true
    }, {
        field: 'whAmount',
        title: '云仓余额',
        amount: true
    }, {
        field : 'wxId',
        title : '微信号'
    },{
        field : 'quyu',
        title : '区域',
        formatter : function(v, data) {
            return data.area?data.province+' '+data.city+' '+data.area
                        :data.city?data.province+' '+data.city
                            :data.province?data.province : '-'
        }
    },{
        field : 'address',
        title : '详细地址',
        type : 'doubleLine',
        required :true
    } ,{
        field : 'highUserName',
        title : '上级',
        formatter : function(v, data) {
			return data.highUser?data.highUser.realName : '-'
		}
    }, {
        field : 'highUserNameMobile',
        title : '上级电话',
        formatter : function(v, data) {
			return data.highUser?data.highUser.mobile : '-'
		}
    },{
        field : 'teamName',
        title : '团队名称',
        formatter : function(v, data) {
			return data.highUser?data.highUser.teamName : '-'
		}
    }, {
        field : 'manageName',
        title : '关联管理员'
    }, {
        field : 'refereeUserName',
        title : '推荐人',
        formatter : function (v, data) {
            return data.refereeUser?data.refereeUser.realName: '-'
        }
    }, {
        field : 'refereeUserMoile',
        title : '推荐人电话',
        formatter : function (v, data) {
            return data.refereeUser?data.refereeUser.mobile: '-'
        }
    }, {
        field : 'status',
        title : '授权状态',
        formatter : Dict.getNameForList('agent_status')
    }
//  ,{
//      field : 'updateDatetime',
//      title : '状态时间',
//      formatter: dateTimeFormat
//  }
    ];


    var edit1 = [{
        field : 'userId',
        title : '用户编号',
        value : userId,
        type : 'hidden'
    },{
        field : 'realName',
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