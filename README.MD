# 基于node的聊天室

本来看到了阿里云的[开发者性能挑战赛](https://tianchi.aliyun.com/competition/entrance/531907/introduction),有点兴趣就基于egg.js用node写了一个demo，但是后期时间比较紧，就没有好好搞部署相关的东西，也就放弃了，现在开源一下~

对应[blog](https://jiahui-qin.github.io/dragonFlyInSky.GitHub.io/2021/08/13/%E5%9F%BA%E4%BA%8Eegg-js%E7%9A%84%E8%81%8A%E5%A4%A9%E5%AE%A4%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1/#more)
## 后续改进点

针对每一个聊天室的聊天内容，我觉得可以用influxdb来存储，聊天室的id可以直接用来做measurement，感觉存储结构看起来更合适。

此外还有路由相关的，是不是用nginx之类来做代理速度会更快一些？

## 如何运行

    $ npm i
    $ npm run dev
    $ open http://localhost:7001/

## API列表

可以参考标题网址里的swagger文档，也可以参考本地[json](./chatRoomApi.json)

## 数据库

给在了这里[sql脚本](./chatroom.sql)