/**
 * 异步线程处理弹窗
 */
function main () {
  log("处理弹窗线程启动")
  threads.start(function () {
    while (true) {
      closeFirstPageAd()
      closeUpdatePopup()
      closeYouthMode()
      closeCommentAtmosphere()
      closeFindTelFriends()
      closeRecommentMoreLive()
      closeRecommentFriends()
    }
  })
}

/**
 * 首屏广告
 */
function closeFirstPageAd () {
  if (text("跳过").exists()) {
    log("发现首屏广告")
    click("跳过")
    toastLog("跳过首屏广告完成")
    sleep(1000)
  }
}

/**
 * 更新检测弹窗
 */
function closeUpdatePopup () {
  if (text("检测到更新").exists()) {
    log("发现软件更新弹窗")
    click("以后再说")
    toastLog("关闭更新弹窗完成")
    sleep(1000)
  }
}

/**
 * 青少年模式弹窗
 */
function closeYouthMode () {
  if (text("开启青少年模式").exists()) {
    log("发现青少年模式弹窗")
    click("我知道了")
    toastLog("关闭青少年模式弹窗完成")
    sleep(1000)
  }
}

/**
 * 共建抖音评论氛围弹窗
 */
function closeCommentAtmosphere () {
  if (text("共建抖音评论氛围").exists()) {
    log("发现 共建抖音评论氛围 弹窗")
    click("好的")
    toastLog("关闭 共建抖音评论氛围 弹窗完成")
    sleep(1000)
  }
}

/**
 * 发现通讯录朋友弹窗
 */
function closeFindTelFriends () {
  if (text("发现通讯录朋友").exists()) {
    log("发现 发现通讯录朋友 弹窗")
    click("拒绝")
    toastLog("关闭 发现通讯录朋友 弹窗完成")
    sleep(1000)
  }
}

/**
 * 直播间-为你推荐更多主播
 */
function closeRecommentMoreLive () {
  if (text("为你推荐更多主播").exists()) {
    log("发现 为你推荐更多主播 弹窗")
    click("退出")
    toastLog("关闭 为你推荐更多主播 弹窗完成")
    sleep(1000)
  }
}

/**
 * 朋友推荐
 */
function closeRecommentFriends () {
  if (text("朋友推荐").exists()) {
    log("发现 朋友推荐 弹窗")
    desc("关闭").click()
    toastLog("关闭 朋友推荐 弹窗完成")
    sleep(1000)
  }
}

module.exports = main
