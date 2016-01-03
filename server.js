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

function send(socket){
    var points = selectPoints();
    socket.nbPoints += points.features.length;
    socket.emit('points', points);
}

// -----------------------------------------------------------------------------

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// -----------------------------------------------------------------------------

io.on('connection', function(socket){
    socket.nbPoints = 0;

    var emit = function(){
        if(socket.nbPoints < 4000){
            send(socket);
            setTimeout(emit, 35)
        }
    }

    emit();
});

// -----------------------------------------------------------------------------

http.listen(port, function() {
  process.stdout.write('[Listening] http://localhost:' + port);
});
