/**
 * Project：feizhong-sh-mes
 * Descript：自定义扩展/增强API包
 * Author：xiaolj
 * Create：2018年09月07日
 * Copyright@2018 重庆昂码信息科技有限公司
 */

(function(window){

	/**
     * 数组元素array.remove()元素移除增强函数，根据指定元素值删除
     *
     */
	Array.prototype.remove = function(val) {
		for(var i=0; i<this.length; i++) {
	    	if(this[i] == val) {
	      		this.splice(i, 1);
	      		break;
	      	}
	    }
	}

	/**
     * 数组元素array.contains()是否包含某元素增强函数
     */
	Array.prototype.contains = function (obj) {
	    var i = this.length;
	    while (i--) {
	        if (this[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	}

	 /**
     * 数组元素array.unique()去重增强函数，扩展数组函数
     */
	Array.prototype.unique = function(){
		var res = [];
		var json = {};
		for(var i = 0; i < this.length; i++){
		  	if(!json[this[i]]){
		   		res.push(this[i]);
		   		json[this[i]] = 1;
			}
		}
		return res;
	}

	/**
     * 类似java中String.fromat()增强函数，扩展格式化字符串[a,b] [[a],[b]]
     */
    String.prototype.format = function(){
	    if(arguments.length == 0){
	    	 return this;
	    }else if(Object.prototype.toString.call(arguments[0]) === "[object Array]"){
	    	arguments = arguments[0];
	    }
	    var _this = this;
	    var matches = _this.match(/{\d+}/g);
	    matches = matches.unique();
	    var i = 0, l = Math.min(arguments.length, matches.length), _i, _s;
	    if(matches.length == 0){
	        _this = null; i = null; matches = null; l = null; _i = null; _s = null;
	        return this;
	    }
	    for(; i < l; i++)
	        if(!isNaN(_i = parseInt((_s = matches[i] + '').substr(1))))
	            _this = _this.replace(new RegExp("({)" + i + "(})", "g"), arguments[_i] + '');
	    i = null; matches = null; l = null; _i = null; _s = null;
	    return _this;
	}

	/**
     * 类似java中String.equals()增强函数，比较字符串
     */
    String.prototype.equals = function(str){
    	return this == str;
    }


	//根据参数是否取消/禁用表单通用函数
	$.disabeldForm = function(id, flag){
		if(flag == 0){
			$("form[id="+id+"] :input").removeAttr("disabled");
		}else{
			$("form[id="+id+"] :input").attr("disabled","disabled");
		}
	}

	//禁用指定表单
	$.attrDisabled = function(forms){
		$.each(forms, function(index, id){
			$("#"+id).attr("disabled","disabled");
		});
	}

	//取消禁用指定表单
	$.cancelDisabeld = function(forms){
		$.each(forms, function(index, id){
			$("#"+id).removeAttr("disabled");
		});
	}

	//强制重置表单指定字段【包括只读和禁用的属性】
	$.forceReset = function(forms){
		$.each(forms, function(index, obj){
			if($.isNull($(obj).attr("isclear"))){
				var type = $(obj).attr("type");
				//$.plog(index+":"+type);
				if(type == "text" || $(obj).is('textarea')){
					$(obj).val('');
				}else if($(obj).is('select')){
					$("#"+$(obj).attr("id")).prop('selectedIndex', 0);
					//$('select')).prop('selectedIndex', 0);//全部下拉框重置
					// jquery1.6以下版本 ： $('select').attr('selectedIndex', 0);
					// jquery1.6或以上版本 ： $('select').prop('selectedIndex', 0);
				}else if(type == "check"){
					$(obj).removeAttr('checked');
				}else if(type == "radio"){
					//暂时需要手工重置
				}
			}
		});
	}

	//强制重置表单指定字段【包括只读和禁用的属性】
	$.clearForms = function(forms){
		$.each(forms, function(index, obj){
			$("#"+obj).val('');
		});
	}

	//自定义表单属性：扩展属性
	$.customInputAttr = function(inputArray, jsonAttr){
		$.each(inputArray, function(index, inputObj){
			$("#"+inputObj).attr(jsonAttr);
		});
	}

	//表单数据序列化成JSON对象
	$.formJsonSerialize = function(formId){
	 	var json = {};
        $($("#" + formId).serializeArray()).each(function(){
            json[this.name] = this.value;
        });
        return json;
	}

	//是否正整数[flag: 0—> 包含0， -1标识可为空]
	$.isNumberic = function(value, flag) {
		var regExp = /^[1-9]+[0-9]*]*$/; //默认大于0的正整数
		if($.isNotNull(flag)){
			if(flag == 0){
				regExp = /^[0-9]+[0-9]*]*$/;
				return regExp.test(value);
			}else if(flag == -1 && $.isNull(value)){
				return true;
			}else{
				return regExp.test(value);
			}
		}else{
			return regExp.test(value);
		}
	}

    /**
     * @description 判断字符串中包含数据中的某元素，包含返回true
     * @author xiaolj
     * @date 2018.09.10
     * likeInArray(“确认，下达，计划”，【计划，下达，失效】) 可传递参数
     */
    $.likeInArray = function(str, arr){
        var strArr = str;
        if(Object.prototype.toString.call(str) === "[object String]"){
            strArr = str.toString().split(",");
        }
        var compareArr = $.grep(strArr, function(val, index){
            return $.inArray(val, arr) > -1;
        });
        return strArr.length == compareArr.length ? true : false;
    }

    /**
     * @description 判断字符串中包含数据中的某元素，不包含返回true
     * @author xiaolj
     * @date 2018.09.10
     * notInArray(“关闭, 确认，下达，计划”，【关闭】) 可传递参数
     * notInArray(“关闭, 关闭，关闭，计划”，【关闭，计划】) 可传递参数
     */
    $.notInArray = function(str, arr){
        var strArr = str;
        if(Object.prototype.toString.call(str) === "[object String]"){
            strArr = str.toString().split(",");
        }
        var compareArr = $.grep(strArr, function(val, index){
            return $.inArray(val, arr) < 0;
        });
        return $.isNotNull(compareArr) ? true : false;
    }

    /**
     * @description 比较两个数组的不同值并返回差异值数组
     * @param isMerge： 是否将两个差异值数组进行合并
     * @author xiaolj
     * @date 2018.09.10
     * arr1 = [1,2,3,4]
     * arr2 = [3,4,5]
     * result1 = [1,2] isMerge == false
     * result2 = [5]
     * result = merge(1,2,5)  isMerge == true
     */
    $.getCompareArray = function(arr1, arr2, isMerge){
        var compareArr1 = $.grep(arr1, function(val, index){
            return $.inArray(val, arr2) < 0;
        });
        if(isMerge){
            var compareArr2 = $.grep(arr2, function(val, index){
                return $.inArray(val, arr1) < 0;
            });

            if($.isNotNull((compareArr2))){
                compareArr1 = compareArr1.concat(compareArr2);
            }
        }
        return compareArr1;
    }

	//正则表达式验证:attr->(g,i,m)
	$.validRegExp = function(regExp, attr, str){
		if($.isNotNull(attr)){
		  return new RegExp(regExp, attr).test(str);
		}
		return new RegExp(regExp).test(str);
	}

	/**
	 * 将名称转为以下划线分割拼接字符串(将驼峰式命名转为下划线)--注意：此函数会截掉最后一个单词
	 * RedConfirmIndex => red_confirm_index
	 * blueSubmitValue => blue_submit_value
	 */
	$.ConvertToUnLine = function(str, rexExp){
		var findStr = str;
		if(rexExp){
			findStr = str.match(rexExp);
		}
		var replaceStr = findStr.toString().replace(/([A-Z])/g,"_$1").toLowerCase().toString();
		return replaceStr.match(/[a-z].*[_$]/g).toString().match(/[a-z].*[^_$]/g).toString();
	}

	/**
	 * 将名称转为以下划线分割拼接字符串(将驼峰式命名转为下划线)-注意：全匹配
	 * RedConfirmIndex => red_confirm_index
	 * blueSubmitValue => blue_submit_value
	 */
	$.ConvertToLine = function(str, rexExp){
		var findStr = str;
		if(rexExp){
			findStr = str.match(rexExp);
		}
		return findStr.toString().replace(/([A-Z])/g,"_$1").toLowerCase().toString();
	}

	/**
	 * 将下划线截取转变为驼峰式命名(将下划线名称转为驼峰式)
	 * red_confirm_index => redConfirmIndex
	 * blue_submit_value => blueSubmitValue
	 */
	$.ConvertToHump = function(str, rexExp){
		var findStr = str;
		if(rexExp){
			findStr = str.match(rexExp);
		}
		return findStr.toString().replace(/\_(\w)/g, function(all, letter, index, strtmp){
	        return letter.toUpperCase();
	    });
	}

	/**
	 * 格式化字符串{0}{1}...
	 */
	$.FormatString = function(str, formatArr){
		return str.toString().format(formatArr);
	}

	//渲染特殊字体:默认红色
	$.FormatFont = function(fontStr, color){
		if($.isNotNull(color)){
			return "<span style='color:"+color+";font-weight:bold'>"+fontStr+"</span>";
		}
		return "<span style='color:#FF0000'>"+fontStr+"</span>";
	}

    /**
     * 服务器请求地址上下文
     */
	$.ContextPath = function(){
		return APP_SERVER_URL;
	}

	/**
	 * 返回服务器URL地址
	 */
	$.ServerUrl = function(reqPath){
		return $.FormatString("{0}{1}", [APP_SERVER_URL, reqPath]);
	}

	/**
	 * 返回图片URL地址
	 */
	$.PicUrl = function(reqPath){
		return $.FormatString("{0}{1}", [APP_PIC_URL, reqPath]);
	}

	//验证字符串/对象是否为空
	$.isNull = function(obj){
		if(obj == "undefined"){
			return true;
		}

		if(typeof(obj) == "undefined" || obj == null || obj == "null" || obj.length < 1){
			return true;
		}
		return false;
	}

	//验证字符串/对象是否不为空
	$.isNotNull = function(obj){
		return $.isNull(obj) == false ? true : false;
	}

	/**
     * 解析JSON并显示弹出解析数据
     * funcName(a,b,c,d..) 可传递参数
     */
    $.responseCall = function(obj, funcName, jsonRow, flag){
    	$.parseJsonMsg(obj, funcName, jsonRow, flag);
    }
	$.parseJsonMsg = function(obj, funcName, jsonRow, flag){
		try {
			if($.isJson(obj) == false){
				obj = $.parseJSON(obj);
			}
			if(obj.code == "-1"){
				return $.msgBox("提示", obj.data);
			}else if(flag == true){
				$.alert("提示", obj.data);
			}
	    } catch (e) {
	        return $.msgBox("异常", obj);
	    }
	    //是否执行回调函数
		if(funcName){
			if(jsonRow){
				funcName(jsonRow);
			}else{
				funcName();
			}
		}
		return true;
	}

	/**
	 *判断是否为JSON对象
	 */
	$.isJson = function(data){
		if(typeof(data) == "object"
		    && Object.prototype.toString.call(data).toLowerCase() == "[object object]"
            && !data.length){
            return true;
        }
        return false;
	}

	/**
	 *目标字符串对象转为JSON对象
	 */
	$.toJson = function(jsonStr){
		return JSON.parse(jsonStr);
	}

	/**
	 *目标JSON对象转为String
	 */
	$.toStringify = function(jsonObj){
		return JSON.stringify(jsonObj);
	}


    /**
     * 打开窗口公用函数（可扩展）
     */
    $.openWin = function(pageName, pageUrl, params){
    	//../../main.html
    	var delay = 0;
		api.openWin({
			name : pageName,
			url : pageUrl,
			pageParam : params,
			delay : delay,
			bounces : false,
			slidBackEnabled : true,
			vScrollBarEnabled : false,
		    progress: {
		    	type: "default",  //加载进度效果类型，默认值为 default，取值范围为 default|page，default 等同于 showProgress 参数效果；为 page 时，进度效果为仿浏览器类型，固定在页面的顶部
			    title: "服务提示",   //type 为 default 时显示的加载框标题
			    text: "正在请求服务,请等待......", //type 为 default 时显示的加载框内容
			    color: "#FF0000" //type 为 page 时进度条的颜色，默认值为 #45C01A，支持#FFF，#FFFFFF，rgb(255,255,255)，rgba(255,255,255,1.0)等格式
		    }
		});
    }

    /**
     * 打开Frame公用函数（可扩展）
     */
    $.openFrame = function(pageName, pageUrl, params){
    	//../../main.html
    	var delay = 0;
		api.openFrame({
			name : pageName,
			url : pageUrl,
			pageParam : params,
			delay : delay,
			bounces : false,
			slidBackEnabled : true,
			vScrollBarEnabled : false,
		    progress: {
		    	type: "default",  //加载进度效果类型，默认值为 default，取值范围为 default|page，default 等同于 showProgress 参数效果；为 page 时，进度效果为仿浏览器类型，固定在页面的顶部
			    title: "服务提示",   //type 为 default 时显示的加载框标题
			    text: "正在请求服务,请等待......", //type 为 default 时显示的加载框内容
			    color: "#FFFFFF" //type 为 page 时进度条的颜色，默认值为 #45C01A，支持#FFF，#FFFFFF，rgb(255,255,255)，rgba(255,255,255,1.0)等格式
		    }
		});
    }

	//遍历输出信息（用于调试）
	$.print = function(title, obj){
	    console.warn("<<——————————————————————— " + title + " ———————————————————————>> 输出[start]\n");
		$.each(obj, function(c, v){
			console.log("————————————————>    {"+ c +" : "+ v +"}                   \n");
		});
		console.warn("<<——————————————————————— " + title + " ———————————————————————>> 输出[end]\n");
	}

	/**
	 * JS弹出信息,具有样式.
	 */
	$.msgBox = function(title, xdata){
	    //xdata = $.formatFont(xdata, xcolor);
	    return $.alert(title, xdata);
    }

	/**
     * JS弹出信息,默认样式.
     */
	$.alert = function(tiltle, msg){
		api.alert({
			title: tiltle,
			msg: msg,
			buttons: ['确定']
        },function(ret,err){
        	//coding...
        });
        return false;
	}

	/**
	 * 封装ajax请求
	 */
	$.request = function(options){
		api.ajax({
			url : $.ServerUrl(options.url),
			method : options.method || "POST", //默认POST方式请求
			data : {
				values : options.data || {}, //请求数据
				files : options.files || {}
			}
		}, function(obj, err) { //服务器响应结果
			if($.isNull(obj)){
				return $.alert($.FormatString("{0}：异常", options.title), $.toStringify(err.body));
			}else{
				options.success(obj, err);
			}
		});
	}

	/**
	 * 输出普通信息
	 */
	$.output = function(msg){
		console.log("输出日志：" + msg + "\n");
	}

	/**
	 * 万能调试输出工具：JS对象输出控制台.
	 * 输出HTML5默认绿色日志，程序向下执行
	 */
	$.plog = function(){
		console.log("<<——————————————————————— 调试日志 ———————————————————————>> 输出[start]\n");
		for(var i = 0; i < arguments.length; i++){
			console.log("————————————————>    {"+ arguments[i] +"}                   \n");
		}
		console.log("<<——————————————————————— 调试日志 ———————————————————————>> 输出[end]\n");
	}
	/**
	 * 输出HTML5错误红色日志，程序不会继续执行
	 */
	$.perror = function(){
		console.error("<<—————————————————————— 错误日志 ———————————————————————>> 输出[start]\n");
		for(var i = 0; i < arguments.length; i++){
			console.error("————————————————>    {"+ arguments[i] +"}                   \n");
		}
		console.warn("<<——————————————————————— 错误日志 ———————————————————————>> 输出[end]\n");
	   return false;
	}
	/**
	 * 输出HTML5警告黄色日志，程序继续执行
	 */
	$.pwarn = function(){
	   	console.warn("<<——————————————————————— 警告日志 ———————————————————————>> 输出[start]\n");
		for(var i = 0; i < arguments.length; i++){
			console.warn("————————————————>    {"+ arguments[i] +"}                   \n");
		}
		console.warn("<<——————————————————————— 警告日志 ———————————————————————>> 输出[end]\n");
	   return false;
	}

	//Map 转为 JSON
	$.mapToArrayJson = function(map) {
	    return JSON.stringify([...map]);
	}

	//JSON 转为 Map
	$.jsonToMap = function(jsonStr) {
	    return new Map(JSON.parse(jsonStr));
	}

	//获取当前时间，格式YYYY-MM-DD
    $.getNowFormatDate =  function(sep) {
        var date = new Date();
        var seperator1 = "-";
        if($.isNotNull(sep)){
        	seperator1 = sep;
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

	/**
	 * 文字、图片等闪烁效果（默认黑+红色闪烁）
	 * @param {Object} id DOM节点ID
	 * @param {Object} colorArr 闪烁颜色值数组
	 */
	$.FlickerEffect = function(id, colorArr){
        var colors = colorArr || ["#000000", "#FF0000"];
        document.getElementById(id).style.color = colors[parseInt(Math.random() * colors.length)];
	}

})(window);
