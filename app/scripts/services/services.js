'use strict';

// JSONP访问8090端口的远程文件piedata.js，获取饼图数据
app.factory('PieDataLoaderJSONP', ['$http', '$q',
    function($http, $q) {
        return function() {
            var piedata = {};
            var pieUrl = "http://localhost:8090/piedata.js?callback=JSON_CALLBACK";
            var delay = $q.defer();
            $http.jsonp(pieUrl).success(function(data) {
                console.log("get data success");
                piedata = data;
                delay.resolve(piedata);
            }, function() {
                delay.reject('Unable to fetch recipes');
            });
            return delay.promise;
        };
    }]);

// CORS 与server交互，获取数据
app.factory('PieDataLoaderCORS', ['$http', '$q', '$route', '$routeParams',
    function($http, $q, $route) {
        return function() {

            var piedata = {};
            var myUrl = "http://localhost:8081/statistic/list";
            var delay = $q.defer();

            $http({
                method: 'GET',
                url: myUrl,
                //params: {category: $route.current.params.category}
            })
                .success(function (data, status) {
                    console.log(status + ": http get success");
                    piedata = data;
                    console.log(piedata);
                    delay.resolve(piedata);
                })
                .error(function (data, status) {
                    console.log(status + ": http get fail");
                    delay.reject('Unable to fetch recipes');
                });
            return delay.promise;
        }
    }
]);