'use strict';

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
server.connection({ port: ~~process.env.PORT || 3000 });

server.register(Inert, (err) => {
    if (err) {
        throw err;
    }
});

server.route({
    method: 'GET',
    path: '/jane',
    handler: {
        file: 'jane.html'
    }
});

server.route({
    method: 'GET',
    path: '/jerry',
    handler: {
        file: 'jerry.html'
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: 'home.html'
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
