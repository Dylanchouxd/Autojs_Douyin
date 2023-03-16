// 抖音每日任务配置
const storageKsFansInteractive = storages.create('AutoJs_Ks__FansInteractive')
const prefix = 'fansInteractive_'

function saveConfig () {
  const inputs = [
    'interactiveLimit',
    'interactiveContent',
    'interactiveStartNickname'
  ]

  inputs.forEach((val) => {
    storageKsFansInteractive.put(val, ui[prefix + val].text())
  })
}

module.exports = {
  storageKsFansInteractive: storages.create('AutoJs_Ks__FansInteractive'),
  // 互动数量限制
  interactiveLimit: () => {
    return storageKsFansInteractive.get('interactiveLimit', '')
  },
  // 互动内容
  interactiveContent: () => {
    return storageKsFansInteractive.get('interactiveContent', '')
  },
  // 从XX昵称开始执行
  interactiveStartNickname: () => {
    return storageKsFansInteractive.get('interactiveStartNickname', '')
  },
  saveConfig: saveConfig,
}