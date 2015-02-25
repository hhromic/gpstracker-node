/**
 * Live GPS Tracker server.
 *
 * Hugo Hromic - http://github.com/hhromic
 * Apache 2.0 license
 */

// Required modules
var program = require('commander');
var log4js = require('log4js');
var express = require('express');
var websocket = require('websocket');

// Loggers
var logger = log4js.getLogger('gpstracker');
var updLogger = log4js.getLogger('update');
var wsLogger = log4js.getLogger('websocket');

// Setup and parse program arguments
program.version('1.0.0');
program.option('-p, --port <port>', 'server port [2223]', Number, 2223);
program.option('-c, --clients <json_file>', 'GPS clients data [clients.json]', 'clients.json');
program.parse(process.argv);

// Load GPS clients data and initialise lastUpd
var clients = require('./' + program.clients);
var lastUpd = {};

// Express App
var app = express();
app.enable('trust proxy');

// App server
var server = app.listen(program.port, function () {
  var host = server.address().address;
  var port = server.address().port;
  logger.info('server listening at http://%s:%s', host, port);
});

// Websocket server
var wsServer = new websocket.server({httpServer: server});
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    connection.on('close', function (reasonCode, description) {
        wsLogger.debug('%s disconnected', connection.remoteAddress);
    });
    connection.send(JSON.stringify({lastUpd: lastUpd}));
    wsLogger.debug('%s connected - protocol version %d',
        connection.remoteAddress, connection.webSocketVersion);
});

// GPS client update resource and static content
// speed = m/s, bearing = degrees from North to the East
app.get('/update', function (request, response) {
  var cid = request.query.cid;
  if (cid !== undefined && cid in clients) {
      lastUpd[cid] = {client: clients[cid], data: request.query};
      wsServer.broadcast(JSON.stringify(lastUpd[cid]));
      response.send('ok\n');
      updLogger.debug('%s sent %j', request.ip, request.query);  
  } else {
      response.send('invalid\n');
      updLogger.warn('invalid client \'%s\' from %s', cid, request.ip);
  }
});
app.use(express.static(__dirname + '/public'));
