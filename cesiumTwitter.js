//var viewer = new Cesium.Viewer('cesiumContainer');
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : new Cesium.OpenStreetMapImageryProvider({
        url : '//a.tile.openstreetmap.org/'
    }),
    baseLayerPicker : false,
    infoBox : false,
    sceneMode: Cesium.SceneMode.SCENE2D
});
var scene = viewer.scene;
var params = {};
var resData = {};
var points = [];
var countries = new Cesium.EntityCollection();

function showPosition(position) {
	alert(position);
}

/*function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function (position) {
        	//var lat1 = position.coords.latitude;
        	//var lon1 = position.coords.longitude;
        	sendObj = {qtype : 'closest', params : {lat : position.coords.latitude, lon : position.coords.longitude}};
        	$.get('/twitter', sendObj, );
        });
    }
}*/

/*function myCity() {
	getLocation();
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	$.get('/twitter', )
}*/
$(".rightDiv").hide();
var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(function(movement) {
	var picked = scene.pick(movement.position);
	if(picked) {
		var entity = picked.id;
		sendObj = {qtype : 'place', params : {id : entity.id}};
		$.get('/twitter', sendObj, function(data, status) 
		{
			var trends = data[0].trends, str = '';
			for(i=0; i<trends.length; i++)
			{
				str += "<a>" + trends[i].name + "</a>" + "<br/>";
			}
			$(".rightDiv").show();
			$(".panel-heading").text(entity.name);
			$(".panel-body").html(str);
			entity.description = str;
		});
	}
	else {
		$(".rightDiv").hide();
	}

}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

function plotPoints(i, woeid) {
	$.get('http://where.yahooapis.com/v1/place/'+woeid+'?appid=dj0yJmk9Y3BmRkVFUEtzaVZNJmQ9WVdrOWJreEJWMnhpTkhVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1jNw--', 
		function (xml, status) {
			$centroid = $(xml).find("centroid");
			var lat = ($centroid.find("latitude")).text();
			var lon = ($centroid.find("longitude")).text();
/*			if (resData[i].placeType.name == 'Country')
			{
*/				//points[i] = viewer.entities.add({
				var point = new Cesium.Entity({	
					id : resData[i].woeid,
					name : resData[i].name,
					position : Cesium.Cartesian3.fromDegrees(lon, lat),
					/*point : {
						pixelSize : 4,
						color : Cesium.Color.BLUE,
						//outlineColor : Cesium.Color.YELLOW,
						outlineWidth : 2
					},*/
					billboard : {
							image : './twitter_blue.png',
							horizontalOrigin : Cesium.HorizontalOrigin.RIGHT,
							verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
							width : 10,
							height : 10
					},
					label : {
						text : resData[i].name,
						font : '10pt helvetica',
						fillColor : '#4099FF',
						horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
						//translucencyByDistance :  new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0),
						outlineWidth : 2,
						verticalOrigin : Cesium.VerticalOrigin.TOP,
						pixelOffset : new Cesium.Cartesian2(0, -9)
					}
				});
				countries.add(point);
				viewer.entities.add(point);
/*			}
*/		}
	, 'xml');
}

function getAvailable(data, status) {
	var i;
	resData = data;
	for(i=0; i<data.length; i++)
	{
		var woeid = data[i].woeid;
		plotPoints(i, woeid);
	}
}

//sendObj = {qtype : 'place', params : {id : '1'}};
sendObj = {qtype : 'available'};
$.get('/twitter', sendObj, getAvailable);