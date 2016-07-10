var server=require('node-http-server');

var config = new server.Config;

config.contentType['tag'] = config.contentType['html'];
config.contentType['woff2'] = config.contentType['font/woff2'];
config.contentType['woff'] = config.contentType['font/woff'];
config.contentType['ttf'] = config.contentType['font/ttf'];

config.port = 8000;
config.root = './'

server.deploy( config );