/**
 * 获取一个 window.location.search 键值（value）
 * @author WangYulong <wylong666@gmail.com>
 * @param  {String} key 需要获取的键名
 * @return {String} 需要获取的值名
 * @example
 * // URL = 'www.example.com/?name=张三'
 * getQuery('name') 
 * // '张三'      
 */
function getQuery(key) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}


/** 
 * cookie操作
 * @type {Object}
 * @param name (必要) 要创建或覆盖的cookie的名字 (string)。
 * @param value (必要) cookie的值 (string)。
 * @param end (可选) 最大年龄的秒数 (一年为31536e3， 永不过期的cookie为Infinity) ，或者过期时间的GMTString格式或Date对象; 如果没有定义则会在会话结束时过期 (number – 有限的或 Infinity – string, Date object or null)。
 * @param path (可选) 例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径。(string or null)。
 * @param domain (可选) 例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com'。如果没有定义，默认为当前文档位置的路径的域名部分 (string或null)。
 * @param secure (可选) cookie只会被https传输 (boolean或null)。
 *
 */
var docCookies = {
    getItem: function(sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        var temp = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        console.log(temp)
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function(sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
        return aKeys;
    }
};


/**
 *
 * 判断IE低版本
 * @return {Number} IE版本，5/6/7/8/9/false,false为非IE浏览器
 * @example
 * 
 * IE_Version()
 * // 9
 * 
 */
function IE_Version() {
    var v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : false;
}
