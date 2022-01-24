
// 获取随机数
function getRandom(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}


// 获取随机颜色
function getRandomColor() {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
}

// 已知正切值求角度
function getTanDeg(tan) {
    var result = Math.atan(tan) / (Math.PI / 180);
    result = Math.round(result);
    return result;
}