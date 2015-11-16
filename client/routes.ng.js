/**
 * Created by andreaterzani on 12/11/15.
 */
angular.module("trackShare").config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('newTrack', {
            url: '/newtrack',
            templateUrl: 'client/event/views/new-track.ng.html',
            controller: 'NewTrackCtrl'
        })
        .state('viewTrack', {
            url: '/events/:id',
            templateUrl: 'client/event/views/view-track.ng.html',
            controller: 'ViewTrackCtrl',
            resolve: {
                "data": ["$meteor","$stateParams",function($meteor,$stateParams){
                    return  $meteor.subscribe('fullevent',$stateParams.id);
                }]
            }
        })
        .state('ListTrack', {
            url: '/events',
            templateUrl: 'client/event/views/list-track.ng.html',
            controller: 'ListTrackCtrl',
            resolve: {
                "data": ["$meteor","$stateParams",function($meteor,$stateParams){
                    return  $meteor.subscribe('events');
                }]
            }
        });


    $urlRouterProvider.otherwise("/events");
});