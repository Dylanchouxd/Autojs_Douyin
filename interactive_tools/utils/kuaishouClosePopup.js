/**
 * 异步线程处理弹窗
 */
function main () {
  log("处理弹窗线程启动")
  threads.start(function () {
    while (true) {
      closeFirstPageAd()
      closeYouthMode()
    }
  })
}

/**
 * 首屏广告
 */
function closeFirstPageAd () {
  if (textContains("跳过").exists()) {
    log("发现首屏广告")
    textContains("跳过").click()
    toastLog("跳过首屏广告完成")
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
