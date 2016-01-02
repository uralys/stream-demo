var app    = require('express')();
var http   = require('http').Server(app);
var io     = require('socket.io')(http);
var cities = require('./cities');

var port = process.env.PORT || 3000;

// -----------------------------------------------------------------------------

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -----------------------------------------------------------------------------

function warm(points){
    points.forEach(function(point){
        point.properties.diameter = 285000;
        point.properties.scale = 0.05;
    });
}

function selectPoints(){
    var start = random(1,390);
    var count = random(1,10);
    var points = {
        "type": "FeatureCollection"
    };

    points.features = cities.features.slice(start, start + count);
    warm(points.features);
    return points;
}

function send(){
    var points = selectPoints();
    io.emit('points', points);
}

// -----------------------------------------------------------------------------

app.get('/', function(req, res){
  console.log('---> asked for "/"');
  res.sendFile(__dirname + '/index.html');
});

// -----------------------------------------------------------------------------

io.on('connection', function(socket){
    var interval = setInterval(send, 25);

    socket.on('disconnect', function(){
        clearInterval(interval);
    });
});

// -----------------------------------------------------------------------------

http.listen(port, function() {
  process.stdout.write('--->  Server started : http://localhost:' + port + '\n');
});
