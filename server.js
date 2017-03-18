const hapi = require('hapi');
const mongojs = require('mongojs');
const server = new hapi.Server();
server.connection({
	host: 'localhost',
	port: 4000
});

server.route({
	method: 'GET',
	path: '/books',
	handler: function(req, res){
		return res('prueba get....')
	}
})

server.app.db = mongojs('hapi-rest-mongo', ['books']);  

server.start((err) => {
	if(err){
		throw err;		
	}
	console.log('server running', server.info.uri)
})