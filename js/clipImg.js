window.onload = function () {
    const canvas = document.getElementById('ClipImg')
    const ctx = canvas.getContext('2d')

    // 获取当前视图的宽度和高度
    let aw = document.documentElement.clientWidth || document.body.clientWidth
    let ah = document.documentElement.clientHeight || document.body.clientHeight
    let imgw = 990;
    let imgh = 330;
    let split = 30; // 横纵分成多少块
    // 赋值给canvas
    canvas.width = aw;
    canvas.height = ah;
    // canvas移动到中心
    ctx.translate(aw / 2 - imgw / 2, ah / 2 - imgh / 2);
    ctx.drawImage(document.getElementById('img'), 0, 0, imgw, imgh, 0, 0, imgw, imgh,)

    let imgs = [];

    for (let i = 0; i < split; i++) {
        for (let j = 0; j < split; j++) {
            imgs.push(new Img(imgw / split * i, imgh / split * j, imgw / split, imgh / split, imgw / split * i, imgh / split * j, imgw / split, imgh / split));
        }
    }

    function Img(x, y, w, h) {
        // 起点坐标
        this.posX = x;
        this.posY = y;
        // 目标位置
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 1;
        this.angle = getRandom(0, 180);
        this.dir = Math.random();
    }

    Img.prototype.draw = function () {
        ctx.drawImage(document.getElementById('img'), this.posX, this.posY, this.w, this.h, this.x, this.y, this.w, this.h)
    }

    Img.prototype.update = function () {
        if (this.dir > 0.5) {
            this.y = this.y + this.speed * Math.sin(Math.PI / 180 * this.angle);
        } else {
            this.y = this.y - this.speed * Math.sin(Math.PI / 180 * this.angle);
        }
        this.x = this.x + this.speed * Math.cos(Math.PI / 180 * this.angle);

    }

    function animate() {
        ctx.clearRect(-(aw / 2 - imgw / 2), -(ah / 2 - imgh / 2), aw, ah);
        for (let i = 0; i < split * split; i++) {
            imgs[i].draw();
            imgs[i].update();
        }

        window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate)


}

// 获取随机数
function getRandom(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

