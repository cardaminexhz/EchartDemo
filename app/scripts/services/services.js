'use strict';

var services = angular.module('EchartsDemo.services', []);

// JSONP访问8090端口的远程文件piedata.js，获取饼图数据
services.factory('PieDataLoader', ['$http', '$q',
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
