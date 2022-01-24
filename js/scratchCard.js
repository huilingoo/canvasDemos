window.onload = () => {
    var canvas = document.getElementById("ScratchCard");
    var ctx = canvas.getContext("2d");

    var isEraser = false;
    
    ctx.fillStyle = "rgba(220, 220, 220, 1)";
    ctx.fillRect(0, 0, 400, 200);

    var startPoint = {
        x: 0,
        y: 0
    }

    canvas.onmousedown = function (e) {

        let x = e.offsetX;
        let y = e.offsetY;

        isEraser = true;

        startPoint = {
            x: x,
            y: y
        }
    }

    canvas.onmousemove = function (e) {
        let x = e.offsetX;
        let y = e.offsetY;

        if (isEraser) {
            // 通过画线的方式清除
            ctx.globalCompositeOperation = "destination-out";
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(x, y);
            ctx.lineWidth = 20;
            ctx.stroke();
        }

        startPoint = {
            x: x,
            y: y
        }
    }

    canvas.onmouseup = function (e) {
        isEraser = false;

    }

}