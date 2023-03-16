/**
 * 异步线程处理弹窗
 */
function main () {
  log("处理弹窗线程启动")
  threads.start(function () {
    while (true) {
      closeFirstPageAd()
      closeYouthMode()
      closeFriendRecommend()
      closeLiveRecomment()
      closeLiveFocus()
      closeAdPopup()
      closeLiveRedPacketPopup()
      closeLiveRedPacketPopup2()
      closeOpenLocation()
      closeLiveInviteTalk()
    }
  })
}

/**
 * 首屏广告
 */
function closeFirstPageAd () {
  // if (textContains("跳过").exists()) {
  //   log("发现首屏广告")
  //   textContains("跳过").click()
  //   toastLog("跳过首屏广告完成")
  //   sleep(1000)
  // }
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
 * 朋友推荐弹窗
 */
function closeFriendRecommend () {
  if (id("com.smile.gifmaker:id/title_view").text("朋友推荐").exists()) {
    log("发现朋友推荐弹窗")
    id("com.smile.gifmaker:id/close_btn").click()
    toastLog("关闭朋友推荐弹窗完成")
    sleep(1000)
  }
}

/**
 * 直播推荐弹窗
 */
function closeLiveRecomment () {
  if (text("暂未直播，去个人主页").exists()) {
    log("发现直播推荐弹窗")
    id("com.smile.gifmaker:id/close").click()
    toastLog("关闭直播推荐弹窗完成")
    sleep(1000)
  }
}

/**
 * 直播关注引导弹窗
 */
function closeLiveFocus () {
  if (text("暂未直播，去个人主页").exists()) {
    log("发现直播推荐弹窗")
    id("com.smile.gifmaker:id/close").click()
    toastLog("关闭直播推荐弹窗完成")
    sleep(1000)
  }
}

/**
 * 关闭广告弹窗
 */
function closeAdPopup () {
  if (id("com.smile.gifmaker:id/popup_view").exists()) {
    log("发现广告弹窗")
    id("com.smile.gifmaker:id/close_btn").click()
    toastLog("关闭广告弹窗完成")
    sleep(1000)
  }
}

/**
 * 关闭直播间红包弹窗
 */
function closeLiveRedPacketPopup () {
  if (id("com.smile.gifmaker:id/live_merchant_container_root_view").exists()) {
    log("发现直播间红包弹窗")
    id("com.smile.gifmaker:id/live_merchant_container_close_view").click()
    toastLog("关闭直播间红包弹窗完成")
    sleep(1000)
  }
}

/**
 * 关闭直播间红包弹窗2
 */
function closeLiveRedPacketPopup2 () {
  if (id("com.smile.gifmaker:id/live_red_packet_container_view_pager").exists()) {
    log("发现直播间红包弹窗2")
    id("com.smile.gifmaker:id/live_red_packet_container_close_view").click()
    toastLog("关闭直播间红包弹窗2完成")
    sleep(1000)
  }
}

/**
 * 关闭开启定位服务弹窗
 */
function closeOpenLocation () {
  if (text("开启定位服务").exists()) {
    log("发现开启定位服务弹窗")
    id("com.smile.gifmaker:id/negative").click()
    toastLog("关闭开启定位服务弹窗完成")
    sleep(1000)
  }
}

/**
 * 关闭邀请你一起聊弹窗
 */
function closeLiveInviteTalk () {
  if (id("com.smile.gifmaker:id/live_voice_party_audience_being_invited_bottom_panel_refuse").exists()) {
    log("发现邀请你一起聊弹窗")
    id("com.smile.gifmaker:id/live_voice_party_audience_being_invited_bottom_panel_refuse").click()
    toastLog("关闭邀请你一起聊弹窗完成")
    sleep(1000)
  }
}

/**
 * 限时福利零钱
 */
// function closeGetMoney () {
//   if (text("开启青少年模式").exists()) {
//     log("发现青少年模式弹窗")
//     click("我知道了")
//     toastLog("关闭青少年模式弹窗完成")
//     sleep(1000)
//   }
// }

module.exports = main
