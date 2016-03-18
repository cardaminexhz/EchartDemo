var catetegoryArr = [
    { name: '日', code: '1' },
    { name: '周', code: '2' },
    { name: '月', code: '3' }
];

app.controller("chartController", ['$scope', '$http', 'PieDataLoader', 'piedata',
    function ($scope, $http, PieDataLoader, piedata) {
        $scope.cateArr = catetegoryArr;
        console.log($scope.inp);
        var path = "http://localhost:8081/statistic/list";
        //$scope.piedata = PieDataLoader.getChartData(path, "text");

        //TODO: 2.注解的数据，存储到$scope中
        $scope.piedata = piedata;
        console.log("[in controller]: piedata" + $scope.piedata);

    }]);

