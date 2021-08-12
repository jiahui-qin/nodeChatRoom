# 基于node的聊天室

本来看到了阿里云的[开发者性能挑战赛](https://tianchi.aliyun.com/competition/entrance/531907/introduction),有点兴趣就基于egg.js用node写了一个demo，但是后期时间比较紧，就没有好好搞部署相关的东西，也就放弃了，现在开源一下~

## 后续改进点

针对每一个聊天室的聊天内容，我觉得可以用influxdb来存储，聊天室的id可以直接用来做measurement，感觉存储结构看起来更合适。

## 如何运行
$ npm i
$ npm run dev
$ open http://localhost:7001/