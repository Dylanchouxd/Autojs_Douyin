// /**
//  * 格式化点赞和关注数
//  * XXX万之类的
//  * @param {string} val 
//  * @returns 
//  */
// function strToNumber (val) {
//   if (val.indexOf('w') !== -1) {
//     return Number(val.split('w')[0]) * 10000
//   } else if (val.indexOf('万') !== -1) {
//     return Number(val.split('万')[0]) * 10000
//   }

//   // 处理特殊关键词
//   if (val === '抢首评') {
//     return 0
//   }

//   return val
// }

// /**
//  * 50%的几率
//  * @return {boolean} true 执行
//  */
// function randomRun () {
//   return Math.random() <= 0.5
// }

// /**
//  * 通过文字内容模拟点击按钮
//  * @param content 按钮文字内容
//  * @param type 点击类型，默认为text点击
//  * @param sleepTime 等待时间，默认1000毫秒
//  */
// function clickContent (content, type, sleepTime) {
//   var type = type || "text";
//   var sleepTime = sleepTime || 1000;
//   var float = 1.25
//   var speed = 1
//   sleep(sleepTime * float * speed);
//   if (type == "text") {
//     var button = text(content).findOne();
//   } else {
//     var button = desc(content).findOne();
//   }
//   clickButton(button);
//   return button;
// }

// /**
//  * 根据控件的坐标范围随机模拟点击
//  * @param button
//  */
// function clickButton (button) {
//   var bounds = button.bounds();
//   press(random(bounds.left, bounds.right), random(bounds.top, bounds.bottom), random(50, 100));
// }
// /**
//  * 根据float倍数sleep随机时间
//  * @param time
//  */
// function randomSleep (time, speed) {
//   sleep(ramdomByFloat(time) * (speed || 1));
// }

// /**
//  * 随机滑动
//  */
// function randomSwipe (time) {
//   time = time || ramdomByFloat(300)
//   const width = device.width;
//   const height = device.height;

//   smlMove(ramdomByFloat(width / 2), ramdomByFloat(height / 1.5), ramdomByFloat(width / 2), ramdomByFloat(height / 4), time);
// }

// /**
//  * 直播间随机滑动
//  */
// function liveSwipe (time) {
//   time = time || ramdomByFloat(300)
//   const width = device.width;
//   const height = device.height;

//   smlMove(ramdomByFloat(460), ramdomByFloat(900), ramdomByFloat(500), ramdomByFloat(320), time);
// }

// /**
//  * 范围随机数生成
//  * @param min
//  * @param max
//  */
// function random (min, max) {
//   return Math.round(Math.random() * (max - min)) + min;
// }

// /**
//  * 根据float生成随机数
//  * @param number
//  */
// function ramdomByFloat (number, float) {
//   float = float || 1.25
//   return random(number, number * float);
// }

// /**
//  * 仿真随机带曲线滑动
//  * @param qx 起点x轴坐标
//  * @param qy 起点y轴坐标
//  * @param zx 终点x轴坐标
//  * @param zy 终点y轴坐标
//  * @param time 滑动时间，毫秒
//  */
// function smlMove (qx, qy, zx, zy, time) {
//   var xxy = [(time || ramdomByFloat(800))];
//   var point = [];
//   var dx0 = {
//     "x": qx,
//     "y": qy
//   };
//   var dx1 = {
//     "x": random(qx - 100, qx + 100),
//     "y": random(qy, qy + 50)
//   };
//   var dx2 = {
//     "x": random(zx - 100, zx + 100),
//     "y": random(zy, zy + 50),
//   };
//   var dx3 = {
//     "x": zx,
//     "y": zy
//   };
//   for (var i = 0; i < 4; i++) {
//     eval("point.push(dx" + i + ")");
//   }
//   ;
//   for (let i = 0; i < 1; i += 0.08) {
//     xxyy = [parseInt(bezierCurves(point, i).x), parseInt(bezierCurves(point, i).y)];
//     xxy.push(xxyy);
//   }
//   gesture.apply(null, xxy);
// };

// function bezierCurves (cp, t) {
//   cx = 3.0 * (cp[1].x - cp[0].x);
//   bx = 3.0 * (cp[2].x - cp[1].x) - cx;
//   ax = cp[3].x - cp[0].x - cx - bx;
//   cy = 3.0 * (cp[1].y - cp[0].y);
//   by = 3.0 * (cp[2].y - cp[1].y) - cy;
//   ay = cp[3].y - cp[0].y - cy - by;

//   tSquared = t * t;
//   tCubed = tSquared * t;
//   result = {
//     "x": 0,
//     "y": 0
//   };
//   result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
//   result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
//   return result;
// };


// /**
//  * 开始任务
//  */
// function startMission () {
//   const interactiveStartNickname = '山水墨迹*' // 是否滑动到指定用户后再执行
//   if (interactiveStartNickname) {
//     toastLog("滑动到 " + interactiveStartNickname + " 后再执行脚本")
//     swipeToNickname(interactiveStartNickname, startInteractive, {
//       startNickName: interactiveStartNickname
//     })
//   } else {
//     startInteractive()
//   }
// }

// /**
//  * 判断该用户是否进行互动
//  * @description 如果没有消息信息则代表还没有互动
//  * @returns {boolean} true 代表已互动
//  */
// function isAlreadyInteractive () {
//   return id("com.smile.gifmaker.im_plugin:id/message_item_root").find().length > 0
// }

// /**
//  * 滑动到指定用户的位置
//  * @param {string} nickName 用户昵称
//  * @param {function} callback 找到后回调
//  * @param {object|undefined} callbackParams 回调参数
//  */
// function swipeToNickname (nickName, callback, callbackParams) {
//   const targetEl = id("com.smile.gifmaker:id/name").text(nickName)
//   if (targetEl.exists()) {
//     toastLog("找到 " + nickName + " 用户")
//     callback && callback(callbackParams)
//   } else {
//     randomSwipe()
//     randomSleep(1000)
//     swipeToNickname(nickName, callback, callbackParams)
//   }
// }

// /**
//  * 开始互动
//  * @param {object} params 参数
//  * @param {string|null} params.startNickName 从当前用户昵称开始，如无则是null
//  */
// let totalInteractiveAmount = 0 // 总共互动人数总和
// let isInteractiveAmount = 0 // 当次已互动过的人数总和
// const isInteractiveList = [] // 保存已经互动的人昵称
// function startInteractive (params) {
//   try {
//     params = params ? params : {}

//     const fanElList = id("com.smile.gifmaker:id/follower_layout").className("android.view.ViewGroup").find()
//     const interactiveLimit = '' // 互动人数上限
//     fanElList.forEach((el) => {
//       // 到达设定的阈值的话则中止脚本
//       if (interactiveLimit && totalInteractiveAmount >= interactiveLimit) {
//         toastLog("达到设置上限，已互动 " + totalInteractiveAmount + " 人次，脚本退出。")
//         exit()
//         return
//       }

//       const userName = el.findOne(id("com.smile.gifmaker:id/name")).text()

//       // 如果有此变量，则此用户前面的用户都忽略处理
//       if (params.startNickName) {
//         if (userName !== params.startNickName) {
//           isInteractiveList.push(userName)
//         } else {
//           // 如果已处理了目标用户，则不需要再判断了
//           params.startNickName = null
//         }
//       }

//       // 跳过已处理过的用户
//       if (isInteractiveList.includes(userName)) {
//         isInteractiveAmount++
//         return
//       }

//       totalInteractiveAmount++
//       isInteractiveList.push(userName)

//       // 打开选项框
//       el.findOne(id("com.smile.gifmaker:id/more_btn")).click()
//       randomSleep(1000)
//       // 进入发私信界面
//       text("发私信").findOne(4000).parent().click()
//       randomSleep(1500)
//       // 判断是否已互动
//       if (!isAlreadyInteractive()) {
//         // 输入互动信息
//         let interactiveContent = "123"
//         if (!interactiveContent) {
//           toastLog("未配置互动内容，停止脚本")
//           exit()
//           return
//         }
//         interactiveContent = interactiveContent.split('\n')
//         interactiveContent.forEach((content) => {
//           // id("com.smile.gifmaker:id/editor").setText(content)
//           // randomSleep(500)
//           // // 发送信息
//           // id("com.smile.gifmaker:id/send_btn").findOne().click()
//           // randomSleep(1000)
//           toastLog("发送" + content)
//           randomSleep(500)
//         })
//       } else {
//         // 已互动则忽略
//         toastLog(userName + " 已互动，跳过。")
//       }
//       randomSleep(1000)
//       // 返回
//       id("com.smile.gifmaker.im_plugin:id/navi_normal_left").findOne(4000).click()
//       randomSleep(2000)
//     })

//     const isNoMore = id("com.smile.gifmaker:id/tv_hint").exists()
//     // 如果出现没有更多 || 当前已经处理的数量 等于 当前界面元素的数量 则代表已经没有更多了
//     if (isNoMore || isInteractiveAmount === fanElList.length) {
//       toastLog("没有更多数据了，已执行完成，脚本退出。")
//       exit()
//     } else {
//       toastLog("拉取更多数据")
//       randomSwipe()
//       randomSleep(2000)
//       startInteractive()
//     }
//   } catch (error) {
//     log("【Error】startInteractive ======= ", error)
//     startInteractive()
//   }
// }

// startMission()

// log(text("跳过").exists())
// if (text("跳过").exists()) {
//   log("发现首屏广告")
//   click("跳过")
//   toastLog("跳过首屏广告完成")
//   sleep(1000)
// }

// toastLog(app.versionCode)

function getVerName (package_name) {
  let pkgs = context.getPackageManager().getInstalledPackages(0).toArray();
  for (let i in pkgs) {
    if (pkgs[i].packageName.toString() === package_name) return pkgs[i].versionName;
  }
}

toastLog(getVerName(app.getPackageName("快手")))