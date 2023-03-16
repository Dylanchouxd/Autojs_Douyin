const { strToNumber, randomRun, randomSwipe, randomSleep } = require('./util')

/**
 * 切换到APP首页界面
 */
function toIndexPage () {
  const homePage = id("com.ss.android.ugc.aweme:id/p+d").text("首页").findOne(10000)

  if (homePage && homePage.parent()) {
    homePage.parent().click()
    toastLog('切换至首页')
  } else {
    toastLog("首页按钮查找失败，退出脚本")
    exit()
  }
}

/**
 * 作品 点赞评论收藏
 * @param {object} params 
 *  @property {string|number} videoSkipMin 视频切换时间
 *  @property {string|number} videoSkipMax 视频切换时间
 *  @property {string|number} likeMin 点赞条件数
 *  @property {string|number} likeMax 点赞条件数
 *  @property {string|number} collectMin 收藏条件数
 *  @property {string|number} collectMax 收藏条件数
 *  @property {string|number} commentMin 评论条件数
 *  @property {string|number} commentMax 评论条件数
 *  @property {string} commentContent 评论内容
 * @param {function} callback 
 */
function videoLikeCommentCollect (params, callback) {
  // 创建线程去运行
  const likeCommentCollectThreads = threads.start(function () {
    console.time('VideoLikeCommentCollect Mission 耗时')
    if (randomRun()) {
      startLike(params)
      randomSleep(1000)
    } else { log('几率判定不进行 点赞 操作') }
    if (randomRun()) {
      startComment(params)
      randomSleep(1000)
    } else { log('几率判定不进行 评论 操作') }
    if (randomRun()) {
      startCollect(params)
      randomSleep(1000)
    } else { log('几率判定不进行 收藏 操作') }
    console.timeEnd('VideoLikeCommentCollect Mission 耗时')
  })

  const skipSeconds = random(Number(params.videoSkipMin()), Number(params.videoSkipMax()))
  toastLog(skipSeconds + '秒后切换下一个视频')
  sleep(skipSeconds * 1000)
  // 时间到了，关闭线程
  likeCommentCollectThreads.interrupt()
  // 判断评论框有没有被打开，有的话先关闭
  if (id("com.ss.android.ugc.aweme:id/fm9").exists()) {
    id("com.ss.android.ugc.aweme:id/back_btn").findOne().click()
    randomSleep(1000)
  }
  toastLog('切换视频')
  randomSwipe()
  randomSleep(1000)

  // 任务结束后调用回调函数
  callback && callback()
}
/**
 * 点赞任务
 * @param {object} params 
 *  @property {string|number} videoSkipMin 视频切换时间
 *  @property {string|number} videoSkipMax 视频切换时间
 *  @property {string|number} likeMin 点赞条件数
 *  @property {string|number} likeMax 点赞条件数
 *  @property {string|number} collectMin 收藏条件数
 *  @property {string|number} collectMax 收藏条件数
 *  @property {string|number} commentMin 评论条件数
 *  @property {string|number} commentMax 评论条件数
 *  @property {string} commentContent 评论内容
 */
function startLike (params) {
  try {
    log("=====开始判断是否点赞=====")
    const likeEl = id("com.ss.android.ugc.aweme:id/dun").visibleToUser().findOne(3000)
    let isUnlike = true // 当前是否未点赞
    let likeAmount = 0
    if (likeEl) {
      const descList = likeEl.desc().split('，')
      isUnlike = descList[0] === '未点赞'
      likeAmount = strToNumber(descList[1].split('喜欢')[1])
      log("该作品点赞数为" + likeAmount + "个")

      const likeMin = params.likeMin() ? Number(params.likeMin()) : 0
      const likeMax = params.likeMax() ? Number(params.likeMax()) : likeAmount + 1 // 无则无限大
      if (isUnlike && (likeAmount > likeMin && likeAmount < likeMax)) {
        likeEl.click()
        toastLog("点赞成功")
      } else {
        log("不需要点赞")
      }
    } else {
      log("【Error】点赞节点找不到")
    }
  } catch (error) {
    log("【Error】点赞失败 ======= ", error)
  }
}
/**
 * 评论任务
 * @param {object} params 
 *  @property {string|number} videoSkipMin 视频切换时间
 *  @property {string|number} videoSkipMax 视频切换时间
 *  @property {string|number} likeMin 点赞条件数
 *  @property {string|number} likeMax 点赞条件数
 *  @property {string|number} collectMin 收藏条件数
 *  @property {string|number} collectMax 收藏条件数
 *  @property {string|number} commentMin 评论条件数
 *  @property {string|number} commentMax 评论条件数
 *  @property {string} commentContent 评论内容
 */
function startComment (params) {
  try {
    log("=====开始判断是否评论=====")
    const commentEl = id("com.ss.android.ugc.aweme:id/ct4").visibleToUser().findOne(3000)
    let commentAmount = 0
    if (commentEl) {
      const descList = commentEl.desc().split('，')
      commentAmount = strToNumber(descList[0].split('评论')[1])
      log("该作品评论数为" + commentAmount + "个")

      const commentMin = params.commentMin() ? Number(params.commentMin()) : 0
      const commentMax = params.commentMax() ? Number(params.commentMax()) : commentAmount + 1 // 无则无限大
      if (commentAmount > commentMin && commentAmount < commentMax) {
        log("开始评论")
        commentEl.click()
        randomSleep(500)
        // 评论
        const defaultComment = '评论评论~'
        const commentList = params.commentContent().split('\n')
        let comment = commentList.length > 0 ? commentList[random(0, commentList.length - 1)] : defaultComment
        comment = !!comment ? comment : defaultComment
        id("com.ss.android.ugc.aweme:id/cp+").findOne().setText(comment)
        randomSleep(500)
        // 发送
        id("com.ss.android.ugc.aweme:id/cr7").findOne().click()
        randomSleep(200)
        // 返回
        id("com.ss.android.ugc.aweme:id/back_btn").findOne().click()
        toastLog("评论成功")
      } else {
        log("不需要评论")
      }
    } else {
      log("【Error】评论节点找不到")
    }
  } catch (error) {
    log("【Error】评论失败 ======= ", error)
  }
}
/**
 * 收藏任务
 * @param {object} params 
 *  @property {string|number} videoSkipMin 视频切换时间
 *  @property {string|number} videoSkipMax 视频切换时间
 *  @property {string|number} likeMin 点赞条件数
 *  @property {string|number} likeMax 点赞条件数
 *  @property {string|number} collectMin 收藏条件数
 *  @property {string|number} collectMax 收藏条件数
 *  @property {string|number} commentMin 评论条件数
 *  @property {string|number} commentMax 评论条件数
 *  @property {string} commentContent 评论内容
 */
function startCollect (params) {
  try {
    log("=====开始判断是否收藏=====")
    const collectEl = id("com.ss.android.ugc.aweme:id/cmt").visibleToUser().findOne(3000)
    let isUnCollect = true // 当前是否未收藏
    let collectAmount = 0
    if (collectEl) {
      const descList = collectEl.desc().split('，')
      isUnCollect = descList[0] === '未选中'
      collectAmount = strToNumber(descList[1].split('收藏')[1])
      log("该作品收藏数为" + collectAmount + "个")

      const collectMin = params.collectMin() ? Number(params.collectMin()) : 0
      const collectMax = params.collectMax() ? Number(params.collectMax()) : collectAmount + 1 // 无则无限大
      if (isUnCollect && (collectAmount > collectMin && collectAmount < collectMax)) {
        collectEl.click()
        toastLog("收藏成功")
      } else {
        log("不需要收藏")
      }
    } else {
      log("【Error】收藏节点找不到")
    }
  } catch (error) {
    log("【Error】收藏失败 ======= ", error)
  }
}

module.exports = {
  toIndexPage: toIndexPage,
  videoLikeCommentCollect: videoLikeCommentCollect
}