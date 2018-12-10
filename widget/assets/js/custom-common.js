
/**
 * 扩展字符串对象：
 * 1.格式化字符串
 * 2.字符串追加-待完善
 
function StringBuffer(){
	this._strings_ = new Array();
}

StringBuffer.prototype.append = function(str){
	this._strings_.push(str);
}


StringBuffer.prototype.toString = function(str){
	return this._strings_.join("");
}
*/
/**
 * @descript 通用JS工具类封装
 * @author xiaolj
 * @date 2017年11月03日
 * @copyright xiaolj@amait.cc
 */
/**
 * 自定义函数，封装共通函数，初始化值等
 * 封装常用的表格数据获取以及控件初始化，值验证等
 */
(function($) {
	
	//通用键值配置项
	var initSelectName = "请选择...";
	var initUploadMsg = "文件正在上传中，请稍后...";
	var initUpLoadErrorMsg = "文件上传失败...";
	var fileRepeatMsg = "文件已存在...";
	
	$.initSelectName = function(){ return initSelectName; }
	$.initUploadMsg = function(){ return initUploadMsg; }
	$.initUpLoadErrorMsg = function(){ return initUpLoadErrorMsg; }
	$.fileRepeatMsg = function(){ return fileRepeatMsg; }

	/**
     * 数组元素array.remove()元素移除增强函数，根据指定元素值删除
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
     * 类似java中String.fromat()增强函数，扩展格式化字符串
     */
    String.prototype.format = function(){
	    if(arguments.length == 0) return this;
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
	
	/*  存在BUG - 不支持数组正则替换 (${0},${1},[0,1])
	    String.prototype.format = function(args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if(args[key] != undefined){
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg= new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    }
	*/

    /**
     * 扩展Date.Format()增强函数，日期格式化(BUG)
     * 用法：
     * var time1 = new Date().format("yyyy-MM-dd HH:mm:ss"); 
     * var time1 = new Date().format("yyyy-MM-dd"); 
     */
    /**
    Date.prototype.Format = function(fstr) {
    	if(obj == "undefined" || typeof(obj) == "undefined" || fstr == null){
    		fstr = "yyyy-MM-dd";
		}
	    var o = {   
	        "M+" : this.getMonth()+1,                 //月份   
		    "d+" : this.getDate(),                    //日   
		    "h+" : this.getHours(),                   //小时   
		    "m+" : this.getMinutes(),                 //分   
		    "s+" : this.getSeconds(),                 //秒   
		    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
		    "S"  : this.getMilliseconds()             //毫秒   
	   };
	   if(/(y+)/.test(fstr)){
		    fstr = fstr.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	   }
		    
  		for(var k in o){
  			if(new RegExp("("+ k +")").test(fstr)){
  				fstr = fstr.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  			}
  		}
	   return fstr;   
    }  
    */
    
    /**
     * 扩展Date.Pattern()增强函数，日期格式化成字符串
     * 用法：
     * var time1 = new Date().Pattern("yyyy-MM-dd HH:mm:ss"); 
     * var time1 = new Date().Pattern("yyyy-MM-dd"); 
     */
    Date.prototype.Pattern=function(fmt) {         
        var o = {         
        "M+" : this.getMonth()+1, //月份         
        "d+" : this.getDate(), //日         
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
        "H+" : this.getHours(), //小时         
        "m+" : this.getMinutes(), //分         
        "s+" : this.getSeconds(), //秒         
        "q+" : Math.floor((this.getMonth()+3)/3), //季度         
        "S" : this.getMilliseconds() //毫秒         
        };         
        var week = {         
        "0" : "/u65e5",         
        "1" : "/u4e00",         
        "2" : "/u4e8c",         
        "3" : "/u4e09",         
        "4" : "/u56db",         
        "5" : "/u4e94",         
        "6" : "/u516d"        
        };         
        if(/(y+)/.test(fmt)){         
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
        }         
        if(/(E+)/.test(fmt)){         
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
        }         
        for(var k in o){         
            if(new RegExp("("+ k +")").test(fmt)){         
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
            }         
        }         
        return fmt;         
    } 
    
	
	//日期格式yyyy/mm/dd,
    //sign标记是否直接返回拆分的前半部分年月日
    $.ymd = function(time, sign) {
        if($.isNotNull(time)){
            if(typeof(time) == 'string'){
                var ntime = time.split(' ')[0];
                
                if(sign == 1){
                    return ntime;
                }
                
                //防止格式类型错误导致返回undefined
                if(typeof(ntime) == 'undefined' || ntime.indexOf("-") < 0){
                    return ntime;
                }
                var nDate = ntime.split('-');
                var year = nDate[0];
                var mouth = nDate[1];
                var day = nDate[2];
                return year +"/" +mouth+"/"+day;
            }
            else if(typeof(time) == 'number'){
                var rDate = new Date();
                rDate.setTime(time);
                var month = rDate.getMonth()+1 < 10 ? "0"+(rDate.getMonth()+1) : rDate.getMonth()+1;
                var day = rDate.getDate() < 10 ? "0"+rDate.getDate() : rDate.getDate();
                return rDate.getFullYear() +"/" +month+"/"+day;
            }else{
                return "";
            }
        }
        return "";
    }


	//时间格式化:yyyy/mm/dd hh:mm:ss
	$.ymdhms = function(time, sign, flag){
		
		if($.isNotNull(time)){
			if(typeof(time) == 'number'){
				var rDate = new Date();
				rDate.setTime(time);
				var year = rDate.getFullYear();
				var month = rDate.getMonth()+1 < 10 ? "0"+(rDate.getMonth()+1) : rDate.getMonth()+1;
				var day = rDate.getDate() < 10 ? "0"+rDate.getDate() : rDate.getDate();
				var hours = rDate.getHours() < 10 ? "0"+rDate.getHours() : rDate.getHours();
				var mint = rDate.getMinutes() < 10 ? "0"+rDate.getMinutes() : rDate.getMinutes();
				var mills = rDate.getSeconds() < 10 ? "0"+rDate.getSeconds() : rDate.getSeconds();
				if($.isNotNull(sign) && sign != "1"){
			    	return year + sign +month+ sign +day + " " + hours+":"+mint+":"+mills;
			    }
			    return year +"/" +month+"/"+day + " " + hours+":"+mint+":"+mills;
			}else if(typeof(time) == 'string'){
                if(time.length > 19){
                    return time.substring(0,19);
                }
                var ntime = time.split(' ')[0];
                var nDate = ntime.split('-');//格式规则
                var year = nDate[0];
                var mouth = nDate[1];
                var day = nDate[2];
                if($.isNotNull(sign)){
                    return year + sign + mouth + sign + day;
                }
                return year +"/" +mouth+"/"+day;
            }else {
				return "";
			}
		}else if($.isNull(flag)){
		    var rDate = new Date();
            var year = rDate.getFullYear();
            var month = rDate.getMonth()+1 < 10 ? "0"+(rDate.getMonth()+1) : rDate.getMonth()+1;
            var day = rDate.getDate() < 10 ? "0"+rDate.getDate() : rDate.getDate();
            var hours = rDate.getHours() < 10 ? "0"+rDate.getHours() : rDate.getHours();
            var mint = rDate.getMinutes() < 10 ? "0"+rDate.getMinutes() : rDate.getMinutes();
            var mills = rDate.getSeconds() < 10 ? "0"+rDate.getSeconds() : rDate.getSeconds();
            if($.isNotNull(sign)){
                return year + sign + month + sign + day + " " + hours + ":" + mint + ":" + mills;
            }
            return year +"/" +month +"/"+day + " " + hours + ":" + mint + ":"+ mills;
		}
		return "";
	}
	
	
	$.getCurrtTime = function(sign){
		var rDate = new Date();
		var year = rDate.getFullYear();
		var month = rDate.getMonth()+1 < 10 ? "0"+(rDate.getMonth()+1) : rDate.getMonth()+1;
		var day = rDate.getDate() < 10 ? "0"+rDate.getDate() : rDate.getDate();
		var hours = rDate.getHours() < 10 ? "0"+rDate.getHours() : rDate.getHours();
		var mint = rDate.getMinutes() < 10 ? "0"+rDate.getMinutes() : rDate.getMinutes();
		var mills = rDate.getSeconds() < 10 ? "0"+rDate.getSeconds() : rDate.getSeconds();
		if(sign && sign.length > 0){
	    	return year + sign +month+ sign +day + " " + hours+":"+mint;
	    }
	    return year +"/" +month+"/"+day + " " + hours+":"+mint+":"+mills;
    }
	
    
	//获取指定日期分隔符[sign]的字符串
    $.getFormatDate = function(reg, day){
    	var rDate = new Date();
    	rDate.setTime(rDate.getTime()+(day*24*60*60*1000));
    	var month = rDate.getMonth()+1 < 10 ? "0"+(rDate.getMonth()+1) : rDate.getMonth()+1;
		var day = rDate.getDate() < 10 ? "0"+rDate.getDate() : rDate.getDate();
	    return (rDate.getFullYear() + reg + month + reg + day).toString();
    }
	
	//初始化日期控件值：当前日期
	$.convertDateAndAssign = function(ids, reg, sign, dayNum){
		if($.isNull(dayNum)){
			dayNum = 0;
		}
		var rDate = $.getFormatDate(reg,dayNum);
	    $.convertDate(ids, sign);
		for(var i = 0; i < ids.length; i++){
			ids[i].val(rDate);
		}
	}
	
	//初始化日期控件值：按照指定日期当天前后进行初始化
	$.convertDateAndAssignForDay = function(firstDateId, lastDateId, reg, sign, firstDay, afterDay){
		var startDate = new Date();
		var endDate = new Date();
		if($.isNull(firstDay) == false){
			startDate.setTime(startDate.getTime() + (firstDay*24*60*60*1000));
		}
		if($.isNull(afterDay) == false){
			endDate.setTime(endDate.getTime() + (afterDay*24*60*60*1000));
		}
		
		$.formatDate(firstDateId, startDate, reg, sign);
		$.formatDate(lastDateId, endDate, reg, sign);
		
	}
	
	//日期格式化
	$.formatDate = function(id, date, reg, sign){
		var month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
		var day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
	    $("#"+id).datepicker({ dateFormat : sign });
	    $("#"+id).val(date.getFullYear() + reg + month + reg + day);
	}
	
	
	//初始化日期控件值：按照指定日期周期:7
	$.convertDateForDay = function(startDateId, endDateId, reg, sign, dayNum){
		var startDate = new Date();
		var endDate = new Date();
		var month = endDate.getMonth()+1 < 10 ? "0"+(endDate.getMonth()+1) : endDate.getMonth()+1;
		var day = endDate.getDate() < 10 ? "0"+endDate.getDate() : endDate.getDate();
	    endDate = endDate.getFullYear() + reg + month + reg + day;
	    $("#"+endDateId).val(endDate);
	    //计算指定前后日期
	    if($.isNull(dayNum)){
	    	$("#"+startDateId).val(endDate);	
	    }else{
	    	var time = startDate.getTime() + (dayNum*24*60*60*1000);
	    	startDate.setTime(time);
	    	month = startDate.getMonth()+1 < 10 ? "0"+(startDate.getMonth()+1) : startDate.getMonth()+1;
	    	day = startDate.getDate() < 10 ? "0"+startDate.getDate() : startDate.getDate();
	    	startDate = startDate.getFullYear() + reg + month + reg + day;
	    	$("#"+startDateId).val(startDate);
	    }
	    
	    $("#"+startDateId).datepicker({ dateFormat : sign });
	    $("#"+endDateId).datepicker({ dateFormat : sign });
	}

	//初始化日期控件样式
	$.formatDate = function(ids, format){
		$.each(ids, function(index, cid){
			$("#"+cid).datepicker({ dateFormat : format });
		});
	}
	
	
	//文本框日期初始化格式化
	$.convertDate = function(ids, sign){
		for(var i = 0; i < ids.length; i++){
			var date = ids[i].val();
			if($.isNull(date)){
				ids[i].val("");
			}else{
				ids[i].val($.ymd(date));
			}
			
			//日期格式化
			if(sign && sign.indexOf("yy-mm-dd") > -1){
				ids[i].datepicker({ dateFormat : sign });
			}else{
				ids[i].datepicker({ dateFormat : 'yy/mm/dd' });
			}
		}
	}

	//日期控件封装
	$.initDatePicker = function(dateArr, callBack, minMaxArr){
		$.each(dateArr, function(index, dateObj){
			$("#"+dateObj).datepicker({
		        dateFormat : 'yy-mm-dd',
		        changeMonth : true,
				constrainInput : true,
		        minDate : minMaxArr[0],
		        maxDate : minMaxArr[1],
		        onClose : function(dateText){
		        	if(callBack) callBack();
		        }
		    });
		    $("#"+dateObj).datepicker('setDate', new Date());
		});
	}
	
	//自定义日期格式及初始化
    $.customDatePicker = function(dateArr, minMaxArr, dataFormat, flag){
        $.each(dateArr, function(index, dateObj){
            $("#"+dateObj).datepicker({
                dateFormat : dataFormat,
                changeMonth : true,
                constrainInput : true,
                minDate : minMaxArr[0],
                maxDate : minMaxArr[1],
                onClose : function(dateText){
                    if(callBack) callBack();
                }
            });
            if(flag == true){
                $("#"+dateObj).datepicker('setDate', new Date());
            }
        });
    }
    
    //自定义日期格式及初始化[时分秒]
    $.customDateTimePicker = function(dateArr, flag){
        $.each(dateArr, function(index, dateObj){
            $("#"+dateObj).datetimepicker({
                showSecond: true, //显示秒
                timeFormat: 'hh:mm:ss',//格式化时间
                stepHour: 1,//设置步长
                stepMinute: 1,
                stepSecond: 1
            });
            if(flag == true){
                $("#"+dateObj).datepicker('setDate', new Date());
            }
        });
    }
    
    

	
	
	//金额转换：1E.5转为可识别的100000000值
	$.convertFloat = function(){
		for(var i = 0; i < arguments.length; i++){
			var amount = arguments[i].val();
			if(typeof(amount) == 'undefined' || amount.length < 1){
				arguments[i].val("");
			}else{
				arguments[i].val(parseFloat(amount));
			}
		}
	}
	
	//列格式化转换
	$.convertValue = function(val, oth, returnVal1, returnVal2){
		if(val == null || val == "" || val.length < 1){
			return "";
		}else{
			return val == oth ? returnVal1 : returnVal2;
		}
	}
	
	//选中与未选中背景色变化事件
	$.convertColor = function (gid, cellValue, actualValue,rowIds, status){
		for(var i = 0; i < rowIds.length; i++){
			var startTime = $("#"+gid).getCell(rowIds[i], cellValue);
			var actualTime = $("#"+gid).getCell(rowIds[i], actualValue);
			var stime = new Date().getTime();
            var ltime = new Date();
            ltime.setMonth(ltime.getMonth()-1);
            ltime = ltime.getTime();
            var flag = true;//初始颜色
            
            //选中颜色都一样：蓝色背景
            if(status){
            	$($("#"+ gid +" tr[id='" + rowIds[i] + "']")).css("background", "#69C3DE");
            }else if((actualTime && actualTime.length > 1) || (startTime && startTime.length < 1)){
            	$($("#"+ gid +" tr[id='" + rowIds[i] + "']")).css("background", "");
            }else{
            	var etime = new Date($.ymd(startTime)).getTime();
            	if(etime > stime){
            		$($("#"+ gid +" tr[id='" + rowIds[i] + "']")).css("background", $("#"+gid).getGridParam("redColorRow"));
            	}else if(etime > ltime && etime < stime){
            		$($("#"+ gid +" tr[id='" + rowIds[i] + "']")).css("background", $("#"+gid).getGridParam("yellowColorRow"));
            	}else{
            		$($("#"+ gid +" tr[id='" + rowIds[i] + "']")).css("background", "");
            	}
			}
		}
	}
	
	//下拉框change事件赋值
	$.setComboName = function(valId, nameId, obj){
		obj = typeof(obj) == "undefined" ? "" : obj;
		var value = $("#"+obj+valId+" option:selected").val();
		var name = $("#"+obj+valId+" option:selected").text();
		$("#"+obj+nameId).val(value.length > 0 ? name : "");
	}
	
	//下拉框初始化选中(可根据value或text值进行选中)
	$.initComboxSelected = function(comboJsonArray){
		$.each(comboJsonArray, function(index, comboArry){
			if ($.isNotNull(comboArry.value)) {
				//如果ld.length > 1，表示给第二个id对应的控件赋值(隐藏值)
				if(Object.prototype.toString.call(comboArry.id) === '[object Array]' && comboArry.id.length > 0){
					$("#"+comboArry.id[0] +" option:contains('"+comboArry.value+"')").attr("selected", true);//根据text-name选中下拉框方式
				}else{
					$("#"+comboArry.id).find("option[value="+comboArry.value+"]").attr("selected", true);//根据value选中下拉框方式
				}
			}
		});
	}
	
	//去掉IE浏览器返回Json字符串附带的<PRE>标签
	$.removePre = function(preJson){
		if(preJson.indexOf("<PRE>") != -1 && preJson.indexOf("</PRE>") != -1){
			return preJson.substring(5,preJson.length-6);
		}else{
			return preJson;
		}
	}
	
	//获取jqGrid的某一行：针对复选框只选择一行并且有特殊背景色的行记录
	$.getGridRow = function(grid, rowId, flag, cellValue, actualValue){
		//获取已经选中的行[多行]
		var ids = $("#"+grid).jqGrid("getGridParam","selarrrow");
		if(flag && flag == 1 && ids.length > 0){
			//有特殊行背景色
			for(var i = 0; i < ids.length; i++ ){
				$.convertColor(grid, cellValue, actualValue, ids[i], false);//取消掉之前选中的行,背景色未改变因为被其他行点击事件覆盖了
			}
		}
		
		$("#"+grid).jqGrid("resetSelection");//取消掉之前选中复选框
		
		$("#"+grid).jqGrid('setSelection', rowId);//再设置选中指定行
		
		var row = $("#"+grid).jqGrid("getGridParam", "selarrrow");
		
		return $("#"+grid).jqGrid("getRowData", row[0]);
	}
	
	//获取jqGrid单行对象或单元格值(非复选框表格)：行对象，单元格值
	$.getGridSingleRow = function(grid, column, flag){
		var id = $("#"+grid).jqGrid('getGridParam','selrow');
		if($.isNull(id)){
			if(flag){
				$.alert("请选择[1]行记录");
			}
			return null;
		}
		if($.isNull(column)){
			return $("#"+grid).jqGrid("getRowData",id);
		}else{
			return $("#"+grid).getCell(id, column);
		}
	}
	
	
	//获取jqGrid的选中的多行记录
	$.getGridRowData = function(grid){
		return $("#"+grid).jqGrid("getGridParam", "selarrrow");
	}
	
	
	/**----------------------------------
	/ 获取【jqGrid】的选中的一行多行(非ID)对象
	/----------------------------------**/
	$.getGridRowObject = function(grid, id, flag){
		/*******[获取jqGrid表格单行记录]********/
		if($.isNotNull(id)){
			$("#"+grid).jqGrid("resetSelection");
			$("#"+grid).jqGrid('setSelection', id);
			return $("#"+grid).jqGrid("getRowData", id);
		}else{
			/*******[获取jqGrid表格多行记录]********/
			var ids = $("#"+grid).jqGrid("getGridParam", "selarrrow");	
			if(ids == null || ids.length < 1){
				$.alert("请至少选择[1]行记录！");
				return null;
			}else if($.isNotNull(flag) && flag == 1 && ids.length > 1){
				$.alert("请选择[1]行记录！");
				return null;
			}
			var rowObjectArr = new Array();
			$.each(ids, function(index, rid){
				rowObjectArr.push($("#"+grid).jqGrid("getRowData", rid));
			});
			return rowObjectArr;
		}
	}

	/**----------------------------------
	/ 获取【Table】的选中的一行(非ID)对象
	/----------------------------------**/
	$.getTableRowObject = function(table, t_this){
		var id = $(t_this).attr("id");
		if($.isNotNull(id)){
			var jsonRow = $("#"+table).jqGrid("getRowData", id);
			jsonRow.rowIndex = id;
			return jsonRow;
		}else{
			$.alert("获取Tbale行对象失败");
		}
	}

	
	//根据行ID获取jqGrid的单行记录
	$.getGridRowByRowId = function(grid, rowId){
		return $("#"+grid).jqGrid("getRowData", rowId);
	}

	//获取列表行指定的单元格值数据
	$.getCellValue = function(gridId, cellName, flag){
		var rowIds = $("#" + gridId).jqGrid("getGridParam", "selarrrow");
		if(rowIds.length == 0 || (rowIds.length > 1 && flag == 1)){
			$.dialog.prompt({"title":"提示","message":"请选择[{0}]条记录！".format(flag)});
			return null;
		}else if(flag > 1 && rowIds.length < flag){
			$.dialog.prompt({"title":"提示","message":"请至少选择[{0}]条记录！".format(flag)});
			return null;
		}else{
			var cellArray = new Array();
			$.each(rowIds, function(index, id){
				cellArray.push($("#"+gridId).getCell(id, cellName));
			});
			return cellArray;
		}
	}
	
	//根据行获取指定【列的值】数组
	$.getGridCellArray = function(grid, cellName, typeFlag){
		var selIds = $("#"+grid).jqGrid("getGridParam", "selarrrow");
		if($.isNull(selIds)){
			return null;
		}
		//根据单元格列返回对应列值数组
		var arry = new Array();
		$.each(selIds, function(index, id){
			if($.isNotNull(typeFlag) &&  typeFlag == "str"){
			     arry.push("'"+$("#"+grid).getCell(id, cellName)+"'")
			}else{
    			 arry.push($("#"+grid).getCell(id, cellName));
			}
		});
		return arry;
	}

	//支持大数据量：https://www.cnblogs.com/pw33/p/3897865.html
	//暂不知大数据量：http://blog.csdn.net/xuf741477340/article/details/52209852
	//【通用-纵向】合并jqGrid单元格
	$.verticalMergeCell = function(gridName, cellNames) { 
	    var rowArr = $("#" + gridName).getDataIDs();  
	    var length = rowArr.length;  
	    var rowSpanCount = 1;  
	    $(cellNames).each(function(index, cellName){
	    	for (var i = 0; i < length; i += rowSpanCount) {  
		        var before = $("#" + gridName).jqGrid('getRowData', rowArr[i]);  
		        rowSpanCount = 1;  
		        for (j = i + 1; j <= length; j++) {  
		        	//纵向信息对比 如果值一样就合并行数+1 然后设置rowspan让当前单元格隐藏  
		            var end = $("#" + gridName).jqGrid('getRowData', rowArr[j]);  
		            if (before[cellName] == end[cellName]) {  
		                rowSpanCount++;  
		                $("#" + gridName).setCell(rowArr[j], cellName, '', { display: 'none' });  
		            } else {  
		                break;  
		            }  
		        }  
		        $("#"+gridName).setCell(rowArr[i], cellName, '', '', { rowspan: rowSpanCount });  
		    }  
	    });
	}  
	//【通用-横向】合并jqGrid单元格
	$.transverseMergeCell = function(gridName, cellNames) {  
	    var rowArr = $("#" + gridName).getDataIDs();  
	    var length = rowArr.length;  
	    var colSpanCount = 1;  
	    $(cellNames).each(function(index, cellName){
	    	for (var i = 0; i < length; i += colSpanCount) {  
		        var before = $("#"+ gridName).jqGrid('getRowData', rowArr[i]);  
		        colSpanCount = 1;  
		        for (j = i + 1; j <= length; j++) {  
		            //横向信息对比 如果值一样就合并行数+1 然后设置colspan让当前单元格隐藏  
		            var end = $("#" + gridName).jqGrid('getRowData', rowArr[j]);  
		            if (before[cellName] == end[cellName]) {  
		                colSpanCount++;  
		                $("#" + gridName).setCell(rowArr[j], cellName, '', { display: 'none' });  
		            } else {  
		                break;  
		            }  
		        }  
		        $("#"+gridName).setCell(rowArr[i], cellName, '', '', { colspan: colSpanCount });  
		    }  
	    });
	}
	
	//格式化字符串，拼接字符串符号
	$.formatString = function(values){
		var arry = new Array();
		if(values instanceof Array) {
			$.each(values, function(index, value){
				arry.push("'"+value+"'");
			});
		}else{
			arry.push("'"+values+"'");
		}
		return arry.join(",");
	}
	
	//表格加载时列转换：仅适用是与否
	$.convertSignValue = function(cellvalue){
		return cellvalue == 1 ? "是" : "否";
	}
	
	//表格加载时值转换，所有类型
	//cellArry：["1:新建","3：下达","5:关闭","其他"]
    $.convertCellValue = function(p_val, cellArry){
    	if($.isNull(cellArry)){
    	   return "";
    	}
    	var t_cellVal = null;
    	var returnValue = p_val;
    	$.each(cellArry, function(index, c_val){
    		t_cellVal = c_val.split(":");
    		if(t_cellVal.length > 1 && p_val == t_cellVal[0]){
	    		returnValue = t_cellVal[1];
    			return false;
    		}
        });
        return $.isNull(returnValue)==true ? "" : returnValue;
    }
	
	//查询条件正则验证以及特殊字符过滤，防止查询条件拼接SQL错误
	$.format.SearchInput = function(jsonObj){
		var newJson = {};
		var regExp = new RegExp(/'/ig);
		for(var key in jsonObj){
			if(regExp.test(jsonObj[key])){
				newJson[key] = jsonObj[key].replace(regExp, "");//去掉查询条件中含有单引号的字符	
			}else{
				newJson[key] = jsonObj[key];
			}
		}
		return newJson;
	} 
	
	//渲染特殊字体:默认红色
	$.formatFont = function(fontStr, color){
		if($.isNotNull(color)){
			return "<span style='color:"+color+";font-weight:bold'>"+fontStr+"</span>";
		}
		return "<span style='color:#FF0000'>"+fontStr+"</span>";
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
     * Spring:jsp标签操作功能权限对象
     */
    $.renderSecurityAuth = function(securityAuthOperate){
        var opertHtml = "'<security:authorize ifAllGranted='{0}'>{1}</security:authorize>'";
        return opertHtml.format(securityAuthOperate.authUrl, securityAuthOperate.operFunc)
    }
	
	//渲染列表中的特殊操作：选择超链接
	$.renderHref = function(hrefName, funcName, paramArr){
		for(var i = 0; i < paramArr.length; i++){
			if(typeof(paramArr[i]) == "string"){
				paramArr[i] = "\'" + paramArr[i] + "\'";
			}
		}
		funcName = funcName.format(paramArr);
		return "<a id='dlf' href=\"#\" onclick=\""+ funcName +")\">"+hrefName+"</a>";
	}

	//渲染列表中的特殊操作：按钮操作
	$.renderButton = function(btnName, funcName, paramArr, width){
		for(var i = 0; i < paramArr.length; i++){
			if(typeof(paramArr[i]) == "string"){
				paramArr[i] = "\'" + paramArr[i] + "\'";
			}
		}
		if($.isNull(width)){
			width="50";
		}
		funcName = funcName.format(paramArr);
		return "<input type='button' value="+(btnName.replace(/\s/g,'&nbsp;'))+" class='angma-button' style='font-weight:bold;width:"+width+"px' onclick=\""+ funcName +"\"/>";
	}

	//渲染列表中的特殊操作：复选框(funcname, val, ["F:否","Y:是"])
	$.renderCheck = function(funcName, val, params, checkFlag){
		var inputCheckType = "{0}&nbsp;<input type='checkbox' {1} onclick=\""+funcName+"\"/>";
	    var checkArr = [params[0].split(":"), params[1].split(":")];
	    var checked = "";
		if(val == checkArr[1][0]){
			checked = "checked='true'";
			checkName = checkArr[1][1];
		}else{
			checkName = checkArr[0][1];
		}
	    return inputCheckType.format(checkName, checked);
	}
	
	//渲染指定单元格颜色样式
	$.renderRowOrCell = function(grid, color, params){
		var tdArr = $($("#"+grid).find("tr")[params[0]]).children();
		$.each(params, function(index, col){
			if(index > 0){
				$(tdArr[col]).css("color", color);
			}
		})
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
            json[this.name]=this.value;  
        });
        return json;
	}
	
	//正则表达式验证:attr->(g,i,m)
	$.validRegExp = function(regExp, attr, str){
		if($.isNotNull(attr)){
		  return new RegExp(regExp, attr).test(str);
		}
		return new RegExp(regExp).test(str);
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

	///是否为日期格式：2017-01-01，2017/01/01
	$.isDate = function(date, sign){
	    if(date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/) != null){
        	return true;
    	}
    	return false;
	    /*
	    if($.isNotNull(date) && $.isNotNull(sign)){
		    if(date.match(/^(\d{1,4})(sign)(\d{1,2})\2(\d{1,2})$/) != null){
			    return true;
		    }else{
			    return false;
		    }
	    }
	    
	    if(new Date(date) == "Invalid Date" || new Date(date) == "NaN"){
		    return false;
	    }
	    return true;
	    */
	}
	
	
	/**
	 * @param printUser 打印人
	 * @param dataArr  打印数据
	 * @param printNum 单张打印个数
	 * @param printSize 纸张尺寸
	 *        等于4表示A4纸，等于2表示A5纸
	 *        A4纸为4行2列纵向，A5纸为2行2列横向（行变列不变）
	 * @param printDivObj 封装打印数据模型
	 */
	$.printPickModel = function(printUser, dataArr, printNum, printSize, printDiv, nsId){
        if($.isNull(dataArr)){
           return;
        }
        //页码计算方式：根据打印纸张不同计算每页显示模板条码个数
        var page = Math.ceil((dataArr.length) / printNum);
        var indexId = -1;
        
        //获取打印数据模型
        for(var k = 1; k < page + 1; k++){
            printDiv.append($.getPickPrintTable(indexId, printSize, nsId));
            indexId += printNum;
        }
        
        //填充发运单模板条码数据
        for(var b = 0; b < dataArr.length; b++){
             $("#"+nsId+"module_"+b).append(
                "<table border='1px' style='cellpadding:0px;border-collapse:collapse;background-color: #FFFFFF;width:345px'> " +
                    "<tr style='align:center;height:50px;'>"+
                        "<td style='text-align:center;font-size:15pt;font-family:黑体;font-weight:bold' colspan='2'>发运单模板条码</td>" +
                    "</tr>" +
                    "<tr style='align:center;height:30px;'>"+
                        "<td style='font-size:5pt;' >&nbsp;发运库房："+dataArr[b].fromInveName+"</td>"+
                        "<td style='font-size:5pt;width:100px;text-align:center;'>发运方式："+dataArr[b].pickMode+"</td>"+
                    "</tr>" +
                    "<tr style='align:center;height:30px;'>"+
                        "<td style='font-size:5pt;' colspan='2'>&nbsp;发运备注："+dataArr[b].remark+"</td>"+
                    "</tr>" +
                    "<tr style='height:90px;'>"+
                        "<td align='center' valign='middle' colspan='2'><div id="+nsId+"barCode_"+b+"></div></td>"+
                    "</tr>" +
                    "<tr style='align:center;height:30px;'>"+
                        "<td style='font-size:5pt;' colspan='2'>"+
                              "&nbsp;打印者：" + printUser + "&nbsp;打印日期：" + $.getCurrtTime(null).substring(0,11) + " 【重庆昂码信息制】" + 
                        "</td>"+
                    "</tr>" +
                "</table>");
            $("#"+nsId+"barCode_"+b).empty().barcode(dataArr[b].pickCommandNum, "code128",{barWidth:1, barHeight:50,fontSize:20});
        }
        //执行打印操作
        printDiv.jqprint();
	}
	
	
	//根据ID索引自动标记唯一ID值,printSize打印纸尺寸,返回打印模型（默认A4纸打印）
    /**
     * indexId：当前<td>ID索引位置
     * printSize 等于4表示A4纸，等于2表示A5纸
     * printSize：A4纸为4行2列纵向，A5纸为2行2列横向（行变列不变）
     */
	$.getPickPrintTable = function(indexId, printSize, nsId){
		var printHtmlModule = 
           "<div style='page-break-after:always;' >" +
              "<table border='0px' style='border-collapse:collapse;width:720px;'></table>" +
           "</div>";
    
       //根据打印选择的纸张自动调整打印格式
       printHtmlModule = $(printHtmlModule);
       for(var i = 0; i < printSize; i++){ //默认A4纸打印
           if(i==0){
               $(printHtmlModule.find('table')[0]).append(
                  "<tr style='text-align:center;'>" +
                    "<td valign='top' style='text-align:center;' id ="+nsId+"module_"+(indexId+=1)+"></td>" +
                    "<td valign='top' align='right' style='width:350px' id ="+nsId+"module_"+(indexId+=1)+"></td>" +
                  "</tr>");
           }else{
               $(printHtmlModule.find('table')[0]).append(
                  "<tr style='text-align:center;height:262px'>" +
                    "<td valign='bottom' style='text-align:center;width:350px' id ="+nsId+"module_"+(indexId+=1)+"></td>" +
                    "<td valign='bottom' align='right' style='width:350px' id ="+nsId+"module_"+(indexId+=1)+"></td>" +
                  "</tr>");
           }
       }
       return printHtmlModule;
	}

	/**
	 * 简化回车查询语法
	 */
	$.initEnterSearch = function(objElement){
		$(".angma-table-edit").bind("keyup", function(event) {
			if (event.keyCode == "13") {
	 			if(typeof(objElement) == "function"){
		 			objElement();
	 			}else if(typeof(objElement) == "string"){
		 			$("#"+objElement).click();
	 			}else{
		 			$.alert("{0} is undefined".format(objElement));
	 			}
 			}
    	});
	}
	
	/**
	 * 增强绑定指定表单内的{控件元素change,keyup事件}实现自动查询功能
	 */
	$.bindingSearchEvent = function(elements, eventFunc){
        elements.children().each(function(index, element){
           if(element.tagName.toLowerCase().equals("label") == false){
                if(element.className.toLowerCase().indexOf("datepicker") > -1 
                        || ("select").equals(element.tagName.toLowerCase())
                        || ("radio_checkbox").indexOf(element.type) > -1){
                    $(element).change(function(event) { $.covertFunc(eventFunc); });
                }else if(element.className.equals("angma-text")){
                    $(element).keyup(function(event){ 
                        if (event.keyCode == "13") {
                            $.covertFunc(eventFunc);
                        }
                    });
                }else{
                    alert(("浏览器类型：[{0}，{1}]").format(element.type, navigator.userAgent));
                }
                //$.plog("[调试:"+ index +"]", element.type, element);
            }
        });
	}
	
	/**
	 * 将传入对象转换为函数并返回回调函数
	 */
	$.covertFunc = function(eventFunc){
	   if(typeof(eventFunc) == "function"){
           return eventFunc();
        }else if(typeof(eventFunc) == "string"){
            return $("#"+eventFunc).click();
        }else{
            $.alert("{0} is undefined".format(eventFunc));
        }
	}
	
	/**
	 * 简化jqGrid查询语法
	 */
	$.searchGrid = function(jsonParams, gridId){
		$("#"+gridId).jqGrid("setGridParam", {
				datatype : 'json',
				postData : jsonParams,
				pape : 1
		}).trigger("reloadGrid");
	}

	/**
	 * 简化jqGrid重新加载语法
	 */
	$.reloadGrid = function(gridId){
		$("#"+gridId).jqGrid().trigger("reloadGrid");
	}

	/**
	 * 简化jqGrid清空语法
	 */
	$.clearGrid = function(gridId){
		$("#"+gridId).jqGrid("clearGridData");
	}
	
	/**
	 * 简化Form表单提交语法（返回HTML格式字符串）
	 */
	$.submit = function(callBackFunc, formId){
		$.svrcomm.rHtmlForm({
	        form : $("#"+formId),
	        datatype : 'json',
	        completed : function(data) {
		        if(callBackFunc){
			        callBackFunc(data);
		        }
	        },
	        failed : function(code, data) {
	            $.alert(data);
	        }
	    });
	}
	
	/**
	 * 简化Form表单提交语法（返回JSON格式字符串）
	 */
	$.save = function(callBackFunc, formId){
		$.svrcomm.rDataForm({
	        form : $("#"+formId),
	        datatype : 'json',
	        completed : function(data) {
		        if(callBackFunc){
			        callBackFunc(data);
		        }
	        },
	        failed : function(code, data) {
	            $.alert(data);
	        }
	    });
	}

	/**
	 * 万能调试输出工具：JS对象输出控制台
	 */
	$.plog = function(){
	   console.log("程序调试：", arguments);
	}
	
	/**
     * JS弹出信息,具有样式
     */
	$.msgBox = function(xdata, xcolor, width, height, customMsg){
	    xdata = $.formatFont(xdata, xcolor);
	    $.alert(xdata, width, height, customMsg);
	    return false;
    }
	/**
     * JS弹出信息,普通样式
     */
    $.alert = function(xdata, width, height, customMsg){
	    var xtitle = $.isNull(customMsg) ? "操作提示" : customMsg;
    	if(width != null && height != null){
    		$.dialog.prompt({"title":xtitle, "message": xdata, "width":width, "height":height});
    	}else if(width != null){
    		$.dialog.prompt({"title":xtitle, "message": xdata, "width":width});
    	}else if(height != null){
    		$.dialog.prompt({"title":xtitle, "message": xdata, "height":height});
    	}else{
    		$.dialog.prompt({"title":xtitle, "message": xdata});
    	}
    	return false;
    }
    
    /**	
     * 解析JSON并显示弹出解析数据
     * funcName(a,b,c,d..) 可传递参数
     */
	$.parseJsonMsg = function(jsonDataStr, funcName, jsonRow, flag){
		try {
		    var msg = $.parseJSON(jsonDataStr);  
			if(msg.code == "-1"){
				return $.msgBox(msg.data, null, 700, null, "操作提示");
			}else if(flag == true){
				$.alert(msg.data, 500, 200);
			}
	    } catch (e) {  
	        return $.msgBox(jsonDataStr, null, 700, null, "异常提示");
	    }  
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
     * 判断字符串中包含数据中的某元素，包含返回false
     * judgeStrContain(“确认，下达，计划”，【计划，下达，失效】) 可传递参数
     */
	$.judgeArrStrContain = function(str, arr){
		var flg = false;
		$.each(arr, function(index, opt){
			if(str.indexOf(opt) > -1){
				flg = true;
				return false;
			}
		});
		return flg;
	}
	
	//获取鼠标位置坐标
	$.getXyCourse = function(ev){
	    ev = ev || window.event;
	    if(ev.pageX || ev.pageY){   
	        return {x:ev.pageX, y:ev.pageY};   
	    }
	    return {   
	        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,   
	        y:ev.clientY + document.body.scrollTop - document.body.clientTop   
	    };
	}
	
	/**
	 * 下拉框控件值绑定、change事件绑定
	 */
	$.loadComboboxData = function(combId, dataList, bindChangeFunc){
		if($.isNotNull((dataList))){
    		$.each(dataList, function(index, combo){
                $("#"+ combId).append("<option value="+combo.value+">"+combo.label+"</option>");
            });
		}
		if(bindChangeFunc){
			if(typeof(bindChangeFunc) == "function"){
				$("#"+ combId).bind('change', function(event) { bindChangeFunc(); });
            }else if(typeof(bindChangeFunc) == "string"){
                $("#"+ combId).bind('change', function(event) { $("#"+bindChangeFunc).click(); });
            }else{
                $.alert("{0} is undefined".format(bindChangeFunc));
            }
		}
	}
	
	/**
	 * 页面Tab标签样式渲染
	 */
	$.tabRenderStyle = function(targetTab){
		//$("[class='ui-jqgrid-titlebar-close ui-corner-all HeaderButton']").remove();
	    $("#" + targetTab).tabs({heightStyle: "content"});
        $("#" + targetTab + "> ul").removeClass("ui-widget-header").addClass("tab-ui-widget-header");
	}
	
	/**
     * [简化]jqGrid-通用配置项
     */
	$.jqGridCommonOptions = function(options, subGridFlag, multiFlag, reloadFlag){
	   return $.extend(options, {
	        rowNum : 50,
            rowList : [10,20,30,50,100,200],
            datatype : "json",
            viewrecords : true,
            shrinkToFit : false,
            rownumbers : true,
            sortable : true,
            sortorder : "desc",
            subGrid : $.isNotNull(subGridFlag) ? true : false,
            multiselect : $.isNotNull(multiFlag) ? true : false,
            subGridOptions : $.subGridOptionsStyle(reloadFlag) 
	   });
	}
	
	/**
     * [简化]subGrid-通用配置项
     * [注意]若要对表格进行冻结择不能使用排序(sortable:false)
     */
    $.subGridCommonOptions = function(options, multiFlag, sortFlag){
        return $.extend(options, {
            rowNum : -1,
            datatype : "json",
            rownumbers : true,
            autoWidth : false, //自适应宽度
            autoHeight : false, 
            shrinkToFit : false, //列宽计算类型(true按比例初始化宽度,false按ColModel计算列宽)
            sortable : $.isNotNull(sortFlag) ? true : false, //冻结列不允许排序
            multiselect : $.isNotNull(multiFlag) ? true : false,
            sortorder : "desc"
       });
    }
	
	/**
	 * jqGrid-展开节点样式设置
	 */
	$.subGridOptionsStyle = function(reloadFlag){
        var subGridOptions = {
            plusicon  : "ui-icon-triangle-1-e",
            minusicon : "ui-icon-triangle-1-s",
            openicon  : "ui-icon-arrowreturn-1-e",
            expandOnLoad: false,
            selectOnExpand : false,
            reloadOnExpand : $.isNotNull(reloadFlag) ? false : true //默认加载
        };
        return subGridOptions;
	}
	
	/**
     * 获取jqGrid指定行对应列值Json对象
     */
    $.getGridColumnJson = function(gridId, rowId, colArr){
    	var colJson = {};
    	$.each(colArr, function(index, colName){
            colJson[colName] = $("#"+gridId).getCell(rowId, colName);
        });
        return colJson;
    }
    
    /**
     * 打开弹出表单操作对话框窗口
     */
    $.OpenDialog = function(title, url, params, callback, width){
    	$.dialog.openModalDialog({
           'title': $.isNull(title) ? "操作" : title,
           'url': url,
           'callback': callback,
           'type': 'get',
           'params' : params,
           'width': width
       });
    }
	
})(jQuery);