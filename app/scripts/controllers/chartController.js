var catetegoryArr = [
    { name: '日', code: '1' },
    { name: '周', code: '2' },
    { name: '月', code: '3' }
];

app.controller("chartController", ['$scope', '$http',
    function ($scope, $http) {
        $scope.cateArr = catetegoryArr;
        $scope.cateItem = '月';
        $scope.url = "http://192.168.40.228:8081/reqCmDataStatisticsBean/swindletypeswindleramount";


        // http://192.168.40.228:8081/reqCmDataStatisticsBean/swindletypeswindleramount?timetype=2
        var doRequest = function() {
            $http({
                method: 'GET',
                url: $scope.url,
                params: {timetype: 2},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log(status + ": http get success");
                $scope.chartData = data;
                console.log("data: " + data);
                createPieChart();
            })
        }
        $scope.$watch('cateItem', doRequest);

        var createPieChart = function() {
            var myChart = echarts.init(document.querySelector("#pie"));

            // 指定图表的配置项和数据
            var optionPie = {
                series : [
                    {
                        name: '饼图',
                        type: 'pie',
                        roseType: 'angle',
                        radius: '55%',
                        data: $scope.chartData
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(optionPie);
        }

        var doBarRequest = function() {
            $http({
                method: 'GET',
                url: $scope.url,
                params: {timetype: 2},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log(status + ": http get success");
                $scope.chartData = data;
                console.log("data: " + data);
                createBarChart();
            })
        }
        $scope.$watch('barCateItem', doBarRequest);

        var createBarChart = function() {
            var myChart = echarts.init(document.querySelector("#bar"));

            var option = {
                title: {
                    text: '未来一周气温变化',
                    subtext: '纯属虚构'
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
                    data: ['北京','上海','浙江','广州','青海']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        name:'最高气温',
                        type:'bar',
                        data:[11, 11, 15, 13, 12],
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
/*                    {
                        name:'最低气温',
                        type:'bar',
                        data:[1, -2, 2, 5, 3, 2, 0],
                        markPoint: {
                            data: [
                                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }*/
                ]
            };

            myChart.setOption(option);
        }

        var doMapRequest = function() {
            $http({
                method: 'GET',
                url: "http://localhost:8081/statistic/map",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data, status) {
                console.log(status + ": http get success");
                $scope.mapData = data;
                console.log("data: " + data);
                createMapChart();
            })
        }
        $scope.$watch('barCateItem', doMapRequest);

        var createMapChart = function() {
            var mapChart = echarts.init(document.querySelector("#map"));

            var optionMap = {
                title: {
                    text: 'iphone销量',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data:['iphone3','iphone4']
                },
                visualMap: {
                    min: 0,
                    max: 2500,
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: 'iphone3',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: $scope.mapData
                    },
                    {
                        name: 'iphone4',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: $scope.mapData
                    }
                ]
            };

            mapChart.setOption(optionMap);

        }

/*        var path = "http://localhost:8081/statistic/list";
        //$scope.piedata = PieDataLoader.getChartData(path, "text");

        //TODO: 2.注解的数据，存储到$scope中
        $scope.piedata = piedata;
        console.log("[in controller]: piedata" + $scope.piedata);*/

    }]);

