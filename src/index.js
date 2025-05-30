import fs from 'fs';
import http from 'http';
import url from 'url';

const hostname = '127.0.0.1';
const port = 3009;

const server = http.createServer((request, response) => {
    const path = url.parse(request.url).pathname;
    let content = '';

    switch (path) {
    case '/':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        content = fs.readFileSync('public/index.html', 'utf8');
        console.log('HTTP', response.statusCode, request.url);
        break;
    case '/index.js':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/javascript');
        content = fs.readFileSync('public' + path, 'utf8');
        break;
    case '/main.css':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/css');
        content = fs.readFileSync('public' + path, 'utf8');
        break;
    case '/img/404.jpg':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/jpeg');
        content = fs.readFileSync('public' + path);
        break;
    case '/img/apple-touch-icon.png':
    case '/img/heart-rate-16.png':
    case '/img/heart-rate-24.png':
    case '/img/heart-rate-32.png':
    case '/img/heart-rate-64.png':
    case '/img/heart-rate-128.png':
    case '/img/heart-rate-256.png':
    case '/img/heart-rate-512.png':
        response.statusCode = 200;
        response.setHeader('Content-Type', 'image/png');
        content = fs.readFileSync('public' + path);
        break;
    default:
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        content = fs.readFileSync('public/404.html', 'utf8');
        console.log('HTTP', response.statusCode, request.url);
        break;
    }

    response.setHeader('Content-Length', Buffer.byteLength(content));
    response.setHeader('Expires', new Date().toUTCString());
    response.end(content);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
