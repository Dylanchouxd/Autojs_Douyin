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
 * @return {boolean} true 执行
 */
function randomRun () {
  return Math.random() <= 0.5
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
 * 随机滑动
 */
function randomSwipe (time) {
  time = time || ramdomByFloat(300)
  const width = device.width;
  const height = device.height;

  smlMove(ramdomByFloat(width / 2), ramdomByFloat(height / 1.5), ramdomByFloat(width / 2), ramdomByFloat(height / 4), time);
}

/**
 * 直播间随机滑动
 */
function liveSwipe (time) {
  time = time || ramdomByFloat(300)
  const width = device.width;
  const height = device.height;

  smlMove(ramdomByFloat(460), ramdomByFloat(900), ramdomByFloat(500), ramdomByFloat(320), time);
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

module.exports = {
  strToNumber: strToNumber,
  randomRun: randomRun,
  getVerName: getVerName,
  clickContent: clickContent,
  clickButton: clickButton,
  randomSleep: randomSleep,
  randomSwipe: randomSwipe,
  liveSwipe: liveSwipe,
  random: random,
  ramdomByFloat: ramdomByFloat,
  smlMove: smlMove,
  bezierCurves: bezierCurves,
}