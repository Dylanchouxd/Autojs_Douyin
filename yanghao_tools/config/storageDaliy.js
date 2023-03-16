// 抖音每日任务配置
const storageDaliy = storages.create('AutoJs_Douyin__Daliy')
const prefix = 'daliy_'

function saveConfig () {
  const inputs = [
    'videoSkipMin',
    'videoSkipMax',
    'likeMin',
    'likeMax',
    'commentMin',
    'commentMax',
    'commentContent',
    'collectMin',
    'collectMax',
    'liveAmount',
    'liveMinPersonAmount',
    'liveMaxPersonAmount',
    'liveSkipMin',
    'liveSkipMax',
    'dayLiveUserFocusLimit',
    'liveUserFocusLimit',
    'liveUserFocusMin',
    'liveUserFocusMax',
    'liveUserFansMin',
    'liveUserFansMax',
    'liveUserArea',
  ]
  inputs.forEach((val) => {
    storageDaliy.put(val, ui[prefix + val].text())
  })

  // radio额外处理
  const liveUserGender = ui.daliy_liveUserGender0.isChecked()
    ? ''
    : ui.daliy_liveUserGender1.isChecked()
      ? '男'
      : '女'
  storageDaliy.put('liveUserGender', liveUserGender)
  // switch额外处理
  storageDaliy.put('isVisitLive', ui.daliy_isVisitLive.isChecked())
}

module.exports = {
  storageDaliy: storages.create('AutoJs_Douyin__Daliy'),
  // 视频停留时间
  videoSkipMin: () => {
    return storageDaliy.get('videoSkipMin', 15)
  },
  videoSkipMax: () => {
    return storageDaliy.get('videoSkipMax', 30)
  },
  // 点赞条件数
  likeMin: () => {
    return storageDaliy.get('likeMin', 0)
  },
  likeMax: () => {
    return storageDaliy.get('likeMax', '')
  },
  // 收藏条件数
  collectMin: () => {
    return storageDaliy.get('collectMin', 0)
  },
  collectMax: () => {
    return storageDaliy.get('collectMax', '')
  },
  // 评论条件数
  commentMin: () => {
    return storageDaliy.get('commentMin', 0)
  },
  commentMax: () => {
    return storageDaliy.get('commentMax', '')
  },
  // 评论内容
  commentContent: () => {
    return storageDaliy.get('commentContent', '')
  },
  // 是否访问直播间
  isVisitLive: () => {
    return storageDaliy.get('isVisitLive', true)
  },
  // 观看多个直播间
  liveAmount: () => {
    return storageDaliy.get('liveAmount', 10)
  },
  // 直播间人数区间
  liveMinPersonAmount: () => {
    return storageDaliy.get('liveMinPersonAmount', '')
  },
  liveMaxPersonAmount: () => {
    return storageDaliy.get('liveMaxPersonAmount', '')
  },
  // 直播间停留时间
  liveSkipMin: () => {
    return storageDaliy.get('liveSkipMin', 60)
  },
  liveSkipMax: () => {
    return storageDaliy.get('liveSkipMax', 120)
  },
  // 当日直播间关注人数上限
  dayLiveUserFocusLimit: () => {
    return storageDaliy.get('dayLiveUserFocusLimit', '')
  },
  // 直播间关注人数上限
  liveUserFocusLimit: () => {
    return storageDaliy.get('liveUserFocusLimit', '')
  },
  // 直播间用户性别筛选
  liveUserGender: () => {
    return storageDaliy.get('liveUserGender', 0)
  },
  // 直播间用户关注数筛选
  liveUserFocusMin: () => {
    return storageDaliy.get('liveUserFocusMin', 0)
  },
  liveUserFocusMax: () => {
    return storageDaliy.get('liveUserFocusMax', '')
  },
  // 直播间用户粉丝数筛选
  liveUserFansMin: () => {
    return storageDaliy.get('liveUserFansMin', 0)
  },
  liveUserFansMax: () => {
    return storageDaliy.get('liveUserFansMax', '')
  },
  // 直播间用户地区筛选
  liveUserArea: () => {
    return storageDaliy.get('liveUserArea', '')
  },
  // 当日直播间关注人数数量
  dayLiveUserFocusAmount: () => {
    return storageDaliy.get('dayLiveUserFocusAmount', 0)
  },
  // 脚本最后运行时间
  lastRunTime: () => {
    return storageDaliy.get('lastRunTime', new Date().getTime())
  }, 
  saveConfig: saveConfig,
}
