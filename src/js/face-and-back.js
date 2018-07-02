// 导入数据bus
import {
    store
} from "../js/store.js";
// 数据请求
import * as ajax from "../js/ajax.js";
// 导入上下左右滑动模块
import {
    touchFn,
    allLeft,
    allRight,
    allTop,
    allBottom,
    guessLeft,
    guessRight
} from "../js/touch.js";

// 公共变量
let backArr = document.querySelectorAll('.back');
let faceArr = document.querySelectorAll('.face');
let rotateBox = document.querySelectorAll('.rotate-box');
let showBox = document.querySelector('.show-box')
let Titem = document.querySelectorAll('.T-item')
let guessTypeBox = document.querySelector('.guess-type-box')
let otherNav = document.querySelector('.other-nav')

// 翻转牌函数
export function faceAndBack() {
    // 初始谜语类型盒子
    guessTypeBox.style.opacity = `0`
    guessTypeBox.style.right = `-23%`
    // 滑动模块
    touchFn(showBox, allLeft, allRight, allTop, allBottom, guessLeft, guessRight)
    // 开始选择首页
    Titem[0].style.background = `rgb(71, 71, 71)`
    // 遍历绑定翻转牌
    for (let i = 0; i < backArr.length; i++) {
        // 初始化翻转牌的底色
        faceArr[i].style.background = `${store.faceColor[i]}`
        // 点击翻转
        backArr[i].onclick = function (event) {
            // event兼容处理
            event = event || window.event
            // 排他思想(所有一样,单一处理)
            // 一样
            for (let i = 0; i < backArr.length; i++) {
                backArr[i].style.transform = `rotateX(0deg)`
                faceArr[i].style.transform = `rotateX(0deg)`
            }
            // 单一处理
            backArr[i].style.transform = `rotateX(180deg)`
            let nowFace = backArr[i].previousElementSibling || backArr[i].nextSibling
            nowFace.style.transform = `rotateX(180deg)`
        }
        // 点击动画和加载数据
        faceArr[i].onclick = function () {
            // 获取翻转状态(hide:未转   show:翻转了)
            store.showType = faceArr[i].dataset.showType
            // 获取初始类型并且将其保存到数据bus
            store.dataType = faceArr[i].dataset.type
            // 展示加载数据用的盒子
            showBox.style.zIndex = `1`
            // 二次类型盒子的显示隐藏条件
            if (store.dataType == 'guess') {
                guessTypeBox.style.opacity = `1`
            } else {
                guessTypeBox.style.opacity = `0`
            }
            // 初始类型(hide)
            if (store.showType == 'hide') {
                // 修改初始类型
                faceArr[i].dataset.showType = 'show'
                // 开始动画
                faceArr[i].style.height = `25%`
                // 排他思想(所有一样,单一处理)
                // 一样
                for (let i = 0; i < faceArr.length; i++) {

                    rotateBox[i].style.width = `0%`
                    for (let a = 0; a < Titem.length; a++) {
                        Titem[a].style.background = `rgb(99, 96, 96)`
                    }
                    // 为了更加美观
                    setTimeout(() => {
                        rotateBox[i].style.display = `none`
                    }, 500);
                }
                // 单一处理
                Titem[i + 1].style.background = `rgb(71, 71, 71)`
                rotateBox[i].style.width = `100%`
                rotateBox[i].style.top = '0%'
                // 为了更加美观
                setTimeout(() => {
                    showBox.style.border = `1px solid ${store.faceColor[i]}`
                    showBox.style.opacity = `1`
                }, 500);
                // 为了更加美观
                setTimeout(() => {

                    rotateBox[i].style.display = `block`
                }, 500);
                // 数据请求
                ajax.ajaxData(store.dataType)

            } else if (store.showType == 'show') {
                // 还原动画,恢复原始状态
                showFn()
            }

        }

    }


}


// show还原(还原动画,恢复原始状态)
export function showFn() {
    showBox.style.opacity = `0`
    showBox.style.zIndex = `-1`
     guessTypeBox.style.opacity = `0`
     guessTypeBox.style.right = `-23%`
    for (let i = 0; i < rotateBox.length; i++) {
        faceArr[i].dataset.showType = 'hide'
        faceArr[i].style.height = '100%'
        Titem[i + 1].style.background = `rgb(99, 96, 96)`
        rotateBox[i].style.display = `block`
        rotateBox[i].style.top = store.rotateBoxTopArr[i]
        // 为了更加美观
        setTimeout(() => {
            rotateBox[i].style.width = `100%`
        }, 5);
    }
    otherNav.style.bottom = `0%`
    Titem[0].style.background = `rgb(71, 71, 71)`
}