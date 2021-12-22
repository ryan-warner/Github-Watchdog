var secret = 'kWd4eUWg-xyXvfD';
var repository ='/PersonalWesite';
var port = 8080;

let http = require('http');
let crypto = require('crypto');

const exec = require('child_process').exec;

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

        if (req.headers['x-hub-signature'] == sig) {
            console.log('Updating Local Project...')
            exec('cd ' + repository)
            exec('pm2 stop "sudo nom run prod')
            //exec('systemctl stop')
            exec('sudo git pull origin master');
            exec('pm2 start all')
        }
    });

    res.end();
}).listen(port);