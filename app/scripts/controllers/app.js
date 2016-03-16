var app = angular.module("EchartsDemo", []);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
             controller: 'chartController',
             resolve: {
                 piedata: ["PieDataLoaderJSONP", function(PieDataLoaderJSONP) {
                    return PieDataLoaderJSONP();
                 }]
             },
             templateUrl: 'views/pieChart.html'
/*            controller: 'mapController',
            templateUrl: 'views/pieChart.html'*/
        });
}]);
