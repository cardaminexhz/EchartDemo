app.controller("chartController", ['$scope', '$http', 'piedata', 'piedata2',
    function ($scope, $http, piedata, piedata2) {
        //TODO: 2.注解的数据，存储到$scope中
        $scope.piedata = piedata;
        $scope.piedata2 = piedata2;

        // [方法1]
/*        $scope.loadPieChart = function(id) {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector(id));

            // 指定图表的配置项和数据
            var optionPie = {
                series : [
                    {
                        name: '饼图',
                        type: 'pie',
                        roseType: 'angle',
                        radius: '55%',
                        data: piedata
                    }
                ]
            };

            // 展示数据
            myChart.setOption(optionPie);
        }*/

    }]);

