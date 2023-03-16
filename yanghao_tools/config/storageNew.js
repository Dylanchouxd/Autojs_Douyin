// 抖音新号任务配置
const storageNew = storages.create('AutoJs_Douyin__New')
const prefix = 'new_'

function saveConfig () {
  const inputs = [
    'searchContent',
    'videoClassify',
    'videoSkipMin',
    'videoSkipMax',
    'likeMin',
    'likeMax',
    'commentMin',
    'commentMax',
    'commentContent',
    'collectMin',
    'collectMax',
  ]
  inputs.forEach((val) => {
    storageNew.put(val, ui[prefix + val].text())
  })
}

module.exports = {
  storageNew: storages.create('AutoJs_Douyin__New'),
  // 搜索关键词
  searchContent: () => {
    return storageNew.get('searchContent', '找工作')
  },
  // 视频分类
  videoClassify: () => {
    return storageNew.get('videoClassify', '广州')
  },
  // 视频停留时间
  videoSkipMin: () => {
    return storageNew.get('videoSkipMin', 15)
  },
  videoSkipMax: () => {
    return storageNew.get('videoSkipMax', 30)
  },
  // 点赞条件数
  likeMin: () => {
    return storageNew.get('likeMin', 0)
  },
  likeMax: () => {
    return storageNew.get('likeMax', '')
  },
  // 收藏条件数
  collectMin: () => {
    return storageNew.get('collectMin', 0)
  },
  collectMax: () => {
    return storageNew.get('collectMax', '')
  },
  // 评论条件数
  commentMin: () => {
    return storageNew.get('commentMin', 0)
  },
  commentMax: () => {
    return storageNew.get('commentMax', '')
  },
  // 评论内容
  commentContent: () => {
    return storageNew.get('commentContent', '')
  },
  saveConfig: saveConfig,
}
