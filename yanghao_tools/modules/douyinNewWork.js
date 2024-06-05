(() => {
  const openApp = require('../utils/openApp')
  const { toIndexPage, videoLikeCommentCollect } = require('../utils/douyinUtils')
  const { randomSleep } = require('../utils/util')
  const douyinClosePopup = require('../utils/douyinClosePopup')
  const storageNewConfig = require('../config/storageNew');
  const {
    searchContainerWidget, searchInputWidget, searchButtonWidget,
    searchTagWidget, searchVideoWidget,
  } = require('../utils/widget')

  function main () {
    // 打开抖音App
    openApp('抖音')
    // 拦截广告弹窗
    douyinClosePopup()
    // 切换到首页
    randomSleep(2000)
    toIndexPage()
    toastLog("等待页面加载完成")
    randomSleep(5000)

    // ======== 开始任务 ========
    toastLog("开始任务")
    startMission()
  }

  function startMission () {
    // 搜索关键词进入视频
    searchToVideo()
    // 任务-作品点赞评论收藏
    startVideo()
  }
  /**
   * 搜索关键词进入视频
   */
  function searchToVideo () {
    // 点击搜索图标
    // 因为分析搜索控件，没有找到对应的 id，所以只能找外层，找出子元素，从而找到搜索控件
    const searchContainer = id(searchContainerWidget).findOne().children()
    const search = searchContainer[searchContainer.length - 1]
    search.click()
    randomSleep(500)
    // 输入关键词
    let keyword = storageNewConfig.searchContent()
    // 加上视频分类
    if (storageNewConfig.videoClassify()) {
      keyword += ' ' + storageNewConfig.videoClassify()
    }
    id(searchInputWidget).findOne().setText(keyword)
    randomSleep(500)
    // 搜索
    const searchEl = id(searchButtonWidget).findOne()
    log("获取到搜索按钮的区域", searchEl.bounds().centerX(), searchEl.bounds().centerY())
    click(searchEl.bounds().centerX(), searchEl.bounds().centerY())
    randomSleep(500)
    // 点击视频菜单
    id(searchTagWidget).text("视频").findOne().parent().click()
    randomSleep(1000)
    // 进入视频分类
    // if (storageNewConfig.videoClassify()) {
    //   toastLog("查找视频分类：" + storageNewConfig.videoClassify())
    //   const classify = id("com.ss.android.ugc.aweme:id/s6k").text(storageNewConfig.videoClassify()).findOne(5000)
    //   if (classify) {
    //     log("已找到视频分类")
    //     id("com.ss.android.ugc.aweme:id/s6k").text(storageNewConfig.videoClassify()).click()
    //     randomSleep(1000)
    //   } else {
    //     toastLog("找不到" + storageNewConfig.videoClassify() + "的分类")
    //     randomSleep(1000)
    //   }
    // }
    toastLog("查看第一个视频")
    // 点击第一个视频
    clickFirstVideo()
  }

  /**
   * 点击第一个视频
   */
  function clickFirstVideo () {
    const video = id(searchVideoWidget).visibleToUser().findOne(5000)
    if (!video) {
      toastLog("找不到视频控件，脚本已停止，请手动重新运行")
      exit()
      return
    }
    video.click()
    log("开始浏览第一个视频")
  }

  /**
   * 任务-作品点赞评论收藏
   */
  function startVideo () {
    videoLikeCommentCollect({
      videoSkipMin: storageNewConfig.videoSkipMin,
      videoSkipMax: storageNewConfig.videoSkipMax,
      likeMin: storageNewConfig.likeMin,
      likeMax: storageNewConfig.likeMax,
      collectMin: storageNewConfig.collectMin,
      collectMax: storageNewConfig.collectMax,
      commentMin: storageNewConfig.commentMin,
      commentMax: storageNewConfig.commentMax,
      commentContent: storageNewConfig.commentContent,
    }, () => {
      startVideo()
    })
  }

  module.exports = main
})();