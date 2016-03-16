app.controller("chartController", ['$scope', '$http', 'piedata',
    function ($scope, $http, piedata) {
        $scope.piedata = piedata;
        pie($scope.piedata);


    }]);

function pie(piedata) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('div[id=pie1]'));

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
}

