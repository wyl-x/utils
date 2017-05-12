/**
 * created by loiee 
 * [Countdown description]
 * @param {String} time   传入日期，如 '2017-05-01 08:00'
 * @param {Number} option 负数代表过去的时间，正数代表未来的时间
 * return {Object}  包含天数，小时，分钟，秒数的对象
 */

function Countdown(time, option) {
    var day = 0
    var hour = 0
    var minute = 0
    var second = 0
    var input = new Date(time).getTime()
    var now = Date.now()
    if (option <= 0) {
        var milliSeconds = now - input
    } else {
        var milliSeconds = input - now
    }
    if (milliSeconds <= 0) {
        return {
            d: padZero(day),
            h: padZero(hour),
            m: padZero(minute),
            s: padZero(second),
        }
    }

    var dayTime = 24 * 60 * 60 * 1000
    var hourTime = 60 * 60 * 1000
    var minTime = 60 * 1000
    var secTime = 1000

    day = parseInt(milliSeconds / dayTime)
    hour = parseInt((milliSeconds - day * dayTime) / hourTime)
    minute = parseInt((milliSeconds - day * dayTime - hour * hourTime) / minTime)
    second = parseInt((milliSeconds - day * dayTime - hour * hourTime - minute * minTime) / secTime)

    return {
        d: padZero(day),
        h: padZero(hour),
        m: padZero(minute),
        s: padZero(second),
    }
}

function padZero(num) {
    var result = String(num)
    return result.length > 1 ? result : '0' + result
}

module.exports=Countdown