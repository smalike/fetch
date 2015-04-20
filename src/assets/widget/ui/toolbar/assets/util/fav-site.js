// 加入收藏
// 功能取消
 BL.Util.FavSite = (function() {
 	function add(url, info) {
 		try {
 			if (document.all) {
 				window.external.addFavorite(url, info);
 			} else if (window.sidebar) {
 				window.sidebar.addPanel(info, url, "");
 			} else {
 				alert('请使用Ctrl + D 手动加入收藏');
 			}
 		} catch (e) {
 			alert('请使用Ctrl + D 手动加入收藏');
 		}
 	}
 	return {
 		add: add
 	};
 })();