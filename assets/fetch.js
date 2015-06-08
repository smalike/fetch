/*! fetch-Module - v0.1.0 - 2015-06-03 15:56:59 */
var fetch,define;!function(){function a(a){return"[object Array]"===Object.prototype.toString.call(a)}function b(a){return"[object Function]"===Object.prototype.toString.call(a)}function c(){var a=this;a.status="PENDING",a.doResolves=[],a.doRejecteds=[]}function d(a){var b,d,f,g=document.createElement("script"),h=a,i=s&&s.getElementsByTagName("base")[0]||s.firstChild;return d=new c,b=setTimeout(function(){e(d,"timeout")},fetch.timeout),g.onerror=function(a){clearTimeout(b),e(d,a)},g.onload=g.onreadystatechange=function(c){c=c||window.event,("load"===c.type||{loaded:1,complete:1}[this.readyState])&&(clearTimeout(b),d.resolve(a)),g.onload=g.onreadystatechange=g.onerror=null},fetch.config.paths&&(f=fetch.config.paths[a])&&(h=f),/^(http(s)?:)?\/\//i.test(h)||(fetch.config.baseURL||(fetch.config.baseURL=t),h=fetch.config.baseURL+h),g.charset="utf-8",g.async=!0,g.src=h+".js?t="+fetch.config.timestamp,s.insertBefore(g,i),d}function e(a,b){a.reject(b)}function f(b,c,d){var e,f,g;for(g=a(b)?b:[b],f=g.length,e=0;f>e;e++)o[g[e]]||(o[g[e]]={dependency:c,callback:d})}function g(a,c){var d,e;for(d in p[a])if(!d.hasOwnProperty(p[a])&&(e=p[a][d],!e))break;e&&(b(c)&&f(a,p[a],c),r.dispatch(a,a))}function h(a,b,c){var e,f,h,i;for(f=b.length,e=0;f>e;e++)h=b[e],p[a]=p[a]||{},p[a][h]=!!o[h],p[a][h]||(i=!0,r.addEventListener(h,function(a,b,c){p[b][a]=!0,g(b,c),r.removeEventListener(a)},null,[a,c]),m[h]||(m[h]={deps:[]},d(h).done(function(a){})));return i}function i(b,c,e){a(c)&&j(b,c),r.addEventListener(b,function(b,c,d){var e,f,g,h=[];if(r.removeEventListener(b),a(q[c])){for(h.push(k(c)),f=q[c].length,e=0;f>e;e++){if(g=k(q[c][e]),!g)return!1;h.push(g)}return d.apply(fetch,h),!1}k(c,d)},null,[b,e]),m[b]?q[b]&&(m[b].deps=m[b].deps.concat(q[b]),h(b,q[b],e)||r.dispatch(b,b)):(m[b]={},d(b).done(function(a){var b;fetch.config.shim&&(b=fetch.config.shim[a],b&&define(a,b.deps,function(){return window[b.exports]}))}))}function j(a,b){var c,d,e;for(d=b.length,q[a]=q[a]||[],c=0;d>c;c++)e=b[c],q[a].push(e)}function k(a,c){var d,e,f=o[a];return f?(e=m[a],e.exports?b(c)?c(e.exports):e.exports:(d=e.callback(fetch,n,e),d?e.exports=d:e.exports||(e.exports=n),b(c)?void c(e.exports):e.exports)):!1}function l(){var a=document.scripts,b=a[a.length-1];return b.hasAttribute?b.src:b.getAttribute("src",4)}c.prototype.resolve=function(a){var b=this,c=0,d=b.doResolves.length;for(b.status="FULFILLED",c=0;d>c;c++)b.doResolves[c].call(b,a)},c.prototype.reject=function(a){var b,c=this,d=c.doRejecteds.length;for(c.status="REJECTED",b=0;d>b;b++)c.doResolves[b].call(c,a)},c.prototype.done=function(a){var c=this;return b(a)&&c.doResolves.push(a),c},c.prototype.fail=function(a){var c=this;return b(a)&&c.doRejecteds.push(a),c},c.prototype.then=function(){},c.prototype.always=function(a){var b=this;return b.done(a).fail(a),b},c.when=function(a){var b,d,e=new c,f=a.length,g=[];for(b=0;f>b;b++){if(d=a[b],!(d instanceof c))return!1;d.always(function(a){"REJECTED"===this.status&&e.reject(),f--,g.push(a),f||e.resolve(g)})}return e};var m={load:function(){}},n={},o={},p={},q={},r={eventMap:{},addEventListener:function(a,b,c,d){var e=this;return e.eventMap[a]||(e.eventMap[a]=[]),c=c||e,d=d||[],e.eventMap[a].push({handler:b,target:c,args:d}),e},removeEventListener:function(a,b){var c,d,e,f=this;if(b)for(c=0;d>c;c++)e=f.eventMap[a][c],e.handler===b&&(e=null);else f.eventMap[a]=[];return f},dispatch:function(a,b){var c,d,e,f=this,g=f.eventMap[a];for(g&&(d=g.length),b=b||{},c=0;d>c;c++)e=g[c],e&&(e.args.unshift(b),e.handler.apply(e.target,e.args))}},s=document&&(document.head||document.getElementsByTagName("head")[0]);define=function(c,d,e){var g={};return o[c]?!1:(m[c]=m[c]||{deps:[]},b(d)&&(e=d),q[c]&&(a(d)||(d=[]),d=d.concat(q[c])),m[c].callback=e,void(a(d)&&d.length?(m[c].deps=d,h(c,d,e)||(f(c,g,e),r.dispatch(c,c))):(f(c,g,e),r.dispatch(c,c))))},fetch=function(c,d,e){var f=o[c];if(b(d)&&(e=d),f){if(!a(d)||!d.length)return k(c,e);i(c,d,e)}else i(c,d,e)};var t=l().match(/[^?#]*\//)[0];fetch.timeout=5e3,fetch.config={baseURL:null,debug:!0,paths:{},shim:{},timestamp:"1"},define.amd={version:"0.1.0",jQuery:!0}}(this),define("utils/class",function(a,b,c){var d=function(){var a=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},b=function(){function c(){!c.initPrototype&&this.init&&this.init.apply(this,arguments)}this.initPrototype=!0;var d=new this;this.initPrototype=!1;for(var e,f=Array.prototype.slice.call(arguments)||[];e=f.shift();)a(d,e.prototype||e);return c.prototype=d,c.prototype.constructor=c,c.extend=b,c},c=function(){};return c.extend=b,c}();return d}),define("utils/util",function(a,b,c){"use strict";var d={"[object Array]":"array","[object Boolean]":"boolean","[object Date]":"date","[object Error]":"error","[object Function]":"function","[object Number]":"number","[object Object]":"object","[object RegExp]":"regexp","[object String]":"string"},e=d.toString,f=d.hasOwnProperty,g={extend:function(){var a,b,c,d,e,f,g=this,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[1]||{},i=2),"object"==typeof h||g.isFunction(h)||(h={}),j===i&&(h=this,--i);j>i;i++)if(null!==(a=arguments[i]))for(b in a)c=h[b],d=a[b],h!==d&&(k&&d&&(g.isPlainObject(d)||(e=g.isArray(d)))?(e?(e=!1,f=c&&g.isArray(c)?c:[]):f=c&&g.isPlainObject(c)?c:{},h[b]=g.extend(k,f,d)):void 0!==d&&(h[b]=d));return h},isFunction:function(a){return"function"===this.type(a)},type:function(a){return null===a?String(a):"object"==typeof a||"function"==typeof a?d[e.call(a)]||"object":typeof a},isPlainObject:function(a){var b=this;if(!a||"object"!==b.type(a)||a.nodeType||b.isWindow(a))return!1;try{if(a.constructor&&!f.call(a,"constructor")&&!f.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return void 0===d||f.call(a,d)},isWindow:function(a){return null!==a&&a==a.window},isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},isDate:function(a){return"[object Date]"===Object.prototype.toString.call(a)},trim:function(a){return a.replace(/(^\s*)|(\s*$)/g,"")}};return g}),define("utils/event/event",function(a,b,c){var d={addEventListener:function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,~~d):a.attachEvent("on"+b,function(b){c.call(a,b)})},removeEventListener:function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,~~d):a.detachEvent(b,c)}};return d}),define("utils/event/dispatcher",function(a,b,c){"use strict";function d(){this.listeners={}}d.prototype={eventMap:{},addEventListener:function(a,b,c,d){var e=this;return e.eventMap[a]||(e.eventMap[a]=[]),c=c||e,d=d||[],e.eventMap[a].push({handler:b,target:c,args:d}),e},removeEventListener:function(a,b){var c,d,e,f=this;if(b)for(c=0;d>c;c++)e=f.eventMap[a][c],e.handler===b&&(e=null);else f.eventMap[a]=[];return f},dispatch:function(a,b){var c,d,e,f=this;if(f.eventMap[a])for(d=f.eventMap[a].length,b=b||{},c=0;d>c;c++)e=f.eventMap[a][c],e&&(e.args.unshift(b),e.handler.apply(e.target,e.args))}};var e=new d;return d.eventCenter=e,d}),define("utils/event/publish",["utils/util","utils/event/dispatcher"],function(a,b,c){"use strict";function d(a){var b,c,d={};if(a.attrs)for(b=a.attrs.split(";"),c=0;d=this.invert(b)[c++];)f.eventCenter.dispatch(d.type)}var e=a("utils/util"),f=a("utils/event/dispatcher");e.extend(d.prototype,{invert:function(a){var b,c,d,e=[];for(c=0;b=a[c++];)d=b.split(":"),e.push({name:d[0],type:d[1]});return e}}),c.exports=function(a){var b;return b=new d(a)}}),define("utils/event/subscriber",["utils/util","utils/event/dispatcher"],function(a,b,c){"use strict";function d(a){var b,c,d={};if(a.attrs)for(b=a.attrs.split(";"),c=0;d=this.invert(b)[c++];)f.eventCenter.addEventListener(d.type,a.fn,a.owner,a.args)}var e=a("utils/util"),f=a("utils/event/dispatcher");e.extend(d.prototype,{invert:function(a){var b,c,d,e=[];for(c=0;b=a[c++];)d=b.split(":"),e.push({name:d[0],type:d[1]});return e}}),c.exports=function(a){var b;return b=new d(a)}}),define("utils/json2",function(require,exprots,module){"use strict";var JSON2={m:{"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},s:{"boolean":function(a){return String(a)},number:function(a){return isFinite(a)?String(a):"null"},string:function(a){return/["\\\x00-\x1f]/.test(a)&&(a=a.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=JSON2.m[b];return c?c:(c=b.charCodeAt(),"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16))})),'"'+a+'"'},object:function(a){if(a){var b,c,d,e,f,g=[];if(a instanceof Array){for(g[0]="[",e=a.length,d=0;e>d;d+=1)f=a[d],c=JSON2.s[typeof f],c&&(f=c(f),"string"==typeof f&&(b&&(g[g.length]=","),g[g.length]=f,b=!0));g[g.length]="]"}else{if(!(a instanceof Object))return;g[0]="{";for(d in a)f=a[d],c=JSON2.s[typeof f],c&&(f=c(f),"string"==typeof f&&(b&&(g[g.length]=","),g.push(JSON2.s.string(d),":",f),b=!0));g[g.length]="}"}return g.join("")}return"null"}},copyright:"(c)2005 JSON.org",license:"http://www.crockford.com/JSON/license.html",stringify:function(a){var b=JSON2.s[typeof a];return b&&(a=b(a),"string"==typeof a)?a:null},parse:function(text){try{return!/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g,""))&&eval("("+text+")")}catch(e){return!1}}};return JSON2}),define("utils/storage",["utils/json2"],function(a,b,c){"use strict";function d(a,b,c){var d=this;d.fileName=a||"",d.expiresDay=b||0,d.isIE=-1!=navigator.userAgent.indexOf("MSIE")&&!window.opera,d.isInit=!1,d.target=document.documentElement,d.type=c||"json",d.init()}var e=a("utils/json2");return d.prototype={init:function(){var a=this;!window.localStorage&&a.isIE&&(a.isInit||(document.documentElement.addBehavior("#default#userdata"),a.isInit=!0))},set:function(a,b,c){var d=this;if(c=c||d.type,"json"==c&&(b=e.stringify(b)),window.localStorage)localStorage.setItem(a,b);else if(d.isIE){var f=d.target,g=d.fileName;f.load(g),f.setAttribute(a,b),f.expires=new Date((new Date).getTime()+864e5*d.expiresDay).toUTCString(),f.save(g)}},get:function(a,b){var c=this;if(b=b||c.type,window.localStorage)return"json"==b?e.parse(localStorage.getItem(a)):localStorage.getItem(a);if(c.isIE){var d=c.target,f=c.fileName;try{return d.load(f),"json"==b?e.parse(c.target.getAttribute(a)):c.target.getAttribute(a)}catch(g){return null}}},remove:function(a){var b=this;if(window.localStorage)localStorage.removeItem(a);else if(b.isIE){var c=b.target,d=b.fileName;c.load(d),c.removeAttribute(a),c.expires=new Date((new Date).getTime()-1).toUTCString(),c.save(d)}}},d}),define("utils/cookie",function(a,b,c){var d={get:function(a,b){var c,d=document.cookie,e=new RegExp("(^|)"+a+"=([^;]*)(;|$)");return c=d.match(e),c?b===!0?this.decodeStr(c[2]):c[2]:null},set:function(a,b,c,d,e,f){var g=encodeURIComponent(a)+"="+encodeURIComponent(b),h=null,i=30;c instanceof Date?g+=";expires="+c.toGMTString():(h=new Date,h.setTime(h.getTime()+24*i*60*60*1e3),g+=";expires ="+h.toGMTString()),e&&(g+=";path="+e),d&&(g+=";domain="+d),f&&(g+=";secure"),document.cookie=g},decodeStr:function(a){var b,c="",d=a.length;for(b=0;d>b;b++){var e=a.charAt(b);if("+"==e)c+=" ";else if("%"==e){var f=a.substring(b+1,b+3);parseInt("0x"+f)>127?(c+=decodeURI("%"+a.substring(b+1,b+9)),b+=8):(c+=String.fromCharCode(parseInt("0x"+f)),b+=2)}else c+=e}return c},deleteCookie:function(a,b,c,d){var e=encodeURIComponent(a)+"="+encodeURIComponent("a"),f=new Date;f.setTime(f.getTime()-1e4),e+=";expires ="+f.toGMTString(),c&&(e+=";path="+c),b&&(e+=";domain="+b),d&&(e+=";secure"),document.cookie=e}};return d}),define("utils/date/time",["utils/util"],function(a,b,c){"use strict";var d=a("utils/util"),e={getDay:function(){var a=["日","一","二","三","四","五","六"],b="周"+a[(new Date).getDay()];return b},converte:function(a){var b,c,e;return d.isDate(a)?a:(b=a.split(" "),c=b[0].split("-"),e=b[1]?b[1].split(":"):[0,0,0],new Date(c[0],c[1]-parseInt(1),c[2],e[0],e[1],e[2]?c[2]:0))},datafomatZero:function(a){return a=~~a,10>a?"0"+a:a+""},doTransferAbso:function(a,b){var c,d,e,f,g,h,i,j,k,l=this;return a=l.converte(a),b=b||new Date,a.setMilliseconds(0),b.setMilliseconds(0),d=a.getFullYear(),e=a.getMonth()+1,f=a.getDate(),g=a.getHours(),h=a.getMinutes(),i=b.getFullYear(),j=b.getMonth()+1,k=b.getDate(),c=d!==i?d+"-"+l.datafomatZero(e)+"-"+l.datafomatZero(f)+" "+l.datafomatZero(g)+":"+l.datafomatZero(h):e!==j||f!==k?l.datafomatZero(e)+"-"+l.datafomatZero(f)+" "+l.datafomatZero(g)+":"+l.datafomatZero(h):l.datafomatZero(g)+":"+l.datafomatZero(h)},doTransfer:function(a,b){if(!a)return"";var c=this;a=c.converte(a),b=b||new Date;var d="";a.setMilliseconds(0),b.setMilliseconds(0);var e=31536e6,f=63072e6,g=864e5,h=36e5,i=6e4,j=b-a;if(j-f>=0)d+=a.getFullYear()+"年",d+=a.getMonth()+1+"月"+a.getDate()+"日";else if(j-e>=0)d+="1年前";else{for(var k=-1,l=0,m=a.getTime();m<=b.getTime();m+=g){var n=new Date(m);k++,1==n.getDate()&&l++}if(k>=31)d+=l+"个月前";else if(k>=1)d+=k+"天前";else{var o=parseInt(j/h);if(o>=1)d+=b.getDate()-a.getDate()==1&&o>12?"1天前":o+"小时前";else{var p=parseInt(j/i);d+=p>=1?p+"分钟前":"刚刚"}}}return d},formatting:function(a,b){var c,d,e,f,g,h,i,j=this;return a&&(a=j.converte(a),c=a.getFullYear(),d=a.getMonth()+1,e=a.getDate(),f=a.getHours(),g=a.getMinutes(),h=a.getSeconds(),b?(b=b.replace("yyyy",c),b=b.replace("mm",j.datafomatZero(d)),b=b.replace("dd",j.datafomatZero(e)),b=b.replace("hh",j.datafomatZero(f)),b=b.replace("MM",j.datafomatZero(g)),b=b.replace("ss",j.datafomatZero(h)),i=b):i=c+"年"+j.datafomatZero(d)+"月"+j.datafomatZero(e)+"日"),i}};return e}),define("utils/date/lunar-calendar",["utils/util"],function(a,b,c){"use strict";function d(a){var b=this;b.defaults={calendarData:[2635,333387,1701,1748,267701,694,2391,133423,1175,396438,3402,3749,331177,1453,694,201326,2350,465197,3221,3402,400202,2901,1386,267611,605,2349,137515,2709,464533,1738,2901,330421,1242,2651,199255,1323,529706,3733,1706,398762,2741,1206,267438,2647,1318,204070,3477,461653,1386,2413,330077,1197,2637,268877,3365,531109,2900,2922,398042,2395,1179,267415,2635,661067,1701,1748,398772,2742,2391,330031,1175,1611,200010,3749,527717,1452,2742,332397,2350,3222,268949,3402,3493,133973,1386,464219,605,2349,334123,2709,2890,267946,2773,592565,1210,2651,395863,1323,2707,265877],madd:[0,31,59,90,120,151,181,212,243,273,304,334],tgString:"甲乙丙丁戊己庚辛壬癸",dzString:"子丑寅卯辰巳午未申酉戌亥",numString:"一二三四五六七八九十",monString:"正二三四五六七八九十冬腊",weekString:"日一二三四五六",sx:"鼠牛虎兔龙蛇马羊猴鸡狗猪",cYear:null,cMonth:null,cDay:null},e.extend(b.defaults,a)}var e=a("utils/util");e.extend(d.prototype,{getBit:function(a,b){return a>>b&1},e2c:function(){var a,b=this;a=3!=arguments.length?new Date:new Date(arguments[0],arguments[1],arguments[2]);var c,d,e,f,g=!1,h=a.getYear();for(1900>h&&(h+=1900),c=365*(h-1921)+Math.floor((h-1921)/4)+b.defaults.madd[a.getMonth()]+a.getDate()-38,a.getYear()%4==0&&a.getMonth()>1&&c++,d=0;;d++){for(f=b.defaults.calendarData[d]<4095?11:12,e=f;e>=0;e--){if(c<=29+b.getBit(b.defaults.calendarData[d],e)){g=!0;break}c=c-29-b.getBit(b.defaults.calendarData[d],e)}if(g)break}b.defaults.cYear=1921+d,b.defaults.cMonth=f-e+1,b.defaults.cDay=c,12==f&&(b.defaults.cMonth==Math.floor(b.defaults.calendarData[d]/65536)+1&&(b.defaults.cMonth=1-b.defaults.cMonth),b.defaults.cMonth>Math.floor(b.defaults.calendarData[d]/65536)+1&&b.defaults.cMonth--)},getcDateString:function(){var a=this,b="";return a.defaults.cMonth<1?(b+="(闰)",b+=a.defaults.monString.charAt(-a.defaults.cMonth-1)):b+=a.defaults.monString.charAt(a.defaults.cMonth-1),b+="月",b+=a.defaults.cDay<11?"初":a.defaults.cDay<20?"十":a.defaults.cDay<30?"廿":"三十",(a.defaults.cDay%10!=0||10==a.defaults.cDay)&&(b+=a.defaults.numString.charAt((a.defaults.cDay-1)%10)),b},getLunarDay:function(a,b,c){var d=this;return 1921>a||a>2020?"":(b=parseInt(b)>0?b-1:11,d.e2c(a,b,c),d.getcDateString())}}),c.exports=function(a){return new d(a)}}),define("utils/console",["utils/util"],function(a,b,c){"use strict";function d(){var a=this;a.compatibility()}var e=a("utils/util");return e.extend(d.prototype,{compatibility:function(){var a,b=this,c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","memoryProfile","memoryProfileEnd","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],d=c.length;if(!window.console)for(window.console={},a=0;d>a;a++)window.console[c[a]]=function(){};for(a=0;d>a;a++)b[c[a]]=window.console[c[a]]}}),new d});