$(function() {
    var userId = getQueryString('userId');
    var code = getQueryString('code');
    var view = getQueryString('v');
    var fields = [{
        field: 'nickName',
        title: '昵称',
        readonly: view
    }, {
        field: 'photo',
        title: '头像',
        type: 'img',
        readonly: false,
        formatter: function(v, data) {
            return data.pic && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + data.pic + '" >' || "-"
        }
    }, {
        field: 'status',
        title: '状态',
        readonly: view
    }, {
        field: 'wxId',
        title: '微信号',
        readonly: view
    }];
    buildDetail({
        fields: fields,
        code: {
            userId: userId,
            updater: getUserId()
        },
        detailCode: '627347'
    });

});