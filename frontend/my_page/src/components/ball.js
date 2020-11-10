// LittleBall.js
import React, {useEffect} from 'react'
// import {Context} from './Content'
import style from './ball.css'

export function Cavvas() {
    // const mycanvas = document.getElementById("mycanvas");
    let canvasHeight = window.outerHeight
    let canvasWidth = window.outerWidth
    useEffect(()=>{
        const mycanvas = document.querySelector('#mycanvas')
        const ctx = mycanvas.getContext("2d");
        if (!ctx){ return undefined}
        let circleArr = [];
        //圆形类
        function Circle(x,y,r){
            this.x = x;
            this.y = y;
            this.r = r;
            // 颜色的取值范围
            this.color = "rgb("+ (parseInt(Math.random() * 240 ) + 9) + ","+ (parseInt(Math.random() * 220 )+18) +",203)";

            //随机方向
            this.dx = Math.random() * 12 - 7;
            this.dy = Math.random() * 12 - 7;
            //往数组中push自己
            // circleArr.push(this);
            }

        //渲染
        Circle.prototype.render = function(){
        //新建一条路径
        ctx.beginPath();
        //创建一个圆
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        //设置样式颜色
        ctx.fillStyle = this.color;
        //通过填充路径的内容区域生成实心的图形
        ctx.fill();
        }

        //更新
        Circle.prototype.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        this.r--;
        if(this.r < 0){
            for (var i = 0; i < circleArr.length; i++) {
                if (circleArr[i] === this) {
                    circleArr.splice(i,1);
                };
            }
            return false;
        }
        return true;
        }
        //设置定时器每20毫秒更新和渲染
        setInterval(function(){
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        for (var i = 0; i < circleArr.length; i++) {
            circleArr[i].update() && circleArr[i].render();
        };
        },20);
        setInterval(function(){
    //    console.log(circleArr.length)
        circleArr.push(
        new Circle(
            Math.floor(Math.random()*canvasWidth),
            Math.floor(Math.random()*canvasHeight),
            30,)
        )
        }, 500);
    })



    return (
        <div>
            {/* <canvas id="mycanvas" className={style.canvas}></canvas> */}
            <canvas id="mycanvas" width={canvasWidth} height={canvasHeight} className={style.canvas}>
            </canvas>
        </div>
    )
} 