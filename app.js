///<reference path='./typings/node/node.d.ts'/>
///<reference path='./typings/hapi/hapi.d.ts'/>

var Hapi = require( 'hapi' );
var port = process.env.port || 80;
var server = new Hapi.Server(port);

server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('/public/main.html');
    }
},{
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '/public/'
        }
    }
},{
    method: 'GET',
    path: '/bower_components/{filename*}',
    handler: {
        directory: {
            path: '/bower_components/'
        }
    }
}]);

server.start(function () {
    //console.log('Server running at:', server.info.uri);
});