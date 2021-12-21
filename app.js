var secret = 'kWd4eUWg-xyXvfD';
var repository ='~/testrepo';
var port = 8080;

let http = require('http');
let crypto = require('crypto');

const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            console.log('Updating Local Project...')
            exec('cd ' + repository + ' && git pull');
        }
    });

    res.end();
}).listen(port);