window.onload = function () {
    const canvas = document.getElementById('yanhua')

    const ctx = canvas.getContext('2d')

    // 获取当前视图的宽度和高度
    let aw = document.documentElement.clientWidth || document.body.clientWidth
    let ah = document.documentElement.clientHeight || document.body.clientHeight
    // 赋值给canvas
    canvas.width = aw
    canvas.height = ah

    let stars = [];

    function Yanhuan() {
        let x = getRandom(0, aw);
        let y = getRandom(0, ah);
        this.x = x;
        this.y = y;
        this.radius = getRandom(10, 16);
        this.alpha = 1;
        this.colors = setColors();
        this.color = 'hsla(' + this.colors.hue + ',100%,' + this.colors.brightness + '%,' + this.alpha + ')';
        this.speed = 2;
        this.level = 0.04;
    }

    Yanhuan.prototype.draw = function () {
        this.color = 'hsla(' + this.colors.hue + ',100%,' + this.colors.brightness + '%,' + this.alpha + ')';
        // 初始半径，以及粒子数量
        let count = 20;
        for (let i = 0; i < count; i++) {
            let angle = 360 / count * i;
            let radians = angle * Math.PI / 180;
            let moveX = this.x + Math.cos(radians) * this.radius;
            let moveY = this.y + Math.sin(radians) * this.radius + 1;

            // 开始路径
            ctx.beginPath();
            ctx.arc(moveX, moveY, 2, Math.PI * 2, false);
            ctx.arc(moveX, moveY, 2, Math.PI * 2, false);

            // 结束
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }


    Yanhuan.prototype.update = function () {
        this.speed = this.speed - this.level;
        this.y = this.y + 1.3;
        this.radius = this.radius + this.speed;
        this.alpha = this.alpha - 0.02;
    }
    function init() {
        for (let i = 0; i < 8; i++) {
            stars.push(new Yanhuan());
        }
    }

    init();

    function animate(t) {
        // ctx.clearRect(0, 0, aw, ah);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(255,255,255,' + 10 / 100 + ')';
        ctx.fillRect(0, 0, aw, ah);
        ctx.globalCompositeOperation = 'lighter';

        for (let i = 0; i < stars.length; i++) {
            stars[i].draw();
            stars[i].draw();
            stars[i].update();

            if (stars[i].alpha < 0) {
                stars.splice(i, 1);
            }
        }


        window.requestAnimationFrame(animate)
    }
    window.requestAnimationFrame(animate)

    setInterval(() => {
        stars.push(new Yanhuan());
        stars.push(new Yanhuan());
        stars.push(new Yanhuan());
        stars.push(new Yanhuan());
        stars.push(new Yanhuan());
        stars.push(new Yanhuan());
        stars.push(new Yanhuan());
        stars.push(new Yanhuan());
    }, 500)
}

// 获取随机数
function getRandom(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

// 获取随机颜色
var getRandomColor = function () {
    return '#' + (Math.random() * 0xffffff << 0).toString(16);
}


function setColors() {
    let hue = Math.random() * 360;
    let hueVariance = 60;

    return {
        hue: Math.floor(Math.random() * ((hue + hueVariance) - (hue - hueVariance))) + (hue - hueVariance),
        brightness: Math.floor(Math.random() * 21) + 50,
    }
}