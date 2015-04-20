一. toolbar 在原有文件基础上根据命名空间拆分成多个功能文件
二. 主要文件功能概要：

    assets:
        1. main.js  拥有无命名空间回调，调用功能初始化函数
        2. base.js  命名空间功能对象
        3. tip-IE-old.js    提示IE7及以下浏览器过时组件
        4. set-home.js  设置页面为首页功能代码
        5. IE6PNGFIX    处理IE6浏览器PNG透明问题
        6. recruitment.js   招聘信息log打印
        7. skin.js  换肤功能 disabled
        8. version-pass.js  首页版本切换 desabled
    assets > com
        1. city.js  城市处理函数，主要处理IP定位城市、切换城市天气时的二级联动
        2. comm.js  添加公共处理函数功能，去空格
        3. json.js  数据解析成JSON对象 json2.js
        4. lunar-calendar.js    农历功能代码
        5. operation.js 处理页面交互逻辑
        6. storage.js   本地存储功能
        7. toolbar.js   页面拼接、天气、时间、用户情况功能调用
        8. weather.js   天气功能代码
    assets > util
        1. cookie.js    页面cookie基本功能处理
        2. dom.js   页面DOM基本操作封装
        3. event.js 事件兼容封装
        4. fav-site.js  加页面到收藏夹 disabled
        5. jsonp.js jsonp请求功能封装
        6. mark.js  IE加收藏功能兼容 disabled
        7. time.js  日期功能组件
        8. to-chinese-spell.js  拼音汉字互转功能
三. 构建toolbar.js、toolbar.IE.js、toolbar.opration.js三个文件，为减少，页面首次加载toolbar.js，内部异步请求后两个文件