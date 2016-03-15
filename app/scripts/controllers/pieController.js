var app = angular.module("EchartsDemo", ['EchartsDemo.services']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            controller: 'pieController',
            resolve: {
                piedata: ["PieDataLoader", function(PieDataLoader) {
                    return PieDataLoader();
                }]
            },
            templateUrl: 'views/pieChart.html'
        });
}]);

app.controller("pieController", ['$scope', '$http', 'piedata',
    function ($scope, $http, piedata) {
        $scope.piedata = piedata;

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.querySelector('div[id=main]'));

        // 指定图表的配置项和数据
        var optionPie = {
            series : [
                {
                    name: '饼图',
                    type: 'pie',
                    roseType: 'angle',
                    radius: '55%',
                    data: $scope.piedata
                }
            ]
        };

        // 展示数据
        myChart.setOption(optionPie);
}]);

