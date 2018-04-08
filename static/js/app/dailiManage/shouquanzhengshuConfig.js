$(function() {
// 代理管理-系统设置-授权证书设置
    showPermissionControl();

	reqApi({
		code : '627087',
		json : {
            'ckey' : 'impower_pdf'
		}

	}).then(function (data) {
		$('#pic').attr('src',OSS.picBaseUrl+'/'+data.cvalue)
		//

        // src="' +  + '/' + data.pic + '"
		$('#editBtn').off('click').click(function () {
        	window.location.href = "./shouquanzhengshuConfig_addedit.html?id="+data.id
    	});
    })

});
