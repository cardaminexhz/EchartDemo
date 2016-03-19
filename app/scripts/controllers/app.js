var app = angular.module("EchartsDemo", []);
app.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'chartController',
            templateUrl: 'views/pieChart.html'
        }).when('/defraudStatis', {
            controller: 'defraudStatisController',
            templateUrl: 'views/defraudStatis.html'
        });

/*    $routeProvider.
        when('/', {
             controller: 'chartController',
             resolve: {
                 //TODO: 1.从services获得的数据写在此处；之后注解到controller中
/!*                 piedata: ["PieDataLoaderCORS", function(PieDataLoaderCORS) {
                     return PieDataLoaderCORS();
                 }],*!/
                 piedata: ["PieDataLoader", function(PieDataLoader) {
                     return PieDataLoader.getChartData("http://192.168.40.228:8081/reqCmDataStatisticsBean/swindletypeswindleramount?timetype=2", '123');
                 }]
             },
             templateUrl: 'views/pieChart.html'
/!*            controller: 'mapController',
            templateUrl: 'views/pieChart.html'*!/
        }).
        when('/map', {
            controller: 'mapController',
            templateUrl: 'views/map.html'
        });*/
}]);
