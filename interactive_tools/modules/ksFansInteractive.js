/**
 * 快手 我的-粉丝 列表互动
 */
(() => {
  const openApp = require('../utils/openApp')
  const kuaishouClosePopup = require('../utils/kuaishouClosePopup')
  const { toMePage } = require('../utils/kuaishouUtils')
  const { strToNumber, randomRun, randomSwipe, randomSleep, liveSwipe } = require('../utils/util')
  const storageKsFansInteractiveConfig = require('../config/storageKsFansInteractive');


  function main () {
    // 打开快手App
    openApp('快手')
    // 拦截广告弹窗
    kuaishouClosePopup()
    // 切换到我的页面
    randomSleep(2000)
    toMePage()
    // 进入粉丝列表
    randomSleep(2000)
    id("com.smile.gifmaker:id/follower_layout").descContains("粉丝").findOne(3000).click()
    toastLog("等待页面加载完成")
    randomSleep(3000)

    // ======== 开始任务 ========
    toastLog("开始任务")
    startMission()
  }

  /**
   * 开始任务
   */
  function startMission () {
    const interactiveStartNickname = storageKsFansInteractiveConfig.interactiveStartNickname() // 是否滑动到指定用户后再执行
    if (interactiveStartNickname) {
      toastLog("滑动到 " + interactiveStartNickname + " 后再执行脚本")
      swipeToNickname(interactiveStartNickname, startInteractive, {
        startNickName: interactiveStartNickname
      })
    } else {
      startInteractive()
    }
  }

  /**
   * 滑动到指定用户的位置
   * @param {string} nickName 用户昵称
   * @param {function} callback 找到后回调
   * @param {object|undefined} callbackParams 回调参数
   */
  function swipeToNickname (nickName, callback, callbackParams) {
    const targetEl = id("com.smile.gifmaker:id/name").text(nickName)
    if (targetEl.exists()) {
      toastLog("找到 " + nickName + " 用户")
      callback && callback(callbackParams)
    } else {
      randomSwipe()
      randomSleep(1000)
      swipeToNickname(nickName, callback, callbackParams)
    }
  }

  /**
   * 判断该用户是否进行互动
   * @description 如果没有消息信息则代表还没有互动
   * @returns {boolean} true 代表已互动
   */
  function isAlreadyInteractive () {
    return id("com.smile.gifmaker.im_plugin:id/message_item_root").find().length > 0
  }

  /**
   * 开始互动
   */
  let totalInteractiveAmount = 0 // 总共互动人数总和
  const isInteractiveList = [] // 保存已经互动的人昵称
  function startInteractive (params) {
    let isInteractiveAmount = 0 // 当次已互动过的人数总和
    try {
      params = params ? params : {}

      const fanElList = id("com.smile.gifmaker:id/follower_layout").className("android.view.ViewGroup").find()
      const interactiveLimit = Number(storageKsFansInteractiveConfig.interactiveLimit()) || '' // 互动人数上限
      fanElList.forEach((el) => {
        // 到达设定的阈值的话则中止脚本
        if (interactiveLimit && totalInteractiveAmount >= interactiveLimit) {
          toastLog("达到设置上限，已互动 " + totalInteractiveAmount + " 人次，脚本退出。")
          exit()
          return
        }

        const userName = el.findOne(id("com.smile.gifmaker:id/name")).text()

        // 如果有此变量，则此用户前面的用户都忽略处理
        if (params.startNickName) {
          if (userName !== params.startNickName) {
            isInteractiveList.push(userName)
          } else {
            // 如果已处理了目标用户，则不需要再判断了
            params.startNickName = null
          }
        }

        // 跳过已处理过的用户
        if (isInteractiveList.includes(userName)) {
          isInteractiveAmount++
          return
        }

        totalInteractiveAmount++
        isInteractiveList.push(userName)

        // 打开选项框
        el.findOne(id("com.smile.gifmaker:id/more_btn")).click()
        randomSleep(1000)
        // 进入发私信界面
        text("发私信").findOne().parent().click()
        randomSleep(1500)
        // 判断是否已互动
        if (!isAlreadyInteractive()) {
          log("开始互动", userName)
          // 输入互动信息
          let interactiveContent = storageKsFansInteractiveConfig.interactiveContent()
          if (!interactiveContent) {
            toastLog("未配置互动内容，停止脚本")
            exit()
            return
          }
          interactiveContent = interactiveContent.split('\n')
          interactiveContent.forEach((content) => {
            id("com.smile.gifmaker:id/editor").setText(content)
            randomSleep(500)
            // 发送信息
            id("com.smile.gifmaker:id/send_btn").findOne(3000).click()
            randomSleep(1000)
          })
        } else {
          // 已互动则忽略
          toastLog(userName + " 已互动，跳过。")
        }
        randomSleep(1000)
        // 返回
        id("com.smile.gifmaker.im_plugin:id/navi_normal_left").findOne(4000).click()
        randomSleep(2000)
      })

      const isNoMore = id("com.smile.gifmaker:id/tv_hint").exists()
      // 如果出现没有更多 || 当前已经处理的数量 等于 当前界面元素的数量 则代表已经没有更多了
      if (isNoMore || isInteractiveAmount >= fanElList.length) {
        toastLog("没有更多数据了，已执行完成，脚本退出。")
        exit()
      } else {
        toastLog("拉取更多数据")
        randomSwipe()
        randomSleep(2000)
        startInteractive()
      }
    } catch (error) {
      log("【Error】startInteractive ======= ", error)
      randomSleep(1000)
      startInteractive()
    }
  }

  module.exports = main
})()