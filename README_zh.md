## DockerEasyUI

![Overview](/images/overview.png)
DockerEasyUI 提供一个简洁管理docker的web入口. 你可以通过浏览器创建容器, 登陆容器及从docker hub获取镜像.
目前项目还未完成且正在紧密的开发中.

![Container](/images/containers.png)
![Create container](/images/create_container.png)
![Container console](/images/console.png)
![Pull images](/images/pull_image.png)


### 目标
* 简洁 - 让docker管理更加简单是我最大的目标.
* 一致性 - UI上的操作尽量能够和最新稳定版docker Remote API保持一致.

### 运行 DockerEasyUI
1. 添加 `DOCKER_OPTS='-H 0.0.0.0:6732 -H unix:///var/run/docker.sock'` 到 `/etc/default/docker`.

2. 制作 DockerEasyUI 镜像: `docker build -t dockereasyui`.

3. 运行命令: `docker run -d -p 0.0.0.0:8088:8088 dockereasyui /nodejs/bin/node server.js <docker host ip> 6732`.

4. 打开浏览器访问 `http://<dockerd host ip>:8088`.

或者, 也可以在docker运行主机上启动 DockerEasyUI 服务.
1. 安装 nodejs: `apt-get install nodejs` or `yum install nodejs`.

2. 运行命令: `node server.js <docker host ip> 6732`.

### 为 DockerEasyUI 做贡献
如果您想加入我们的开发(感谢您的贡献). 请按如下操作进行:

    # Pull DockerEasyUI from github.
    $ git clone https://github.com/hahaps/dockerEasyUI.git
    # Install nodejs/npm
    $ apt-get install nodejs
    # Install grunt-cli, bower
    $ npm install -g grunt-cli bower
    # Install dependencies
    $ cd DockerEasyUI
    $ bower install
    $ npm install
    # Start DockerEasyUI
    $ node server.js <docker host ip> 6732

### 引用的库
* [Angular.js](https://github.com/angular/angular.js)
* [Bootstrap](http://getbootstrap.com/)
* [bootstrap-table](https://github.com/wenzhixin/bootstrap-table)
* [bootstrap3-dialog](https://github.com/nakupanda/bootstrap3-dialog)
* [Nodejs](https://nodejs.org/)
* [Xterm.js](https://github.com/sourcelair/xterm.js)
* [animate.css](https://github.com/fgnass/spin.js/)


### Todo:
* Wiki
* i18n
* 从 dockerFile 创建镜像
* Events 查询
* 历史查询
* 日志查询
* 多 docker 管理
* 一些常用应用模版(mysql, redis, apach, tomcat, etc.)
* 单元测试


### License - MIT
The DockerEasyUI code is licensed under the MIT license.


**DockerEasyUI:**
Copyright (c) 2015 Li Xipeng. lixipeng@hihuron.com

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without 
restriction, including without limitation the rights to use, copy, 
modify, merge, publish, distribute, sublicense, and/or sell copies 
of the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, 
DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, 
TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH 
THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
