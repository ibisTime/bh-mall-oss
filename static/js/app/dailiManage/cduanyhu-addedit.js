$(function() {
    var userId = getQueryString('userId');
    var fields = [{
        field: 'nickname',
        title: '昵称'
    }, {
        field: 'photo',
        title: '头像',
        readonly: true,
        formatter: function(v, data) {
            return data.photo && '<img  style="width:40px;height:40px" src="' + data.photo + '" >' || "-"
        }
    }, {
        field: 'createDatetime',
        title: '注册时间',
        formatter: dateTimeFormat
    }];
    buildDetail({
        fields: fields,
        view: '1',
        code: {
            userId: userId,
            updater: getUserId()
        },
        detailCode: '627347',
        afterData(data) {
            $('.w100p').text('')
            return data;
        }
    });
});