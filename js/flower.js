function main() {
    var canvas = document.getElementById('flower');
    var ctx = canvas.getContext('2d');

    // 花瓣数组，1代表完整的花，2代表花骨朵
    const petals = [
        [682, 262, 1],
        [460, 220, 1],
        [369, 224, 1],
        [688, 107, 1],
        [679, 107, 1],
        [381, 158, 1],
        [432, 120, 1],
        [696, 198, 1],
        [539, 53, 1],
        [448, 65, 1],
    ];

    // 文字位置
    let words = [
        [125, 44, 36, 339],
        [82, 44, 36, 339],
        [12, 247, 51, 155]]


    let flowers = [];
    let rects = [];



    // 花瓣
    function Petal(x, y, isAll) {
        this.x = x;
        this.y = y;
        this.fr = 0;
        this.r = 1;
        this.maxR = getRandom(5, 8); // 花的大小
        this.fSpeed = 0.1; // 开花速度
        this.isAll = isAll; // 是不是完整的花
    }

    Petal.prototype.draw = function () {
        ctx.globalCompositeOperation = 'source-over';

        if (this.isAll === 1) {
            // 花瓣(四瓣)
            ctx.beginPath();
            ctx.arc(this.x, this.y + this.fr + 1, this.fr, 0, 2 * Math.PI);
            ctx.fillStyle = "#fd0000";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y - this.fr - 1, this.fr, 0, 2 * Math.PI);
            ctx.fillStyle = "#fd0000";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x + this.fr + 1, this.y, this.fr, 0, 2 * Math.PI);
            ctx.fillStyle = "#fd0000";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x - this.fr - 1, this.y, this.fr, 0, 2 * Math.PI);
            ctx.fillStyle = "#fd0000";
            ctx.fill();

            // 花蕊
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.fillStyle = "#ffd9d9";
            ctx.fill();
            ctx.save();
        } else {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
			ctx.quadraticCurveTo(this.x + 5, this.y,this.x, this.y);//贝塞尔曲线
            ctx.quadraticCurveTo(this.x + 5, this.y,this.x, this.y);//贝塞尔曲线
            ctx.fillStyle = "#fd0000";
            ctx.fill();
        }

    }

    Petal.prototype.update = function () {
        this.fr = this.fr + this.fSpeed;
        if (this.fr > this.maxR) {
            this.fr = this.maxR;
        }
        ctx.restore();
    }

    function Rect(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    Rect.prototype.draw = function () {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    Rect.prototype.update = function () {
        this.y = this.y + 1;

        if (this.y >= 400) return;
    }

    function init() {
        for (let i = 0; i < petals.length; i++) {
            flowers.push(new Petal(...petals[i]))
        }
    }

    // 文字
    function drawWords() {
        words.forEach((m, ind) => {
            ctx.drawImage(document.getElementById(`word${ind + 1}`), m[0], m[1]);
            ctx.globalCompositeOperation = 'destination-out';
            rects.push(new Rect(...m));
        })
    }

    init();
    // drawWords();

    let rect1 = new Rect(...words[0]);
    let rect2 = new Rect(...words[1]);
    let rect3 = new Rect(...words[2]);
    function animate(t) {
        ctx.clearRect(0, 0, 793, 413);
        ctx.globalCompositeOperation = 'source-over';
        // ctx.drawImage(document.getElementById('brand'), 0, 0, 793, 413);
        for (let i = 0; i < flowers.length; i++) {
            flowers[i].draw();
            flowers[i].update();
        }

        // 梅花开完

        if (t > 2500) {
            ctx.drawImage(document.getElementById(`word1`), ...words[0]);
            ctx.globalCompositeOperation = 'destination-out';
            rect1.draw();
            rect1.update();

        }

        if (t > 12000) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(document.getElementById(`word2`), ...words[1]);
            ctx.globalCompositeOperation = 'destination-out';
            rect2.draw();
            rect2.update();

        }

        if (t > 17500) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(document.getElementById(`word3`), ...words[2]);
            ctx.globalCompositeOperation = 'destination-out';
            rect3.draw();
            rect3.update();

        }

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// 获取随机数
function getRandom(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}