app.controller("chartController", ['$scope', '$http', 'piedata', 'PieDataLoader',
    function ($scope, $http, piedata, PieDataLoader) {
        //TODO: 2.注解的数据，存储到$scope中
        $scope.piedata = piedata;
        console.log("[in controller]: piedata" + piedata);

    }]);

