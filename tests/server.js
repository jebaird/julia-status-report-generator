var server=require('node-http-server');

var config = new server.Config;

config.contentType['tag'] = config.contentType['html'];

config.port = 8000;
config.root = './'

server.deploy( config );