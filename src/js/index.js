// 导入样式
require('../css/base.less')
require('../css/index.less')

import { faceAndBack } from "../js/face-and-back.js";
import { otherNavFn } from "../js/otherNav.js";
window.onload = function () {
    // 网站跳转
    let docwidth = window.screen.availWidth
    if (docwidth > 640) {
        window.location.href = 'https://threesmallcats.cn'
    }
    window.addEventListener('resize',function () {
         //  屏幕可用工作区宽度
         
        let docW = window.screen.availWidth
        if (docW > 640) {
            
            window.location.href = 'https://threesmallcats.cn'
        }
    })
    // 点击翻转
    faceAndBack()

    // 下导航
    otherNavFn()

}