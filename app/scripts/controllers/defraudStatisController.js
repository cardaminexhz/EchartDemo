var catetegoryArr = [
    { name: '日', code: '1' },
    { name: '周', code: '2' },
    { name: '月', code: '3' }
];

function getCityName (input) {
    switch (input +""){
        case "1":input = "北京";break;
        case "2":input = "上海";break;
        case "3":input = "广州";break;
        case "4":input = "青海";break;
        case "5":input = "黑龙江";break;
        case "0":input = "云南";break;
    }
    return input;
}

app.controller('defraudStatisController', ['$scope', '$http',
    function($scope, $http) {
        $scope.cateArr = catetegoryArr;
        $scope.barByCategory = { name: '日', code: '1' };      // 初始化（日/周/月）下拉框

        // 查询获得各城市对应的[诈骗类型-诈骗数量]列表；查询条件：1.日/周/月 2.cityId
        $scope.showDetails = function(cityId) {
            console.log("[in showDetails] cityId: " + cityId);

            $http({
                method: 'POST',
                url: "http://localhost:8081/statistic/bar",
                params: {cityId: cityId},
                //params: {cityId: cityId, timetype: $scope.barByCategory.code},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log(status + ": http get success");
                $scope.defraudList = data;
                $scope.cityId = cityId;
            })
        }


        // 查询获得[城市-诈骗数量]列表，处理列表数据生成柱状图；查询条件：日/周/月
        // TODO：将URL配置成全局变量。http://192.168.40.228:8081/reqCmDataStatisticsBean/swindletypeswindleramount?timetype=2
        var doBarRequest = function() {
            console.log("日/周/月 下拉框：" + $scope.barByCategory.name);

            $http({
                method: 'POST',
                url: "http://localhost:8081/statistic/bar",
                //params: {timetype: $scope.barByCategory.code},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log(status + ": http get success");
                console.log("barList: " + data);
                $scope.list = data;
                $scope.chartXAxisData = new Array();
                $scope.chartSeriesData = new Array();

                for(var i=0; i<data.length; i++) {
                    console.log(data[i].cityId +" : " + data[i].num);
                    $scope.chartXAxisData.push(getCityName(data[i].cityId));
                    $scope.chartSeriesData.push(data[i].num);
                }
                console.log("XAxis: " + $scope.chartXAxisData);
                console.log("Series: " + $scope.chartSeriesData);

                createBarChart();
            })
        }
        // 监听（日/周/月）下拉框，发生改变时进行查询
        $scope.$watch('barByCategory', doBarRequest);

        var createBarChart = function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector("#bar"));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '诈骗者数据统计'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['诈骗者数量']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {},
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: $scope.chartXAxisData
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'诈骗者数量',
                        type:'bar',
                        data: $scope.chartSeriesData,
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };

            // 展示数据
            myChart.setOption(option);
        }

    }]);