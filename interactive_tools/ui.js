"ui";
const startKsFansInteractive = require('./modules/ksFansInteractive')
const storageKsFansInteractiveConfig = require('./config/storageKsFansInteractive');
const Utils = require('./utils/util')
const fillAppVersion = '10.9.21.28058' // 适配的版本
let isFillVer = true // 是否适配版本

ui.statusBarColor("#ffa466")
ui.layout(
  <frame>
    <vertical>
      <appbar>
        <toolbar id="toolbar" bg="#ffa466" title="互动助手"></toolbar>
        <tabs id="tabs" bg="#ffa466" />
      </appbar>
      <viewpager id="viewpager">
        {/* 快手粉丝互动 */}
        <ScrollView>
          <vertical>
            <card w="*" h="*" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
              <horizontal gravity="center_vertical">
                <View bg="#ffa466" h="*" w="5" />
                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                  <horizontal padding="0 5"><text text="[当前脚本版本]" textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text text="{{app.versionName}}" textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text text="[支持版本]" textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text text="快手 V{{fillAppVersion}}" textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text text="[支持版本APK下载地址]" textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text autoLink="all" text="https://www.wandoujia.com/apps/280621/history_v28058?spm=aligames_platform_ug.wdj_seo.0.0.64e342746LQPbg" textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text text="[功能说明] " textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text text="退出脚本：点击音量上即可退出脚本" textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text text="[任务介绍] " textSize="13sp" /></horizontal>
                  <horizontal padding="0 5"><text text="进行 我的-粉丝 列表，找寻无消息对话人员进行互动" textSize="13sp" /></horizontal>
                </vertical>
              </horizontal>
            </card>
            <card w="*" h="*" margin="10" cardCornerRadius="2dp" cardElevation="1dp" foreground="?selectableItemBackground">
              <horizontal gravity="center_vertical">
                <View bg="#ffa466" h="*" w="5" />
                <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                  <horizontal>
                    <text text="从当前用户昵称开始" />
                    <input w="*" textSize="14" hint="不填则从最顶部开始" id="fansInteractive_interactiveStartNickname" text="{{storageKsFansInteractiveConfig.interactiveStartNickname()}}" />
                  </horizontal>
                  <horizontal>
                    <text text="互动数量限制" />
                    <input w="*" textSize="14" inputType="number" hint="不填则无限制，完成后自动结束" id="fansInteractive_interactiveLimit" text="{{storageKsFansInteractiveConfig.interactiveLimit()}}" />
                  </horizontal>
                  <horizontal>
                    <text text="互动内容" />
                    <input w="*" textSize="14" inputType="textMultiLine" hint="每一个换行为一条内容" id="fansInteractive_interactiveContent" text="{{storageKsFansInteractiveConfig.interactiveContent()}}" />
                  </horizontal>
                </vertical>
              </horizontal>
            </card>
            <vertical padding="5">
              <horizontal>
                <button w="*" id="startKsFansInteractive" style="Widget.AppCompat.Button.Colored" bg="#ffa466" text="运行" />
              </horizontal>
            </vertical>
          </vertical>
        </ScrollView>
      </viewpager>
    </vertical>
  </frame>
)

// 检测当前版本是否适配
const checkVersionThreads = threads.start((() => {
  const nowAppVersion = Utils.getVerName(app.getPackageName("快手"))
  log("当前版本号：", nowAppVersion)
  if (nowAppVersion != fillAppVersion) {
    toastLog("当前您的快手版本与脚本不适配，请下载对应适配的版本")
    isFillVer = false
  }
  checkVersionThreads.interrupt()
}))

// tabs页
ui.viewpager.setTitles(["快手粉丝互动"])
ui.tabs.setupWithViewPager(ui.viewpager)

// 主要逻辑
function startMain () {
  storageKsFansInteractiveConfig.saveConfig()
  threads.start(function () {
    startKsFansInteractive()
  })
}

// 快手粉丝互动
ui.startKsFansInteractive.on("click", function () {
  auto.waitFor(); // 等待无障碍服务启动

  if (!isFillVer) {
    confirm("当前您的快手版本与脚本不适配，可能无法正常进行，请确认继续运行？")
      .then(res => {
        if (res) {
          startMain()
        }
      })
    return
  }

  startMain()
})

let clickCount = 0
let timeout = null
ui.toolbar.on("click", function () {
  // 连续点击6下则出现日志界面
  clickCount++
  timeout && clearTimeout(timeout)

  timeout = setTimeout(() => {
    clickCount = 0
  }, 2000);
  
  if (clickCount >= 6) {
    app.startActivity("console");
    clickCount = 0
  }
})

// ========= 调试 =========
// threads.start(function () {
// })
// ========= 调试 =========