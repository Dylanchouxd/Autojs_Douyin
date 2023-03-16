// 快手养号配置
const storagesKsYanghao = storages.create('AutoJs_Ks__yanghao')
const prefix = 'ksYanghao_'

function saveConfig () {
  const inputs = [
    'searchContent',
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
    // 'liveUserArea',
  ]
  inputs.forEach((val) => {
    storagesKsYanghao.put(val, ui[prefix + val].text())
  })
}

module.exports = {
  storagesKsYanghao: storages.create('AutoJs_Ks__yanghao'),
  // 搜索关键词
  searchContent: () => {
    return storagesKsYanghao.get('searchContent', '招聘')
  },
  // 观看多个直播间
  liveAmount: () => {
    return storagesKsYanghao.get('liveAmount', 10)
  },
  // 直播间人数区间
  liveMinPersonAmount: () => {
    return storagesKsYanghao.get('liveMinPersonAmount', '')
  },
  liveMaxPersonAmount: () => {
    return storagesKsYanghao.get('liveMaxPersonAmount', '')
  },
  // 直播间停留时间
  liveSkipMin: () => {
    return storagesKsYanghao.get('liveSkipMin', 60)
  },
  liveSkipMax: () => {
    return storagesKsYanghao.get('liveSkipMax', 120)
  },
  // 当日直播间关注人数上限
  dayLiveUserFocusLimit: () => {
    return storagesKsYanghao.get('dayLiveUserFocusLimit', '')
  },
  // 直播间关注人数上限
  liveUserFocusLimit: () => {
    return storagesKsYanghao.get('liveUserFocusLimit', '')
  },
  // 直播间用户性别筛选
  liveUserGender: () => {
    return storagesKsYanghao.get('liveUserGender', 0)
  },
  // 直播间用户关注数筛选
  liveUserFocusMin: () => {
    return storagesKsYanghao.get('liveUserFocusMin', 0)
  },
  liveUserFocusMax: () => {
    return storagesKsYanghao.get('liveUserFocusMax', '')
  },
  // 直播间用户粉丝数筛选
  liveUserFansMin: () => {
    return storagesKsYanghao.get('liveUserFansMin', 0)
  },
  liveUserFansMax: () => {
    return storagesKsYanghao.get('liveUserFansMax', '')
  },
  // // 直播间用户地区筛选
  // liveUserArea: () => {
  //   return storagesKsYanghao.get('liveUserArea', '')
  // },
  // 当日直播间关注人数数量
  dayLiveUserFocusAmount: () => {
    return storagesKsYanghao.get('dayLiveUserFocusAmount', 0)
  },
  // 脚本最后运行时间
  lastRunTime: () => {
    return storagesKsYanghao.get('lastRunTime', new Date().getTime())
  }, 
  saveConfig: saveConfig,
}
