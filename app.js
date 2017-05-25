'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    port: process.env.PORT
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    // Add the '/hello' route
    server.route({
        method: 'GET',
        path:'/image.png', 
        handler: function (request, reply) {
          var seconds = (new Date()).getSeconds(),
              image = ((seconds % 2) == 0) ? '/mario.png' : '/luigi.png';
            return reply().redirect(image);
        }
    });

    // static files
    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: function (request, reply) {
        reply.file('./public' + request.path);
      }
    });

    // Start the server
    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
