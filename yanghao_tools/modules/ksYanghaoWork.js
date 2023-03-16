(() => {
  const openApp = require('../utils/openApp')
  const { strToNumber, randomRun, randomSwipe, randomSleep, liveSwipe } = require('../utils/util')
  const kuaishouClosePopup = require('../utils/kuaishouClosePopup')
  const storageKsYanghaoConfig = require('../config/storageKsYanghao');

  function main () {
    // 打开快手App
    openApp('快手')
    // 拦截广告弹窗
    kuaishouClosePopup()

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
    // 搜索关键词进入视频
    searchToVideo()
    // 开始直播间操作
    startLive()
  }

  /**
   * 获取截屏权限
   */
  function getScreenPermission () {
    // 自动允许截图权限
    let screenAllowTheads = threads.start(function () {
      var beginBtn;
      if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
        beginBtn.click();
        screenAllowTheads.interrupt()
      }
    });

    if (!requestScreenCapture()) {
      toast("请求截图失败");
      exit();
    }
  }
  /**
   * 释放截图权限
   */
  function stopScreenCapturePermission () {
    runtime.getImages().releaseScreenCapturer()
  }
  /**
   * 因为目前 直播 这个选项没有任何标识可以选中
   * 所以目前使用 截图+ocr文字 的形式去匹配直播的选项
   */
  function toLiveOption (index) {
    try {
      const nowIndex = index || 0
      toast("请稍等...查找直播选项中...")
      log("开始查找第" + (Number(nowIndex) + 1) + "个子元素")

      const optionChilds = id("com.smile.gifmaker:id/tabs").findOne().children()
      const child = optionChilds[nowIndex]
      if (!child) {
        toastLog("找不到直播选项，退出脚本")
        exit()
      }

      const childRect = child.bounds();

      randomSleep(1000)
      log("开始截图")
      let image = captureScreen();
      let clipImage = images.clip(image, childRect.left, childRect.top, childRect.width(), childRect.height());
      let ocrInfo = paddle.ocr(clipImage)
      if (ocrInfo && ocrInfo[0] && ocrInfo[0].text === '直播') {
        stopScreenCapturePermission()
        // paddle.release()
        click(childRect)
      } else {
        image = null
        clipImage = null
        ocrInfo = null
        randomSleep(1000)
        toLiveOption(nowIndex + 1)
      }
    } catch (error) {
      log("Error: toLiveOption", error)
      toastLog("搜索直播选项错误，脚本退出")
      exit()
    }
  }
  /**
   * 搜索关键词进入视频
   */
  function searchToVideo () {
    try {
      // 点击搜索图标
      id("com.smile.gifmaker:id/nasa_featured_default_search_view").findOne().click()
      randomSleep(500)
      // 输入关键词
      let keyword = storageKsYanghaoConfig.searchContent()
      id("com.smile.gifmaker:id/editor").findOne().setText(keyword)
      randomSleep(500)
      // 搜索
      id("com.smile.gifmaker:id/right_tv").findOne().click()
      randomSleep(1500)
      // 切换到 直播 栏目，利用截屏+ocr识别处理
      getScreenPermission()
      toLiveOption()
      // 点击第一个视频
      randomSleep(1000)
      toastLog("查看第一个视频")
      if (id("com.smile.gifmaker:id/container").visibleToUser().exists()) {
        id("com.smile.gifmaker:id/container").visibleToUser().findOne().click()
      } else {
        toastLog("没有相关直播间，脚本退出")
        exit()
      }
    } catch (error) {
      log("Error: searchToVideo, " + error)
      toastLog("运行异常，退出脚本")
      exit()
    }
  }

  /**
   * 是否达到 当次直播间关注上限
   * @returns {boolean} true 达到
   */
  function isArriveLiveFocusLimit () {
    const liveUserFocusLimit = storageKsYanghaoConfig.liveUserFocusLimit() ? Number(storageKsYanghaoConfig.liveUserFocusLimit()) : ''
    if (typeof liveUserFocusLimit === 'number' && currLiveUserFocusAmount >= liveUserFocusLimit) {
      return true
    }
    return false
  }
  /**
   * 是否达到 当日直播间关注上限
   * @returns {boolean} true 达到
   */
  function isArriveDayLiveFocusLimit () {
    const dayLiveUserFocusLimit = storageKsYanghaoConfig.dayLiveUserFocusLimit() ? Number(storageKsYanghaoConfig.dayLiveUserFocusLimit()) : '' // 关注限制
    const dayLiveUserFocusAmount = storageKsYanghaoConfig.dayLiveUserFocusAmount() // 当前关注人数
    if (typeof dayLiveUserFocusLimit === 'number' && dayLiveUserFocusAmount >= dayLiveUserFocusLimit) {
      return true
    }
    return false
  }
  /**
   * 任务-进入直播间
   */
  let currVisitLiveAmount = 0 // 当前总完成了多少次直播间任务
  let liveUserWorkedList = [] // 已经处理过的用户
  let currLiveUserFocusAmount = 0 // 当前直播间已关注的用户
  function startLive () {
    currLiveUserFocusAmount = 0 // 每次进直播间重置一下
    randomSleep(1500)

    const liveAmount = storageKsYanghaoConfig.liveAmount() // 要观看多少个直播间
    currVisitLiveAmount++
    if (currVisitLiveAmount > liveAmount) {
      toastLog("直播间任务总次数完成，退出脚本")
      randomSleep(1000)
      quitLive()
      exit()
      return
    }
    toastLog("开始直播间任务 " + currVisitLiveAmount + "/" + liveAmount)
    randomSleep(1000)

    try {
      // 直播已结束情况处理
      if (text("直播已结束").exists()) {
        toastLog("切换直播间，直播已结束")
        nextLive()
        randomSleep(2000)
        startLive()
        return
      }

      // 直播间人数区间判断
      const liveMinPersonAmount = storageKsYanghaoConfig.liveMinPersonAmount() ? Number(storageKsYanghaoConfig.liveMinPersonAmount()) : 0
      let liveMaxPersonAmount = storageKsYanghaoConfig.liveMaxPersonAmount() ? Number(storageKsYanghaoConfig.liveMaxPersonAmount()) : 0
      if (liveMinPersonAmount || liveMaxPersonAmount) {
        const nowLivePersonAmountEl = id("com.smile.gifmaker:id/live_audience_count_text").visibleToUser().findOne(5000)
        const nowLivePersonAmount = nowLivePersonAmountEl ? Number(strToNumber(nowLivePersonAmountEl.text())) : ''
        log("直播间人数：", nowLivePersonAmount)
        if (typeof nowLivePersonAmount === 'number') {
          if (!liveMaxPersonAmount) liveMaxPersonAmount = nowLivePersonAmount + 1
          if (nowLivePersonAmount < liveMinPersonAmount || nowLivePersonAmount > liveMaxPersonAmount) {
            toastLog("切换直播间，直播间人数不符合设定")
            nextLive()
            randomSleep(2000)
            startLive()
            return
          }
        }
      }
    } catch (error) {
      randomSleep(2000)
      startLive()
    }

    // 循环获取用户评论
    const loopLiveUserThreads = threads.start(function () {
      startLoopLiveUserMission()
    })

    const skipSeconds = random(Number(storageKsYanghaoConfig.liveSkipMin()), Number(storageKsYanghaoConfig.liveSkipMax()))
    toastLog(skipSeconds + '秒后切换下一个直播间')
    sleep(Number(skipSeconds) * 1000)
    const isOver = currVisitLiveAmount + 1 > liveAmount
    if (isOver) {
      startLive()
      return
    }

    loopLiveUserThreads.interrupt()
    randomSleep(1000)
    // 切换前判断用户界面弹窗是否还在打开，如果是则先关闭
    closeUserDataPopup()
    randomSleep(1000)
    toastLog('切换直播间，时间已到')
    nextLive()
    randomSleep(2000)
    startLive()
  }
  /**
   * 循环处理直播间评论用户任务
   * @description 针对直播间用户的筛选条件进行关注
   */
  function startLoopLiveUserMission () {
    try {
      // 当日直播间关注判断
      if (isArriveDayLiveFocusLimit()) {
        toastLog("已达到当日直播间关注上限")
        return
      }
      // 当次直播间关注判断
      if (isArriveLiveFocusLimit()) {
        toastLog("已达到当次直播间关注上限")
        return
      }
      
      let isAllowLoadUserInfo = true // 是否允许看个人信息
      const userEls = id("com.smile.gifmaker:id/message_list_view").visibleToUser().findOne().children()
      userEls.forEach((child) => {
        // 防止点到购物车之类的界面，所以第一个不点击
        if (child.drawingOrder() === 1) {
          return
        }
        if (child.className && child.className() === 'android.widget.LinearLayout') {
          // 当日直播间关注判断
          if (isArriveDayLiveFocusLimit()) return
          // 当次直播间关注判断
          if (isArriveLiveFocusLimit()) return
          // 是否允许看个人信息判断
          if (!isAllowLoadUserInfo) return
  
          const childRect = child.bounds();
          const isOpenUserProfile = openUserDataPopup(childRect) // 打开个人信息界面

          // 检测是否不允许查看个人信息
          if (id("com.smile.gifmaker:id/toast_text").exists() && text('因主播设置不支持查看个人信息').exists()) {
            isAllowLoadUserInfo = false
          }
          // 不允许查看个人信息则跳过直播间
          if (!isAllowLoadUserInfo) {
            toastLog("切换直播间，主播设置不允许查看信息")
            randomSleep(500)
            nextLive()
            randomSleep(2000)
            return
          }
          // 打开了聊一聊的界面
          if (id("com.smile.gifmaker:id/live_comment_editor_penal_tab_recycler_view").exists()) {
            back()
            return
          }
          // 打开了购物页面
          if (id("com.smile.gifmaker:id/confirm_container").exists()) {
            back()
            return
          }
  
          if (isOpenUserProfile) {
            log("已打开用户信息弹窗")
            const userData = findLiveUserData()
            /**
             * 因为快手获取不到具体评论内容和用户
             * 所以只能每个评论都点进去 匹配该用户是否已处理过 已处理过则跳过
             */
            // 只点击未处理过的用户
            if (liveUserWorkedList.indexOf(userData.userName) === -1) {
              liveUserWorkedList.push(userData.userName)
              // 检测用户是否达到设置的条件
              log('用户：', userData.userName)
              log('关注数：', userData.focusAmount)
              log('粉丝数：', userData.fansAmount)
              // 关注数flag
              const liveUserFocusMin = storageKsYanghaoConfig.liveUserFocusMin() ? Number(storageKsYanghaoConfig.liveUserFocusMin()) : 0
              const liveUserFocusMax = storageKsYanghaoConfig.liveUserFocusMax() ? Number(storageKsYanghaoConfig.liveUserFocusMax()) : Number(userData.focusAmount) + 1
              const focusFlag = Number(userData.focusAmount) > liveUserFocusMin && Number(userData.focusAmount) < liveUserFocusMax
              // 粉丝数flag
              const liveUserFansMin = storageKsYanghaoConfig.liveUserFansMin() ? Number(storageKsYanghaoConfig.liveUserFansMin()) : 0
              const liveUserFansMax = storageKsYanghaoConfig.liveUserFansMax() ? Number(storageKsYanghaoConfig.liveUserFansMax()) : Number(userData.fansAmount) + 1
              const fansFlag = Number(userData.fansAmount) > liveUserFansMin && Number(userData.fansAmount) < liveUserFansMax
           
              log('关注数', focusFlag, '粉丝数', fansFlag)
              // 满足所有条件，关注
              if (focusFlag && fansFlag && randomRun(0.8)) {
                if (id("com.smile.gifmaker:id/live_audience_new_profile_follow_status_view_v2").text("关注").exists()) {
                  id("com.smile.gifmaker:id/live_audience_new_profile_follow_status_view_container").click()
                  currLiveUserFocusAmount++ // 当次直播间关注数+1
                  storageKsYanghaoConfig.storagesKsYanghao.put('dayLiveUserFocusAmount', Number(storageKsYanghaoConfig.dayLiveUserFocusAmount()) + 1) // 当日直播间关注数+1
                } else {
                  log("已关注过了...")
                }
              }
              randomSleep(1000)
              closeUserDataPopup()
            } else {
              closeUserDataPopup()
            }
          }
          randomSleep(1500)
        }
      })

      // 重新执行-循环处理直播间评论用户
      startLoopLiveUserMission()
    } catch (error) {
      log("【Error】LoopLiveUserMain ======= ", error)
      startLoopLiveUserMission()
    }
  }
  /**
   * 打开用户信息弹窗
   * @returns {boolean} true 打开成功
   */
  function openUserDataPopup (rect) {
    click(rect)
    randomSleep(1000)
    if (id("com.smile.gifmaker:id/live_profile_container").visibleToUser().exists()) { 
      return true
    }
    return false
  }
  /**
   * 关闭用户信息弹窗
   * @returns 
   */
  function closeUserDataPopup () {
    if (id("com.smile.gifmaker:id/live_profile_container").visibleToUser().exists()) {
      back()
      log("已关闭用户信息弹窗")
      randomSleep(500)
    }
  }
  /**
   * 获取用户数据
   * @returns 
   */
  function findLiveUserData () {
    try {
      log("开始获取用户数据")
      // 用户昵称
      const userName = id("com.smile.gifmaker:id/live_profile_user_name").findOne(3000).text() || ''

      // 关注数、粉丝数
      const userFocusAmount = id("live_profile_statistics_info_group_1_number_view").findOne(4000).text()
      const userFansAmount = id("live_profile_statistics_info_group_2_number_view").findOne(4000).text()
      let focusAmount = Number(strToNumber(userFocusAmount)) || 0
      let fansAmount = Number(strToNumber(userFansAmount)) || 0

      return {
        userName: userName,
        focusAmount: focusAmount,
        fansAmount: fansAmount,
      }
    } catch (error) {
      log("【Error】FindLiveUserData ======= ", error)
    }
  }
  /**
   * 切换下一个直播间
   */
  function nextLive () {
    toastLog("当次直播间关注了 " + currLiveUserFocusAmount + " 人")
    liveSwipe()

    // 没有更多作品
    if (text('没有更多作品').exists()) {
      toastLog("退出脚本，没有更多作品")
      quitLive()
      exit()
      return
    }
  }
  /**
   * 退出直播间
   */
  function quitLive () {
    // 退出前判断弹窗是否打开
    closeUserDataPopup()
    // 退出直播间
    id("com.smile.gifmaker:id/live_close").findOne().click()
    toastLog("退出直播间")

    // 重置数据
    currVisitLiveAmount = 0
    liveUserWorkedList = []

    randomSleep(3000)
  }

  module.exports = main
})();