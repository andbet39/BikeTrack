angular.module("trackShare").factory("myService", function(){
	return{
		simplifyGeoJson: function(geojson,max_count){
				
			console.log('Simplify GeoJson MaxCount:' +max_count);

			angular.forEach(geojson.features,function(value){


				var newFeature=[];
				var original_count = value.geometry.coordinates.length;

				var precision=1;
				if(max_count<original_count){
					precision = Math.floor(original_count / max_count);
				}

				for (i = 0; i < value.geometry.coordinates.length; i=i+precision) {
					var cord = [value.geometry.coordinates[i][0],value.geometry.coordinates[i][1],value.geometry.coordinates[i][2]];
					newFeature.push(cord);
				}
				
				value.geometry.coordinates=newFeature;

			});

			return geojson;

		},
		analyze: function(geojson,precision){
			var features = geojson.features;
			var climb=0;
			var discesa=0;
			var diff_start_end=0;

			var trackinfo={ratios:[]};
			var distance = 0;
			var start_alt=0;
			var start =[];

			trackinfo.ratios = [];
			trackinfo.alt_profile = [];
			trackinfo.bounds={};

			trackinfo.center= {};

			var alt_profile=0;
			var bounds = new google.maps.LatLngBounds();
		
			angular.forEach(features,function(value,key){
					if(key==0){
						console.log("base alt:" + value.geometry.coordinates[precision][2]);
						alt_profile=value.geometry.coordinates[precision][2];
						start={ "type": "Point", "coordinates": [value.geometry.coordinates[0][0],
																 value.geometry.coordinates[0][1]]};

					}

				for (i = precision; i < value.geometry.coordinates.length; i=i+precision) {

					

					var from = new google.maps.LatLng(value.geometry.coordinates[i-precision][1],value.geometry.coordinates[i-precision][0]);
					var to = new google.maps.LatLng(value.geometry.coordinates[i][1],value.geometry.coordinates[i][0]);
			    
			    	bounds.extend(from);

					var diff =  value.geometry.coordinates[i][2]-value.geometry.coordinates[i-precision][2];
					if(diff>0) {
						climb += diff;
					}
					if(diff<0){
						discesa -= diff;
					}
					diff_start_end+=diff;


					var point_distance =google.maps.geometry.spherical.computeDistanceBetween(from,to);

					distance +=point_distance;
					var ratio = diff/point_distance;
					alt_profile+=diff;

					trackinfo.ratios.push(ratio);
					trackinfo.alt_profile.push(alt_profile);

				};


		});

			trackinfo.climb=climb;
			trackinfo.descent=discesa;
			trackinfo.diff_start_end=diff_start_end;
			trackinfo.distance=distance;
			trackinfo.center={ "type": "Point", "coordinates": [bounds.getCenter().lng(), bounds.getCenter().lat()] };
			trackinfo.start=start;
			trackinfo.bounds = {
						    northeast: {
						        latitude: bounds.getNorthEast().lat(),
						        longitude: bounds.getNorthEast().lng()
						    },
						    southwest: {
						        latitude: bounds.getSouthWest().lat(),
						        longitude: bounds.getSouthWest().lng()
						    }};
						    

			return trackinfo;
		}
	}
});