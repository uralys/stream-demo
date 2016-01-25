# Maperial.js : Streaming demo

Great, now you have access to Twitter firehose stream.
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

## Getting started
You may want to start from the begining with [maperial.js](https://github.com/maperial/maperial.js#getting-started), and come back here in 10mn.

## Your data
All you need to use this dynamical map is to transform your data to [GeoJson](http://geojson.org/) format.

```js
socket.on('points', function(points){
  data.addPoints(points);
});
```

`points` here is a `FeatureCollection` and your points must be pushed as `features`.

```geojson
{
  "type": "FeatureCollection",
  "features": [
    {
      "geometry": {
        "type": "Point",
        "coordinates": [
          24.45,
          59.26
        ]
      },
      "type": "Feature",
      "properties": {
        "name": "Tallinn, Estonia"
      }
    },
    {
      "geometry": {
        "type": "Point",
        "coordinates": [
          25.39,
          60.59
        ]
      },
      "type": "Feature",
      "properties": {
        "name": "Lahti, Finland"
      }
    }
  ]
}
```

## live demo
http://stream.maperial.com/

## BSD License
You may use Maperial.js in a free or commercial project, providing you follow the [BSD](http://www.linfo.org/bsdlicense.html) crediting requirements, provided in the project [LICENSE](https://github.com/maperial/maperial.js/blob/master/LICENSE)


