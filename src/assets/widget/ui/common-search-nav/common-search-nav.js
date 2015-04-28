 /**
  * File Contents Outline : 更改频道样式
  * Author :  wuxiumei（wuxiumei@panguso.com）
  * Function: 主要修改导航中当前频道（包含样式）及频道链接
  */
 (function() {
    var CHANNELS = {
        
        // 房产搜索
        house:{
            title:"房产",
            sid:"nav_house",
            lid:"nav_house_link",
            url:"http://house.chinaso.com",
            sprefix:"",
            useable:false,
            current:true        
        },
        
        // 房产搜索
        tuan:{
            title:"团购",
            sid:"nav_tuan",
            lid:"nav_tuan_link",
            url:"http://tuan.chinaso.com",
            sprefix:"",
            useable:false,
            current:true        
        },
        
        // 新闻搜索
        news:{
            title:"新闻",
            sid:"nav_news",
            lid:"nav_news_link",
            url:"http://newsso.chinaso.com",
            sprefix:"",
            useable:true    
        },
        forum:{
            title:"论吧",
            sid:"nav_forum",
            lid:"nav_forum_link",
            url:"http://forum.chinaso.com",
            sprefix:"",
            useable:true    
        },
        
        // 网页搜索
        www:{
            title:"网页",
            sid:"nav_web",
            lid:"nav_web_link",
            url:"http://www.chinaso.com",
            sprefix:"search/pagesearch.htm",
            useable:true    
        },
        
        // 导航搜索
        china123:{
            title:"导航",
            sid:"nav_123",
            lid:"nav_123_link",
            url:"http://123.chinaso.com",
            sprefix:"",
            useable:true    
        },
        
        // 图片搜索
        image:{
            title:"图片",
            sid:"nav_image",
            lid:"nav_image_link",
            url:"http://image.chinaso.com",
            sprefix:"imagesearch.htm",
            useable:true    
        },
        
        // 视频搜索
        video:{
            title:"视频",
            sid:"nav_video",
            lid:"nav_video_link",
            url:"http://video.chinaso.com",
            sprefix:"",
            useable:true    
        },
        
        // 问答搜索
        wenda:{
            title:"问答",
            sid:"nav_wenda",
            lid:"nav_wenda_link",
            url:"http://wenda.chinaso.com",
            sprefix:"",
            useable:true    
        },
        
        // 地图搜索
        map:{
            title:"地图",
            sid:"nav_map",
            lid:"nav_map_link",
            url:"http://map.chinaso.com",
            sprefix:"",
            useable:true    
        },
        
        // 百科搜索
        baike:{
            title:"百科",
            sid:"nav_baike",
            lid:"nav_baike_link",
            url:"http://baike.chinaso.com",
            sprefix:"",
            useable:true
        },
        
        // 更多
        /*more:{
            title:"更多",
            sid:"nav_more",
            lid:"nav_more_link",
            url:"#",
            sprefix:"",
            useable:false   
        },*/
        
        // 国搜认证
        cert:{
            title:"认证",
            sid:"nav_cert",
            lid:"nav_cert_link",
            url:"http://cert.chinaso.com",
            sprefix:"",
            useable:true
        },
        
        // 国搜应用
        app:{
            title:"应用",
            sid:"nav_app",
            lid:"nav_app_link",
            url:"http://app.chinaso.com",
            sprefix:"",
            useable:true
        },
        verticalSearch:{
            title:"更多",
            sid:"nav_more",
            lid:"nav_more_link",
            url:"#",
            sprefix:"",
            useable:false,
            items:[
                {
                    itemLink : 'http://nation.chinaso.com',
                    itemText : '国情'
                },
                {
                    itemLink : 'http://politics.chinaso.com',
                    itemText : '时政'
                },{
                    itemLink : 'http://world.chinaso.com',
                    itemText : '国际'
                },{
                    itemLink : '#',
                    itemText : '财经'
                },{
                    itemLink : 'http://mil.chinaso.com',
                    itemText : '军事'
                },{
                    itemLink : 'http://sports.chinaso.com',
                    itemText : '体育'
                },{
                    itemLink : 'http://tech.chinaso.com',
                    itemText : '科技'
                },{
                    itemLink : 'http://social.chinaso.com',
                    itemText : '社科'
                },{
                    itemLink : 'http://law.chinaso.com',
                    itemText : '法规'
                },{
                    itemLink : 'http://house.chinaso.com',
                    itemText : '房产'
                },{
                    itemLink : 'http://auto.chinaso.com',
                    itemText : '汽车'
                },{
                    itemLink : 'http://food.chinaso.com',
                    itemText : '食品'
                },{
                    itemLink : 'http://home.chinaso.com',
                    itemText : '家居'
                },{
                    itemLink : 'http://icity.chinaso.com',
                    itemText : '智慧城市'
                }
            ]          
        },
        bannerNav:{
            sid:"nav_banner",
            lid:"nav_banner_link",
            url:"#",
            sprefix:"",
            useable:false,
            items:[
                {
                    itemLink : 'http://nation.chinaso.com',
                    itemText : '国情',
                    itemCls : 'icoGuoqing'
                },
                {
                    itemLink : 'http://politics.chinaso.com',
                    itemText : '时政',
                    itemCls : 'icoShizheng'
                },{
                    itemLink : 'http://local.chinaso.com/',
                    itemText : '地方',
                    itemCls : 'icoDifang'
                },{
                    itemLink : 'http://world.chinaso.com',
                    itemText : '国际',
                    itemCls : 'icoGuoji'
                },{
                    itemLink : 'http://finance.chinaso.com',
                    itemText : '财经',
                    itemCls : 'icoCaijing'
                },{
                    itemLink : 'http://internet.chinaso.com',
                    itemText : '互联网',
                    itemCls : 'icoHulianwang'
                },{
                    itemLink : 'http://mil.chinaso.com',
                    itemText : '军事',
                    itemCls : 'icoJunshi'
                },{
                    itemLink : 'http://society.chinaso.com',
                    itemText : '社会',
                    itemCls : 'icoShehui'
                },{
                    itemLink : 'http://social.chinaso.com',
                    itemText : '社科',
                    itemCls : 'icoSheke'
                },{
                    itemLink : 'http://law.chinaso.com',
                    itemText : '法规',
                    itemCls : 'icoFagui'
                },{
                    itemLink : 'http://tech.chinaso.com',
                    itemText : '科技',
                    itemCls : 'icoLilun'
                },{
                    itemLink : 'http://sports.chinaso.com',
                    itemText : '体育',
                    itemCls : 'icoTiyu'
                },{
                    itemLink : 'http://house.chinaso.com',
                    itemText : '房产',
                    itemCls : 'icoFangchan'
                },{
                    itemLink : 'http://auto.chinaso.com',
                    itemText : '汽车',
                    itemCls : 'icoQiche'
                },{
                    itemLink : 'http://home.chinaso.com',
                    itemText : '家居',
                    itemCls : 'icoJIaju'
                },{
                    itemLink : 'http://food.chinaso.com',
                    itemText : '食品',
                    itemCls : 'icoYinshi'
                },{
                    itemLink : 'http://tuan.chinaso.com/',
                    itemText : '团购',
                    itemCls : 'icoGouwu'
                },{
                    itemLink : 'http://ent.chinaso.com',
                    itemText : '娱乐',
                    itemCls : 'icoYule'
                },{
                    itemLink : 'http://icity.chinaso.com',
                    itemText : '智城',
                    itemCls : 'icoZhihuichengshi'
                }/*{
                    itemLink : 'http://www.chinaso.com/home/contact.html#cpzx',
                    itemText : '更多',
                    itemCls : 'icoMore'
                }*/
            ]  
        }
    },
        
    /*
    * 频道和频道div的id对应关系，用于从URL中得到当前的频道Id
    * 用于未配置当前频道时，当前频道的标红处理
    */
    SITE_MAPPING = {
       'news':'news',
       'newsso':'news',
       'forum': 'forum',
       'info':'info',
       'search':'www',
       'image':'image',
       'photo':'image',
       'video':'video',
       'music':'music',
       'www':'www',
       'wenda':'wenda',
       'map':'map',
       'app':'app',
       '123':'china123',
       'my':'my',
       'house':'house',
       'verticalSearch':'verticalSearch',
       'bannerNav':'bannerNav',
       'baike' : 'baike',
       'cert' : 'cert',
       'health': '123.chinaso.com/health/'
    },
    WRAPPER_ID = "nav_wrapper",
    POS_INDEX_STYLE = "nav_index",
    POS_RESULT_STYLE = "nav_result",
    CURRENT_CHANNEL_STYLE = "cur",
    DEFAULT_CHANNEL = "www";

    function render(){
        var nav = document.getElementById(WRAPPER_ID),
            html = "",
            i,
            channelObj,
            verSerItem,
            itemClass,
            gridClumCount = 5,
            moreBox,
            speedCount,
            overlay,
            isShowBanner = hasBannerNav();
        if(!nav){
            channelObj = CHANNELS[channel];
            html = '<div class="nav" id="nav_wrapper"><span id="nav_index"><a href="http://www.chinaso.com" id="nav_index_link">中国搜索</a></span>';
            if(channelObj && channelObj["current"]) {
                    html += '<span id="'+channelObj.sid+'"><a href="'+channelObj.url+ '" id="'+channelObj.lid+'">'
                         +channelObj.title+'</a></span>'
            }
            for(i in CHANNELS){
                if(CHANNELS.hasOwnProperty(i) && CHANNELS[i].useable === true){
                    html += '<span id="'+CHANNELS[i].sid+'"><a href="'+CHANNELS[i].url+ '" id="'+CHANNELS[i].lid+'">'
                         +CHANNELS[i].title+'</a></span>'
                }
            }
            html += "</div>";
            document.writeln(html);
            var verticalClearTimeId;
            var queues = [];
            var animate = function () {
            };
            animate.prototype.stop = function () {
                var i;
                for (i = 0; i < queues.length; i++) {
                    clearTimeout(queues[i].timeId);
                }
                queues.length = 0;
                return this;
            };
            animate.prototype.engine = function (callback, time) {
                var _this = this;
                _this.timeId = setTimeout(function () {
                    var status = callback();
                    if (status) {
                        _this.engine(callback, time);
                    } else {
                        
                    }
                }, time);
                queues.push({timeId: _this.timeId});
            };
        }
//
//        setTimeout(function(){
//            if (isShowBanner) {
//                var bannerWrapper = $(".head"),
//                    _icoItems = CHANNELS["bannerNav"].items,
//                    len = _icoItems.length,
//                    bannerDiv = document.createElement("div"),
//                    innerHtml = '';
//
//                bannerDiv.className = "verticalSearch";
//                   innerHtml += '<ul class="listNewNav NavC">' +
//                                     '<li><a target="_blank" href="http://news.chinaso.com/" class="fBlod">新闻</a></li>' +
//                                     '<li><a target="_blank" href="http://local.chinaso.com/" class="fBlod">地方</a></li>' +
//                                     '<li><a target="_blank" href="http://news.chinaso.com/newscommon/jsxw/index.html">即时</a></li>' +
//                                     '<li><a target="_blank" href="http://politics.chinaso.com/" class="fBlod">时政</a></li>' +
//                                     '<li><a target="_blank" href="http://nation.chinaso.com/" class="fBlod">国情</a></li>' +
//                                     '<li><a target="_blank" href="http://social.chinaso.com/">社科</a></li>' +
//                                  '</ul>'+
//                                  '<span class="newNavLine"></span>' +
//                                   '<ul class="listNewNav NavB">' +
//                                        '<li><a target="_blank" href="http://world.chinaso.com/" class="fBlod">国际</a></li>' +
//                                        '<li><a target="_blank" href="http://world.chinaso.com/wmjj/index.html">外媒</a></li>' +
//                                        '<li><a target="_blank" href="http://sports.chinaso.com/" class="fBlod">体育</a></li>' +
//                                        '<li><a target="_blank" href="http://sports.chinaso.com/tycpnews/index.html">彩票</a></li>' +
//                                    '</ul>' +
//                                    '<span class="newNavLine"></span>' +
//                                    '<ul class="listNewNav NavB">' +
//                                        '<li><a target="_blank" href="http://mil.chinaso.com/" class="fBlod">军事</a></li>' +
//                                        '<li><a target="_blank" href="http://mil.chinaso.com/jmry/index.html">军迷</a></li>' +
//                                        '<li><a target="_blank" href="http://finance.chinaso.com/" class="fBlod">财经</a></li>' +
//                                        '<li><a target="_blank" href="http://finance.chinaso.com/jrsc/index.html">金融</a></li>' +
//                                    '</ul>' +
//                                    '<span class="newNavLine"></span>' +
//                                    '<ul class="listNewNav NavB">' +
//                                        '<li><a target="_blank" href="http://paper.chinaso.com/" class="fBlod">报刊</a></li>' +
//                                        '<li><a target="_blank" href="http://paper.chinaso.com/minshengrexian/index.html">民生</a></li>' +
//                                        '<li><a target="_blank" href="http://society.chinaso.com/" class="fBlod">社会</a></li>' +
//                                        '<li><a target="_blank" href="http://society.chinaso.com/shgc/index.html">观察</a></li>' +
//                                    '</ul>' +
//                                    '<span class="newNavLine"></span>' +
//                                    '<ul class="listNewNav NavB">' +
//                                        '<li><a target="_blank" href="http://law.chinaso.com/" class="fBlod">法治</a></li>' +
//                                        '<li><a target="_blank" href="http://law.chinaso.com/flfg/index.html">法规</a></li>' +
//                                        '<li><a target="_blank" href="http://ent.chinaso.com/" class="fBlod">娱乐</a></li>' +
//                                        '<li><a target="_blank" href="http://ent.chinaso.com/mingxing.html">星闻</a></li>' +
//                                    '</ul>' +
//                                    '<span class="newNavLine"></span>' +
//                                    '<ul class="listNewNav NavB">' +
//                                        '<li><a target="_blank" href="http://house.chinaso.com/beijing.html" class="fBlod">房产</a></li>' +
//                                        '<li><a target="_blank" href="http://house.chinaso.com/searchBuilding/beijing?infotype=1&amp;n=10&amp;p=0&amp;buildingState=all&amp;orderBy=default">楼盘</a></li>' +
//                                        '<li><a target="_blank" href="http://auto.chinaso.com/" class="fBlod">汽车</a></li>' +
//                                        '<li><a target="_blank" href="http://auto.chinaso.com/daogou/shjpc.html">评测</a></li>' +
//                                    '</ul>' +
//                                    '<span class="newNavLine"></span>' +
//                                    '<ul class="listNewNav NavB">' +
//                                        '<li><a target="_blank" href="http://food.chinaso.com/" class="fBlod">食品</a></li>' +
//                                        '<li><a target="_blank" href="http://food.chinaso.com/msfs/index.html">美食</a></li>' +
//                                        '<li><a target="_blank" href="http://home.chinaso.com/" class="fBlod">家居</a></li>' +
//                                        '<li><a target="_blank" href="http://home.chinaso.com/shangcheng.html">商城</a></li>' +
//                                    '</ul>' +
//                                    '<span class="newNavLine"></span>' +
//                                    '<ul class="listNewNav NavD">' +
//                                       
//                                        '<li><a target="_blank" href="http://tech.chinaso.com/" class="fBlod">科技</a></li>' +
//                                        '<li><a target="_blank" href="http://tuan.chinaso.com/" class="fBlod">团购</a></li>' +
//                                         '<li><a target="_blank" href="http://edu.chinaso.com/" class="fBlod">教育</a></li>' +
//                                        '<li><a target="_blank" href="http://shuhua.chinaso.com/" class="fBlod">书画</a></li>' +
//                                        '<li style="position:relative;"><a target="_blank" href="http://qy.chinaso.com/" class="fBlod">企业</a></li>' +
//                                        '<li><a target="_blank" href="http://image.chinaso.com/info" class="fBlod">图闻</a></li>' +
//                                    '</ul>' +
//                                    '<span class="newNavLine"></span>' +
//                                    '<ul class="listNewNav NavC">' +
//                                        '<li><a target="_blank" href="http://123.chinaso.com/health/" class="fBlod">健康</a></li>' +
//                                        '<li><a target="_blank" href="http://internet.chinaso.com/" class="fBlod">互联网</a></li>' +
//                                        '<li><a target="_blank" href="http://trip.chinaso.com/" class="fBlod">旅游</a></li>' +
//                                        '<li><a target="_blank" href="http://icity.chinaso.com/" class="fBlod">智慧城市</a></li>' +
//                                    '</ul>';
//                bannerDiv.innerHTML = innerHtml;
//                $(bannerDiv).insertBefore(bannerWrapper);
//            };
//        },30);
    }
    

    // 判断是否需要添加通栏导航.(搜索结果页、地图暂不添加通栏导航.)
    function hasBannerNav(){
        var exceptUrl = ['search/pagesearch',
                'news.chinaso.com/search',
                'paper/search',
                'map.chinaso.com/',
                'image.chinaso.com/so',
                'news.chinaso.com/image/search', 
                'news.chinaso.com/weibo/search', 
                'news.chinaso.com/video/search',
                'news.chinaso.com/dupsearch',
                'image.chinaso.com',
                'question/search',
                '123.chinaso.com',
                'video.chinaso.com',
                'house.chinaso.com',
                'wenda.chinaso.com',
                'dl.chinaso.com',
                'tuan.chinaso.com',
                'forum.chinaso.com',
                'newsso.chinaso.com'],
            len = exceptUrl.length,
            curUrl = document.location.href;

        for (var i = 0; i < len; i++) {
            var cur = exceptUrl[i];
            if (curUrl.indexOf(cur) > -1) {
                return false;
            };
        };
        return true;
    }

    // 获取元素样式
    function getClassNames(element) {
        return element.className.replace(/\s+/, ' ').split(' ');
    };

    // 判断元素是否有该样式
    function hasClassName(element, className) {
        var classes = getClassNames(element);
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === className) {
                return true;
            }
        }
        return false;
    };

    // 为元素添加样式
    function addClassName(element, className) {
        element.className += (element.className ? ' ' : '') + className;
        return true;
    };

    // 元素移除样式
    function removeClassName(element, className) {
        var classes = getClassNames(element);
        var length = classes.length
        for (var i = length - 1; i >= 0; i--) {
            if (classes[i] === className) {
                delete(classes[i]);
            }
        }
        element.className = classes.join(' ');
        return (length == classes.length ? false : true);
    };
    
    // 获取当前URL
    function getCurrentURL(){
         return window.location.href;
    };
    
    if(!window.pgnav) { window['pgnav'] = {}; } 
    window.pgnav.removeClassName = removeClassName;
    window.pgnav.addClassName = addClassName;
    window.pgnav.hasClassName = hasClassName;
    window.pgnav.getCurrentURL = getCurrentURL;

    window.pgnav.updateTopNavLink= function(kw){
        if(typeof kw === 'string'&& kw.length > 0){
             for(var i in CHANNELS){
                 if(CHANNELS.hasOwnProperty(i)&&CHANNELS[i].useable === true){
                     var linkNd = document.getElementById(CHANNELS[i].lid);
                     if(typeof linkNd === 'object'&& linkNd){
                         var splitPos = linkNd.href.indexOf('?');
                         var link = linkNd.href;
                         if(splitPos!=-1){
                              link = linkNd.href.substring(0,splitPos);
                              linkNd.href = link + '?q=' + kw;
                         }else{
                              linkNd.href = link + CHANNELS[i].sprefix + '?q=' + kw;
                         }
                     }   
                }
             }
        }
    };
   
    //设置默认频道为网页搜索
    var channel = DEFAULT_CHANNEL,
        
    //设置默认的位置是结果页
    posStyle = POS_RESULT_STYLE,
    pgKeyword = "",
    channelId = "",
    channelObj = null;

    function getLocation() {
        var curHost = pgnav.getCurrentURL();
        var end = curHost.indexOf('.');
        if(end!=-1){
            var start = curHost.indexOf('http://');
            if(start!=-1){
                start = start + 7;
            }else if(curHost.indexOf('https://')!=-1){
                start = curHost.indexOf('https://')+ 8;
            }else{
                start = 0;
            }
            localChanl = curHost.substring(start,end);
            var curChanl = SITE_MAPPING[localChanl];
            if(curChanl){
                if (curChanl === "www") {
                    if (/^http:\/\/((www\.chinaso\.com\/index.+)|(my\.chinaso\.com.+))$/.test(location.href)) {
                        channel = curChanl;
                    } else {
                        channel = "verticalSearch";
                    }
                } else {
                    channel = curChanl;
                }
            }else if(localChanl !== "www"){
                channel = "verticalSearch";
            }
        }
        return channel;
    }
             
     
    function setNav(){
        
        //外部配置文件定义   
        if(typeof pgNavConf === 'object'&& pgNavConf){
            if('channel' in pgNavConf) {
                if(typeof pgNavConf.channel === 'string') {
                    channel = pgNavConf.channel ;
                }
            }
            if('pos' in pgNavConf) {
                if(typeof pgNavConf.pos === 'string') {
                    posStyle = pgNavConf.pos;
                }
            }
            if('kw' in pgNavConf) {
                if(typeof pgNavConf.kw === 'string') {
                    pgKeyword = pgNavConf.kw;
                }
            }
        }else{
            
            //若未定义pgNavConf变量则从host里获得当前频道
            if (getLocation() === "verticalSearch") {
                channel = "www";
            };
        }
        if(channel !== "" && channel in CHANNELS){
             channelObj = CHANNELS[channel];
             channelId = channelObj.sid;
        }else{
             //throw new Error("The channnel "+ channel + "is not exist in conf!");
        }
        //设置频道位置样式
        var wrapper = document.getElementById(WRAPPER_ID);
        //去除其他样式
        if(hasClassName(wrapper, POS_RESULT_STYLE)){
            removeClassName(wrapper, POS_RESULT_STYLE);
        }
        if(hasClassName(wrapper, POS_INDEX_STYLE)){
            removeClassName(wrapper, POS_INDEX_STYLE);
        }
        addClassName(wrapper, posStyle);
        
        //去除其他当前频道样式
        var ulBox = document.getElementById(WRAPPER_ID);
        var list = ulBox.getElementsByTagName("span");
        for (var i = 0; i < list.length; i++) {
            if (hasClassName(list[i], CURRENT_CHANNEL_STYLE)) {
                removeClassName(list[i], CURRENT_CHANNEL_STYLE);
            }
        }
        //添加搜索词参数
        if(pgKeyword.length > 0){
            pgnav.updateTopNavLink(pgKeyword);
        }
        
        //设置当前频道标红样式
        if(channelObj) {
            var chal = document.getElementById(channelObj.sid);
        }
        if(!!chal){
            addClassName(chal, CURRENT_CHANNEL_STYLE);
            var chalText = chal.innerHTML || "";
            if(chalText!=""){
                
                //去掉链接，改为文本  update lihao 14-06-11
                var _text = chalText.replace(/\<\/(a|A)\>/, '');
                _text = _text.replace(/\<(a|A).+\>/, '');
                chal.innerHTML = _text;
            }
        }
    }

    var eventUtil = {
        addHandler: function(element, type, handler) {
            if(element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if(element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },

        removeHandler: function(element, type, handler) {
            if(element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if(element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },

        getEvent: function(event) {
            return event ? event : window.event;
        },

        getTarget: function(event) {
            return event.target || event.srcElement;
        }

    };

    function init(){
        getLocation();
        render();
        setNav();
    }
      
    init();
 })();