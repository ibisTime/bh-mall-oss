$(function() {

    var columns = [{
        field: '',
        title: '',
        checkbox: true
    }, {
        field: 'totalDatetime',
        title: '日期',
        field1: 'totalDatetimeStart',
        title1: '日期',
        type1: "date",
        field2: 'totalDatetimeEnd',
        type2: "date",
        search: true,
        formatter: function(v, data) {
            return dateFormat(v, 'yyyy-MM-dd')
        },
    }, {
        field: 'userAmount',
        amount: true,
        title: '消费者分红总额',
        formatter: moneyFormat,
    }, {
        field: 'storeAmount',
        amount: true,
        title: '商家分红总额',
        formatter: moneyFormat,
    }, {
        field: 'lpstoreAmount',
        amount: true,
        title: '礼品商分红总额',
        formatter: moneyFormat,
    }];

    buildList({
        columns: columns,
        pageCode: '808800',
        searchParams: {
            companyCode: OSS.company
        }
    });
})