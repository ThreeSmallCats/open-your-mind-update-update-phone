// 数据请求模块

// 公共变量
let showBox = document.querySelector('.show-box')
let guessTypeBox = document.querySelector('.guess-type-box')
let guessTypeArr = document.querySelectorAll('.guess-type')
let answerBox = document.querySelector('.answer-box')
let answerText = document.querySelector('.answer')
let more = document.querySelector('.more')
let jokedata = []
// 导入获取数据需要的api
import {
    dataApi
} from "../js/dataApi.js";
// 滚动插件
import BScroll from "better-scroll";
// 导入数据bus
import {
    store
} from "../js/store.js";
// 导入模板
let aboutTemplate = require('../template/about.string')
let jokeTemplate = require('../template/joke.string')
let picTemplate = require('../template/pic.string')
let guessTemplate = require('../template/guess.string')
// 获取数据函数
export function ajaxData(dataType) {
    // 二次类型盒子滚动
    let typeScroll = new BScroll(guessTypeBox, {
        click: true
    })
    // 初始类型判断(about,joke,pic,guess,index)
    if (dataType == 'about') {
        // 为了滚动而做
        showBox.innerHTML = `<div class="about"></div>`
        let aboutBox = document.querySelector('.about')
        // 渲染模板
        let html = dataApi.getHtml(aboutTemplate, {
            data: 'a'
        })
        aboutBox.innerHTML = html
        let download = document.querySelector('#download')
        let androidOrIphone = navigator.userAgent.toLowerCase();
        download.onclick = function (event) {
            event = event || window.event
            if (/iphone|ipad|ipod/.test(androidOrIphone)) {
                alert('对不起，我们暂时只有安卓的app')
                event.preventDefault();
            } else if (/android/.test(androidOrIphone)) {

            } else if (/window/.test(androidOrIphone)) {

            }
        }
    } else if (dataType == 'joke') {
        // 为了滚动而做
        showBox.innerHTML = `<ul class="joke"></ul>`
        getJoke()
    } else if (dataType == 'pic') {
        // 为了滚动而做
        showBox.innerHTML = `<div class="pic" ></div>`
        // 数据不稳定 该功能暂停服务。。。。。。。。。。。。。。。。。。。。
        let picBox = document.querySelector('.pic')
        // 渲染模板
        let html = dataApi.getHtml(picTemplate, {
            data: 'a'
        })
        picBox.innerHTML = html

    } else if (dataType == 'guess') {
        // 为了滚动而做
        showBox.innerHTML = `<ul class="guess"></ul>`
        // 初次点击时的加载数据
        getGuess(store.guessType)
        // 遍历绑定二次类型盒子事件
        for (let i = 0; i < guessTypeArr.length; i++) {
            guessTypeArr[i].onclick = function () {
                // 保存二次类型到数据bus
                store.guessType = guessTypeArr[i].dataset.guessType
                for (let a = 0; a < guessTypeArr.length; a++) {
                    guessTypeArr[a].classList.remove('active')
                }
                guessTypeArr[i].classList.add('active')
                // 用二次类型进行数据加载
                getGuess(store.guessType)
            }

        }

    } else if (dataType == 'index') {
        return
    }
}
// 笑话数据下拉刷新
function getJoke() {
    // 获取笑话数据
    getJokeFirst()
    let option = {
        pullDownRefresh: {
            threshold: 50,
            stop: 30
        }
    }
    // 为了更好的获取数据
    setTimeout(() => {
        // 滚动效果
        let scroll = new BScroll(showBox, option)

        //  加载滚动高度
        scroll.refresh()
        //  监听下拉刷新
        scroll.on('pullingDown', function () {
            more.style.opacity = `1`
            // 更新数据
            getJokeFirst()
            // 为了更好的获取数据
            setTimeout(() => {
                more.style.opacity = `0`
                //  更新数据完毕  回弹
                scroll.finishPullDown()
                // 重新加载滚动高度
                scroll.refresh()
            }, 500);
        })
    }, 500);
}
// 获取笑话数据
function getJokeFirst() {
    // 获取数据
    let joke = document.querySelector('.joke')
    joke.innerHTML = '<span>该接口已经关闭，剩下谜语接口了</span>'
    dataApi.getJoke(dataApi.pages('笑话').oldpage).then((res) => {
        let joke = document.querySelector('.joke')
        jokedata = res.showapi_res_body.contentlist
        // 对笑话文本进行简单处理
        for (let i = 0; i < jokedata.length; i++) {
            jokedata[i].text = jokedata[i].text.replace(/<br \/>/g, '')
            jokedata[i].text = jokedata[i].text.replace(/<br>/g, '')
        }
        // 渲染模板
        let html = dataApi.getHtml(jokeTemplate, {
            data: jokedata
        })
        joke.innerHTML = html

    })
}
// 谜语数据下拉刷新
function getGuess(guessType) {
    // 谜语数据获取
    getGuessFirst(guessType)

    let guessBox = document.querySelector('.guess')
    let option = {
        pullDownRefresh: {
            threshold: 50,
            stop: 30
        },
        click: true
    }
    // 为了更好的获取数据
    setTimeout(() => {
        // 滚动效果
        let guessScroll = new BScroll(showBox, option)
        //  加载滚动高度
        guessScroll.refresh()
        //  监听下拉刷新
        guessScroll.on('pullingDown', function () {
            // 更新数据
            more.style.opacity = `1`
            getGuessFirst(store.guessType)
            // 为了更好的获取数据
            setTimeout(() => {
                more.style.opacity = `0`
                //  更新数据完毕  回弹
                guessScroll.finishPullDown()
                // 重新加载滚动高度
                guessScroll.refresh()
            }, 500);
        })
    }, 500);

}
// 谜语数据获取
function getGuessFirst(guessType) {
    // 数据获取
    let guessBox = document.querySelector('.guess')
    dataApi.getGuess(guessType, dataApi.pages(guessType).oldpage).then((res) => {
        let guessData = res.showapi_res_body.pb.contentlist
        // 渲染模板
        let html = dataApi.getHtml(guessTemplate, {
            data: guessData
        })
        guessBox.innerHTML = html

        let guessBoxItemArr = guessBox.children
        for (let i = 0; i < guessBoxItemArr.length; i++) {
            // 点击显示答案盒子
            guessBoxItemArr[i].onclick = function () {
                let answer = guessBoxItemArr[i].dataset.answer
                answerText.innerHTML = answer
                answerBox.style.opacity = `1`
                answerBox.style.zIndex = `3`
            }
        }
    })
    // 谜语答案盒子隐藏
    answerBox.onclick = function () {
        answerBox.style.opacity = `0`
        answerBox.style.zIndex = `-2`
    }
}