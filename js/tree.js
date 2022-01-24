window.onload = () => {
  var canvas = document.getElementById('tree');
  var Width = window.innerWidth;
  var Height = window.innerHeight;
  canvas.width = Width;
  canvas.height = Height;
  var ctx = canvas.getContext('2d');

  var curDate = (new Date()).valueOf();  // 获取当前时间毫秒数

  var Size = 20;  // 初始树干大小
  var Speed = 1;  // 树干的生长速度
  var Color = "rgba(0, 179, 84, 0.07)"; // 树干颜色
  var maxGeneration = 6; // 第几次分枝丫
  var branchArray = []; // 树干集合
  var flowers = [];
  var splitSpeed = 2300;
  var stars = [];
  var drawCanvas = [];  // 记录构成树干的圆圈

  /**
   * 初始化树干的数量
   */
  function initTree () {
    branchArray = new BranchArray();
    branchArray.add(new DrawTree(canvas.width / 2, canvas.height, Size));

    for (let i = 0; i < 50; i++) {
      stars.push(new Star());
    }
  }

  /**
   * 树干集合
   */
  function BranchArray () {
    this.branchs = []
  }

  BranchArray.prototype.add = function (b) {
    this.branchs.push(b);
  }

  BranchArray.prototype.remove = function (b) {
    if (this.branchs.length > 0) {
      var index = this.branchs.findIndex(function (item) {
        return b === item;
      })
      if (index != -1) {
        this.branchs.splice(index, 1);
      }
    }
  }

  /**
  * 树干生长
  */
  function DrawTree (x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = Math.PI / 2; // 树枝的初始角度
    this.speed = Speed;
    this.generation = 1;
    // this.circles = []; // 各个枝丫去记住自己对应的圈
  }

  function drawCircle (x, y, size) {
    ctx.beginPath(); //开始绘制
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = Color;
    ctx.fill(); //开始填充
  }

  DrawTree.prototype.draw = function () {
    drawCircle(this.x, this.y, this.size);
    // this.circles.push({
    //   x: this.x,
    //   y: this.y,
    //   size: this.size
    // })
  }

  DrawTree.prototype.update = function () {
    this.angle = this.angle + getRandom(-1, 1) / 40;
    this.x = Math.cos(this.angle) * this.speed + this.x;
    this.y = this.y - Math.abs(Math.sin(this.angle) * this.speed); // 树木往上长
    this.size = this.size - 0.02;

    // 顶部开花
    if (this.size < 1.5) {
      flowers.push(new Flower(this.x, this.y));
    }

    if (this.generation > maxGeneration || this.size < 1.5) {
      branchArray.remove(this);
    }

    // 无法准确获取到某一毫秒
    var time = (new Date()).valueOf() - curDate;
    if (time >= splitSpeed * this.generation && time < (splitSpeed * this.generation + 15)) {
      this.generation = this.generation + 1;

      for (var i = 0; i < getRandom(1, 2); i++) {
        this.angle = this.angle + getRandom(-7, 7) / 10;
        this.clone(this);
      }
      // console.log(branchArray)
    }
  }

  DrawTree.prototype.grow = function () {
    this.draw();
    this.update();
  }

  DrawTree.prototype.clone = function (tree) {
    var obj = new DrawTree(tree.x, tree.y, tree.size)
    obj.color = getRandomColor();
    obj.angle = tree.angle;
    obj.speed = tree.speed;
    obj.generation = tree.generation
    branchArray.add(obj);

    // 开花更有层次感
    if (this.generation > 6) {
      flowers.push(new Flower(obj.x, obj.y));
    }
  }

  /**
   * 花
   */

  function Flower (x, y) {
    this.x = x;
    this.y = y;
    this.r = 2;
    this.fr = 0;
    this.fSpeed = 0.1; // 开花速度
    this.maxR = getRandom(3, 7); // 花的大小
    this.flag = 0;
  }

  Flower.prototype.draw = function () {
    // 花瓣(四瓣)
    ctx.beginPath();
    ctx.arc(this.x, this.y + this.fr + 1, this.fr, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 102, 102, 1)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x, this.y - this.fr - 1, this.fr, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 102, 102, 1)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x + this.fr + 1, this.y, this.fr, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 102, 102, 1)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.x - this.fr - 1, this.y, this.fr, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 102, 102, 1)";
    ctx.fill();

    // 花蕊
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 153, 153, 1)";
    ctx.fill();
    ctx.save();
  }

  Flower.prototype.update = function () {
    this.fr = this.fr + this.fSpeed;
    if (this.fr > this.maxR) {
      this.fr = this.maxR;
      this.flag = 1;
    }
    ctx.restore();
  }

  /**
   * 加点小点缀
  */
  function Star () {
    this.x = getRandom(0, Width);
    this.y = getRandom(0, Height);
    this.starSize = 1;
    this.maxSize = getRandom(3, 15); // 纵轴长度，横轴长度是0.25倍
    this.dir = 'up';
    this.starSpeed = 0.15;
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
    ctx.save();
  }

  Star.prototype.update = function () {
    ctx.restore();
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

  /**
   * 主函数
   */
  initTree();
  function animate (t) {
    // ctx.clearRect(0, 0, Width, Height);
    // // 小星星
    // for (let i = 0; i < stars.length; i++) {
    //   stars[i].draw();
    //   stars[i].update();
    // }

    for (let i = 0; i < branchArray.branchs.length; i++) {
      // for (let j = 0; j < branchArray.branchs[i].circles.length; j++) {
      //   // 清空画布后将圆圈画上去
      //   let obj = branchArray.branchs[i].circles[j];
      //   drawCircle(obj.x, obj.y, obj.size)
      // }
      // 枝丫生长
      branchArray.branchs[i].grow();
    }
    for (let i = 0; i < flowers.length; i++) {
      flowers[i].draw();
      flowers[i].update();
    }

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

// 获取随机数
function getRandom (n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

// 获取随机颜色
var getRandomColor = function () {
  return '#' + (Math.random() * 0xffffff << 0).toString(16);
}