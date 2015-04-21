
// DOM 基本操作
define("assets/widget/com/dom/selector", function (require, exports, module) {
    
    "use strict";
    
    function Selector() {
        return {
            replaceHtml: function(el, html) {
                var oldEl = typeof el === "string" ? document.getElementById(el) : el;
                var newEl = oldEl.cloneNode(false);
                newEl.innerHTML = html;
                oldEl.parentNode.replaceChild(newEl, oldEl);
                return newEl;
            },
            $Array: function(arr) {
                var $arr = [];
                for (var i = 0; i < arr.length; i++) {
                    $arr.push(arr[i]);
                }
                return $arr;
            },
            getElementsByClassName: function(className, tagName) {
                var t = this;
                tagName = tagName || "div";
                var elems = document.getElementsByTagName(tagName) || document.all;
                var elemList = [];
                t.each(t.$Array(elems), function() {
                    t.hasClass(this, className) ? elemList.push(this) : void 0;
                });
                return elemList;
            },
            hasClass: function(elem, className) {
                var t = this,
                    hc = 0;
                t.each(elem.className.split(" "), function() {
                    if (this == className) {
                        hc = 1;
                    }
                });
                return hc;
            },
            each: function(arr, callback) {
                for (var i = 0; i < arr.length; i++) {
                    callback.call(arr[i], arr[i], i);
                }
            }
        };
    }
});