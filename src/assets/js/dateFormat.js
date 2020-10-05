// 过滤日期格式，传入时间戳，根据参数返回不同格式
const dateFormat = function (date, fmt) {
  let ret;
  date = new Date(date);
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}
const formatTimer = function (val, hours) {
  if (val) {
    var dateTimer = new Date(val * 1000);
    var y = dateTimer.getFullYear();
    var M = dateTimer.getMonth() + 1;
    var d = dateTimer.getDate();
    var h = dateTimer.getHours();
    var m = dateTimer.getMinutes();
    M = M >= 10 ? M : "0" + M;
    d = d >= 10 ? d : "0" + d;
    h = h >= 10 ? h : "0" + h;
    m = m >= 10 ? m : "0" + m;
    if (hours) {
      return y + "-" + M + "-" + d + " " + h + ":" + m;
    } else {
      return y + "-" + M + "-" + d
    }
  }
}
export {
  dateFormat,
  formatTimer
}


// let date = new Date()
// console.log(dateFormat(date, "YYYY-mm-dd HH:MM")); //2019-06-06 19:45`
