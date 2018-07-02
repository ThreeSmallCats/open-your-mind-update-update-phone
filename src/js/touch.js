// 上下左右滑动函数

// 公共变量
let startX = 0
let startY = 0
let endX = 0
let endY = 0
let moveX = 0
let moveY = 0
let otherNav = document.querySelector('.other-nav')
let guessTypeBox = document.querySelector('.guess-type-box')
import {store} from "../js/store.js";
// 导入初始化模块
import {showFn} from "../js/face-and-back.js";
import {one,two} from "../js/otherNav.js";
// 上下左右滑函数
export function touchFn(ele, left, right, top, bottom, guessLeft, guessRight) {
    // 监听触摸开始事件
    ele.addEventListener('touchstart', function (event) {
        event = event || window.event
        startX = event.touches[0].clientX
        startY = event.touches[0].clientY
        let guessTypeBoxRight = guessTypeBox.style.right
        // 监听触摸结束事件
        ele.addEventListener('touchend', touchEndFn)
        function touchEndFn(event) {
            event = event || window.event
            endX = event.changedTouches[0].clientX
            endY = event.changedTouches[0].clientY
            // X 和 Y 的移动距离
            moveX = endX - startX
            moveY = endY - startY
            // 由于谜语类型时的左右滑动不同,所以要单独处理
            // 谜语时的滑动(每一个都有清除触摸结束监听事件)
            if (store.dataType == 'guess') {
                // 左滑
                if (moveX < -20 && Math.abs(moveY) < Math.abs(moveX)) {
                    guessLeft()
                    ele.removeEventListener('touchend', touchEndFn)
                }
                // 右滑
                else if (moveX > 20 && Math.abs(moveY) < Math.abs(moveX)) {
                    if (guessTypeBoxRight == '-23%') {
                        right()
                    } else if (guessTypeBoxRight == '0%') {
                        guessRight()
                    }
                    ele.removeEventListener('touchend', touchEndFn)
                }
                // 下滑
                else if (moveY > 20 && Math.abs(moveX) < Math.abs(moveY)) {
                    bottom()
                    ele.removeEventListener('touchend', touchEndFn)
                }
                // 上滑
                else if (moveY < -20 && Math.abs(moveX) < Math.abs(moveY)) {
                    top()
                    ele.removeEventListener('touchend', touchEndFn)
                }
                // 单击
                else if (Math.abs(moveX) < 20 && Math.abs(moveY) < 20) {
                    ele.removeEventListener('touchend', touchEndFn)
                }
            }
            // 正常滑动(每一个都有清除触摸结束监听事件)
             else {
                // 左滑
                if (moveX < -20 && Math.abs(moveY) < Math.abs(moveX)) {
                    left()
                    ele.removeEventListener('touchend', touchEndFn)
                }
                // 右滑
                else if (moveX > 20 && Math.abs(moveY) < Math.abs(moveX)) {
                    right()
                    ele.removeEventListener('touchend', touchEndFn)
                }
                // 下滑
                else if (moveY > 20 && Math.abs(moveX) < Math.abs(moveY)) {
                    bottom()
                    ele.removeEventListener('touchend', touchEndFn)
                }
                // 上滑
                else if (moveY < -20 && Math.abs(moveX) < Math.abs(moveY)) {
                    top()
                    ele.removeEventListener('touchend', touchEndFn)
                }
                // 单击
                else if (Math.abs(moveX) < 20 && Math.abs(moveY) < 20) {
                    ele.removeEventListener('touchend', touchEndFn)
                }
            }


        }
    })
}

// 正常左滑
export function allLeft() {
    return
}
// 正常右滑
export function allRight() {
    // 初始化
    showFn()
    one()
    two()

}
// 正常上滑
export function allTop() {
    otherNav.style.bottom = '-6%'
}
// 正常下滑
export function allBottom() {
    otherNav.style.bottom = '0'
}
// guess 左滑
export function guessLeft() {
    // 出现类型盒子
    guessTypeBox.style.right = `0%`
    guessTypeBox.style.zIndex = `2`

}
// guess 右滑
export function guessRight() {
    // 隐藏类型盒子
    guessTypeBox.style.right = `-23%`
    guessTypeBox.style.zIndex = `-1`

}