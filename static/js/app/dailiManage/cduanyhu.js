$(function() {
    // 代理管理-代理管理-意向代理分配


    reqApi({
        code: '627006',
    }, true).then(function(data) {
        var items = data.map(function(item) {
            return {
                level: item.level,
                name: item.name
            };
        });



        var columns = [{
            field: '',
            title: '',
            checkbox: true
        }, {
            field: 'nickname',
            title: '昵称',
            search: true,
            formatter: function(v, data) {
                return data ? data.nickname : '-'
            }
        }, {
            field: 'photo',
            title: '头像',
            type: 'img',
            formatter: function(v, data) {
                return data.pic && '<img  style="width:40px;height:40px" src="' + OSS.picBaseUrl + '/' + data.pic + '" >' || "-"
            }
        }, {
            field: 'wxId',
            title: '微信号'
        }, {
            field: 'createDatetime',
            title: '注册时间',
            formatter: dateTimeFormat
        }];
        buildList({
            columns: columns,
            pageCode: '627345'
        });

        // 修改
        $('#detailBtn').off('click').click(function() {
            var selRecords = $('#tableList').bootstrapTable('getSelections');
            if (selRecords.length <= 0) {
                toastr.info("请选择记录");
                return;
            }

            window.location.href = './cduanyhu_addedit.html?userId=' + selRecords[0].userId;
        })

    })


});