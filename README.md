# DomainRIS_Mobile
this project is used on cellpthone when doctor need to check the patient imformation quickly  
###这是近期帮导师做的一个项目，因为之前没有熟悉过前端的相关内容，第一次写ES6标准下的Type Script，项目基于ionic，实现了基本的登陆界面，查询界面，报告界面，并附加了看图界面（非本人实现）。由于GitHub文件大小限制500M，故只上传了相关代码模块，依赖模块并没有push上去。APK包可以安装该软件，但由于URL配置均是在内网环境中，如需要正常使用，还是得修改APP中constant的全局URL配置。

###以下是APP截图，登陆页面实现登陆功能、记住登陆功能，如果在登陆有效时间内，会自动跳转到主界面

![登录页面](https://github.com/luozheming/DomainRIS_Mobile/blob/master/picture/1.png)

###主界面如下所示：
![2.png](https://github.com/luozheming/DomainRIS_Mobile/blob/master/picture/2.png)

###由*ngIf控制HRML显示能够依照不同的字段状态，动态显示相关内容。

###用户信息界面如下：
![3.png](https://github.com/luozheming/DomainRIS_Mobile/blob/master/picture/3.png)

###登陆进去以后会自动和服务器同步病人的报告信息，由于Angular采取双向数据绑定，当前端异步获取到后端数据便会自动显示在该界面当中。左划操作能进行登出以及设置的相关配置。（由于图像涉及病人隐私，故不在文档中显示，相关技术文档可参阅[CSDN](http://blog.csdn.net/lzm931105/article/details/78501553 "")）

![4.png](https://github.com/luozheming/DomainRIS_Mobile/blob/master/picture/4.png)
![5.png](https://github.com/luozheming/DomainRIS_Mobile/blob/master/picture/5.png)
