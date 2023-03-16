function openApp (appName) {
  const appPackageName = app.getPackageName(appName)
  
  launch(appPackageName)
  waitForPackage(appPackageName, 300)

  log('打开' + appPackageName + '应用完成')
}

module.exports = openApp