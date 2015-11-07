
var app = require('./app')(),
	config = require('./config'),
	fs = require('fs'),
	http = require('http'),
	https = require('https'),
	privateKey  = fs.readFileSync(config.ssl.keySrc, config.ssl.format),
	certificate = fs.readFileSync(config.ssl.certSrc, config.ssl.format);

var credentials = {key: privateKey, cert: certificate};

if(config.ssl.https){

	var httpServer = http.createServer(function (req, res) {
		res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
		res.end();
	});
	var httpsServer = https.createServer(credentials, app);

	httpServer.listen(config.ports.http);
	httpsServer.listen(config.ports.https);
}else{
	var httpServer = http.createServer(app);

	httpServer.listen(config.ports.http);
}