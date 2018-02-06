const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require("url");

var staticServer = {}

staticServer.respondNotFound = function(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
}

staticServer.respondFile = function(pathName, req, res) {
    const readStream = fs.createReadStream(pathName);
    readStream.pipe(res);
}

staticServer.respondRedirect = function(req, res) {
    const location = req.url + '/';
    res.writeHead(301, {
        'Location': location,
        'Content-Type': 'text/html'
    });
    res.end(`Redirecting to <a href='${location}'>${location}</a>`);
}

staticServer.respondDirectory = function(pathName, req, res) {
    const indexPagePath = path.join(pathName, "index.html");
    if (fs.existsSync(indexPagePath)) {
        staticServer.respondFile(indexPagePath, req, res);
    } else {
        fs.readdir(pathName, (err, files) => {
            if (err) {
                res.writeHead(500);
                return res.end(err);
            }
            const requestPath = url.parse(req.url).pathname;
            let content = `<h1>Index of ${requestPath}</h1>`;
            files.forEach(file => {
                let itemLink = path.join(requestPath,file);
                const stat = fs.statSync(path.join(pathName, file));
                if (stat && stat.isDirectory()) {
                    itemLink = path.join(itemLink, '/');
                }                 
                content += `<p><a href='${itemLink}'>${file}</a></p>`;
            });
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(content);
        });
    }
}

staticServer.hasTrailingSlash = function(path){
    if(path[path.length - 1] == '/' || path[path.length - 1] == '\\'){
        return true
    }
    return false
}

staticServer.routeHandler = function(pathName, req, res) {
    fs.stat(pathName, (err, stat) => {
        if (!err) {
            const requestedPath = url.parse(req.url).pathname;
            if (staticServer.hasTrailingSlash(requestedPath) && stat.isDirectory()) {
                staticServer.respondDirectory(pathName, req, res);
            } else if (stat.isDirectory()) {
                staticServer.respondRedirect(req, res);
            } else {
                staticServer.respondFile(pathName, req, res);
            }
        } else {
            staticServer.respondNotFound(req, res);
        }
    });
    
}

staticServer.init = function(config) {
    console.log("静态资源服务器已启动");  
    http.createServer((req, res) => {
        const pathName = path.join(config.RES_PATH, path.normalize(req.url));
        staticServer.routeHandler(pathName, req, res);
        // res.writeHead(200);
        // res.end(`Requeste path: ${pathName}`);
    }).listen(config.CLIENT_PORT, err => {
        if (err) {
            console.error(err);
            console.info('Failed to start server');
        } else {
            console.info(`Server started on port ${config.CLIENT_PORT}`);
        }
    });
}

module.exports = staticServer;

