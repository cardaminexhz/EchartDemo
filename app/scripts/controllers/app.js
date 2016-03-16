var app = angular.module("EchartsDemo", []);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
             controller: 'PieDataLoaderCORS',
             resolve: {
                 piedata: ["PieDataLoaderCORS", function(PieDataLoaderCORS) {
                    return PieDataLoaderCORS();
                 }]
             },
             templateUrl: 'views/pieChart.html'
/*            controller: 'mapController',
            templateUrl: 'views/pieChart.html'*/
        });
}]);
