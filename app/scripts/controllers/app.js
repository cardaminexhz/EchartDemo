var app = angular.module("EchartsDemo", []);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
             controller: 'chartController',
             resolve: {
                 //TODO: 1.从services获得的数据写在此处；之后注解到controller中
/*                 piedata: ["PieDataLoaderCORS", function(PieDataLoaderCORS) {
                     return PieDataLoaderCORS();
                 }],*/
                 piedata: ["PieDataLoader", function(PieDataLoader) {
                     return PieDataLoader.getChartData("http://localhost:8081/statistic/list");
                 }]
             },
             templateUrl: 'views/pieChart.html'
/*            controller: 'mapController',
            templateUrl: 'views/pieChart.html'*/
        });
}]);
