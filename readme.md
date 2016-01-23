# Maperial.js : Streaming demo

So, good for you, now you have access to Twitter firehose stream.
How about drawing beautiful heatmaps to vizualise your data ?
This [map](http://stream.maperial.com/) is an example displaying dynamical points received from a fake stream,

You can do the same with your own streams with about 20 JavaScript lines client side.

```js
    var maperial = new Maperial();

    map = maperial.createMap({
      container: 'map',
      defaultZoom: 3,
      latitude: 50.916584,
      longitude: 3.136998
    });

    var data = maperial.createHeatmapData();

    var options = {
      fill: 'linear', // 'linear/gaussian'
      diameterUnit: 'meter'
    };

    map.addOCM();
    map.addHeatmapLayer(data, options);

    var socket = io();
    socket.on('points', function(points){
      data.addPoints(points);
    });
```

See details on github

## live demo
http://stream.maperial.com/
