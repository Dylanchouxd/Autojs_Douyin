/**
 * 格式化点赞和关注数
 * XXX万之类的
 * @param {string} val 
 * @returns 
 */
function strToNumber (val) {
  if (val.indexOf('w') !== -1) {
    return Number(val.split('w')[0]) * 10000
  } else if (val.indexOf('万') !== -1) {
    return Number(val.split('万')[0]) * 10000
  }

  // 处理特殊关键词
  if (val === '抢首评') {
    return 0
  }

  return val
}

/**
 * 50%的几率
 * @param {number} chance 几率
 * @return {boolean} true 执行
 */
function randomRun (chance) {
  chance = chance ? chance : 0.5
  return Math.random() <= chance
}

/**
 * 获取APP的版本号
 * @param {string} package_name 
 * @returns 
 */
function getVerName (package_name) {
  let pkgs = context.getPackageManager().getInstalledPackages(0).toArray();
  for (let i in pkgs) {
    if (pkgs[i].packageName.toString() === package_name) return pkgs[i].versionName;
  }
}

/**
 * 通过文字内容模拟点击按钮
 * @param content 按钮文字内容
 * @param type 点击类型，默认为text点击
 * @param sleepTime 等待时间，默认1000毫秒
 */
function clickContent (content, type, sleepTime) {
  var type = type || "text";
  var sleepTime = sleepTime || 1000;
  var float = 1.25
  var speed = 1
  sleep(sleepTime * float * speed);
  if (type == "text") {
    var button = text(content).findOne();
  } else {
    var button = desc(content).findOne();
  }
  clickButton(button);
  return button;
}

/**
 * 根据控件的坐标范围随机模拟点击
 * @param button
 */
function clickButton (button) {
  var bounds = button.bounds();
  press(random(bounds.left, bounds.right), random(bounds.top, bounds.bottom), random(50, 100));
}
/**
 * 根据float倍数sleep随机时间
 * @param time
 */
function randomSleep (time, speed) {
  sleep(ramdomByFloat(time) * (speed || 1));
}

/**
 * 范围随机数生成
 * @param min
 * @param max
 */
function random (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

/**
 * 根据float生成随机数
 * @param number
 */
function ramdomByFloat (number, float) {
  float = float || 1.25
  return random(number, number * float);
}

/**
 * 仿真随机带曲线滑动
 * @param qx 起点x轴坐标
 * @param qy 起点y轴坐标
 * @param zx 终点x轴坐标
 * @param zy 终点y轴坐标
 * @param time 滑动时间，毫秒
 */
function smlMove (qx, qy, zx, zy, time) {
  var xxy = [(time || ramdomByFloat(800))];
  var point = [];
  var dx0 = {
    "x": qx,
    "y": qy
  };
  var dx1 = {
    "x": random(qx - 100, qx + 100),
    "y": random(qy, qy + 50)
  };
  var dx2 = {
    "x": random(zx - 100, zx + 100),
    "y": random(zy, zy + 50),
  };
  var dx3 = {
    "x": zx,
    "y": zy
  };
  for (var i = 0; i < 4; i++) {
    eval("point.push(dx" + i + ")");
  }
  ;
  for (let i = 0; i < 1; i += 0.08) {
    xxyy = [parseInt(bezierCurves(point, i).x), parseInt(bezierCurves(point, i).y)];
    xxy.push(xxyy);
  }
  gesture.apply(null, xxy);
};

function bezierCurves (cp, t) {
  cx = 3.0 * (cp[1].x - cp[0].x);
  bx = 3.0 * (cp[2].x - cp[1].x) - cx;
  ax = cp[3].x - cp[0].x - cx - bx;
  cy = 3.0 * (cp[1].y - cp[0].y);
  by = 3.0 * (cp[2].y - cp[1].y) - cy;
  ay = cp[3].y - cp[0].y - cy - by;

  tSquared = t * t;
  tCubed = tSquared * t;
  result = {
    "x": 0,
    "y": 0
  };
  result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
  result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
  return result;
};

function strToNumber (val) {
  if (val.indexOf('w') !== -1) {
    return Number(val.split('w')[0]) * 10000
  } else if (val.indexOf('万') !== -1) {
    return Number(val.split('万')[0]) * 10000
  }

  // 处理特殊关键词
  if (val === '抢首评') {
    return 0
  }

  return val
}
// douyin
const homePageWidget = 'com.ss.android.ugc.aweme:id/wwb' // 首页按钮控件
const likeWidget = 'com.ss.android.ugc.aweme:id/ev4' // 视频点赞按钮控件
const commentWidget = 'com.ss.android.ugc.aweme:id/c+1' // 评论按钮控件
const commentPopupWidget = 'com.ss.android.ugc.aweme:id/tqf' // 评论框弹窗界面
const commentInputWidget = 'com.ss.android.ugc.aweme:id/c7p' // 评论输入框控件
const commentInputSendWidget = 'com.ss.android.ugc.aweme:id/c=1' // 评论发送控件
const commentCloseWidget = 'com.ss.android.ugc.aweme:id/back_btn' // 评论关闭控件
const collectWidget = 'com.ss.android.ugc.aweme:id/c32' // 收藏按钮控件
const liveClose = 'com.ss.android.ugc.aweme:id/root' // 关闭直播间
const livePersonAmountWidget = 'com.ss.android.ugc.aweme:id/p25' // 直播间人数控件
const liveUserCommentWidget = 'com.ss.android.ugc.aweme:id/text' // 直播间用户评论控件
const liveUserPopupTopWidget = 'com.ss.android.ugc.aweme:id/yc_' // 直播间用户详情上面区域
const liveUserPopupBottomWidget = 'com.ss.android.ugc.aweme:id/x7z' // 直播间用户详情下面区域
const liveUserFocusWidget = 'com.ss.android.ugc.aweme:id/09h' // 直播间用户详情关注数
const liveUserFansWidget = 'com.ss.android.ugc.aweme:id/09l' // 直播间用户详情粉丝数
const liveUserAvatar = 'com.ss.android.ugc.aweme:id/pm7' // 直播间用户详情头像
const liveUserInfoAreaWidget = 'com.ss.android.ugc.aweme:id/qfa' // 直播间进入用户详情页资料信息区域
const liveUserInfoPageWidget = 'com.ss.android.ugc.aweme:id/r8y' // 直播间用户详情页页面
const searchContainerWidget = 'com.ss.android.ugc.aweme:id/qcx' // 搜索框外层容器控件
const searchInputWidget = 'com.ss.android.ugc.aweme:id/et_search_kw' // 搜索页输入框控件
const searchButtonWidget = 'com.ss.android.ugc.aweme:id/z5o' // 搜索框搜索按钮控件
const searchTagWidget = 'android:id/text1' // 搜索页标签分类控件
const searchVideoWidget = 'com.ss.android.ugc.aweme:id/ttf' // 搜索页视频控件

function closeCommentPopup () {
  // 先判断是否在评论输入弹层上，是的话则先返回
  if (desc('插入图片').exists() && desc('at').exists() && desc('表情').exists()) {
    back()
    randomSleep(300)
  }
  
  // 然后判断输入框评论列表是否存在，存在就关闭
  if (id(commentPopupWidget).exists()) {
    id(commentCloseWidget).findOne().click()
    randomSleep(1000)
  }
}

closeCommentPopup()