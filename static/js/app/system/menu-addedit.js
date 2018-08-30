$(function() {

    var code = getQueryString('code');

    var fields = [{
        field: 'parentCode',
        title: '父菜单编号',
        type: 'select',
        // listCode: '805001',
        listCode: '627056',
        params: {
            type: '1',
            updater: getUserId(),
            roleCode: sessionStorage.getItem('roleCode')
        },
        keyName: 'code',
        valueName: '{{code.DATA}} {{name.DATA}}',
        required: true
    }, {
        field: 'name',
        title: '菜单名称',
        required: true,
        maxlength: 32
    }, {
        field: 'url',
        title: '菜单地址',
        required: true,
        maxlength: 64
    }, {
        field: 'type',
        title: '类型',
        required: true,
        type: 'select',
        data: { '1': '菜单', '2': '按钮' }
    }, {
        field: 'orderNo',
        title: '菜单顺序号',
        required: true,
        number: true
    }, {
        field: 'remark',
        title: '备注',
        maxlength: 250
    }];

    buildDetail({
        fields: fields,
        code: {
            code
        },
        detailCode: '627057',
        addCode: '627050',
        editCode: '627052',
        beforeSubmit(data) {
            data.updater = getUserId();
            return data;
        }
    });
    hideLoading();
});