/**
 * Created by andreaterzani on 12/11/15.
 */
/**
 * Created by andreaterzani on 12/11/15.
 */
angular.module("trackShare").controller("ListTrackCtrl", function ($scope, $meteor,uiGmapGoogleMapApi) {


    uiGmapGoogleMapApi.then(function(maps) {
        mapapi=maps;
    });
    var mapapi;

	$scope.map = { center:{'latitude':43,'longitude':12},zoom: 5,
                   markersEvents: {
                    click: function(marker, eventName, model, arguments) {
                        console.log('Marker was clicked (' + marker + ', ' + eventName);
                        $scope.markClick(marker.model);
                    }
                },
            control:{}
             };


    $scope.options = {scrollwheel: false};

    $scope.slider = {
      min: 1000,
      max: 50000,
      options: {
        floor: 1000,
        ceil: 50000,
        step:100,
        interval:1000
      }
    };

    $scope.chartConfig = {
        options: {
            chart: {
                type: 'spline'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Altitude profile'
        },

        loading: false
    }
        
    
  $meteor.autorun($scope, function() {

    var min_distance =$scope.getReactively('slider.min');
    var max_distance =$scope.getReactively('slider.max');

    $meteor.subscribe('events',$scope.getReactively('box'),min_distance,max_distance).then(function(){
      $scope.events = $meteor.collection(Events);
    });
  });
   


    $scope.event={};

    $scope.mapevents={
        idle: function (map, eventName, originalEventArgs) {
            var bounds =      map.getBounds();

            var topright = bounds.getNorthEast();
            var bottomleft= bounds.getSouthWest();

            var box = [
            [ bottomleft.lng(),bottomleft.lat()] ,
                [topright.lng(), topright.lat()]          
            ];
            $scope.box=box;
            $scope.$apply;
        }
    };

     $scope.chartoptions={
        pointDot:false,
        datasetStrokeWidth:1,
        scaleShowGridLines:false,
        showTooltips:false,
        scaleFontSize:0
    }

    $scope.markClick =  function(event){
        
        console.log(event);
        $scope.chartConfig.loading=true;
        $meteor.subscribe('simpleevent',event._id).then(function(subscriptionHandle){
         
          $scope.event = $meteor.object(Events, event._id,false);
            
            $scope.paths=$scope.event.geosimple.features;


            var data =[event.trackanalysis.alt_profile];

            $scope.chartConfig.series[0].data=event.trackanalysis.alt_profile;
            
            subscriptionHandle.stop();
            $scope.chartConfig.loading=false;

    });

    $scope.zoomselected = function(event){
        console.log("zoom");
//        $scope.map.center = event.center;

        var ne = new mapapi.LatLng(event.trackanalysis.bounds.northeast.latitude,event.trackanalysis.bounds.northeast.longitude);

        var sw = new mapapi.LatLng(event.trackanalysis.bounds.southwest.latitude,event.trackanalysis.bounds.southwest.longitude);

      var bounds =  new mapapi.LatLngBounds(ne,sw);

        //$scope.map.control.getGMap().fitBounds(bounds);
        $scope.map.bounds=event.trackanalysis.bounds;
        var topright = bounds.getNorthEast();
        var bottomleft= bounds.getSouthWest();

            var box = [
            [ bottomleft.lng(),bottomleft.lat()] ,
                [topright.lng(), topright.lat()]          
            ];
            $scope.box=box;
        
    };


        
        
        

    	
    }


});