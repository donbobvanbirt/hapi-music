'use strict';

// const Hapi = require('hapi');
//
// // Create a server with a host and port
// const server = new Hapi.Server();
// server.connection({
//     host: 'localhost',
//     port: 8000
// });
//
// // Add the route
// server.route({
//     method: 'GET',
//     path:'/',
//     handler: function (request, reply) {
//
//         return reply('hello world');
//     }
// });
//
// // Start the server
// server.start((err) => {
//
//     if (err) {
//         throw err;
//     }
//     console.log('Server running at:', server.info.uri);
// });

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: 3000 });

server.register(Inert, () => {});

// server.route({
//     method: 'GET',
//     path: '/{param*}',
//     handler: {
//         directory: {
//             path: '.',
//             redirectToSlash: true,
//             index: true
//         }
//     }
// });

server.route({
    method: 'GET',
    path: '/jane',
    handler: {
        file: 'jane.html'
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: 'home.html'
    }
});

// server.route({
//     method: 'GET',
//     path: '/{user?}',
//     handler: function (request, reply) {
//         reply({ file: `${encodeURIComponent(request.params.user)}.html` });
//     }
//     // handler: {
//     //     file: `${request.params.user}.html`
//     // }
// });

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
