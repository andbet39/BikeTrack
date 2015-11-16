/**
 * Created by andreaterzani on 12/11/15.
 */
/**
 * Created by andreaterzani on 12/11/15.
 */
angular.module("trackShare").controller("ViewTrackCtrl", function ($scope, $meteor,$stateParams) {

    console.log($stateParams.id);

    $scope.event = $meteor.object(Events, $stateParams.id,false);

    console.log($scope.event);
    $scope.map = { zoom: 12 };
    $scope.options = {scrollwheel: false};

    $scope.paths=$scope.event.geo.features;
    $scope.data =[$scope.event.trackanalysis.alt_profile];
    $scope.labels=[];

    for(i=0;i< $scope.event.trackanalysis.alt_profile.length;i++){
        $scope.labels.push(i);
    }

    $scope.chartoptions={
        pointDot:false,
        datasetStrokeWidth:1,
        scaleShowGridLines:false,
        showTooltips:false,
        scaleFontSize:0
    }

});