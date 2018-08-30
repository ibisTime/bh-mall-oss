$(function() {
    var columns = [{
        field: 'level',
        title: '等级',
        search: true,
        listCode: '627006',
        type: 'select',
        keyName: 'level',
        valueName: 'name',
        visible: false,
        params: {
            highLevel: 6
        }
    }, {
        field: 'status',
        title: '授权状态',
        type: 'select',
        key: 'agent_status',
        valueName: 'name',
        search: true,
        visible: false
    }, {
        field: 'teamName',
        title: '团队',
        search: true,
        visible: false
    }, {
        field: 'manager',
        title: '管理员',
        search: true,
        visible: false
    }, {
        field: 'province',
        title: '地区',
        search: true,
        type: 'citySelect',
        visible: false
    }];
    buildList({
        columns: columns,
        pageCode: '627853',
        afterData(data) {
            $('#number').text(data.data.number);
            return data
        }
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
});