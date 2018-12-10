//获取数据
function  initData(url,params,page,rows,callback) {
    // var toast = new auiToast({});
    // toast.success({
    //     title : "正在加载",
    //     duration : 2000
    // });
    api.ajax({
        url: $.ServerUrl(url),
        method: 'post',
        data:{
            values:{
                strs:params,
                page:page,
                rows:rows,
            }
        }
    },function(obj, err) {
        //解析响应信息
        $.responseCall(obj, function(){
            if($.isNull(obj)){
                return $.alert("异常", $.toStringify(err.body));
            }
            callback($.toJson(obj.data));
        }, null, false);
    });
}
//获取数据
function  initDataA(url,params,callback) {
    api.ajax({
        url: $.ServerUrl(url),
        method: 'post',
        data:{
            values:{
                strs:params,
            }
        }
    },function(obj, err) {
        //解析响应信息
        $.responseCall(obj, function(){
            if($.isNull(obj)){
                return $.alert("异常", $.toStringify(err.body));
            }
            callback($.toJson(obj.data));
        }, null, false);
    });
}

//获取cookie
function getCookie(name) {
    var arr, reg = new RegExp(name + "=([^;]*)");
    if ( arr = document.cookie.match(reg))
        return unescape(arr[1]);
    // alert(unescape(arr[0]));
    else
        return null;
}

//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        setCookie(name);
}

//设置cookie
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
}

//判断是否有信息被选中
function isChoose(name){
    var str;
    var radioBtn=document.getElementsByName(name);
    for(var i=0;i<radioBtn.length;i++){
        if (radioBtn[i].checked){
            str=radioBtn[i].value;
        }
    }
    return str;
}
//获取url中传递的参数
function getRequest() {
    var url = location.search;
    alert(url);
    //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
function getParam(paramName) {
    paramValue = "", isFound = !1;
    if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) {
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
}

/**
 * 搜索是删除已加载的信息
 */
function cleanLi(){
    var li=document.getElementsByTagName("li");
    for (var i=li.length;i>0;i--){
        li[i-1].remove();
    }
}

/**
 * 将时间戳转换为yyyy-mm-dd
 * @param t
 * @returns {string}
 * @author lzj
 * @date 2018-10-12
 */
function getTimeFormat(t){
    var _time=new Date(t);
    var   year=_time.getFullYear();//2017
    var   month=_time.getMonth()+1;//7
    var   date=_time.getDate();//10
    var   hour=_time.getHours();//10
    var   minute=_time.getMinutes();//56
    var   second=_time.getSeconds();//15
// return   year+"年"+month+"月"+date+"日   "+hour+":"+minute+":"+second;//这里自己按自己需要的格式拼接
    return   year+"-"+month+"-"+date;
}
/**
 * 描述:后台请求参数    不需要参数是可以用此方法
 *
 * param: 请求地址
 * param：请求到数据后执行的参数
 * @author lzj
 * @date 2018/11/30 10:40
 */
function initDateNoParam(url,callback){
    api.ajax({
        url: $.ServerUrl(url),
        method: 'post',
    },function(obj, err) {
        //解析响应信息
        $.responseCall(obj, function(){
            if($.isNull(obj)){
                alert("进入了异常");
                return $.alert("异常", $.toStringify(err.body));
            }
            callback($.toJson(obj.data));
        }, null, false);
    });
}

/**
 * 描述:后台请求数据，有参
 * 注意：第一个参数必须为请求地址。第二个参数为回调，即请求到数据后执行的函数
 *
 * 这个方法可以和上面那个方法整合到一起；
 * 实现基础：ECMAScript中的参数在内部是用一个数组来运行的。函数接受到的永远是这个数组，而不关心数组中包含哪些参数(如果有参数的话)。（传入参数，调用时不定义也可）
 * js  自定义了    arguments   可用来获取传入参数个数    2018.11.30
 *
 * @author lzj
 * @date 2018/11/30 10:48
 */
function initDateParam(url,callback,param){
    api.ajax({
        url: $.ServerUrl(url),
        method: 'post',
        data:{
            values:param
        }
    },function(obj, err) {
        //解析响应信息
        $.responseCall(obj, function(){
            if($.isNull(obj)){
                return $.alert("异常", $.toStringify(err.body));
            }
            callback($.toJson(obj.data));
        }, null, false);
    });
}
