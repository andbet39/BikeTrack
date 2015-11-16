/**
 * Created by andreaterzani on 12/11/15.
 */
angular.module("trackShare").controller("NewTrackCtrl", function ($scope, $meteor,uiGmapGoogleMapApi,myService) {


    uiGmapGoogleMapApi.then(function(maps) {
        mapapi=maps;
    });
    var mapapi;

    $scope.events = $meteor.collection(Events).subscribe('events');
    //$scope.tracks = $meteor.collectionFS(Tracks, false, Tracks).subscribe('tracks');

    $scope.event={'isDraft':true};

    $scope.save = function(){

        $scope.events.save($scope.event).then(function(evt){
            console.log('saved');
        });
    };


    $scope.saveTrack = function (files) {
        console.log(files);
        if (files.length > 0) {
            for(i=0;i< files.length;i++){
            
            var r = new FileReader();
            
            r.onload = function(e) {

                    var dom = (new DOMParser()).parseFromString(e.target.result, 'text/xml');

                    var geo = toGeoJSON.gpx(dom);
                    console.log(geo);

                    $scope.event.geo = geo;
                    $scope.event.geosimple = myService.simplifyGeoJson(geo,250);

                    $scope.map = { center: { latitude: $scope.event.geo.features[0].geometry.coordinates[0][1],
                             longitude: $scope.event.geo.features[0].geometry.coordinates[0][0] }, zoom: 10 };

                    
                    $scope.event.title=$scope.event.geo.features[0].properties.name;
                    
                    
                    var analysis =  myService.analyze($scope.event.geo,4);

                    $scope.event.trackanalysis =analysis;

                    console.log($scope.event);

                    $scope.event.center = analysis.center;
                     $scope.event.start =analysis.start;
                    $scope.paths=$scope.event.geo.features;

                    console.log($scope.event);

                    $scope.save();
                    $scope.apply;


            };

            r.readAsText(files[i]);
        }
        }
    };

});