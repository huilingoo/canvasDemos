window.onload = function () {
    const canvas = document.getElementById('Particle');
    const ctx = canvas.getContext('2d');

    // 获取当前视图的宽度和高度
    let aw = document.documentElement.clientWidth || document.body.clientWidth;
    let ah = document.documentElement.clientHeight || document.body.clientHeight;

    // 赋值给canvas
    canvas.width = aw;
    canvas.height = ah;

    // 鼠标位置
    var mouseX = 0;
    var mouseY = 0;
    isMouse = false;

    let particles = [];

    // 初始化多个粒子
    for (let i = 0; i < 3000; i++) {
        particles.push(new Particle());
    }


    // 创建一个粒子
    function Particle() {
        this.x = getRandom(0, aw);
        this.y = getRandom(0, ah);
        this.color = getRandomColor();
        this.r = 2;
        this.speed = getRandom(2, 5) / 10;
        this.angle = getRandom(0, 180);
        this.dirVertical = Math.random() > 0.5 ? 'U' : 'D';
        this.dirHorizontal = Math.random() > 0.5 ? 'L' : 'R';
        // 计算每个点到鼠标的距离
        this.distance = 0;
    }

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    Particle.prototype.update = function () {
        this.distance = Math.sqrt(Math.abs(this.x - mouseX) * Math.abs(this.x - mouseX) + Math.abs(this.y - mouseY) * Math.abs(this.y - mouseY));

        // 鼠标在画布中且该点是否在鼠标范围内
        if (this.distance < 80 && isMouse) {
            this.speed = 30; // 逃离速度加快
        }
        // 外部球球向鼠标靠
        if (this.distance >= 80) {
            this.speed = getRandom(2, 5) / 10;
        }

        // this.angle = getTanDeg(this.y - mouseY, this.x - mouseX);

        if (this.dirHorizontal === 'R') {
            this.x = this.x + Math.abs(this.speed * Math.cos(Math.PI / 180 * this.angle));

            if (this.x > aw) {
                this.dirHorizontal = 'L'
            }
        } else {
            this.x = this.x - Math.abs(this.speed * Math.cos(Math.PI / 180 * this.angle));

            if (this.index < 0) {
                this.dirHorizontal = 'R'
            }
        }


        if (this.dirVertical === 'U') {
            this.y = this.y + this.speed * Math.sin(Math.PI / 180 * this.angle);

            if (this.y > ah) {
                this.dirVertical = 'D'
            }
        } else {
            this.y = this.y - this.speed * Math.sin(Math.PI / 180 * this.angle);

            if (this.y <= 0) {
                this.dirVertical = 'U'
            }
        }
    }

    canvas.addEventListener('mousemove', function (e) {
        isMouse = true;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    });

    // canvas.addEventListener('mouseout', function (e) {
    //     isMouse = false;
    // });

    function animate() {
        ctx.clearRect(0, 0, aw, ah);
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
        }

        window.requestAnimationFrame(animate)
    }

    window.requestAnimationFrame(animate)

}