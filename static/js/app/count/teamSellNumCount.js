$(function() {

    var columns = [{
        field: 'teamName',
        title: '团队',
        search: true
    }, {
        field: 'teamLeader',
        title: '最高代理名字',
    }, {
        field: 'updateDatetime1',
        title: '产品1',
        formatter: function(v, data) {
            return data.list ? data.list[0].productName + ': ' + data.list[0].quantity : 0;
        }
    }, {
        field: 'updateDatetime2',
        title: '产品2',
        formatter: function(v, data) {
            return data.list[1] ? data.list[1].productName + ': ' + data.list[1].quantity : 0;
        }
    }, {
        field: 'updateDatetime3',
        title: '产品3',
        formatter: function(v, data) {
            return data.list[2] ? data.list[2].productName + ': ' + data.list[2].quantity : 0;
        }
    }, {
        field: 'impowerDatetime',
        title: '日期',
        formatter: dateTimeFormat,
        field1: 'dateStart',
        title1: '日期',
        // type: 'date',
        field2: 'dateEnd',
        twoDate: true,
        search: true,
        visible: false
    }];
    buildList({
        columns: columns,
        pageCode: '627851'
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