/**
 * Created by andreaterzani on 12/11/15.
 */
angular.module('trackShare',['angular-meteor',
                           'ui.router',
                           'ngFileUpload',
                           'uiGmapgoogle-maps',
                            'chart.js',
                            'rzModule',
                            'highcharts-ng'
])

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
           key: 'AIzaSyCbxB5NDRrfxH9mxuUi2eWNZiMxALNE5bk',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})