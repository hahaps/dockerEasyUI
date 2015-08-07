## DockerEasyUI

![Overview](/images/overview.png)
DockerEasyUI provide a easy web interface to manage your docker. You can create containers, access to a container and pull image from web front.
It is not complete and still under heavy development.

![Container](/images/containers.png)
![Create container](/images/create_container.png)
![Container console](/images/console.png)
![Pull images](/images/pull_image.png)


### Goals
* Easier - To make management of docker easier is my best wish.
* Consistency - The web UI should be consistent with the commands found on the docker CLI.

### Run DockerEasyUI
1. Add `DOCKER_OPTS='-H 0.0.0.0:6732 -H unix:///var/run/docker.sock'` in /etc/default/docker.

2. Build DockerEasyUI image: `docker build -t dockereasyui`.

3. Run: `docker run -d -p 0.0.0.0:8088:8088 dockereasyui /nodejs/bin/node server.js <docker host ip> 6732`.

4. Open your browser to `http://<dockerd host ip>:8088`.

Or, you can start DockerEasyUI at you docker host.
1. Install nodejs: `apt-get install nodejs` or `yum install nodejs`.

2. Run: `node server.js <docker host ip> 6732`.

### Contribute to DockerEasyUI
If you want to make contribution to this project(With my greatest gratitude). Please do as follow:

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

### Stack
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
* Creat image from dockerFile.
* Events search
* History search
* Log search
* Muti docker management
* Some usefull apps(mysql, redis, apach, tomcat, etc.)
* Unit tests


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
