// 数据bus
// store.js 用于储存公共函数或变量

export let store = {
    // 各类型对应的颜色
    faceColor: ['#9999FF', 'rgb(0, 146, 252)', '#66CC99', '#FF6666'],
     // 记录盒子原本位置
    rotateBoxTopArr : ['0%', '23.5%', '47%', '70.5%'],
    // 初始类型（首页，笑话，图片，谜语，关于）
    dataType :'joke',
    // 二次（谜语类型）
    guessType :'gxmy',
    showType : 'hide'
}