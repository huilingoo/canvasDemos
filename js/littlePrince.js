window.onload = function () {
  var Width = 500;
  var Height = 500;
  var stars = []; // 星星

  var canvas = document.getElementById('Prince');
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = './img/小王子.png';

  // 背景图片
  img.onload = function () {
    ctx.beginPath();
    ctx.arc(250, 250, 250, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < 50; i++) {
      stars.push(new Star());
    }

    var scarf = new Scarf();

    function animate () {
      ctx.clearRect(0, 0, Width, Height);
      ctx.drawImage(img, 0, 0, 500, 500);


      // 绘制星星区域
      ctx.beginPath();
      ctx.rect(0, 0, 500, 240);
      ctx.font = "24px Segoe Script";
      ctx.fillText("The Little Prince", 130, 80);

      // 使用路径绘制会有黑边框，至今未解决
      // ctx.moveTo(-100, 300);
      // ctx.quadraticCurveTo(250, -300, 600, 300);
      // ctx.quadraticCurveTo(250, 70, -100, 300);
      // ctx.clip();

      // 小星星
      for (let i = 0; i < stars.length; i++) {
        stars[i].draw();
        stars[i].update();
      }

      scarf.draw();
      scarf.update();

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  /** 
   * 围巾飘动：
   * 1、设置每次控制点初始坐标和飘动幅度;
   * 2、只用改变两个控制点的横坐标：每次到达飘动幅度又重新改变;
   *
   * */
  function Scarf () {
    this.endX = getRandom(65, 70);
    this.endY = getRandom(260, 270);
    this.dirX = 'L';
    this.dirY = 'U';
    this.range = 50;
    this.index = 0;


    this.control11 = {
      x: getRandom(100, 170),
      y: getRandom(200, 230),
      // 初始坐标
      posX: 100,
      posY: 200,

    }

    this.control12 = {
      x: getRandom(130, 200),
      y: getRandom(300, 330),
      // 初始坐标
      posX: 130,
      posY: 300,

    }

    this.control21 = {
      x: getRandom(100, 200),
      y: getRandom(300, 330),
      // 初始坐标
      posX: 100,
      posY: 300,

    }

    this.control22 = {
      x: getRandom(100, 170),
      y: getRandom(200, 230),
      // 初始坐标
      posX: 100,
      posY: 200,

    }
  }

  Scarf.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(230, 270);
    ctx.bezierCurveTo(this.control11.posX, this.control11.posY, this.control12.posX, this.control12.posY, this.endX, this.endY);
    ctx.bezierCurveTo(this.control21.posX, this.control21.posY, this.control22.posX, this.control22.posY, 230, 270);
    ctx.fillStyle = '#FF9999';
    ctx.fill();
  }

  Scarf.prototype.update = function () {
    if (this.dirX === 'L') {
      this.index++;
      this.control11.posX = this.control11.posX + 1;
      this.control21.posX = this.control21.posX + 1;
      if (this.index >= this.range) {
        this.dirX = 'R';
        this.range = getRandom(70, 100); // 重新设置幅度的值、
      }
    }
    else {
      this.index--;
      this.control11.posX = this.control11.posX - 1;
      this.control21.posX = this.control21.posX - 1;
      if (this.index <= 0) {
        this.dirX = 'L';
        this.range = getRandom(70, 100); // 重新设置幅度的值、
        this.index = 0;
      }
    }
  }

  function Star () {
    this.x = getRandom(0, Width);
    this.y = getRandom(0, Height);
    this.starSize = 1;
    this.maxSize = getRandom(2, 10); // 纵轴长度，横轴长度是0.25倍
    this.dir = 'up';
    this.starSpeed = 0.1;
  }

  Star.prototype.draw = function () {
    var color = '#FFCCBC'
    // 围绕中心生成四个小三角形
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.starSize);
    ctx.lineTo(this.x - this.starSize * 0.25, this.y);
    ctx.lineTo(this.x + this.starSize * 0.25, this.y);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.x + this.starSize, this.y);
    ctx.lineTo(this.x, this.y - this.starSize * 0.25);
    ctx.lineTo(this.x, this.y + this.starSize * 0.25);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.starSize);
    ctx.lineTo(this.x - this.starSize * 0.25, this.y);
    ctx.lineTo(this.x + this.starSize * 0.25, this.y);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.x - this.starSize, this.y);
    ctx.lineTo(this.x, this.y - this.starSize * 0.25);
    ctx.lineTo(this.x, this.y + this.starSize * 0.25);
    ctx.fillStyle = color;
    ctx.fill();
  }

  Star.prototype.update = function () {
    if (this.dir === 'up') {
      this.starSize = this.starSize + this.starSpeed;
      if (this.starSize >= this.maxSize) {
        this.dir = 'down';
      }
    } else {
      this.starSize = this.starSize - this.starSpeed;
      if (this.starSize < 2) {
        this.dir = 'up';
      }
    }
  }
}

// 获取随机数
function getRandom (n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}
