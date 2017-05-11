window.onload = init;

var map_1;
var map_2;
var osm;
var esri_terrain;
var digital_globe;


function init() {
	map_1();
	map_2();

	link();
}

function map_1(){
	base();

	map_1 = L.map('map-div-1', {
	    center: [17.664959830519326, -5.3173828125],
	    zoom: 6,
	    layers: [osm]
	});

	// MAP SCALE
	L.control.scale().addTo(map_1);

	// MAP COORDINATE POSITION
	L.control.mousePosition({separator: ', '}).addTo(map_1);

	// MAP GEOCODER
	var searchControl = L.esri.Geocoding.geosearch().addTo(map_1);
	var results = L.layerGroup().addTo(map_1);
	searchControl.on('results', function(data){
		results.clearLayers();
		for (var i = data.results.length - 1; i >= 0; i--) {
		  results.addLayer(L.marker(data.results[i].latlng));
		}
	});

	// MAP MEASURE
	var measureControl = L.control.measure({
		primaryLengthUnit: 'meters', 
		secondaryLengthUnit: 'kilometers',
		primaryAreaUnit: 'hectares',
		secondaryAreaUnit: undefined
	});
	measureControl.addTo(map_1);

	// LAYER TOGGLE
	var baseMaps = {
		"Open Street Map": osm,
		"Digital Globe": digital_globe,
		"ESRI Street": esri_street,
		"ESRI Satellite": esri_satellite,
		"ESRI Terrain": esri_terrain
	};
	var overlayMaps = {
	};
	L.control.layers(baseMaps, overlayMaps).addTo(map_1);
}


function map_2(){
	base();

	map_2 = L.map('map-div-2', {
	    center: [17.664959830519326, -5.3173828125],
	    zoom: 6,
	    layers: [digital_globe]
	});

	// MAP SCALE
	L.control.scale().addTo(map_2);

	// MAP COORDINATE POSITION
	L.control.mousePosition({separator: ', '}).addTo(map_2);

	// MAP GEOCODER
	var searchControl = L.esri.Geocoding.geosearch().addTo(map_2);
	var results = L.layerGroup().addTo(map_2);
	searchControl.on('results', function(data){
		results.clearLayers();
		for (var i = data.results.length - 1; i >= 0; i--) {
		  results.addLayer(L.marker(data.results[i].latlng));
		}
	});

	// MAP MEASURE
	var measureControl = L.control.measure({
		primaryLengthUnit: 'meters', 
		secondaryLengthUnit: 'kilometers',
		primaryAreaUnit: 'hectares',
		secondaryAreaUnit: undefined
	});
	measureControl.addTo(map_2);

	// LAYER TOGGLE
	base();
	var baseMaps = {
		"Open Street Map": osm,
		"Digital Globe": digital_globe,
		"ESRI Street": esri_street,
		"ESRI Satellite": esri_satellite,
		"ESRI Terrain": esri_terrain
	};
	var overlayMaps = {
	};
	L.control.layers(baseMaps, overlayMaps).addTo(map_2);
}

function base() {

	// ESRI Street
    esri_street = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey and the GIS User Community',
        label: 'ESRI Street'
    });

	// ESRI Terrain
    esri_terrain = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey and the GIS User Community',
        label: 'ESRI Terrain'
    });

	// ESRI Imagery
    esri_satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey and the GIS User Community',
        label: 'ESRI Imagery'
    });
    // Digital Globe
    var api_key = 'pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6ImNpdm9ic3M2ODAwdDYydXBjYW85aHVzeTMifQ.Y2J4i_b6yGPmNkJAoUHDMg';
    digital_globe = L.tileLayer('https://{s}.tiles.mapbox.com/v4/digitalglobe.nal0mpda/{z}/{x}/{y}.png?access_token=' + api_key, {
        minZoom: 1,
        maxZoom: 19,
        attribution: '(c) <a href="http://microsites.digitalglobe.com/interactive/basemap_vivid/">DigitalGlobe</a> , (c) OpenStreetMap, (c) Mapbox',
        label: 'Digital Globe Imagery'
    });

    // OSM
    osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
        label: 'OpenStreetMap'
    });	       	

}

function link() {
	var zoom;
	var center;

	map_1.on('moveend', function() {
	    zoom = map_1.getZoom();
	    center = map_1.getCenter();
		//console.log(center);
		map_2.setView([center.lat, center.lng], zoom)
	});

	map_2.on('moveend', function() {
	    zoom = map_2.getZoom();
	    center = map_2.getCenter();
		//console.log(center);
		map_1.setView([center.lat, center.lng], zoom)
	});


}
