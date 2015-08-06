var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var DOCKER_HOST = "localhost";
var DOCKER_PORT = 6732;
var LISTEN_PORT = 8088;
var HOME_PATH = 'app';
var env_arguments = process.argv.splice(2);

if(env_arguments.length >= 1) {
  DOCKER_HOST = env_arguments[0];
}
if(env_arguments.length >= 2) {
  DOCKER_PORT = env_arguments[1];
}
if(env_arguments.length >= 3) {
  HOME_PATH = env_arguments[2];
}

// Mine types
var mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
    "map": "text/plain",
    "woff": "application/x-woff",
    "woff2": "application/font-woff2",
    "ttf": "application/x-ttf"
};

//helper function handles file verification
function getFile(filePath, res, page404, static, mine){
  //does the requested file exist?
  mine = mine ? mine : 'text/html';
  fs.exists(filePath, function(exists){
    //if it does...
    if(exists){
      //read the file, run the anonymous function
      fs.readFile(filePath, function(err, contents){
        if(!err){
          //if there was no error
          //send the contents with the default 200/ok header
          res.writeHead(200, {'Content-Type': mine});
          res.end(contents);
        } else {
          //for our own troubleshooting
          res.writeHead(500, mine);
          res.end('Server error.');
        };
      });
    } else if (!static){
      //if the requested file was not found
      //serve-up our custom 404 page
      fs.readFile(page404, function(err, contents){
        //if there was no error
        if(!err){
          //send the contents with a 404/not found header
          res.writeHead(404, {'Content-Type': mine});
          res.end(contents);
        } else {
          //for our own troubleshooting
          res.writeHead(500, mine);
          res.end('Server error.');
        };
      });
    } else {
      res.writeHead(404, mine);
      res.end("Failed to get file");
    };
  });
};

var hander = function(req, res) {
  if(req.url === '/') {
    var fileName = HOME_PATH + '/index.html';
    getFile(fileName, res, HOME_PATH + '/404.html');
  } else {
    var pathname = url.parse(req.url).pathname;
    var ext = path.extname(pathname);
    if(ext) {
      ext = ext ? ext.slice(1) : 'unknown';
      var realpath = __dirname;
      if(mine[ext] && pathname.indexOf('/bower_components') === 0) {
        realpath += pathname;
        getFile(realpath, res, HOME_PATH + '/404.html', true, mine[ext]);
      } else if (mine[ext]){
        realpath += '/' + HOME_PATH + pathname;
        getFile(realpath, res, HOME_PATH + '/404.html', true, mine[ext]);
      } else {
        res.writeHead(404, 'text/plain');
        res.end();
      }
    } else {
      requestListener(req, res);
    }
  }
};

var requestListener = function (req, res) {
  var baseURL = DOCKER_HOST,
      ops = {
        host: baseURL,
        port: DOCKER_PORT,
        path: req.url,
        method: req.method,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };

  if(req.url == "/console") {
    res.writeHead(200, "application/json");
    res.end('{"host": "' + DOCKER_HOST + '", "port": "' + DOCKER_PORT + '"}');
    return;
  }

  if(req.headers['x-registy-auth']) {
    ops.headers['x-registy-auth'] = req.headers['x-registy-auth'];
  }
  var resHandle = function (response) {
    var statusCode = response.statusCode;
    var str        = '';
    if(ops.headers['x-registy-auth']) {
      res.writeHead(statusCode, {
        'Content-type':'application/plain',
        'Transfer-Encoding': 'chunked',
        'Connection': 'Transfer-Encoding'
      });
    } else {
      res.writeHead(statusCode, 'application/json');
    }
    response.on('data', function (chunk, status) {
      str = chunk.toString('utf8');
      if(ops.headers['x-registy-auth']) {
        if(str[str.length - 1] != '\n') {
          str += '\n';
        }
      }
      res.write(str);
    });

    response.on('end', function () {
      res.end();
    });
  };
  var handerRequest = function(options) {
    var data = options.data;
    delete options.data;
    var requester = http.request(options, resHandle);
    requester.on('error', function(err) {
      res.writeHead(500, 'text/plain');
      res.end('Failed to connect to ' + baseURL);
    });
    if(data) {
      requester.write(data);
    }
    requester.end();
  };
  var resData = '';
  req.on('data', function(chunk) {
    resData += chunk.toString('utf8');
  });
  req.on('end', function() {
    ops.data = resData;
    handerRequest(ops);
  });
};

var server = http.createServer(hander);
server.listen(LISTEN_PORT);
