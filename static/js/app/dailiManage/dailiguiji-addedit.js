$(function() {
// 代理管理-代理管理-代理轨迹'

    var userId = getQueryString('userId');
    var view = getQueryString('v');



    reqApi({
        code: '627358',
        cache: true,
        sync: true,
        json: {
            'userId' : userId,
            'limit' : 10,
            'start' : 1
        }
    }).then(function(data) {

        var useData = data.logList;
        var columns = [{
            field : 'loginName',
            title : '姓名'
        },{
            field : 'mobile',
            title : '联系电话',
            search: true,
            type: 'select'
        }, {
            field : 'updateDatetime',
            title : '微信号',
            search: true,
            type: 'select'
        }, {
            field : 'level',
            title : '授权等级',
            search: true,
            type: 'select',
            listCode: '627006',
            keyName: 'level',
            valueName: 'name'
        }, {
            field : 'updateDatetime',
            title : '授权时间',
            formatter: dateTimeFormat
        }, {
            field : 'updater',
            title : '操作人'
        }, {
            field : 'updateDatetime',
            title : '推荐人'
        },{
            type: 'o2m',
            title: '代理轨迹',
            field: 'flow',
            columns: [{
                title: '轨迹编号',
                field: 'code'
            }, {
                title: '业务类型',
                field: 'bizType',
                type: "select",
                key: "currency",
                formatter: Dict.getNameForList("biz_type")
            },  {
                title: '变动金额',
                field: 'transAmount',
                formatter: moneyFormat
            }, {
                title: '变动前金额',
                field: 'preAmount',
                formatter: moneyFormat
            }, {
                title: '变动后金额',
                field: 'postAmount',
                formatter: moneyFormat
            }, {
                title: '变动时间',
                field: 'createDatetime',
                formatter: dateTimeFormat
            }, {
                title: '状态',
                field: 'status',
                formatter: Dict.getNameForList('agent_type')
            }, {
                title: '类型',
                field: 'type',
                formatter: Dict.getNameForList('agent_type')
            },{
                title: '申请时间',
                field: 'applyDatetime',
                formatter: dateTimeFormat
            }],
            useData : useData
            // pageCode: '802524',
            // o2mvalue: {
            //     accountNumber: accountNumber,
            //     userId:userId,
            //     companyCode:OSS.companyCode
            // }
        }];
        buildDetail({
            fields: columns,
            code: {
                userId : userId,
                limit : 10,
                start : 1
            },
            view : view,
            detailCode: '627358'
        });
        hideLoading();
        $('.search-form').css('display','none');
        $('#detailBtn').css('display','none');

    });


});
