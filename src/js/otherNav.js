// 导入数据bus
import {store} from "../js/store.js";
// 导入请求数据函数
import * as ajax from "../js/ajax.js";
// 公共变量
let Titem = document.querySelectorAll('.T-item')
let onavItem = document.querySelectorAll('.onav-item')
let showBox = document.querySelector('.show-box')
let rotateBox = document.querySelectorAll('.rotate-box');
let backArr = document.querySelectorAll('.back');
let faceArr = document.querySelectorAll('.face');
let guessTypeBox = document.querySelector('.guess-type-box')

// 下边导航栏函数
export function otherNavFn() {
    // 遍历绑定主题色
    for (let i = 0; i < 4; i++) {
        onavItem[i].style.background = store.faceColor[i]
    }
    // 遍历绑定事件
    for (let i = 0; i < Titem.length; i++) {
        // 导航按钮绑定事件
        Titem[i].onclick = function () {
            // 保存初始类型到数据bus
            store.dataType = Titem[i].dataset.onavType
            // 二次类型盒子的显示隐藏条件
            if (store.dataType == 'guess') {
                guessTypeBox.style.opacity = `1`
            } else {
                guessTypeBox.style.opacity = `0`
            }
            // 排他思想(所有一样,单一处理)
            // 一样
            for (let i = 0; i < Titem.length; i++) {
                // 初始化下导航按钮颜色
                Titem[i].style.background = 'rgb(99, 96, 96)'
                // 因为这里的Titem的长度为5，但系rotateBox长度只有4，所以要限制，不然错误
                // 分为首页 和 其他两类
                // 首页
                if (store.dataType == 'index') {
                    // 首页初始化动画
                    showBox.style.opacity = `0`
                    for (let a = 0; a < rotateBox.length; a++) {
                        rotateBox[a].style.left = `0`
                        onavItem[a].style.top = `-5.7%`
                    }
                }
                // 其他 
                else if (i !== 0) {
                    // 第一个初始化动画
                    one()
                }
            }
            // 单一处理
            // 点击变颜色
            Titem[i].style.background = 'rgb(71, 71, 71)'
            // 同上分两类
            // 首页
            if (store.dataType == 'index') {
                // 首页动画
                showBox.style.zIndex = `-1`
                for (let a = 0; a < rotateBox.length; a++) {
                    faceArr[a].dataset.showType = 'hide'
                    rotateBox[a].style.transition = `all 0.5s`
                    faceArr[a].style.transition = `all 0.5s`
                    backArr[a].style.transition = `all 0.5s`
                    guessTypeBox.style.opacity = `0`
                    guessTypeBox.style.right = `-23%`
                    rotateBox[a].style.display = `block`
                    setTimeout(() => {
                        rotateBox[a].style.width = `100%`
                        onavItem[a].style.top = `-5.7%`
                        rotateBox[a].style.width = `100%`
                        rotateBox[a].style.display = `block`
                        rotateBox[a].style.top = store.rotateBoxTopArr[a]
                        faceArr[a].style.height = `100%`
                        backArr[a].style.transform = `rotateX(0deg)`
                        faceArr[a].style.transform = `rotateX(180deg)`
                    }, 5);
                }
                
            }
            // 其他 
            else if (i !== 0) {
                // 其他动画
                showBox.style.zIndex = `1`
                onavItem[i - 1].style.top = `0`
                showBox.style.border = `1px solid ${store.faceColor[i-1]}`
                // 为了更加美观
                setTimeout(() => {
                    showBox.style.opacity = `1`
                }, 250);
                // 获取数据
                ajax.ajaxData(store.dataType)
            }
        }
    }
    // 点击头部返回初始化动画
    for (let i = 0; i < onavItem.length; i++) {
        onavItem[i].onclick = function () {
            // 第二个初始化动画
            two()
        }
    }
}
// 第一个初始化动画
export function one() {
    for (let a = 0; a < 4; a++) {
        rotateBox[a].style.left = `-100%`
        // onavItem[b].style.opacity = `0`
        onavItem[a].style.top = `-5.7%`
        showBox.style.opacity = `0`
        // 还原全部
        setTimeout(() => {
            rotateBox[a].style.transition = `all 0s`
            faceArr[a].style.transition = `all 0s`
            backArr[a].style.transition = `all 0s`
            setTimeout(() => {
                rotateBox[a].style.width = `100%`
                rotateBox[a].style.display = `block`
                rotateBox[a].style.top = store.rotateBoxTopArr[a]
                faceArr[a].style.height = `100%`
                backArr[a].style.transform = `rotateX(0deg)`
                faceArr[a].style.transform = `rotateX(180deg)`
                rotateBox[a].style.transition = `all 0.5s`
                faceArr[a].style.transition = `all 0.5s`
                backArr[a].style.transition = `all 0.5s`
            }, 5);
        }, 500);
    }
}
// 第二个初始化动画
export function two() {
    showBox.style.zIndex = `-1`
    showBox.style.opacity = `0`
    for (let a = 0; a < onavItem.length; a++) {
        onavItem[a].style.top = `-5.7%`
        rotateBox[a].style.left = `0`
        for (let b = 0; b < Titem.length; b++) {
            Titem[b].style.background = `rgb(99, 96, 96)`
        }
        Titem[0].style.background = `rgb(71, 71, 71)`
    }
}