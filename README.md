# Yzb
养殖宝App
https://blog.csdn.net/u013718120/article/details/78344866

// 账户相关
code-push login 登陆
code-push logout 注销
code-push access-key ls 列出登陆的token
code-push access-key rm <accessKye> 删除某个 access-key

// app操作相关
code-push app add <appName> <platform> react-native  在账号里面添加一个新的app
code-push app remove 或者 rm 在账号里移除一个 app
code-push app rename 重命名一个存在 app
code-push app list 或则 ls 列出账号下面的所有 app
code-push app transfer 把app的所有权转移到另外一个账号

// 应用信息相关
code-push deployment add <appName> 部署
code-push deployment rm <appName> 删除部署
code-push deployment rename <appName> 重命名
code-push deployment ls <appName> 列出应用的部署情况
code-push deployment ls <appName> -k 查看部署的key
code-push deployment history <appName> <deploymentName> 查看历史版本

// 发布
code-push release-react <appName> <platform> -t 版本  -d 环境  --des 描述 -m true （强制更新）
// 清除历史部署记录
code-push deployment clear <appName> Production or Staging
// 回滚
code-push rollback <appName> Production --targetRelease v4(codepush服务部署的版本号)


---------------------本项目对应脚本示例---------------------
code-push deployment ls yzbAndroid
code-push deployment ls yzbAndroid -k
查看历史版本：
code-push deployment history yzbAndroid Staging
code-push deployment history yzbAndroid Production
清除版本历史
code-push deployment clear YzbAndroid Staging
code-push deployment clear YzbAndroid Production
发布新版本
code-push release-react YzbAndroid android --t 1.2.1 --dev false --d Staging --des "更新地理位置显示" --m true
推送到正式版
code-push promote YzbAndroid Staging Production


---------------------编译Staging版本脚本---------------------
react-native run-android --variant releaseStaging
---------------------生成生产包------------------------------
cd android & gradlew assembleRelease