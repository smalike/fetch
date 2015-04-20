
// toolbar基本操作
BL.Com.OperationAndExtend = function() {
	/*****************************
	 * 页面交互方法
	 *
	 ******************************/
	return {
		/***
		 * 天气背景样式对应常量
		 * @deprecated
		 **/
		WEATHERS_STATUS_CLASS: {
			"晴间多云": "weather_qingjianduoyun",
			"暴雪": "weather_baoxue",
			"暴雨": "weather_baoyu",
			"晴": "weather_qing",
			"多云": "weather_duoyun",
			"阴": "weather_yin",
			"阵雨": "weather_zhenyu",
			"雷阵雨": "weather_leizhenyu",
			"雷阵雨伴有冰雹": "weather_leizhenyubb",
			"雨夹雪": "weather_yujiaxue",
			"小雨": "weather_xiaoyu",
			"中雨": "weather_zhongyu",
			"大雨": "weather_dayu",
			"大暴雨": "weather_dabaoyu",
			"特大暴雨": "weather_tedadbaoyu",
			"阵雪": "weather_zhenxue",
			"小雪": "weather_xiaoxue",
			"中雪": "weather_zhongxue",
			"大雪": "weather_daxue",
			"雾": "weather_wu",
			"冻雨": "weather_dongyu",
			"沙尘暴": "weather_shachenbao",
			"小到中雨": "weather_xiaodaozhongyu",
			"中到大雨": "weather_zhongdaodayu",
			"大到暴雨": "weather_dadaobaoyu",
			"暴雨到大暴雨": "weather_weather_baoyuddby",
			"大暴雨到特大暴雨": "weather_weather_dabaoyudtdby",
			"小到中雪": "weather_xiaodaozhongxue",
			"中到大雪": "weather_zhongdaodaxue",
			"大到暴雪": "weather_dadaobaoxue",
			"浮尘": "weather_fuchen",
			"扬沙": "weather_yangsha",
			"强沙尘暴": "weather_qiangshachenbao",
			"霾": "weather_mai"
		},
		cityDataText: new Array(),
		maxNum: 3,
		/***最多选择多少个城市**/
		selCity: 0,
		/***选择城市数**/
		init: function($) {
			var t = this;
			if (BL.Com.Toolbar.pageRankElems.length <= 0) {
				t.selectCityExtend();
				t.initWeatherEvent();
			}
			t.initBaseEvent();
		},
		selectCityExtend: function() {
			$.fn.singleSelect = function(settings) {
				var defaultSettings = {
					id: '',
					width: '',
					valItem: '',
					txtItem: '',
					selectItem: '',
					render: null,
					changeFunction: null
				};

				/*** 合并默认参数和用户自定义参数 **/
				settings = $.extend(defaultSettings, settings);

				return this.each(function() {
					var selObject = $(this); /***获取当前对象**/
					var selId = selObject.attr("id"); /***得到select id属性**/
					var valArray = new Array(); /***保存value**/
					var txtArray = new Array(); /***保存text**/
					var firstOption = selObject.find("option").eq(0);
					var flag = false;
					if (firstOption.val() == "tellhow") {
						flag = true;
					}
					/***遍历取出里面的所有value和Text**/
					selObject.find("option").each(function(index) {
						if (flag) {
							if (index > 0) {
								/***从第二项开始**/
								valArray[index - 1] = $.trim($(this).val());
								txtArray[index - 1] = $.trim($(this).text());
								if ($(this).attr("selected")) {
									settings.selectItem = $.trim($(this).val());
								}
							}
						} else {
							valArray[index] = $.trim($(this).val());
							txtArray[index] = $.trim($(this).text());
							if ($(this).attr("selected")) {
								settings.selectItem = $.trim($(this).val());
							}
						}
					});
					var selParent = selObject.parent();
					selObject.remove(); /***移除select**/
					settings.id = selId;
					settings.valItem = valArray;
					settings.txtItem = txtArray;
					settings.render = selParent;
					/***初始化下拉列表**/
					$.initSingleSelect(settings);
				});
			};
			/***得到选中的下拉列表值**/
			$.fn.getsingleSelectValue = function() {
				var $cId = this.attr("id");
				var $id = "#" + $cId + "_singleSelect_content";
				var $selectDiv = $($id).find(".singleSelectCheckDiv_select");
				var $selectVel = $selectDiv.find(".singleSelectCheckValue");
				return $.trim($selectVel.html());
			};
			/***得到选中的下拉列表内容**/
			$.fn.getsingleSelectText = function() {
				var $cId = this.attr("id");
				var $id = "#" + $cId + "_singleSelect_input";
				return $.trim($($id).val());
			};
			/***得到所有下拉列表的值**/
			$.fn.getAllSingleSelectValue = function() {
				var $cId = this.attr("id");
				var valarray = new Array();
				$("#" + $cId + "_singleSelect_content .singleSelectCheckValue").each(function(index) {
					valarray[index] = $.trim($(this).html());
				});
				return valarray;
			};
			/***得到所有下拉列表的内容**/
			$.fn.getAllSingleSelectText = function() {
				var $cId = this.attr("id");
				var valarray = new Array();
				$("#" + $cId + "_singleSelect_content .singleSelectCheckSpan").each(function(index) {
					valarray[index] = $.trim($(this).html());
				});
				return valarray;
			};
			/***动态修改单选下拉列表的值**/
			$.fn.changeSingleSelectContent = function(settings) {
				/***默认参数**/
				var defaultSettings = {
					valItem: '',
					txtItem: '',
					selectItem: '',
					changeFunction: null
				};

				/***合并默认参数和用户自定义参数**/
				settings = $.extend(defaultSettings, settings);
				var $cId = this.attr("id");
				/***清空输入框内的值**/
				var selInput = $("#" + $cId + "_singleSelect_input");
				selInput.val("");
				/***清空列表中的内容**/
				var $content = $("#" + $cId + "_singleSelect_content");
				$content.children().remove();
				/***设置高度**/
				if (settings.valItem.length > 8) {
					$content.css("height", 8 * 27); /***设置高**/
				} else {
					$content.css("height", settings.valItem.length * 27); /***设置高**/
				}
				if (settings.selectItem !== null && settings.selectItem !== "") {
					settings.selectItem = $.trim(settings.selectItem);
				}
				if (settings.changeFunction === null || settings.changeFunction === "") {
					var strFunc = $.trim($("#" + $cId).attr("title"));
					settings.changeFunction = strFunc;
				}
				var len = settings.valItem.length;
				var htmlArray = [];
				$.each(settings.valItem, function(i) {
					var selectStr = "";
					var itemv = settings.valItem[i];
					var itemt = settings.txtItem[i];
					if (settings.selectItem !== "" && settings.selectItem !== null) {
						if (itemv == settings.selectItem) {
							selInput.val(itemt);
							selectStr = " singleSelectCheckDiv_select";
						}
					}
					htmlArray[i] = '<div class="singleSelectCheckDiv' + selectStr + '" onmouseenter="BL.Com.OperationAndExtend.singleSelectItemMouseEnter(\'' + $cId + '\',this,event)" onclick="BL.Com.OperationAndExtend.singleSelectClickItem(\'' + $cId + '\',this,\'' + settings.changeFunction + '\')"><span class="singleSelectCheckValue" style="display:none;">' + itemv + '</span><span style="float:left;margin-left:5px;margin-top:5px;" class="singleSelectCheckSpan">' + itemt + '</span></div>';
				});
				$content.append(htmlArray.join(""));
				/***关闭缓冲**/
				$("#" + $cId).singleSelectLoaddingOff();
			};
			/***动态创建多选下拉列表**/
			$.fn.createSingleSelect = function(settings) {
				/***默认参数**/
				var defaultSettings = {
					id: '',
					width: '',
					valItem: '',
					txtItem: '',
					selectItem: '',
					render: null,
					changeFunction: null
				};
				/***合并默认参数和用户自定义参数**/
				settings = $.extend(defaultSettings, settings);
				if (settings.render === null) {
					settings.render = this;
				}
				/***初始化下拉列表**/
				$.initSingleSelect(settings);
			};
			/***初始化下拉列表**/
			$.initSingleSelect = function(settings) {
				if (settings.id === '' || settings.render === null) {
					return;
				}
				settings.selectItem = $.trim(settings.selectItem);
				var strFunc = "";
				if (settings.changeFunction !== null && settings.changeFunction !== "") {
					strFunc = settings.changeFunction;
				}
				var selHtml = '<div style="display:none;" id="' + settings.id + '" title="' + strFunc + '"></div><div style="margin-left:2px;"><div style="display: none; position: absolute; z-index: 500; font-size: 12px; padding-left: 5px;padding-top: 3px;color: #FBA33C;width: 100%;height: 21px;filter: Alpha(opacity=60);background-color: white;" id="' + settings.id + '_singleSelect_loader">数据加载中...</div><input type="text" class="input3" style="width:' + settings.width + '" id="' + settings.id + '_singleSelect_input" onkeyup="BL.Com.OperationAndExtend.singleSelectInputKeyUp(\'' + settings.id + '\',this,event)"/>';
				settings.render.append(selHtml); /***替换新的**/
				var selHeight = 0;
				if (settings.valItem.length > 8) {
					selHeight = 8 * 27;
				} else {
					selHeight = settings.valItem.length * 27;
				}
				var selInput = $("#" + settings.id + "_singleSelect_input");
				var cWidth = selInput.width() + 24; /***下拉列表的宽**/
				var htmlArray = [];
				htmlArray[0] = '<div class="singleSelect-content hide" id="' + settings.id + '_singleSelect_content" style="height:' + selHeight + 'px;width:' + cWidth + 'px;">';
				var len = settings.valItem.length;
				$.each(settings.valItem, function(i) {
					var selectStr = "";
					var itemv = settings.valItem[i];
					var itemt = settings.txtItem[i];
					if (settings.selectItem != "" && settings.selectItem != null) {
						if (itemv == settings.selectItem) {
							selInput.val(itemt);
							selectStr = " singleSelectCheckDiv_select";
						}
					}
					htmlArray[i + 1] = '<div class="singleSelectCheckDiv' + selectStr + '" onmouseenter="BL.Com.OperationAndExtend.singleSelectItemMouseEnter(\'' + settings.id + '\',this,event)" onclick="BL.Com.OperationAndExtend.singleSelectClickItem(\'' + settings.id + '\',this,\'' + settings.changeFunction + '\')"><span class="singleSelectCheckValue" style="display:none;">' + itemv + '</span><span style="float:left;margin-left:5px;margin-top:5px;" class="singleSelectCheckSpan">' + itemt + '</span></div>';
				});
				htmlArray[len + 2] = "</div>";
				$("body").append(htmlArray.join("")); /***展示内容**/
			};
			/***缓冲打开**/
			$.fn.singleSelectLoaddingOn = function() {
				var $cId = this.attr("id");
				var $load = $("#" + $cId + "_singleSelect_loader"); /***缓冲div**/
				if ($load.is(":hidden")) {
					var $parent = $load.parent();
					$load.css("left", $parent.offset().left);
					$load.css("top", $parent.offset().top);
					$load.css("width", $parent.width() - 2);
					$load.show();
				}
			};
			/***缓冲关闭**/
			$.fn.singleSelectLoaddingOff = function() {
				var $cId = this.attr("id");
				var $load = $("#" + $cId + "_singleSelect_loader"); /***缓冲div**/
				if (!$load.is(":hidden")) {
					$load.hide();
				}
			};
			/***清空下拉列表的值**/
			$.fn.singleSelectInputClear = function() {
				var $cId = this.attr("id");
				$("#" + $cId + "_singleSelect_input").val("");
				$("#" + $cId + " .singleSelectCheckDiv").removeClass("singleSelectCheckDiv_select");
			};
			/***更改下拉列表框的内容**/
			$.fn.singleSelectInputSetText = function(txt) {
				var $cId = this.attr("id");
				var flag = false;
				$("#" + $cId + "_singleSelect_content .singleSelectCheckDiv").removeClass("singleSelectCheckDiv_select");
				$("#" + $cId + "_singleSelect_content .singleSelectCheckSpan").each(function() {
					if ($.trim($(this).html()) == txt) {
						$(this).parent().addClass("singleSelectCheckDiv_select");
						$("#" + $cId + "_singleSelect_input").val(txt);
						flag = true;
					}
				});
				if (!flag) {
					$("#" + $cId + "_singleSelect_input").val(txt);
				}
			};
			/***下拉列表聚焦**/
			$.fn.singleSelectInputFocus = function() {
				var $cId = this.attr("id");
				$("#" + $cId + "_singleSelect_input").focus();
			};

			/*****/
			$.fn.insertCity = function(cityName, cityNum, maxNum) {
				var cityLi = '<li><i class="wo_close">X</i><label>' + cityName + '</label></li>';
				if (cityNum < maxNum) {
					var isExists = false;
					$("#wo_city_list li").each(function() {
						var cityNameOld = $("label", this).text();
						if (cityNameOld == cityName) {
							isExists = true;
						}
					});
					if (!isExists) {
						$(cityLi).insertBefore($('#wo_last_input'));
						if (cityNum == maxNum - 1) {
							$('#wo_last_input').hide();
						}
						cityNum++;
					}
				} else {
					alert('您最多可同时选择3个城市');
				}
				return cityNum;
			};
		},
		initBaseEvent: function() {
			var t = this;

			$('.a_user').on('mouseover', function() {
				t.hideBox();
                
				// 每次修改头部结构都要重新定义退出right值。
				// 这里用依靠定义法，获得依靠目标left值，定义给quit位置 - jlj
				$('.quit_box').css({
					left: this.offsetLeft
				}).show();
				return false;
			});
			
//            $(document).on('mouseover', "#jToolbarUser .a_download", function() {
//                t.hideBox();
//                $('.download_box').show();
//                return false;
//            });
            
			// 移入空白处
			$(document).on('mouseover', function(e) {
				if ($(e.target).closest(".wo_box").length === 0 && $(e.target).closest(".singleSelect-content").length === 0) {
					$(".wo_box").hide();
					$(".singleSelect-content").hide();
				}
				if ($(e.target).closest(".acc_box").length === 0) {
					$(".acc_box").hide();
				}
				if ($(e.target).closest(".download_box").length === 0) {
					$(".download_box").hide();
				}
				if ($(e.target).closest(".skin_box").length === 0) {
					$(".skin_box").hide();
				}
				if ($(e.target).closest(".quit_box").length === 0) {
					$(".quit_box").hide();
				}
			});
		},
		initWeatherEvent: function() {
			var t = this;
			/***首页其它城市天气**/
			var cityTextDefault = [
				"北京", "上海", "广州"
			];
			var isWeather = BL.Util.Cookie.get('weatherCookie', true);
			if (isWeather) {
				t.cityDataText = isWeather.split(",");
				setWeatherCookieView(t.cityDataText.length, t.cityDataText);
			}
			/***显示其它城市天气**/
			$('#wo_switch').on('mouseover', function() {
				t.hideBox();
				$('.wo_box').show();
				//if (BL.Com.Toolbar.isLogin()) {
				BL.Com.City.renderBack();
				//}
				return false;
			});
			/***热门城市 省市切换**/
			$('.wo_tab a').on('click', function() {
				var num = $('.wo_tab a').index(this);
				$('.wo_tab a').removeClass('cur').eq(num).addClass('cur');
				$('.wo_cont').hide().eq(num).show();
				return false;
			});
			/***天气保存结果**/
			$('#weatherSubmit').on('click', function() {
				t.cityDataText.length = 0;
				$('#wo_city_list label').each(function() {
					t.cityDataText.push($(this).text());
				});
				setWeatherCookieView(t.selCity, t.cityDataText);
			});

			function setWeatherCookieView(selCity, cityData) {
				if (cityData.length < t.maxNum) {
					for (var i = 0; i < t.maxNum; i++) {
						var isArray = $.inArray(cityTextDefault[i], cityData);
						if (isArray) {
							cityData.push(cityTextDefault[i]);
						}
						if (cityData.length >= t.maxNum) {
							break;
						}
					}
				}
				var weatherCookie = "";
				for (var i = 0; i < t.maxNum; i++) {
					var cityText = cityData[i];
					if (cityText.length > 0) {
						for (var j = 0; j < t.maxNum; j++) {
							$('.wo_box_wrap .list16').eq(j).find('h1').eq(i).text(cityText);
						}
						BL.Com.Toolbar.getWheather(cityText, "otherWeatherCallback");
						weatherCookie += cityText + ",";
					}
				}
				weatherCookie = weatherCookie.substring(0, weatherCookie.length - 1);
				$('.wo_box_wrap').hide().eq(1).fadeIn();
				BL.Util.Cookie.set('weatherCookie', weatherCookie, null, ".chinaso.com");
			}
			/***取消选择**/
			$('#cancelSel').on('click', function() {
				BL.Util.Cookie.get('weatherCookie', true) ? $('.wo_box_wrap').hide().eq(1).fadeIn() : $(".wo_box").hide();

			});
			/***重新设定**/
			$('#resetCity').on('click', function() {
				$('.wo_box_wrap').hide().eq(0).fadeIn();
			});
			/***增加城市**/
			$(document).on('click', '#hotCity li', function() {
				var text = $(this).text();
				t.selCity = $(this).insertCity(text, t.selCity, t.maxNum);
			});
			/***由城市列表更改增加城市**/
			$(document).on('click', '#s_city', function() {
				if (this.selectedIndex >= 0) {
					var text = $(this).val();
					t.selCity = $(this).insertCity(text, t.selCity, t.maxNum);
				}
			});
			/***删除城市**/
			$(document).on('click', '.wo_close', function() {
				$(this).parent().remove();
				if (t.selCity == 3) {
					$('#wo_last_input').show();
				}
				t.selCity = t.selCity - 1;
				return false;
			});
			/***今天 明天 后天**/
			$('#wo_sel_day a').click(function() {
				var num = $('#wo_sel_day a').index(this);
				$('#wo_sel_day a').removeClass('cur').eq(num).addClass('cur');
				$('.wo_box_wrap .list16').hide().eq(num).fadeIn('slow');
				return false;
			});
		},
		hideBox: function() {
			$("#jToolbar .hide, .singleSelect-content").not(function() {
				if ($(this).parents(".hide").length > 0) {
					return this;
				}
			}).hide();
		},
		/***点击按钮展示下拉列表
		 * @Deprecated
		 **/
		singleSelectContentShow: function(cId, eve) {
			var contentList = $("#" + cId + "_singleSelect_content");
			if (contentList.is(":hidden")) {
				$(".singleSelect-content").hide();
				/***显示**/
				contentList.show();
				var cInput = $("#" + cId + "_singleSelect_input");
				var cLeft = cInput.offset().left; /***局左**/
				var cTop = cInput.offset().top + cInput.outerHeight(); /***局上**/
				var cWidth = cInput.width() + 24; /***下拉列表的宽**/
				contentList.css("left", cLeft);
				contentList.css("top", cTop);
				contentList.css("width", cWidth);
				cInput.focus();
			} else {
				/***隐藏**/
				contentList.hide();
			}
			var eve = eve || window.event;
			if (eve.stopPropagation) { /***W3C阻止冒泡方法**/
				eve.stopPropagation();
			} else {
				eve.cancelBubble = true; /***IE阻止冒泡方法**/
			}
		},
		/***鼠标移入某项**/
		singleSelectItemMouseEnter: function(id, obj, eve) {
			$("#" + id + "_singleSelect_content .singleSelectCheckDiv").removeClass("singleSelectCheckDiv_hover");
			$(obj).addClass("singleSelectCheckDiv_hover");
			var eve = eve || window.event;
			if (eve.stopPropagation) { /***W3C阻止冒泡方法**/
				eve.stopPropagation();
			} else {
				eve.cancelBubble = true; /***IE阻止冒泡方法**/
			}
		},
		/***点击下拉列表某项**/
		singleSelectClickItem: function(cId, obj, func) {
			var cInput = $("#" + cId + "_singleSelect_input");
			var cTxt = $.trim($(obj).find(".singleSelectCheckSpan").html());
			cInput.val(cTxt);
			$("#" + cId + "_singleSelect_content .singleSelectCheckDiv").removeClass("singleSelectCheckDiv_select");
			$(obj).addClass("singleSelectCheckDiv_select");
			/***外部onchange事件**/
			if (func !== null && func !== "") {
				eval(func);
			}
		},
		/***文本框输入内容**/
		singleSelectInputKeyUp: function(cId, obj, eve) {
			cId += "_singleSelect_content";
			var val = $.trim($(obj).val());
			if (eve.keyCode == 8) {
				/***删除**/
				if (val === "") {
					$("#" + cId + " .singleSelectCheckDiv_select").removeClass("singleSelectCheckDiv_select");
				}
			} else if (eve.keyCode == 37 || eve.keyCode == 39) {
				/***左右**/
				return;
			} else if (eve.keyCode == 38) {
				/***向上**/
				var $index = 0;
				var $allshowdiv = $("#" + cId + " > .singleSelectCheckDiv:visible");
				var $focusDiv = $("#" + cId).find(".singleSelectCheckDiv_hover"); /***当前聚焦的div**/
				if ($focusDiv.html() === undefined) {
					var $selectDiv = $("#" + cId).find(".singleSelectCheckDiv_select"); /***当前选中的div**/
					if ($selectDiv.html() !== undefined) {
						$index = $allshowdiv.index($selectDiv) - 1;
					}
				} else {
					$index = $allshowdiv.index($focusDiv) - 1;
				}
				var $count = $allshowdiv.size();
				if ($index < $count && $index > -1) {
					$focusDiv.removeClass("singleSelectCheckDiv_hover");
					var zz = parseInt($index / 8);
					$("#" + cId).scrollTop(zz * 8 * 27);
					$allshowdiv.eq($index).addClass("singleSelectCheckDiv_hover");
				}
				return;
			} else if (eve.keyCode == 40) {
				/***向下**/
				var $index = 0;
				var $allshowdiv = $("#" + cId + " > .singleSelectCheckDiv:visible");
				var $focusDiv = $("#" + cId).find(".singleSelectCheckDiv_hover"); /***当前聚焦的div**/
				if ($focusDiv.html() === undefined) {
					var $selectDiv = $("#" + cId).find(".singleSelectCheckDiv_select"); /***当前选中的div**/
					if ($selectDiv.html() !== undefined) {
						$index = $allshowdiv.index($selectDiv) + 1;
					}
				} else {
					$index = $allshowdiv.index($focusDiv) + 1;
				}
				var $count = $allshowdiv.size();
				if ($index < $count && $index > -1) {
					$focusDiv.removeClass("singleSelectCheckDiv_hover");
					var zz = parseInt($index / 8);
					$("#" + cId).scrollTop(zz * 8 * 27);
					$allshowdiv.eq($index).addClass("singleSelectCheckDiv_hover");
				}
				return;
			} else if (eve.keyCode == 13) {
				/***回车**/
				var $focusDiv = $("#" + cId).find(".singleSelectCheckDiv_hover"); /***当前聚焦的div**/
				if ($focusDiv.html() !== undefined) {
					$focusDiv.click();
				}
				return;
			}
			/***展示内容**/
			var count = 0;
			var cObj = null;
			var txt = "";
			var qp = "";
			var jp = "";
			$("#" + cId + " .singleSelectCheckSpan").each(function() {
				cObj = $(this).parent();
				txt = $(this).html().toLowerCase();
				qp = BL.Util.ToChineseSpell.ConvertPinyin(txt); /***全拼**/
				jp = BL.Util.ToChineseSpell.makePy(txt).toString().toLowerCase(); /***取汉字首字母**/
				if (txt.indexOf(val) != -1 || qp.indexOf(val) != -1 || jp.indexOf(val) != -1) {
					cObj.show();
					count += 1;
				} else {
					cObj.hide();
				}
			});
			/***下拉框高度**/
			var cContent = $("#" + cId);
			if (count > 0) {
				if (count > 8) {
					$("#" + cId).css("height", 8 * 27); /***设置高**/
				} else {
					$("#" + cId).css("height", count * 27); /***设置高**/
				}
				if (cContent.is(":hidden")) { /***没显示时显示下拉框**/
					var cLeft = $(obj).offset().left; /***局左**/
					var cTop = $(obj).offset().top + $(obj).outerHeight(); /***局上**/
					var cWidth = $(obj).width() + 24; /***下拉列表的宽**/
					cContent.css("left", cLeft);
					cContent.css("top", cTop);
					cContent.css("width", cWidth);
					cContent.show();
				}
			} else {
				cContent.hide();
			}
		}
	};
}();

/***
 * 设置天气视图
 * @params{data:请求天气城市列表回调数据}
 **/
function otherWeatherCallback(data) {
	var num,
		status,
		imgSrc = "http://www.chinaso.com/common/base/image/weather/",
		suffix = ".gif";
	for (var i = 0; i < BL.Com.OperationAndExtend.cityDataText.length; i++) {
		if (data /* && data.status == "OK"*/ ) {
			if (BL.Com.OperationAndExtend.cityDataText[i] == data.cityExt.city) {
				for (var j = 0; j < 3; j++) {
					num = data.forcast.weathers[j].temp;
					status = data.forcast.weathers[j].weather;
					status = status ? status : "";
					var weather = BL.Com.Weather.weatherCut(status);
					weather = BL.Util.ToChineseSpell.ConvertPinyin(weather);
					$('.wo_box_wrap .list16').eq(j).find('h2').eq(i).text(num);
					$('.wo_box_wrap .list16').eq(j).find('h3').eq(i).text(status);
					$('.wo_box_wrap .list16').eq(j).find('h4').eq(i).addClass(weather); //.html('<img src="' + imgSrc + weather + suffix + '"/>');
				}
			}
		} /* else if (data.status == "CITY_NOT_FOUND") {}*/
	}
}

BL.Com.OperationAndExtend.init($);