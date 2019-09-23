mapboxgl.accessToken = 'pk.eyJ1IjoicmFkZGV2dXMiLCJhIjoiY2swc2FsMzk5MDBuaTNpa2dkeHBqNTdkdyJ9.YCqRU8MaZ7Qm7DTrC2Qfzw';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: [-103.59179687498357, 40.66995747013945],
zoom: 0
});


map.on('load', function() {
// Add a new source from our GeoJSON data and set the
// 'cluster' option to true. GL-JS will add the point_count property to your source data.
map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());

map.addSource("tornados", {
	type: "geojson",

	data : tornadoData,
	cluster: true,
	clusterMaxZoom: 14, // Max zoom to cluster points on
	clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
});
  

  map.addLayer({
	id: "clusters",
	type: "circle",
	source: "tornados",
	filter: ["has", "point_count"],
	paint: {
	// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
	// with three steps to implement three types of circles:
	//   * Blue, 20px circles when point count is less than 100
	//   * Yellow, 30px circles when point count is between 100 and 750
	//   * Pink, 40px circles when point count is greater than or equal to 750
	"circle-color": [
	"step",
	["get", "point_count"],
	"#51bbd6",
	100,
	"#f1f075",
	750,
	"#f28cb1"
	],
	"circle-radius": [
	"step",
	["get", "point_count"],
	20,
	100,
	30,
	750,
	40
	]
	}
	});
  
map.addLayer({
	id: "cluster-count",
	type: "symbol",
	source: "tornados",
	filter: ["has", "point_count"],
	layout: {
	"text-field": "{point_count_abbreviated}",
	"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
	"text-size": 12
	}
});
 
map.addLayer({
	id: "single-tornado",
	type: "circle",
	source: "tornados",
	filter: ["!", ["has", "point_count"]],
	paint: {
		"circle-color": "#FFA500",
		"circle-radius": 6,
		"circle-stroke-width": 1,
		"circle-stroke-color": "#000000"
	}
});
  
map.on('click', 'clusters', function (e) {
    
	var features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
	var clusterId = features[0].properties.cluster_id;

	map.getSource('tornados').getClusterExpansionZoom(clusterId, function (err, zoom) {
		if (err)
		return;
 
		map.easeTo({
			center: features[0].geometry.coordinates,
			zoom: zoom
		});
	});
});

var popup = new mapboxgl.Popup({
  closeButton: false,   
	closeOnClick: false
});

map.on('mouseenter', 'single-tornado', function (e) {
		map.getCanvas().style.cursor = 'pointer';
   //alert(e.features[0].geometry.coordinates);
    var coordinates = e.features[0].geometry.coordinates
    var tornadoInfo = e.features[0].properties.date 
    + "<br/>" + "len: " + e.features[0].properties.len + " mi" + "<br/>" + "width: " + e.features[0].properties.wid + " yds";
    popup.setLngLat(coordinates)
		  .setHTML(tornadoInfo)
		  .addTo(map);
});
 
map.on('mouseenter', 'clusters', function (e) {
		map.getCanvas().style.cursor = 'pointer';
    
});

  map.on('mouseleave', 'single-tornado', function () {
		map.getCanvas().style.cursor = '';
    popup.remove();
});


map.on('mouseleave', 'clusters', function () {
		map.getCanvas().style.cursor = '';
});

});


var tornadoData = { "type" : "Feature Collection",
   "features" : [
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.0210, 31.0707]},
       "properties" : { "date" : "2017-01-02", "len" : "2.5500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.7580, 30.5821]},
       "properties" : { "date" : "2017-01-02", "len" : "2.5700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5343, 30.5732]},
       "properties" : { "date" : "2017-01-02", "len" : "0.3000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.4362, 30.5618]},
       "properties" : { "date" : "2017-01-02", "len" : "1.2000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.3157, 30.5567]},
       "properties" : { "date" : "2017-01-02", "len" : "4.6400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.2502, 30.4543]},
       "properties" : { "date" : "2017-01-02", "len" : "2.7400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.5896, 31.3704]},
       "properties" : { "date" : "2017-01-02", "len" : "0.5400", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.4694, 30.6231]},
       "properties" : { "date" : "2017-01-02", "len" : "0.5400", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.3705, 31.0325]},
       "properties" : { "date" : "2017-01-02", "len" : "1.4000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.1952, 30.9446]},
       "properties" : { "date" : "2017-01-02", "len" : "1.6400", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.1408, 31.0602]},
       "properties" : { "date" : "2017-01-02", "len" : "2.8400", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.0663, 31.0967]},
       "properties" : { "date" : "2017-01-02", "len" : "1.0500", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9352, 31.6671]},
       "properties" : { "date" : "2017-01-02", "len" : "3.8900", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.8228, 31.8337]},
       "properties" : { "date" : "2017-01-02", "len" : "5.5900", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.5888, 31.6904]},
       "properties" : { "date" : "2017-01-02", "len" : "6.8100", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.4358, 30.9533]},
       "properties" : { "date" : "2017-01-02", "len" : "0.0800", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3515, 31.0883]},
       "properties" : { "date" : "2017-01-02", "len" : "3.9600", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.2267, 31.1158]},
       "properties" : { "date" : "2017-01-02", "len" : "0.8500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.9774, 31.8836]},
       "properties" : { "date" : "2017-01-02", "len" : "9.4300", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.6559, 31.7314]},
       "properties" : { "date" : "2017-01-02", "len" : "4.2000", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3335, 31.8590]},
       "properties" : { "date" : "2017-01-02", "len" : "3.8500", "wid" : "275"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.9019, 30.5895]},
       "properties" : { "date" : "2017-01-02", "len" : "0.0100", "wid" : "5"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.4591, 31.1190]},
       "properties" : { "date" : "2017-01-02", "len" : "8.3600", "wid" : "225"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.8100, 32.2600]},
       "properties" : { "date" : "2017-01-02", "len" : "1.5000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.8742, 32.0308]},
       "properties" : { "date" : "2017-01-02", "len" : "3.4000", "wid" : "485"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.6755, 31.9536]},
       "properties" : { "date" : "2017-01-02", "len" : "0.5900", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.5078, 31.1104]},
       "properties" : { "date" : "2017-01-02", "len" : "7.8200", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.3700, 31.1818]},
       "properties" : { "date" : "2017-01-02", "len" : "2.5200", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.0086, 31.2767]},
       "properties" : { "date" : "2017-01-02", "len" : "4.3400", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.9450, 30.9973]},
       "properties" : { "date" : "2017-01-02", "len" : "3.7300", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.9037, 31.2567]},
       "properties" : { "date" : "2017-01-02", "len" : "10.8700", "wid" : "1000"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.7196, 31.3690]},
       "properties" : { "date" : "2017-01-02", "len" : "4.4300", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.5714, 31.1844]},
       "properties" : { "date" : "2017-01-02", "len" : "9.9100", "wid" : "1000"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.5174, 31.4846]},
       "properties" : { "date" : "2017-01-02", "len" : "0.6600", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.1640, 31.4107]},
       "properties" : { "date" : "2017-01-02", "len" : "3.9700", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.0093, 31.6417]},
       "properties" : { "date" : "2017-01-02", "len" : "8.9500", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.0506, 30.2745]},
       "properties" : { "date" : "2017-01-07", "len" : "0.2400", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-121.3272, 38.8491]},
       "properties" : { "date" : "2017-01-09", "len" : "0.1800", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-121.4805, 38.6267]},
       "properties" : { "date" : "2017-01-11", "len" : "0.4200", "wid" : "130"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.5820, 30.7220]},
       "properties" : { "date" : "2017-01-13", "len" : "1.1900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.1140, 30.9217]},
       "properties" : { "date" : "2017-01-15", "len" : "1.2500", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.6700, 31.4900]},
       "properties" : { "date" : "2017-01-15", "len" : "12.9200", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.5800, 31.7700]},
       "properties" : { "date" : "2017-01-15", "len" : "1.3800", "wid" : "120"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.4266, 31.9115]},
       "properties" : { "date" : "2017-01-15", "len" : "6.5000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.2111, 31.0817]},
       "properties" : { "date" : "2017-01-15", "len" : "1.9900", "wid" : "450"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.1200, 32.5200]},
       "properties" : { "date" : "2017-01-15", "len" : "3.0700", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.0340, 32.6900]},
       "properties" : { "date" : "2017-01-15", "len" : "0.3100", "wid" : "80"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.5500, 31.6900]},
       "properties" : { "date" : "2017-01-16", "len" : "3.1300", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.5648, 29.9302]},
       "properties" : { "date" : "2017-01-16", "len" : "0.1000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.4498, 30.0850]},
       "properties" : { "date" : "2017-01-16", "len" : "0.1000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.4339, 30.1276]},
       "properties" : { "date" : "2017-01-16", "len" : "0.2000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.6172, 30.9883]},
       "properties" : { "date" : "2017-01-18", "len" : "0.6000", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.6690, 31.8672]},
       "properties" : { "date" : "2017-01-19", "len" : "19.2600", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.3045, 33.4785]},
       "properties" : { "date" : "2017-01-19", "len" : "0.7000", "wid" : "175"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.4799, 31.1855]},
       "properties" : { "date" : "2017-01-21", "len" : "31.0600", "wid" : "900"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.2905, 31.8476]},
       "properties" : { "date" : "2017-01-21", "len" : "20.4200", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.7823, 32.0988]},
       "properties" : { "date" : "2017-01-21", "len" : "4.1700", "wid" : "900"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.0487, 32.9792]},
       "properties" : { "date" : "2017-01-21", "len" : "5.4200", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.1733, 32.4692]},
       "properties" : { "date" : "2017-01-21", "len" : "0.6800", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.2179, 32.5299]},
       "properties" : { "date" : "2017-01-21", "len" : "1.5300", "wid" : "450"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.1064, 32.4359]},
       "properties" : { "date" : "2017-01-21", "len" : "0.2100", "wid" : "90"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.4557, 32.4740]},
       "properties" : { "date" : "2017-01-21", "len" : "2.8400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.4825, 32.5267]},
       "properties" : { "date" : "2017-01-21", "len" : "2.3800", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.1345, 31.7870]},
       "properties" : { "date" : "2017-01-21", "len" : "37.3400", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.3572, 32.5626]},
       "properties" : { "date" : "2017-01-21", "len" : "1.0700", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.3677, 32.6138]},
       "properties" : { "date" : "2017-01-21", "len" : "0.8300", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.2189, 32.4811]},
       "properties" : { "date" : "2017-01-21", "len" : "0.1200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.1094, 32.5294]},
       "properties" : { "date" : "2017-01-21", "len" : "0.9200", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.9462, 32.6182]},
       "properties" : { "date" : "2017-01-21", "len" : "10.8400", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.6379, 32.7684]},
       "properties" : { "date" : "2017-01-21", "len" : "1.9200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.5331, 32.8097]},
       "properties" : { "date" : "2017-01-21", "len" : "9.5200", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.3997, 32.5937]},
       "properties" : { "date" : "2017-01-21", "len" : "12.2500", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.4239, 32.8318]},
       "properties" : { "date" : "2017-01-21", "len" : "5.6800", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.4077, 32.8477]},
       "properties" : { "date" : "2017-01-21", "len" : "5.2600", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.3600, 32.9182]},
       "properties" : { "date" : "2017-01-21", "len" : "0.7800", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.3131, 32.9499]},
       "properties" : { "date" : "2017-01-21", "len" : "1.8700", "wid" : "175"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.0090, 32.4111]},
       "properties" : { "date" : "2017-01-21", "len" : "8.9200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.8972, 32.9113]},
       "properties" : { "date" : "2017-01-21", "len" : "8.8400", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.7901, 32.5114]},
       "properties" : { "date" : "2017-01-21", "len" : "12.8500", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.3850, 32.5350]},
       "properties" : { "date" : "2017-01-21", "len" : "4.2300", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.3130, 32.4440]},
       "properties" : { "date" : "2017-01-21", "len" : "4.3200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.1700, 32.7970]},
       "properties" : { "date" : "2017-01-21", "len" : "5.8400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.3430, 33.1792]},
       "properties" : { "date" : "2017-01-21", "len" : "0.5700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.9150, 32.6710]},
       "properties" : { "date" : "2017-01-21", "len" : "2.1800", "wid" : "85"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.0967, 33.0525]},
       "properties" : { "date" : "2017-01-21", "len" : "0.5300", "wid" : "70"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.6410, 32.6880]},
       "properties" : { "date" : "2017-01-21", "len" : "6.3900", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.8200, 32.8960]},
       "properties" : { "date" : "2017-01-21", "len" : "2.5900", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.7790, 32.9240]},
       "properties" : { "date" : "2017-01-21", "len" : "1.3000", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.7300, 32.9500]},
       "properties" : { "date" : "2017-01-21", "len" : "8.3800", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.2922, 32.8601]},
       "properties" : { "date" : "2017-01-21", "len" : "1.3000", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.1848, 32.6596]},
       "properties" : { "date" : "2017-01-21", "len" : "4.8000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.1649, 32.9581]},
       "properties" : { "date" : "2017-01-21", "len" : "1.5000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.9642, 33.0648]},
       "properties" : { "date" : "2017-01-21", "len" : "1.0000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.7600, 32.8200]},
       "properties" : { "date" : "2017-01-21", "len" : "0.6900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.0900, 31.9300]},
       "properties" : { "date" : "2017-01-21", "len" : "0.9100", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.6100, 32.7800]},
       "properties" : { "date" : "2017-01-21", "len" : "2.7000", "wid" : "525"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.3711, 33.3089]},
       "properties" : { "date" : "2017-01-21", "len" : "13.7800", "wid" : "1600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.0839, 33.3761]},
       "properties" : { "date" : "2017-01-21", "len" : "5.4700", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.2529, 32.5199]},
       "properties" : { "date" : "2017-01-21", "len" : "6.9300", "wid" : "230"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.4179, 32.7724]},
       "properties" : { "date" : "2017-01-21", "len" : "0.8100", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.1962, 32.8087]},
       "properties" : { "date" : "2017-01-21", "len" : "13.3600", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.1962, 32.8087]},
       "properties" : { "date" : "2017-01-21", "len" : "10.9900", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.0431, 32.9020]},
       "properties" : { "date" : "2017-01-21", "len" : "2.3700", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.6432, 32.8883]},
       "properties" : { "date" : "2017-01-21", "len" : "10.7900", "wid" : "990"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.3193, 32.8875]},
       "properties" : { "date" : "2017-01-21", "len" : "3.5000", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.0381, 31.6824]},
       "properties" : { "date" : "2017-01-21", "len" : "2.0400", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.7473, 31.5566]},
       "properties" : { "date" : "2017-01-21", "len" : "2.2300", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.8070, 33.1731]},
       "properties" : { "date" : "2017-01-21", "len" : "2.8900", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.4782, 33.1908]},
       "properties" : { "date" : "2017-01-21", "len" : "0.6100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.4199, 31.6287]},
       "properties" : { "date" : "2017-01-21", "len" : "1.2400", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.1562, 31.6792]},
       "properties" : { "date" : "2017-01-21", "len" : "0.1600", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.8200, 33.2393]},
       "properties" : { "date" : "2017-01-21", "len" : "0.6700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.1666, 32.8663]},
       "properties" : { "date" : "2017-01-21", "len" : "0.6200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.7873, 32.8212]},
       "properties" : { "date" : "2017-01-21", "len" : "8.8700", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.6020, 32.4914]},
       "properties" : { "date" : "2017-01-21", "len" : "7.2800", "wid" : "550"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.9821, 30.8997]},
       "properties" : { "date" : "2017-01-22", "len" : "18.6700", "wid" : "700"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.5841, 30.9998]},
       "properties" : { "date" : "2017-01-22", "len" : "24.6600", "wid" : "700"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.6700, 32.0100]},
       "properties" : { "date" : "2017-01-22", "len" : "0.5900", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.0281, 31.4020]},
       "properties" : { "date" : "2017-01-22", "len" : "3.1100", "wid" : "1200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.5428, 31.7404]},
       "properties" : { "date" : "2017-01-22", "len" : "11.1200", "wid" : "1900"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.3891, 30.8897]},
       "properties" : { "date" : "2017-01-22", "len" : "4.8400", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.3412, 33.0439]},
       "properties" : { "date" : "2017-01-22", "len" : "0.2800", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.2515, 31.3377]},
       "properties" : { "date" : "2017-01-22", "len" : "5.5200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.9570, 32.1254]},
       "properties" : { "date" : "2017-01-22", "len" : "1.9800", "wid" : "320"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.8654, 31.5704]},
       "properties" : { "date" : "2017-01-22", "len" : "12.0300", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.5572, 32.5302]},
       "properties" : { "date" : "2017-01-22", "len" : "4.7600", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.9188, 29.8217]},
       "properties" : { "date" : "2017-01-22", "len" : "2.3600", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.4207, 32.6262]},
       "properties" : { "date" : "2017-01-22", "len" : "3.0800", "wid" : "540"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.3447, 31.4373]},
       "properties" : { "date" : "2017-01-22", "len" : "70.4000", "wid" : "2200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.8080, 31.9160]},
       "properties" : { "date" : "2017-01-22", "len" : "6.9300", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.6168, 31.8040]},
       "properties" : { "date" : "2017-01-22", "len" : "0.2900", "wid" : "900"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.3588, 32.4220]},
       "properties" : { "date" : "2017-01-22", "len" : "2.2400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.3170, 32.5240]},
       "properties" : { "date" : "2017-01-22", "len" : "0.5600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.0281, 31.4020]},
       "properties" : { "date" : "2017-01-22", "len" : "3.1100", "wid" : "1200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.8579, 30.9007]},
       "properties" : { "date" : "2017-01-22", "len" : "16.6400", "wid" : "120"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.8902, 30.9541]},
       "properties" : { "date" : "2017-01-22", "len" : "1.6500", "wid" : "120"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.3272, 26.7896]},
       "properties" : { "date" : "2017-01-23", "len" : "3.2200", "wid" : "90"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.1432, 26.8596]},
       "properties" : { "date" : "2017-01-23", "len" : "5.7900", "wid" : "130"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.3258, 25.8162]},
       "properties" : { "date" : "2017-01-23", "len" : "2.7900", "wid" : "123"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.5748, 36.2790]},
       "properties" : { "date" : "2017-02-07", "len" : "0.5000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.5857, 30.3128]},
       "properties" : { "date" : "2017-02-07", "len" : "23.0800", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.1782, 29.9611]},
       "properties" : { "date" : "2017-02-07", "len" : "0.9500", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.0050, 30.0975]},
       "properties" : { "date" : "2017-02-07", "len" : "6.1300", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0000, 30.0105]},
       "properties" : { "date" : "2017-02-07", "len" : "10.0900", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9030, 30.6210]},
       "properties" : { "date" : "2017-02-07", "len" : "6.4300", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.6200, 30.6331]},
       "properties" : { "date" : "2017-02-07", "len" : "0.2600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.0530, 32.2737]},
       "properties" : { "date" : "2017-02-07", "len" : "0.2000", "wid" : "85"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.4634, 31.3141]},
       "properties" : { "date" : "2017-02-07", "len" : "0.5100", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.9057, 32.6234]},
       "properties" : { "date" : "2017-02-07", "len" : "2.3100", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5248, 32.4393]},
       "properties" : { "date" : "2017-02-07", "len" : "4.8300", "wid" : "880"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.1177, 32.1479]},
       "properties" : { "date" : "2017-02-07", "len" : "3.0900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.9365, 36.8842]},
       "properties" : { "date" : "2017-02-07", "len" : "1.8400", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.0734, 30.0460]},
       "properties" : { "date" : "2017-02-07", "len" : "1.0600", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.5300, 29.9600]},
       "properties" : { "date" : "2017-02-07", "len" : "0.5300", "wid" : "160"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.5600, 32.3400]},
       "properties" : { "date" : "2017-02-09", "len" : "9.8100", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.0900, 29.3340]},
       "properties" : { "date" : "2017-02-14", "len" : "1.0000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.8997, 29.0227]},
       "properties" : { "date" : "2017-02-14", "len" : "1.7200", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.7149, 29.5410]},
       "properties" : { "date" : "2017-02-14", "len" : "0.6800", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.7016, 29.5414]},
       "properties" : { "date" : "2017-02-14", "len" : "0.6000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.5668, 29.6335]},
       "properties" : { "date" : "2017-02-14", "len" : "0.4000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.5819, 29.5920]},
       "properties" : { "date" : "2017-02-14", "len" : "0.7600", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.7460, 29.0364]},
       "properties" : { "date" : "2017-02-14", "len" : "1.4900", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.0012, 33.9429]},
       "properties" : { "date" : "2017-02-15", "len" : "4.9200", "wid" : "60"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-78.6088, 34.0060]},
       "properties" : { "date" : "2017-02-15", "len" : "3.1800", "wid" : "60"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.4991, 29.4907]},
       "properties" : { "date" : "2017-02-19", "len" : "4.6400", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.3601, 29.5016]},
       "properties" : { "date" : "2017-02-19", "len" : "1.6100", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.4117, 29.5551]},
       "properties" : { "date" : "2017-02-19", "len" : "3.0000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.2650, 29.6714]},
       "properties" : { "date" : "2017-02-19", "len" : "0.7000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.9487, 29.4605]},
       "properties" : { "date" : "2017-02-19", "len" : "0.2300", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.0480, 29.9156]},
       "properties" : { "date" : "2017-02-19", "len" : "9.7500", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.7415, 30.0361]},
       "properties" : { "date" : "2017-02-19", "len" : "3.0000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.3594, 30.5501]},
       "properties" : { "date" : "2017-02-20", "len" : "9.4000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.3525, 30.5443]},
       "properties" : { "date" : "2017-02-20", "len" : "4.2400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-75.7638, 41.2525]},
       "properties" : { "date" : "2017-02-25", "len" : "12.5200", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.9841, 38.5551]},
       "properties" : { "date" : "2017-02-25", "len" : "8.4400", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.5922, 39.9982]},
       "properties" : { "date" : "2017-02-25", "len" : "1.7000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-72.7970, 42.4086]},
       "properties" : { "date" : "2017-02-25", "len" : "2.9000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-72.7528, 42.4850]},
       "properties" : { "date" : "2017-02-25", "len" : "4.6400", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3582, 41.7535]},
       "properties" : { "date" : "2017-02-28", "len" : "0.0400", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.7134, 41.1113]},
       "properties" : { "date" : "2017-02-28", "len" : "5.5300", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.1627, 41.2785]},
       "properties" : { "date" : "2017-02-28", "len" : "1.7500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.9504, 41.3239]},
       "properties" : { "date" : "2017-02-28", "len" : "11.5000", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.7512, 41.8883]},
       "properties" : { "date" : "2017-02-28", "len" : "2.6200", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.7066, 41.3648]},
       "properties" : { "date" : "2017-02-28", "len" : "2.8000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.5841, 41.3753]},
       "properties" : { "date" : "2017-02-28", "len" : "1.2000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3098, 41.9478]},
       "properties" : { "date" : "2017-02-28", "len" : "1.5000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.6086, 40.8645]},
       "properties" : { "date" : "2017-02-28", "len" : "0.0700", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5212, 40.8780]},
       "properties" : { "date" : "2017-02-28", "len" : "0.8900", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3609, 40.9128]},
       "properties" : { "date" : "2017-02-28", "len" : "17.7700", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.9865, 40.9856]},
       "properties" : { "date" : "2017-02-28", "len" : "4.5000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9138, 37.4409]},
       "properties" : { "date" : "2017-02-28", "len" : "4.3600", "wid" : "80"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.7300, 35.1900]},
       "properties" : { "date" : "2017-02-28", "len" : "1.3700", "wid" : "120"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.6800, 35.2200]},
       "properties" : { "date" : "2017-02-28", "len" : "1.1000", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.4997, 37.5777]},
       "properties" : { "date" : "2017-02-28", "len" : "4.4400", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0055, 37.7238]},
       "properties" : { "date" : "2017-02-28", "len" : "53.4700", "wid" : "1100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0055, 37.7238]},
       "properties" : { "date" : "2017-02-28", "len" : "17.3900", "wid" : "1100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.7124, 37.8222]},
       "properties" : { "date" : "2017-02-28", "len" : "36.0800", "wid" : "850"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.2407, 41.8310]},
       "properties" : { "date" : "2017-02-28", "len" : "0.5700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.1760, 41.9478]},
       "properties" : { "date" : "2017-02-28", "len" : "4.9900", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.9497, 41.8782]},
       "properties" : { "date" : "2017-02-28", "len" : "2.7000", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.4913, 41.9176]},
       "properties" : { "date" : "2017-02-28", "len" : "2.0400", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.6636, 39.8845]},
       "properties" : { "date" : "2017-02-28", "len" : "0.6600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.2608, 41.4151]},
       "properties" : { "date" : "2017-02-28", "len" : "2.3300", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.1148, 38.1370]},
       "properties" : { "date" : "2017-02-28", "len" : "44.1300", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.1148, 38.1370]},
       "properties" : { "date" : "2017-02-28", "len" : "9.5600", "wid" : "420"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.9474, 38.1797]},
       "properties" : { "date" : "2017-02-28", "len" : "34.5700", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.5311, 36.5021]},
       "properties" : { "date" : "2017-02-28", "len" : "8.8000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.9603, 37.6503]},
       "properties" : { "date" : "2017-02-28", "len" : "0.1000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.8200, 37.6300]},
       "properties" : { "date" : "2017-02-28", "len" : "0.1000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.0626, 37.7385]},
       "properties" : { "date" : "2017-02-28", "len" : "7.3600", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.0710, 38.4040]},
       "properties" : { "date" : "2017-02-28", "len" : "5.8000", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.8813, 36.7365]},
       "properties" : { "date" : "2017-02-28", "len" : "8.5800", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.1067, 37.6839]},
       "properties" : { "date" : "2017-03-01", "len" : "1.0000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.8800, 37.1840]},
       "properties" : { "date" : "2017-03-01", "len" : "0.7800", "wid" : "90"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.3852, 35.4203]},
       "properties" : { "date" : "2017-03-01", "len" : "0.1400", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.5968, 39.2991]},
       "properties" : { "date" : "2017-03-01", "len" : "6.8700", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.4669, 39.2754]},
       "properties" : { "date" : "2017-03-01", "len" : "4.5300", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.6235, 35.4372]},
       "properties" : { "date" : "2017-03-01", "len" : "1.0000", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.5602, 35.4439]},
       "properties" : { "date" : "2017-03-01", "len" : "1.1000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.2345, 35.4617]},
       "properties" : { "date" : "2017-03-01", "len" : "3.9000", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.2955, 39.0258]},
       "properties" : { "date" : "2017-03-01", "len" : "6.3900", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.4619, 35.4538]},
       "properties" : { "date" : "2017-03-01", "len" : "4.2400", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.2627, 35.6362]},
       "properties" : { "date" : "2017-03-01", "len" : "1.6000", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.1394, 38.5991]},
       "properties" : { "date" : "2017-03-01", "len" : "0.1500", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.0782, 38.6573]},
       "properties" : { "date" : "2017-03-01", "len" : "1.5200", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3705, 37.7013]},
       "properties" : { "date" : "2017-03-01", "len" : "4.1100", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.0011, 38.6443]},
       "properties" : { "date" : "2017-03-01", "len" : "0.0400", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.5129, 38.7281]},
       "properties" : { "date" : "2017-03-01", "len" : "0.2100", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.3406, 38.6900]},
       "properties" : { "date" : "2017-03-01", "len" : "0.6800", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5762, 36.8203]},
       "properties" : { "date" : "2017-03-01", "len" : "15.2100", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.2800, 38.6810]},
       "properties" : { "date" : "2017-03-01", "len" : "5.8000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.0166, 38.7991]},
       "properties" : { "date" : "2017-03-01", "len" : "0.2500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3566, 36.0422]},
       "properties" : { "date" : "2017-03-01", "len" : "3.7100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.9520, 38.4680]},
       "properties" : { "date" : "2017-03-01", "len" : "0.3300", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.7840, 38.6270]},
       "properties" : { "date" : "2017-03-01", "len" : "2.1500", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.6263, 36.5827]},
       "properties" : { "date" : "2017-03-01", "len" : "1.5500", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.2110, 38.5530]},
       "properties" : { "date" : "2017-03-01", "len" : "1.0800", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.3925, 39.0699]},
       "properties" : { "date" : "2017-03-01", "len" : "1.0500", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.6814, 39.1078]},
       "properties" : { "date" : "2017-03-01", "len" : "2.1900", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.8350, 36.6590]},
       "properties" : { "date" : "2017-03-01", "len" : "1.5700", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.8830, 35.9545]},
       "properties" : { "date" : "2017-03-01", "len" : "10.4800", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.0228, 39.1583]},
       "properties" : { "date" : "2017-03-01", "len" : "0.5700", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.5971, 36.0398]},
       "properties" : { "date" : "2017-03-01", "len" : "3.1500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.2730, 36.9060]},
       "properties" : { "date" : "2017-03-01", "len" : "2.6300", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.2501, 36.0971]},
       "properties" : { "date" : "2017-03-01", "len" : "3.3200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.1678, 36.0989]},
       "properties" : { "date" : "2017-03-01", "len" : "7.1700", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.9809, 36.1167]},
       "properties" : { "date" : "2017-03-01", "len" : "3.9100", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.7526, 36.1461]},
       "properties" : { "date" : "2017-03-01", "len" : "7.6200", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.1854, 39.0577]},
       "properties" : { "date" : "2017-03-01", "len" : "0.0500", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.2377, 36.1500]},
       "properties" : { "date" : "2017-03-01", "len" : "0.1100", "wid" : "90"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.8207, 34.7755]},
       "properties" : { "date" : "2017-03-01", "len" : "2.8800", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.1457, 28.8844]},
       "properties" : { "date" : "2017-03-05", "len" : "0.0100", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.5600, 28.9400]},
       "properties" : { "date" : "2017-03-05", "len" : "0.0100", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8204, 43.5701]},
       "properties" : { "date" : "2017-03-06", "len" : "9.3200", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.2041, 42.2348]},
       "properties" : { "date" : "2017-03-06", "len" : "2.3800", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.1476, 42.2720]},
       "properties" : { "date" : "2017-03-06", "len" : "2.8700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.5376, 39.0539]},
       "properties" : { "date" : "2017-03-06", "len" : "0.1000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.3829, 39.1548]},
       "properties" : { "date" : "2017-03-06", "len" : "16.0600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.3200, 39.2934]},
       "properties" : { "date" : "2017-03-06", "len" : "0.0100", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.4000, 39.0079]},
       "properties" : { "date" : "2017-03-06", "len" : "0.1200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.3505, 43.7356]},
       "properties" : { "date" : "2017-03-06", "len" : "11.9000", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.6925, 45.4287]},
       "properties" : { "date" : "2017-03-06", "len" : "8.7800", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.1886, 39.0700]},
       "properties" : { "date" : "2017-03-06", "len" : "1.8500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.9236, 39.1095]},
       "properties" : { "date" : "2017-03-06", "len" : "5.2100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8958, 41.9826]},
       "properties" : { "date" : "2017-03-06", "len" : "17.8600", "wid" : "85"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.0900, 40.3100]},
       "properties" : { "date" : "2017-03-06", "len" : "5.8000", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.3327, 42.2472]},
       "properties" : { "date" : "2017-03-06", "len" : "6.3200", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.8100, 37.6700]},
       "properties" : { "date" : "2017-03-06", "len" : "0.1100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.4915, 41.2409]},
       "properties" : { "date" : "2017-03-06", "len" : "4.8300", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.5988, 39.4280]},
       "properties" : { "date" : "2017-03-06", "len" : "19.5700", "wid" : "1000"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.2910, 41.2765]},
       "properties" : { "date" : "2017-03-06", "len" : "5.3300", "wid" : "120"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.2000, 41.3469]},
       "properties" : { "date" : "2017-03-06", "len" : "6.7600", "wid" : "80"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.2717, 38.4881]},
       "properties" : { "date" : "2017-03-06", "len" : "3.0500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.7530, 40.3938]},
       "properties" : { "date" : "2017-03-06", "len" : "10.3400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.9974, 41.4611]},
       "properties" : { "date" : "2017-03-06", "len" : "5.4500", "wid" : "65"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.6249, 38.8621]},
       "properties" : { "date" : "2017-03-06", "len" : "0.3200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.4079, 38.9236]},
       "properties" : { "date" : "2017-03-06", "len" : "2.2900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.2394, 38.9590]},
       "properties" : { "date" : "2017-03-06", "len" : "17.7400", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.2085, 40.6174]},
       "properties" : { "date" : "2017-03-06", "len" : "14.9200", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.9041, 40.6322]},
       "properties" : { "date" : "2017-03-06", "len" : "8.0100", "wid" : "60"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.8760, 40.6891]},
       "properties" : { "date" : "2017-03-06", "len" : "9.6600", "wid" : "90"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8511, 39.0129]},
       "properties" : { "date" : "2017-03-06", "len" : "1.7500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5154, 39.3379]},
       "properties" : { "date" : "2017-03-06", "len" : "5.9700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.9597, 38.8323]},
       "properties" : { "date" : "2017-03-06", "len" : "17.4500", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.1172, 43.8564]},
       "properties" : { "date" : "2017-03-06", "len" : "2.6000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.1085, 39.4546]},
       "properties" : { "date" : "2017-03-06", "len" : "19.8100", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5327, 38.7348]},
       "properties" : { "date" : "2017-03-06", "len" : "3.8800", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.6878, 38.3256]},
       "properties" : { "date" : "2017-03-06", "len" : "7.7900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.2800, 39.6334]},
       "properties" : { "date" : "2017-03-06", "len" : "18.4700", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.7044, 35.6562]},
       "properties" : { "date" : "2017-03-06", "len" : "6.1000", "wid" : "650"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.8302, 42.2930]},
       "properties" : { "date" : "2017-03-06", "len" : "5.7000", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.2594, 41.2766]},
       "properties" : { "date" : "2017-03-06", "len" : "0.3100", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5021, 37.9676]},
       "properties" : { "date" : "2017-03-06", "len" : "0.7500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.0732, 41.4092]},
       "properties" : { "date" : "2017-03-06", "len" : "1.7800", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.8675, 41.4528]},
       "properties" : { "date" : "2017-03-06", "len" : "25.2500", "wid" : "1000"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9900, 41.7468]},
       "properties" : { "date" : "2017-03-06", "len" : "16.6300", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.7988, 41.5990]},
       "properties" : { "date" : "2017-03-06", "len" : "34.6800", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.9940, 37.9624]},
       "properties" : { "date" : "2017-03-06", "len" : "2.0000", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.7159, 38.2468]},
       "properties" : { "date" : "2017-03-06", "len" : "0.3300", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3847, 41.7503]},
       "properties" : { "date" : "2017-03-06", "len" : "4.3600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.9938, 35.8074]},
       "properties" : { "date" : "2017-03-06", "len" : "6.4000", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.1358, 41.7165]},
       "properties" : { "date" : "2017-03-06", "len" : "1.5400", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.0355, 38.3007]},
       "properties" : { "date" : "2017-03-06", "len" : "7.2600", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.5152, 38.7166]},
       "properties" : { "date" : "2017-03-06", "len" : "20.8700", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.3880, 35.9252]},
       "properties" : { "date" : "2017-03-06", "len" : "36.6400", "wid" : "700"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9085, 38.8051]},
       "properties" : { "date" : "2017-03-06", "len" : "3.1500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.8563, 40.2633]},
       "properties" : { "date" : "2017-03-06", "len" : "6.7600", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.6934, 40.3459]},
       "properties" : { "date" : "2017-03-07", "len" : "7.3800", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5381, 40.3920]},
       "properties" : { "date" : "2017-03-07", "len" : "2.8000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.2050, 41.3820]},
       "properties" : { "date" : "2017-03-07", "len" : "0.2900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.7115, 38.3116]},
       "properties" : { "date" : "2017-03-07", "len" : "2.6300", "wid" : "80"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.5707, 38.2424]},
       "properties" : { "date" : "2017-03-07", "len" : "1.1400", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.8150, 39.0745]},
       "properties" : { "date" : "2017-03-07", "len" : "12.9200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3969, 39.2061]},
       "properties" : { "date" : "2017-03-07", "len" : "7.1700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.1020, 36.1184]},
       "properties" : { "date" : "2017-03-07", "len" : "0.3500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.8040, 36.7170]},
       "properties" : { "date" : "2017-03-09", "len" : "9.6400", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.5408, 36.8917]},
       "properties" : { "date" : "2017-03-09", "len" : "6.3500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8717, 36.7660]},
       "properties" : { "date" : "2017-03-09", "len" : "0.1000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.3000, 36.7400]},
       "properties" : { "date" : "2017-03-09", "len" : "0.1000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.7501, 36.7056]},
       "properties" : { "date" : "2017-03-09", "len" : "0.1000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.2082, 36.8531]},
       "properties" : { "date" : "2017-03-09", "len" : "2.2800", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.1218, 36.6870]},
       "properties" : { "date" : "2017-03-09", "len" : "1.9000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.2736, 36.6611]},
       "properties" : { "date" : "2017-03-09", "len" : "2.7300", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0897, 36.6614]},
       "properties" : { "date" : "2017-03-09", "len" : "11.1700", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.7598, 36.6715]},
       "properties" : { "date" : "2017-03-09", "len" : "0.7300", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.6209, 36.6710]},
       "properties" : { "date" : "2017-03-09", "len" : "1.1400", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3918, 36.6169]},
       "properties" : { "date" : "2017-03-09", "len" : "9.6600", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3918, 36.6169]},
       "properties" : { "date" : "2017-03-09", "len" : "0.9300", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3756, 36.6135]},
       "properties" : { "date" : "2017-03-09", "len" : "8.7300", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.1867, 36.5690]},
       "properties" : { "date" : "2017-03-09", "len" : "10.1700", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.1867, 36.5690]},
       "properties" : { "date" : "2017-03-09", "len" : "7.3000", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.0837, 36.5033]},
       "properties" : { "date" : "2017-03-09", "len" : "2.8700", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.3322, 36.5996]},
       "properties" : { "date" : "2017-03-09", "len" : "5.6100", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.3921, 35.9077]},
       "properties" : { "date" : "2017-03-09", "len" : "0.9600", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.7049, 35.4146]},
       "properties" : { "date" : "2017-03-09", "len" : "3.1500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.2800, 35.3000]},
       "properties" : { "date" : "2017-03-09", "len" : "4.2000", "wid" : "320"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.2291, 30.0929]},
       "properties" : { "date" : "2017-03-11", "len" : "0.4500", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.9690, 27.0021]},
       "properties" : { "date" : "2017-03-13", "len" : "0.1800", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.3670, 26.9339]},
       "properties" : { "date" : "2017-03-13", "len" : "0.1300", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.2978, 26.1277]},
       "properties" : { "date" : "2017-03-13", "len" : "1.2700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-103.6677, 30.3874]},
       "properties" : { "date" : "2017-03-19", "len" : "0.2100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.6548, 33.9807]},
       "properties" : { "date" : "2017-03-21", "len" : "0.1400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.4923, 34.0580]},
       "properties" : { "date" : "2017-03-21", "len" : "0.4400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.5496, 27.5220]},
       "properties" : { "date" : "2017-03-23", "len" : "0.9600", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-122.5651, 45.6723]},
       "properties" : { "date" : "2017-03-24", "len" : "2.3000", "wid" : "15"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.4499, 32.4825]},
       "properties" : { "date" : "2017-03-24", "len" : "2.7100", "wid" : "225"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.9650, 34.5259]},
       "properties" : { "date" : "2017-03-24", "len" : "0.2500", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8726, 31.8527]},
       "properties" : { "date" : "2017-03-24", "len" : "2.0700", "wid" : "220"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.7689, 34.5024]},
       "properties" : { "date" : "2017-03-24", "len" : "0.1000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.7678, 34.5035]},
       "properties" : { "date" : "2017-03-24", "len" : "1.1200", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.7723, 34.5279]},
       "properties" : { "date" : "2017-03-24", "len" : "1.8500", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.6846, 32.0248]},
       "properties" : { "date" : "2017-03-24", "len" : "1.4600", "wid" : "110"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.2166, 31.7063]},
       "properties" : { "date" : "2017-03-24", "len" : "8.5100", "wid" : "2464"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.2479, 34.9262]},
       "properties" : { "date" : "2017-03-24", "len" : "2.1500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.2291, 34.9527]},
       "properties" : { "date" : "2017-03-24", "len" : "2.1600", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.7470, 32.1278]},
       "properties" : { "date" : "2017-03-24", "len" : "1.2300", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.6882, 32.1681]},
       "properties" : { "date" : "2017-03-24", "len" : "6.9000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.8774, 29.7829]},
       "properties" : { "date" : "2017-03-24", "len" : "0.0100", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3852, 36.1834]},
       "properties" : { "date" : "2017-03-25", "len" : "0.7800", "wid" : "120"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.6656, 39.4480]},
       "properties" : { "date" : "2017-03-25", "len" : "6.7600", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.0608, 39.0139]},
       "properties" : { "date" : "2017-03-26", "len" : "0.3100", "wid" : "70"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-66.0312, 18.3830]},
       "properties" : { "date" : "2017-03-26", "len" : "0.4300", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.6090, 34.7390]},
       "properties" : { "date" : "2017-03-26", "len" : "4.0000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.5340, 34.7580]},
       "properties" : { "date" : "2017-03-26", "len" : "0.3000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.7171, 34.9358]},
       "properties" : { "date" : "2017-03-27", "len" : "0.1900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.7316, 36.9334]},
       "properties" : { "date" : "2017-03-27", "len" : "4.4000", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.3624, 35.5536]},
       "properties" : { "date" : "2017-03-27", "len" : "6.4200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.6990, 37.1370]},
       "properties" : { "date" : "2017-03-27", "len" : "0.3100", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.1721, 35.5578]},
       "properties" : { "date" : "2017-03-27", "len" : "5.5000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.6745, 35.5514]},
       "properties" : { "date" : "2017-03-27", "len" : "7.2600", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.1935, 33.6456]},
       "properties" : { "date" : "2017-03-28", "len" : "2.4700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.1791, 33.6893]},
       "properties" : { "date" : "2017-03-28", "len" : "2.0700", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.2873, 32.7760]},
       "properties" : { "date" : "2017-03-28", "len" : "0.0700", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.9400, 32.4400]},
       "properties" : { "date" : "2017-03-28", "len" : "0.0100", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.9993, 33.4640]},
       "properties" : { "date" : "2017-03-28", "len" : "1.0200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.0698, 33.8890]},
       "properties" : { "date" : "2017-03-28", "len" : "0.6100", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.8247, 32.6783]},
       "properties" : { "date" : "2017-03-28", "len" : "4.5000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.2700, 34.8900]},
       "properties" : { "date" : "2017-03-28", "len" : "3.1000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.7803, 32.8888]},
       "properties" : { "date" : "2017-03-28", "len" : "4.6800", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.5360, 33.5990]},
       "properties" : { "date" : "2017-03-28", "len" : "0.7000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.5653, 33.6482]},
       "properties" : { "date" : "2017-03-28", "len" : "1.9100", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.5135, 33.6653]},
       "properties" : { "date" : "2017-03-28", "len" : "1.4000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.3870, 33.4170]},
       "properties" : { "date" : "2017-03-28", "len" : "3.0000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.8159, 31.6318]},
       "properties" : { "date" : "2017-03-28", "len" : "5.8200", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.6766, 31.6706]},
       "properties" : { "date" : "2017-03-28", "len" : "1.7900", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.8490, 32.0926]},
       "properties" : { "date" : "2017-03-28", "len" : "4.5300", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.3730, 32.9230]},
       "properties" : { "date" : "2017-03-29", "len" : "6.4800", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.3310, 32.8610]},
       "properties" : { "date" : "2017-03-29", "len" : "11.3700", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.0300, 33.0350]},
       "properties" : { "date" : "2017-03-29", "len" : "1.6200", "wid" : "130"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.7976, 32.5278]},
       "properties" : { "date" : "2017-03-29", "len" : "5.9700", "wid" : "480"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.4873, 29.6984]},
       "properties" : { "date" : "2017-03-29", "len" : "0.2700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.1294, 30.2660]},
       "properties" : { "date" : "2017-03-29", "len" : "0.1000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.0710, 29.6487]},
       "properties" : { "date" : "2017-03-29", "len" : "0.4300", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.0278, 29.6330]},
       "properties" : { "date" : "2017-03-29", "len" : "2.0000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.0285, 29.6814]},
       "properties" : { "date" : "2017-03-29", "len" : "2.6700", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.4198, 30.6708]},
       "properties" : { "date" : "2017-03-29", "len" : "1.3100", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.3590, 30.6747]},
       "properties" : { "date" : "2017-03-29", "len" : "0.4600", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.8364, 29.7716]},
       "properties" : { "date" : "2017-03-29", "len" : "0.0800", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.9739, 30.8309]},
       "properties" : { "date" : "2017-03-29", "len" : "0.4200", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8457, 30.9534]},
       "properties" : { "date" : "2017-03-29", "len" : "12.1900", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.0177, 35.5487]},
       "properties" : { "date" : "2017-03-29", "len" : "2.4000", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.6769, 30.7928]},
       "properties" : { "date" : "2017-03-29", "len" : "3.5700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.4430, 37.7304]},
       "properties" : { "date" : "2017-03-29", "len" : "2.5000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.3105, 31.1774]},
       "properties" : { "date" : "2017-03-29", "len" : "2.1000", "wid" : "450"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5971, 31.1460]},
       "properties" : { "date" : "2017-03-30", "len" : "1.0600", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.5701, 36.6826]},
       "properties" : { "date" : "2017-03-31", "len" : "12.3200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.2300, 36.7400]},
       "properties" : { "date" : "2017-03-31", "len" : "8.8600", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.9334, 36.2081]},
       "properties" : { "date" : "2017-03-31", "len" : "4.8000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.0189, 30.1641]},
       "properties" : { "date" : "2017-04-02", "len" : "0.0600", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.0570, 30.3652]},
       "properties" : { "date" : "2017-04-02", "len" : "3.0000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.8532, 30.2676]},
       "properties" : { "date" : "2017-04-02", "len" : "0.8000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.4322, 30.8242]},
       "properties" : { "date" : "2017-04-02", "len" : "0.5000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.3315, 31.2699]},
       "properties" : { "date" : "2017-04-02", "len" : "6.3600", "wid" : "310"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.5992, 30.9925]},
       "properties" : { "date" : "2017-04-02", "len" : "7.2900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.5368, 31.1255]},
       "properties" : { "date" : "2017-04-02", "len" : "6.1100", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.2513, 31.5788]},
       "properties" : { "date" : "2017-04-02", "len" : "5.5500", "wid" : "1636"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.4821, 31.2499]},
       "properties" : { "date" : "2017-04-02", "len" : "5.4100", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5838, 31.3077]},
       "properties" : { "date" : "2017-04-02", "len" : "9.8300", "wid" : "370"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.7846, 31.4595]},
       "properties" : { "date" : "2017-04-02", "len" : "0.1000", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.2521, 31.5115]},
       "properties" : { "date" : "2017-04-02", "len" : "13.6600", "wid" : "2252"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.5139, 31.7815]},
       "properties" : { "date" : "2017-04-02", "len" : "4.1000", "wid" : "1108"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.8661, 31.6917]},
       "properties" : { "date" : "2017-04-02", "len" : "4.4300", "wid" : "1108"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.9371, 32.0597]},
       "properties" : { "date" : "2017-04-02", "len" : "13.1900", "wid" : "1232"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.1618, 31.7476]},
       "properties" : { "date" : "2017-04-02", "len" : "1.0900", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.0389, 31.7365]},
       "properties" : { "date" : "2017-04-02", "len" : "13.7700", "wid" : "880"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.8523, 32.2377]},
       "properties" : { "date" : "2017-04-02", "len" : "3.6900", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.7840, 32.2603]},
       "properties" : { "date" : "2017-04-02", "len" : "3.7800", "wid" : "880"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.7595, 32.3110]},
       "properties" : { "date" : "2017-04-02", "len" : "0.9900", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.6894, 32.0870]},
       "properties" : { "date" : "2017-04-02", "len" : "5.8300", "wid" : "616"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.4893, 32.1898]},
       "properties" : { "date" : "2017-04-02", "len" : "1.4000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.6494, 31.5727]},
       "properties" : { "date" : "2017-04-02", "len" : "17.4800", "wid" : "1056"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.2100, 30.4400]},
       "properties" : { "date" : "2017-04-03", "len" : "1.2000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0750, 30.5265]},
       "properties" : { "date" : "2017-04-03", "len" : "1.7600", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.2619, 31.7176]},
       "properties" : { "date" : "2017-04-03", "len" : "0.0500", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.1141, 33.5688]},
       "properties" : { "date" : "2017-04-03", "len" : "2.3700", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.7811, 33.5678]},
       "properties" : { "date" : "2017-04-03", "len" : "4.0700", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.9555, 32.4443]},
       "properties" : { "date" : "2017-04-03", "len" : "3.2700", "wid" : "175"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.8361, 32.0336]},
       "properties" : { "date" : "2017-04-03", "len" : "1.5600", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.7015, 32.0692]},
       "properties" : { "date" : "2017-04-03", "len" : "1.3500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.9252, 34.4858]},
       "properties" : { "date" : "2017-04-03", "len" : "4.6100", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.5267, 32.6956]},
       "properties" : { "date" : "2017-04-03", "len" : "2.2300", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.4357, 32.7458]},
       "properties" : { "date" : "2017-04-03", "len" : "3.6500", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.6112, 32.1409]},
       "properties" : { "date" : "2017-04-03", "len" : "3.8800", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.2874, 33.2599]},
       "properties" : { "date" : "2017-04-03", "len" : "0.5900", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.3151, 32.8198]},
       "properties" : { "date" : "2017-04-03", "len" : "1.7400", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.2483, 32.8430]},
       "properties" : { "date" : "2017-04-03", "len" : "6.6700", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.3569, 32.2295]},
       "properties" : { "date" : "2017-04-03", "len" : "5.4800", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.1156, 33.3184]},
       "properties" : { "date" : "2017-04-03", "len" : "1.7700", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.9028, 32.9899]},
       "properties" : { "date" : "2017-04-03", "len" : "8.1300", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.7657, 32.6576]},
       "properties" : { "date" : "2017-04-03", "len" : "9.2300", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.6046, 33.1460]},
       "properties" : { "date" : "2017-04-03", "len" : "2.9400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.7810, 34.7280]},
       "properties" : { "date" : "2017-04-03", "len" : "0.0900", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.5264, 32.6682]},
       "properties" : { "date" : "2017-04-03", "len" : "5.8000", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.3733, 32.8592]},
       "properties" : { "date" : "2017-04-03", "len" : "3.2600", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.3528, 32.6758]},
       "properties" : { "date" : "2017-04-03", "len" : "7.9100", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.9000, 31.7200]},
       "properties" : { "date" : "2017-04-03", "len" : "0.0100", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.5070, 34.8590]},
       "properties" : { "date" : "2017-04-03", "len" : "2.8400", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.2291, 32.8899]},
       "properties" : { "date" : "2017-04-03", "len" : "4.1100", "wid" : "90"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.1208, 33.2938]},
       "properties" : { "date" : "2017-04-03", "len" : "3.2600", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.1240, 32.6670]},
       "properties" : { "date" : "2017-04-03", "len" : "6.5700", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.0829, 32.7750]},
       "properties" : { "date" : "2017-04-03", "len" : "0.1700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.9996, 32.9203]},
       "properties" : { "date" : "2017-04-03", "len" : "5.7200", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.0700, 34.5540]},
       "properties" : { "date" : "2017-04-03", "len" : "0.7400", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.7538, 33.0514]},
       "properties" : { "date" : "2017-04-03", "len" : "0.3900", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.6641, 33.0454]},
       "properties" : { "date" : "2017-04-03", "len" : "7.5200", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.6060, 34.5820]},
       "properties" : { "date" : "2017-04-03", "len" : "0.7400", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.4900, 34.6200]},
       "properties" : { "date" : "2017-04-03", "len" : "0.0100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.7400, 33.5300]},
       "properties" : { "date" : "2017-04-03", "len" : "0.0600", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.6200, 33.8010]},
       "properties" : { "date" : "2017-04-03", "len" : "0.8700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.1900, 32.8600]},
       "properties" : { "date" : "2017-04-03", "len" : "0.2800", "wid" : "240"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.7870, 33.5900]},
       "properties" : { "date" : "2017-04-03", "len" : "6.7200", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.4324, 36.7197]},
       "properties" : { "date" : "2017-04-04", "len" : "16.5000", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.9877, 36.5419]},
       "properties" : { "date" : "2017-04-04", "len" : "1.5000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.0267, 36.3604]},
       "properties" : { "date" : "2017-04-04", "len" : "5.0000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.1753, 31.7595]},
       "properties" : { "date" : "2017-04-05", "len" : "10.3600", "wid" : "1140"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.1753, 31.7595]},
       "properties" : { "date" : "2017-04-05", "len" : "2.6600", "wid" : "1140"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.1335, 31.7743]},
       "properties" : { "date" : "2017-04-05", "len" : "7.7000", "wid" : "1140"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.6655, 33.3700]},
       "properties" : { "date" : "2017-04-05", "len" : "3.9800", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.8795, 33.7202]},
       "properties" : { "date" : "2017-04-05", "len" : "2.9400", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.8277, 31.9114]},
       "properties" : { "date" : "2017-04-05", "len" : "16.8600", "wid" : "1320"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.7940, 33.8390]},
       "properties" : { "date" : "2017-04-05", "len" : "7.2000", "wid" : "1000"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.4282, 32.0050]},
       "properties" : { "date" : "2017-04-05", "len" : "3.1600", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.9476, 32.0574]},
       "properties" : { "date" : "2017-04-05", "len" : "8.7700", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.2780, 34.0054]},
       "properties" : { "date" : "2017-04-05", "len" : "0.0100", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.2887, 32.2761]},
       "properties" : { "date" : "2017-04-05", "len" : "4.1000", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.1492, 37.7004]},
       "properties" : { "date" : "2017-04-05", "len" : "0.1000", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.9856, 32.3323]},
       "properties" : { "date" : "2017-04-05", "len" : "20.1900", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.5069, 35.4125]},
       "properties" : { "date" : "2017-04-05", "len" : "7.1000", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.3868, 33.5342]},
       "properties" : { "date" : "2017-04-05", "len" : "0.2500", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.1440, 38.3730]},
       "properties" : { "date" : "2017-04-05", "len" : "1.7200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.7538, 35.5627]},
       "properties" : { "date" : "2017-04-05", "len" : "3.4000", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.9805, 38.6418]},
       "properties" : { "date" : "2017-04-05", "len" : "1.2000", "wid" : "90"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.7140, 37.1540]},
       "properties" : { "date" : "2017-04-05", "len" : "0.6900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.6958, 37.1508]},
       "properties" : { "date" : "2017-04-05", "len" : "0.3900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.6690, 37.1804]},
       "properties" : { "date" : "2017-04-05", "len" : "0.7500", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.9524, 39.8709]},
       "properties" : { "date" : "2017-04-05", "len" : "0.0800", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-83.9143, 39.9358]},
       "properties" : { "date" : "2017-04-05", "len" : "0.1100", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.5402, 33.0037]},
       "properties" : { "date" : "2017-04-05", "len" : "1.9600", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.5500, 34.4200]},
       "properties" : { "date" : "2017-04-05", "len" : "0.1400", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.4000, 34.4400]},
       "properties" : { "date" : "2017-04-05", "len" : "0.0600", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.8352, 27.5739]},
       "properties" : { "date" : "2017-04-06", "len" : "4.1200", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.0890, 26.5000]},
       "properties" : { "date" : "2017-04-06", "len" : "1.6100", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.9980, 26.5010]},
       "properties" : { "date" : "2017-04-06", "len" : "7.4300", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.4350, 37.6470]},
       "properties" : { "date" : "2017-04-06", "len" : "3.7100", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.9700, 38.2800]},
       "properties" : { "date" : "2017-04-06", "len" : "2.6300", "wid" : "175"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.8656, 38.6746]},
       "properties" : { "date" : "2017-04-06", "len" : "0.8600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.7200, 38.7700]},
       "properties" : { "date" : "2017-04-06", "len" : "0.8600", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.8200, 38.7500]},
       "properties" : { "date" : "2017-04-06", "len" : "0.8600", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.2140, 36.6190]},
       "properties" : { "date" : "2017-04-06", "len" : "4.4000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.4100, 38.9700]},
       "properties" : { "date" : "2017-04-06", "len" : "3.2000", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.0700, 38.8500]},
       "properties" : { "date" : "2017-04-06", "len" : "4.9100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.0700, 38.8500]},
       "properties" : { "date" : "2017-04-06", "len" : "1.9300", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.0380, 38.8628]},
       "properties" : { "date" : "2017-04-06", "len" : "2.9800", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.0243, 38.8313]},
       "properties" : { "date" : "2017-04-06", "len" : "1.5600", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.7600, 40.5100]},
       "properties" : { "date" : "2017-04-09", "len" : "0.1300", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.7410, 44.9790]},
       "properties" : { "date" : "2017-04-09", "len" : "0.4400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.1026, 32.2484]},
       "properties" : { "date" : "2017-04-10", "len" : "0.4700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.9999, 32.2782]},
       "properties" : { "date" : "2017-04-10", "len" : "1.8300", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.3669, 42.7840]},
       "properties" : { "date" : "2017-04-10", "len" : "5.3300", "wid" : "220"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.9019, 31.5478]},
       "properties" : { "date" : "2017-04-10", "len" : "0.7200", "wid" : "80"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.2885, 38.0290]},
       "properties" : { "date" : "2017-04-12", "len" : "0.8600", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.1400, 34.0793]},
       "properties" : { "date" : "2017-04-13", "len" : "0.3000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-121.2976, 44.0222]},
       "properties" : { "date" : "2017-04-13", "len" : "0.0700", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.5467, 34.4638]},
       "properties" : { "date" : "2017-04-14", "len" : "3.0900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.4793, 34.5272]},
       "properties" : { "date" : "2017-04-14", "len" : "0.3900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.4101, 34.5017]},
       "properties" : { "date" : "2017-04-14", "len" : "1.9500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-104.7340, 34.1096]},
       "properties" : { "date" : "2017-04-14", "len" : "0.4600", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.3590, 34.5720]},
       "properties" : { "date" : "2017-04-14", "len" : "3.5500", "wid" : "1936"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.2968, 34.5997]},
       "properties" : { "date" : "2017-04-14", "len" : "0.5000", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.4118, 34.5360]},
       "properties" : { "date" : "2017-04-14", "len" : "0.0800", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.9657, 34.3212]},
       "properties" : { "date" : "2017-04-14", "len" : "0.9100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.1268, 40.7086]},
       "properties" : { "date" : "2017-04-15", "len" : "1.4700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.2600, 38.4500]},
       "properties" : { "date" : "2017-04-15", "len" : "0.6200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.5500, 38.2600]},
       "properties" : { "date" : "2017-04-15", "len" : "0.2100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.3809, 40.5535]},
       "properties" : { "date" : "2017-04-15", "len" : "0.0300", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.8654, 39.1734]},
       "properties" : { "date" : "2017-04-15", "len" : "1.7000", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.2288, 42.1417]},
       "properties" : { "date" : "2017-04-15", "len" : "3.2200", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9400, 36.3700]},
       "properties" : { "date" : "2017-04-16", "len" : "0.5000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.2900, 36.3190]},
       "properties" : { "date" : "2017-04-16", "len" : "0.1000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9400, 36.2800]},
       "properties" : { "date" : "2017-04-16", "len" : "2.0000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.8000, 33.3300]},
       "properties" : { "date" : "2017-04-18", "len" : "0.0200", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.4206, 39.2457]},
       "properties" : { "date" : "2017-04-20", "len" : "2.7900", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.3391, 41.8877]},
       "properties" : { "date" : "2017-04-20", "len" : "0.3500", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.1835, 33.5530]},
       "properties" : { "date" : "2017-04-21", "len" : "0.2900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.5334, 34.5742]},
       "properties" : { "date" : "2017-04-22", "len" : "6.4600", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.1957, 34.5250]},
       "properties" : { "date" : "2017-04-22", "len" : "8.9900", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.1957, 34.5250]},
       "properties" : { "date" : "2017-04-22", "len" : "2.6700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.1500, 34.5200]},
       "properties" : { "date" : "2017-04-22", "len" : "6.3200", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.1500, 34.7900]},
       "properties" : { "date" : "2017-04-22", "len" : "2.1900", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-87.0800, 34.2400]},
       "properties" : { "date" : "2017-04-22", "len" : "4.3900", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.6940, 34.9300]},
       "properties" : { "date" : "2017-04-25", "len" : "0.7000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.3949, 35.0763]},
       "properties" : { "date" : "2017-04-25", "len" : "1.2500", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.3729, 36.3725]},
       "properties" : { "date" : "2017-04-25", "len" : "6.4000", "wid" : "550"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.3887, 36.4000]},
       "properties" : { "date" : "2017-04-25", "len" : "4.1000", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.2087, 36.3790]},
       "properties" : { "date" : "2017-04-25", "len" : "10.2000", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8236, 36.4378]},
       "properties" : { "date" : "2017-04-26", "len" : "15.6900", "wid" : "1500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8236, 36.4378]},
       "properties" : { "date" : "2017-04-26", "len" : "13.1000", "wid" : "1500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5970, 36.4989]},
       "properties" : { "date" : "2017-04-26", "len" : "2.5900", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.2909, 35.1855]},
       "properties" : { "date" : "2017-04-26", "len" : "0.5100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.9223, 36.6334]},
       "properties" : { "date" : "2017-04-26", "len" : "12.3400", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.4624, 32.6090]},
       "properties" : { "date" : "2017-04-26", "len" : "10.5500", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.0712, 32.1822]},
       "properties" : { "date" : "2017-04-27", "len" : "5.5900", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.9310, 31.8349]},
       "properties" : { "date" : "2017-04-27", "len" : "4.8900", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.6735, 32.5409]},
       "properties" : { "date" : "2017-04-27", "len" : "21.7100", "wid" : "700"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.5103, 31.9209]},
       "properties" : { "date" : "2017-04-27", "len" : "1.1800", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.4566, 31.8694]},
       "properties" : { "date" : "2017-04-27", "len" : "1.2800", "wid" : "175"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.9996, 39.3644]},
       "properties" : { "date" : "2017-04-27", "len" : "1.4800", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.5783, 35.1017]},
       "properties" : { "date" : "2017-04-28", "len" : "8.1000", "wid" : "750"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-85.5960, 38.3970]},
       "properties" : { "date" : "2017-04-28", "len" : "1.2900", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.1455, 31.7571]},
       "properties" : { "date" : "2017-04-29", "len" : "1.9600", "wid" : "290"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.0769, 36.2087]},
       "properties" : { "date" : "2017-04-29", "len" : "1.8900", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.5310, 38.8507]},
       "properties" : { "date" : "2017-04-29", "len" : "3.8500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.1723, 39.0711]},
       "properties" : { "date" : "2017-04-29", "len" : "2.3600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.7526, 32.6056]},
       "properties" : { "date" : "2017-04-29", "len" : "1.5500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.7782, 35.4394]},
       "properties" : { "date" : "2017-04-29", "len" : "7.3000", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0000, 39.7459]},
       "properties" : { "date" : "2017-04-29", "len" : "0.6800", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.4602, 35.6709]},
       "properties" : { "date" : "2017-04-29", "len" : "5.5000", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.8429, 32.5405]},
       "properties" : { "date" : "2017-04-29", "len" : "1.8000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.0180, 32.2572]},
       "properties" : { "date" : "2017-04-29", "len" : "21.4200", "wid" : "1760"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.9803, 32.2510]},
       "properties" : { "date" : "2017-04-29", "len" : "11.6800", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.8756, 32.3991]},
       "properties" : { "date" : "2017-04-29", "len" : "39.7100", "wid" : "1760"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.8360, 32.9906]},
       "properties" : { "date" : "2017-04-29", "len" : "8.5700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.0528, 32.3859]},
       "properties" : { "date" : "2017-04-29", "len" : "0.8800", "wid" : "80"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.4619, 32.5656]},
       "properties" : { "date" : "2017-04-29", "len" : "2.9900", "wid" : "570"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.4439, 32.6496]},
       "properties" : { "date" : "2017-04-29", "len" : "0.3000", "wid" : "190"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.7020, 35.1512]},
       "properties" : { "date" : "2017-04-29", "len" : "5.8600", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.3520, 35.2275]},
       "properties" : { "date" : "2017-04-29", "len" : "0.7600", "wid" : "80"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.7158, 36.3822]},
       "properties" : { "date" : "2017-04-30", "len" : "2.8400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3062, 35.9859]},
       "properties" : { "date" : "2017-04-30", "len" : "1.9600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3062, 35.9859]},
       "properties" : { "date" : "2017-04-30", "len" : "1.6500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.2797, 35.9965]},
       "properties" : { "date" : "2017-04-30", "len" : "0.3100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0657, 35.8509]},
       "properties" : { "date" : "2017-04-30", "len" : "5.6000", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0974, 36.0838]},
       "properties" : { "date" : "2017-04-30", "len" : "1.2000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.8424, 34.4852]},
       "properties" : { "date" : "2017-04-30", "len" : "5.1200", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5800, 36.7772]},
       "properties" : { "date" : "2017-04-30", "len" : "4.0400", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.5856, 31.9873]},
       "properties" : { "date" : "2017-04-30", "len" : "6.8700", "wid" : "1760"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.2257, 30.9444]},
       "properties" : { "date" : "2017-04-30", "len" : "0.6300", "wid" : "95"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.8519, 32.5936]},
       "properties" : { "date" : "2017-04-30", "len" : "5.7100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.7672, 33.5438]},
       "properties" : { "date" : "2017-04-30", "len" : "1.1300", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.4255, 31.4795]},
       "properties" : { "date" : "2017-04-30", "len" : "3.4400", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9521, 32.2890]},
       "properties" : { "date" : "2017-04-30", "len" : "9.2400", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9521, 32.2890]},
       "properties" : { "date" : "2017-04-30", "len" : "7.3000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.8750, 32.3749]},
       "properties" : { "date" : "2017-04-30", "len" : "1.9400", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9184, 31.6707]},
       "properties" : { "date" : "2017-04-30", "len" : "14.4400", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.9845, 31.9338]},
       "properties" : { "date" : "2017-04-30", "len" : "19.9000", "wid" : "880"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.4507, 31.8472]},
       "properties" : { "date" : "2017-04-30", "len" : "5.1700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.5739, 32.1646]},
       "properties" : { "date" : "2017-04-30", "len" : "6.1200", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.6617, 32.3406]},
       "properties" : { "date" : "2017-04-30", "len" : "2.7300", "wid" : "900"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.4686, 32.3026]},
       "properties" : { "date" : "2017-04-30", "len" : "20.3400", "wid" : "880"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3322, 32.0805]},
       "properties" : { "date" : "2017-04-30", "len" : "1.0700", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.5938, 32.4101]},
       "properties" : { "date" : "2017-04-30", "len" : "7.1400", "wid" : "1800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.4138, 32.3363]},
       "properties" : { "date" : "2017-04-30", "len" : "2.0400", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.6447, 35.5403]},
       "properties" : { "date" : "2017-04-30", "len" : "2.1000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3199, 32.5864]},
       "properties" : { "date" : "2017-04-30", "len" : "6.0200", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3668, 32.6166]},
       "properties" : { "date" : "2017-04-30", "len" : "5.0400", "wid" : "1500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.3195, 32.6538]},
       "properties" : { "date" : "2017-04-30", "len" : "21.7000", "wid" : "1700"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.1848, 32.7771]},
       "properties" : { "date" : "2017-04-30", "len" : "6.8800", "wid" : "1003"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0951, 32.8556]},
       "properties" : { "date" : "2017-04-30", "len" : "23.4000", "wid" : "1900"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.9856, 33.1769]},
       "properties" : { "date" : "2017-04-30", "len" : "9.1400", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3973, 32.4074]},
       "properties" : { "date" : "2017-04-30", "len" : "4.2800", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.8272, 33.1360]},
       "properties" : { "date" : "2017-04-30", "len" : "3.0400", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.7739, 33.1500]},
       "properties" : { "date" : "2017-04-30", "len" : "3.8500", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.7662, 33.2553]},
       "properties" : { "date" : "2017-04-30", "len" : "2.6300", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.7531, 33.3033]},
       "properties" : { "date" : "2017-04-30", "len" : "15.4900", "wid" : "1936"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5944, 33.4156]},
       "properties" : { "date" : "2017-04-30", "len" : "6.6300", "wid" : "970"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.6045, 33.5014]},
       "properties" : { "date" : "2017-04-30", "len" : "5.6300", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5278, 33.5290]},
       "properties" : { "date" : "2017-04-30", "len" : "6.7600", "wid" : "650"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.0975, 32.6869]},
       "properties" : { "date" : "2017-04-30", "len" : "0.2900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.5032, 33.5792]},
       "properties" : { "date" : "2017-04-30", "len" : "7.4400", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.4414, 33.7380]},
       "properties" : { "date" : "2017-04-30", "len" : "2.7000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.3428, 33.4933]},
       "properties" : { "date" : "2017-04-30", "len" : "3.8200", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.5593, 30.5533]},
       "properties" : { "date" : "2017-04-30", "len" : "0.9000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.0843, 30.6437]},
       "properties" : { "date" : "2017-04-30", "len" : "0.3000", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.8700, 34.2400]},
       "properties" : { "date" : "2017-04-30", "len" : "10.0500", "wid" : "215"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.9280, 32.3400]},
       "properties" : { "date" : "2017-05-01", "len" : "0.4600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.2152, 34.2529]},
       "properties" : { "date" : "2017-05-01", "len" : "2.3600", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.0760, 40.9110]},
       "properties" : { "date" : "2017-05-01", "len" : "2.8600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.7320, 41.0920]},
       "properties" : { "date" : "2017-05-01", "len" : "0.3800", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.5530, 41.1890]},
       "properties" : { "date" : "2017-05-01", "len" : "0.8800", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.2550, 41.3310]},
       "properties" : { "date" : "2017-05-01", "len" : "0.5400", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.2240, 41.3310]},
       "properties" : { "date" : "2017-05-01", "len" : "0.7500", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.3550, 41.4080]},
       "properties" : { "date" : "2017-05-01", "len" : "2.2300", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.2000, 35.6100]},
       "properties" : { "date" : "2017-05-01", "len" : "2.6700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-78.7435, 41.5884]},
       "properties" : { "date" : "2017-05-01", "len" : "1.6800", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.4583, 40.9386]},
       "properties" : { "date" : "2017-05-01", "len" : "1.1000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.6100, 26.7400]},
       "properties" : { "date" : "2017-05-02", "len" : "0.2500", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.5231, 32.0980]},
       "properties" : { "date" : "2017-05-03", "len" : "8.3700", "wid" : "1500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.7158, 31.3323]},
       "properties" : { "date" : "2017-05-03", "len" : "5.7400", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.9376, 31.3841]},
       "properties" : { "date" : "2017-05-04", "len" : "0.0200", "wid" : "35"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.6965, 31.5894]},
       "properties" : { "date" : "2017-05-04", "len" : "1.9000", "wid" : "60"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-82.6207, 31.6869]},
       "properties" : { "date" : "2017-05-04", "len" : "1.0000", "wid" : "70"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.1480, 32.0808]},
       "properties" : { "date" : "2017-05-04", "len" : "2.7800", "wid" : "120"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.7776, 32.7928]},
       "properties" : { "date" : "2017-05-04", "len" : "12.5200", "wid" : "440"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.6494, 32.9880]},
       "properties" : { "date" : "2017-05-04", "len" : "6.0300", "wid" : "125"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.5846, 33.0529]},
       "properties" : { "date" : "2017-05-04", "len" : "2.0200", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.4450, 33.2870]},
       "properties" : { "date" : "2017-05-04", "len" : "3.0800", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.4185, 33.6560]},
       "properties" : { "date" : "2017-05-04", "len" : "0.1100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.0709, 34.2296]},
       "properties" : { "date" : "2017-05-04", "len" : "2.0700", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-84.2520, 33.7785]},
       "properties" : { "date" : "2017-05-04", "len" : "1.1000", "wid" : "80"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-80.0505, 34.3570]},
       "properties" : { "date" : "2017-05-04", "len" : "0.8600", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.9972, 34.5396]},
       "properties" : { "date" : "2017-05-04", "len" : "0.2000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.7452, 36.4869]},
       "properties" : { "date" : "2017-05-05", "len" : "3.2600", "wid" : "375"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-79.6136, 37.1121]},
       "properties" : { "date" : "2017-05-05", "len" : "0.3000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-78.5590, 36.3650]},
       "properties" : { "date" : "2017-05-05", "len" : "1.0000", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-78.4405, 36.5767]},
       "properties" : { "date" : "2017-05-05", "len" : "14.7900", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-78.1685, 36.8435]},
       "properties" : { "date" : "2017-05-05", "len" : "1.0100", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.7899, 37.4742]},
       "properties" : { "date" : "2017-05-05", "len" : "0.3800", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.7774, 36.9716]},
       "properties" : { "date" : "2017-05-05", "len" : "2.4200", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.6428, 37.1887]},
       "properties" : { "date" : "2017-05-05", "len" : "2.3100", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.7552, 36.0815]},
       "properties" : { "date" : "2017-05-05", "len" : "11.7100", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.1431, 36.3144]},
       "properties" : { "date" : "2017-05-05", "len" : "8.1200", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.9033, 38.3269]},
       "properties" : { "date" : "2017-05-05", "len" : "0.8700", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-77.0189, 38.3450]},
       "properties" : { "date" : "2017-05-05", "len" : "1.1800", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-76.9175, 36.9321]},
       "properties" : { "date" : "2017-05-05", "len" : "4.9100", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-117.3743, 34.6207]},
       "properties" : { "date" : "2017-05-07", "len" : "0.0100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-105.0433, 37.9027]},
       "properties" : { "date" : "2017-05-08", "len" : "0.1900", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-104.1500, 36.0300]},
       "properties" : { "date" : "2017-05-08", "len" : "0.2000", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-105.6885, 34.9942]},
       "properties" : { "date" : "2017-05-09", "len" : "4.9000", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-106.0433, 35.6425]},
       "properties" : { "date" : "2017-05-09", "len" : "0.3100", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-105.7771, 33.6953]},
       "properties" : { "date" : "2017-05-09", "len" : "0.0700", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-104.5239, 36.0459]},
       "properties" : { "date" : "2017-05-09", "len" : "3.4900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.4502, 38.4563]},
       "properties" : { "date" : "2017-05-09", "len" : "1.1800", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.7000, 33.8600]},
       "properties" : { "date" : "2017-05-09", "len" : "0.0100", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.5400, 34.0700]},
       "properties" : { "date" : "2017-05-09", "len" : "0.0100", "wid" : "15"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.8600, 33.4900]},
       "properties" : { "date" : "2017-05-09", "len" : "0.0100", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.1000, 35.0400]},
       "properties" : { "date" : "2017-05-10", "len" : "2.8000", "wid" : "180"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.9000, 35.2000]},
       "properties" : { "date" : "2017-05-10", "len" : "2.6500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-104.1799, 36.9205]},
       "properties" : { "date" : "2017-05-10", "len" : "1.6600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.7564, 40.8518]},
       "properties" : { "date" : "2017-05-10", "len" : "2.7700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.7730, 34.0234]},
       "properties" : { "date" : "2017-05-10", "len" : "0.0100", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.2891, 34.1744]},
       "properties" : { "date" : "2017-05-10", "len" : "0.0100", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.0641, 34.3019]},
       "properties" : { "date" : "2017-05-10", "len" : "1.0500", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.9350, 34.6332]},
       "properties" : { "date" : "2017-05-10", "len" : "0.3600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.8247, 39.9516]},
       "properties" : { "date" : "2017-05-10", "len" : "0.1000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9400, 34.2700]},
       "properties" : { "date" : "2017-05-10", "len" : "0.3000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.6790, 34.3016]},
       "properties" : { "date" : "2017-05-10", "len" : "0.3000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.6300, 34.3400]},
       "properties" : { "date" : "2017-05-10", "len" : "2.0000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.7800, 29.4279]},
       "properties" : { "date" : "2017-05-10", "len" : "0.1000", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.4182, 36.9052]},
       "properties" : { "date" : "2017-05-10", "len" : "1.0000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.7948, 36.3040]},
       "properties" : { "date" : "2017-05-11", "len" : "1.5000", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.6616, 36.3775]},
       "properties" : { "date" : "2017-05-11", "len" : "3.1000", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.0427, 35.9698]},
       "properties" : { "date" : "2017-05-11", "len" : "0.1000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.9109, 32.6568]},
       "properties" : { "date" : "2017-05-11", "len" : "2.0900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.9009, 36.5454]},
       "properties" : { "date" : "2017-05-11", "len" : "0.1000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.0058, 32.5528]},
       "properties" : { "date" : "2017-05-11", "len" : "1.2800", "wid" : "175"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.8971, 32.5738]},
       "properties" : { "date" : "2017-05-11", "len" : "2.6900", "wid" : "220"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.6932, 32.0177]},
       "properties" : { "date" : "2017-05-11", "len" : "5.3000", "wid" : "280"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.9739, 32.7265]},
       "properties" : { "date" : "2017-05-11", "len" : "2.3200", "wid" : "215"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8878, 32.7976]},
       "properties" : { "date" : "2017-05-11", "len" : "0.7600", "wid" : "110"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.4989, 31.8150]},
       "properties" : { "date" : "2017-05-11", "len" : "4.5700", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5700, 30.5699]},
       "properties" : { "date" : "2017-05-12", "len" : "3.0400", "wid" : "267"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.1480, 30.1630]},
       "properties" : { "date" : "2017-05-12", "len" : "0.1400", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.0662, 30.4345]},
       "properties" : { "date" : "2017-05-12", "len" : "0.6000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.1182, 29.8531]},
       "properties" : { "date" : "2017-05-12", "len" : "0.2000", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-81.9314, 36.5211]},
       "properties" : { "date" : "2017-05-12", "len" : "0.1300", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.2206, 30.4469]},
       "properties" : { "date" : "2017-05-12", "len" : "0.5400", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.9223, 43.1806]},
       "properties" : { "date" : "2017-05-15", "len" : "0.9800", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.7100, 36.6800]},
       "properties" : { "date" : "2017-05-16", "len" : "0.0900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-101.1400, 36.3500]},
       "properties" : { "date" : "2017-05-16", "len" : "0.0900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.6500, 35.1600]},
       "properties" : { "date" : "2017-05-16", "len" : "1.3900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.1619, 45.2529]},
       "properties" : { "date" : "2017-05-16", "len" : "82.5300", "wid" : "1320"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.4305, 40.6662]},
       "properties" : { "date" : "2017-05-16", "len" : "1.8300", "wid" : "35"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.4900, 35.2300]},
       "properties" : { "date" : "2017-05-16", "len" : "0.0600", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.3800, 35.3100]},
       "properties" : { "date" : "2017-05-16", "len" : "0.0900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.2900, 35.3700]},
       "properties" : { "date" : "2017-05-16", "len" : "9.1800", "wid" : "1250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.0500, 35.0200]},
       "properties" : { "date" : "2017-05-16", "len" : "0.2900", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.0012, 37.3764]},
       "properties" : { "date" : "2017-05-16", "len" : "4.0300", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-100.0500, 35.0200]},
       "properties" : { "date" : "2017-05-16", "len" : "2.2600", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.9200, 35.0700]},
       "properties" : { "date" : "2017-05-16", "len" : "1.0000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.9170, 35.5640]},
       "properties" : { "date" : "2017-05-16", "len" : "10.2500", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.8500, 35.1200]},
       "properties" : { "date" : "2017-05-16", "len" : "1.1300", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-102.0100, 40.7700]},
       "properties" : { "date" : "2017-05-16", "len" : "0.1000", "wid" : "20"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.6900, 35.7500]},
       "properties" : { "date" : "2017-05-16", "len" : "0.7500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.5550, 35.2402]},
       "properties" : { "date" : "2017-05-16", "len" : "18.0000", "wid" : "1000"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.0186, 38.1987]},
       "properties" : { "date" : "2017-05-16", "len" : "26.6400", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.3634, 45.4706]},
       "properties" : { "date" : "2017-05-16", "len" : "0.3300", "wid" : "175"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.7600, 38.6500]},
       "properties" : { "date" : "2017-05-16", "len" : "0.3400", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.9389, 40.4516]},
       "properties" : { "date" : "2017-05-17", "len" : "2.1900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.9700, 43.0200]},
       "properties" : { "date" : "2017-05-17", "len" : "0.0200", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.9500, 43.2400]},
       "properties" : { "date" : "2017-05-17", "len" : "0.0200", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.0187, 42.0075]},
       "properties" : { "date" : "2017-05-17", "len" : "0.3700", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.9313, 41.1453]},
       "properties" : { "date" : "2017-05-17", "len" : "3.2200", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.1789, 44.1631]},
       "properties" : { "date" : "2017-05-17", "len" : "0.7900", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.0521, 41.3483]},
       "properties" : { "date" : "2017-05-17", "len" : "0.7100", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.1920, 44.0965]},
       "properties" : { "date" : "2017-05-17", "len" : "1.0600", "wid" : "250"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.6021, 41.3838]},
       "properties" : { "date" : "2017-05-17", "len" : "5.9500", "wid" : "40"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.9043, 43.3512]},
       "properties" : { "date" : "2017-05-17", "len" : "0.2000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.2541, 44.1286]},
       "properties" : { "date" : "2017-05-17", "len" : "0.2600", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.7228, 41.7003]},
       "properties" : { "date" : "2017-05-17", "len" : "2.1400", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.5062, 41.2447]},
       "properties" : { "date" : "2017-05-17", "len" : "8.1100", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-89.9994, 41.5468]},
       "properties" : { "date" : "2017-05-17", "len" : "2.0600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-90.0811, 41.1533]},
       "properties" : { "date" : "2017-05-17", "len" : "1.2900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-88.8221, 42.3341]},
       "properties" : { "date" : "2017-05-17", "len" : "10.3000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.5940, 34.6770]},
       "properties" : { "date" : "2017-05-18", "len" : "0.7000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.5750, 34.6950]},
       "properties" : { "date" : "2017-05-18", "len" : "1.2000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-103.8885, 37.7113]},
       "properties" : { "date" : "2017-05-18", "len" : "2.8800", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9710, 35.1950]},
       "properties" : { "date" : "2017-05-18", "len" : "6.0500", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.8590, 35.2870]},
       "properties" : { "date" : "2017-05-18", "len" : "0.5000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.7990, 38.1580]},
       "properties" : { "date" : "2017-05-18", "len" : "0.5800", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.2820, 34.0540]},
       "properties" : { "date" : "2017-05-18", "len" : "0.2000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.0220, 36.1270]},
       "properties" : { "date" : "2017-05-18", "len" : "0.2000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.9445, 37.5154]},
       "properties" : { "date" : "2017-05-18", "len" : "0.4900", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.8839, 37.5904]},
       "properties" : { "date" : "2017-05-18", "len" : "0.3500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.6749, 35.5095]},
       "properties" : { "date" : "2017-05-18", "len" : "0.2000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9740, 36.2260]},
       "properties" : { "date" : "2017-05-18", "len" : "8.6000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.8200, 38.3500]},
       "properties" : { "date" : "2017-05-18", "len" : "0.1100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.6260, 35.5800]},
       "properties" : { "date" : "2017-05-18", "len" : "0.2000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.7690, 38.2380]},
       "properties" : { "date" : "2017-05-18", "len" : "0.5600", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9200, 36.3647]},
       "properties" : { "date" : "2017-05-18", "len" : "0.2000", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.8460, 35.3090]},
       "properties" : { "date" : "2017-05-18", "len" : "0.3000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9290, 34.1210]},
       "properties" : { "date" : "2017-05-18", "len" : "1.2000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9280, 36.4350]},
       "properties" : { "date" : "2017-05-18", "len" : "9.0000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.8940, 34.1330]},
       "properties" : { "date" : "2017-05-18", "len" : "2.0000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.6950, 36.8500]},
       "properties" : { "date" : "2017-05-18", "len" : "0.2000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.3128, 35.6965]},
       "properties" : { "date" : "2017-05-18", "len" : "3.4200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.8500, 38.3900]},
       "properties" : { "date" : "2017-05-18", "len" : "0.2100", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.8300, 38.3800]},
       "properties" : { "date" : "2017-05-18", "len" : "0.6200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.4537, 38.8495]},
       "properties" : { "date" : "2017-05-18", "len" : "0.0100", "wid" : "25"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-97.6700, 38.8000]},
       "properties" : { "date" : "2017-05-18", "len" : "0.3400", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.0483, 34.4619]},
       "properties" : { "date" : "2017-05-18", "len" : "0.2000", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.1185, 32.0353]},
       "properties" : { "date" : "2017-05-18", "len" : "3.3000", "wid" : "450"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.9605, 32.0110]},
       "properties" : { "date" : "2017-05-18", "len" : "0.4200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.8591, 31.9420]},
       "properties" : { "date" : "2017-05-18", "len" : "4.3600", "wid" : "880"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.5306, 34.6500]},
       "properties" : { "date" : "2017-05-18", "len" : "0.6000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-96.0686, 34.8051]},
       "properties" : { "date" : "2017-05-18", "len" : "8.2000", "wid" : "1000"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.9151, 34.8403]},
       "properties" : { "date" : "2017-05-18", "len" : "4.6000", "wid" : "1000"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.9500, 35.2461]},
       "properties" : { "date" : "2017-05-18", "len" : "13.7000", "wid" : "850"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.7225, 35.3578]},
       "properties" : { "date" : "2017-05-18", "len" : "4.7000", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.6591, 35.3761]},
       "properties" : { "date" : "2017-05-18", "len" : "3.8000", "wid" : "450"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.4911, 35.4664]},
       "properties" : { "date" : "2017-05-18", "len" : "8.8000", "wid" : "600"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.6194, 35.7882]},
       "properties" : { "date" : "2017-05-18", "len" : "5.0000", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.3315, 35.5643]},
       "properties" : { "date" : "2017-05-18", "len" : "5.3000", "wid" : "900"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.4173, 35.7300]},
       "properties" : { "date" : "2017-05-18", "len" : "2.0000", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.5275, 35.8548]},
       "properties" : { "date" : "2017-05-18", "len" : "10.3000", "wid" : "700"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.3846, 35.7583]},
       "properties" : { "date" : "2017-05-18", "len" : "2.8000", "wid" : "400"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.2472, 35.6183]},
       "properties" : { "date" : "2017-05-18", "len" : "3.7000", "wid" : "350"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.3392, 35.8073]},
       "properties" : { "date" : "2017-05-18", "len" : "16.6000", "wid" : "650"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.3299, 35.9150]},
       "properties" : { "date" : "2017-05-18", "len" : "12.7000", "wid" : "650"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-95.1727, 36.0169]},
       "properties" : { "date" : "2017-05-18", "len" : "5.8000", "wid" : "800"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.2529, 36.3207]},
       "properties" : { "date" : "2017-05-18", "len" : "2.0000", "wid" : "225"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.2079, 36.5036]},
       "properties" : { "date" : "2017-05-18", "len" : "1.0000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5985, 36.5972]},
       "properties" : { "date" : "2017-05-19", "len" : "0.1200", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.2650, 36.6429]},
       "properties" : { "date" : "2017-05-19", "len" : "0.2500", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.1595, 36.6995]},
       "properties" : { "date" : "2017-05-19", "len" : "8.7000", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.1647, 37.1726]},
       "properties" : { "date" : "2017-05-19", "len" : "2.4900", "wid" : "200"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.0654, 36.9149]},
       "properties" : { "date" : "2017-05-19", "len" : "3.0000", "wid" : "500"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.9169, 37.4683]},
       "properties" : { "date" : "2017-05-19", "len" : "2.0000", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-92.3100, 37.2700]},
       "properties" : { "date" : "2017-05-19", "len" : "0.2500", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.5440, 36.5307]},
       "properties" : { "date" : "2017-05-19", "len" : "0.7500", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.6829, 38.9166]},
       "properties" : { "date" : "2017-05-19", "len" : "1.5800", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-91.4450, 38.8952]},
       "properties" : { "date" : "2017-05-19", "len" : "3.9800", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.5600, 36.7600]},
       "properties" : { "date" : "2017-05-19", "len" : "2.0300", "wid" : "10"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-94.3760, 36.8732]},
       "properties" : { "date" : "2017-05-19", "len" : "4.1000", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-86.4930, 38.2170]},
       "properties" : { "date" : "2017-05-19", "len" : "0.2300", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-99.9900, 31.9700]},
       "properties" : { "date" : "2017-05-19", "len" : "0.0300", "wid" : "30"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.6820, 37.2400]},
       "properties" : { "date" : "2017-05-19", "len" : "0.3800", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.9592, 37.0546]},
       "properties" : { "date" : "2017-05-19", "len" : "4.2300", "wid" : "300"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.6170, 37.3280]},
       "properties" : { "date" : "2017-05-19", "len" : "2.9800", "wid" : "150"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.8474, 37.2173]},
       "properties" : { "date" : "2017-05-19", "len" : "1.0000", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.6678, 37.2993]},
       "properties" : { "date" : "2017-05-19", "len" : "0.8600", "wid" : "100"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.6510, 37.5240]},
       "properties" : { "date" : "2017-05-19", "len" : "2.2200", "wid" : "50"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.6750, 37.3545]},
       "properties" : { "date" : "2017-05-19", "len" : "0.4700", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-98.5360, 37.4660]},
       "properties" : { "date" : "2017-05-19", "len" : "4.5000", "wid" : "75"}
       },
       { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [-93.5928, 37.4219]},
       "properties" : { "date" : "2017-05-19", "len" : "0.5800", "wid" : "100"}
       },
	]
};