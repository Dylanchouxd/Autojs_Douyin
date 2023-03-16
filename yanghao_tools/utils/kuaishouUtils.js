/**
 * 切换到我的界面
 */
function toMePage () {
  const mePage = id("android:id/text1").text("我").findOne(10000)

  if (mePage && mePage.parent()) {
    mePage.parent().click()
    toastLog('切换至我的页面')
  } else {
    toastLog("我的按钮查找失败，退出脚本")
    exit()
  }
}

module.exports = {
  toMePage: toMePage,
}