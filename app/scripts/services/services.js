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
                url: myUrl
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

// CORS 与server交互，获取数据; 改造作为【多饼图获取数据的共享服务】
app.factory('PieDataLoader', ['$http', '$q',
    function($http, $q) {

        // 针对不同的请求URL，返回不同数据
        var doRequest = function(path) {
            var piedata = {};
            var delay = $q.defer();
            console.log("[in doRequest] path: "+path);

            $http({
                method: 'GET',
                url: path
                //params: {category: $route.current.params.category}
            })
                .success(function (data, status) {
                    piedata = data;
                    console.log(status + ": http get success");
                    console.log("[in doRequest] piedata2: " + piedata);
                    delay.resolve(piedata);
                })
                .error(function (data, status) {
                    console.log(status + ": http get fail");
                    delay.reject('Unable to fetch recipes');
                });
            return delay.promise;
        }

        return {
          getChartData: function(path) {
              console.log("[in getChartData] path: " + path);
              return doRequest(path);
          }
        };
    }
]);