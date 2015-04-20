/***请求天气回调函数**/
function updateWheatherState(data) {
	BL.Com.Toolbar.updateWheatherState(data);
}

/***城市搜索点击回调**/
function addCityDouble(cid) {
	$("#" + cid.id + "_singleSelect_content").hide();
	var text = $("#" + cid.id + "_singleSelect_input").val();
	BL.Com.OperationAndExtend.selCity = $("body").insertCity(text, BL.Com.OperationAndExtend.selCity, BL.Com.OperationAndExtend.maxNum);
	$("#" + cid.id).singleSelectInputClear();
}

BL.Com.Toolbar.init();

// 剥离IE浏览器特殊处理
// 提供异步加载，减小文件体积
BL.Util.JSONP("http://www.chinaso.com/common/component/toolbar/toolbar.IE.js");

// 剥离页面交互
// 提供异步加载，减小文件体积
// 此文件为页面交互，不影响页面初始加载展示
BL.Util.JSONP("http://www.chinaso.com/common/component/toolbar/toolbar.operation.js");