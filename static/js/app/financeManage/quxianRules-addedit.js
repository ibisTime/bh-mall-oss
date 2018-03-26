$(function() {
    var id = getQueryString('id');
    var fields = [{
        title: '参数键',
        field: 'ckey',
        maxlength: 20,
        readonly: true,
        key: 'level',
        formatter: Dict.getNameForList("level"),
        search: true
    }, {
        title: '参数说明',
        field: 'remark',
        required: true,
        maxlength: 20
    },  {
        title: '参数值',
        field: 'cvalue',
        type: "textarea",
        required: true,
    }];

    buildDetail({
        fields: fields,
        code: {
            id : id
        },
        addCode: "805910",
        detailCode: '805916',
        editCode: '805911',
        beforeSubmit:function(data){
            data.remark = $('#remark').val();
            return data
        }
    });
});