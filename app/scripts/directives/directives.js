'use strict';

// 练习

app.directive("drink", function() {
    return {
        restrict:'AE',
        scope:{
            water:'@'
        },
        template:"<div>{{water}}</div>",
        link: function($scope) {
            alert($scope.water);
        }
    }
});


app.directive('myDirective', function() {
    return {
        restrict: 'EA',
        replace: true,
        //template: '<a href="{{ myUrl }}">{{ myLinkText }}123</a>',
/*        scope: {
            myUrl: '=', //绑定策略
            myLinkText: '' //绑定策略
        },*/
        scope: {
            water:'@'
        },
        template:"<div>{{water}}</div>",
        link: function($element, $attrs) {
            // TODO: 获取 myUrl
            alert("water: " + water);

      /*      console.log("myUrl: " + $attrs.myUrl);
            console.log("myLinkText: " + $attrs.myLinkText);*/

            alert($attrs.right);
            alert($attrs.value);
            alert($scope.value);

            alert("待删除");

            if($attrs.right == $attrs.data) {
                alert("相同");
                $element.remove();
            } else {
                alert("不同");
            }
        }
    }
});

// 饼图-指令实现
app.directive('myPieChart', function() {
    return {
        restrict: "A",
        replace: true,
        controller: function($scope, $element, $attrs) {

            // TODO: 通过同一个指令，加载两个不同的饼图：解决获取哪个DOM元素；哪个数据

            // 两种等价的获取DOM的形式
            //console.log("querySelector: "+document.querySelector("#" + $attrs.id));
            console.log("[in directive]: element: " + $element[0]);
            console.log("[in directive]: piedata" + $scope.piedata);


            //TODO: 3.由$attrs中获得DOM ID；由$scope中获得data。完成echarts加载
            //var myChart = echarts.init(document.querySelector("#pie2"));
            //var myChart = echarts.init(document.querySelector("#" + $attrs.id));
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init($element[0]);

            // 指定图表的配置项和数据
            var optionPie = {
                series : [
                    {
                        name: '饼图',
                        type: 'pie',
                        roseType: 'angle',
                        radius: '55%',
                        // TODO: 如何确定获取的是piedata1还是piedata2
                        data: $scope.chartData
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(optionPie);
        }
    }
});

// 柱状图
app.directive('myBarChart', function() {
    return {
        restrict: 'A',
        replace: true,
        controller: function($scope, $element) {
            var myChart = echarts.init($element[0]);

            var option = {
                title: {
                    text: '未来一周气温变化',
                    subtext: '纯属虚构'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['最高气温','最低气温']
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
                    data: ['周一','周二','周三','周四','周五','周六','周日']
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
                        data:[11, 11, 15, 13, 12, 13, 10],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
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
                    }
                ]
            };

            myChart.setOption(option);
        }
    }
});

// 地图
app.directive('myMapChart', function() {
    return{
        restrict: 'A',
        replace: true,
        controller: function($scope, $element) {
/*            var myChart = echarts.init($element[0]);

                var option = {
                    title: {
                        text: '香港18区人口密度 （2011）',
                        subtext: '人口密度数据来自Wikipedia'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c} (p / km2)'
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
                    visualMap: {
                        min: 800,
                        max: 50000,
                        text:['High','Low'],
                        realtime: false,
                        calculable: true,
                        color: ['orangered','yellow','lightskyblue']
                    },
                    series: [
                        {
                            name: '香港18区人口密度',
                            type: 'map',
                            mapType: 'HK', // 自定义扩展图表类型
                            itemStyle:{
                                normal:{label:{show:true}},
                                emphasis:{label:{show:true}}
                            },
                            data:[
                                {name: '中西区', value: 20057.34},
                                {name: '湾仔', value: 15477.48},
                                {name: '东区', value: 31686.1},
                                {name: '南区', value: 6992.6},
                                {name: '油尖旺', value: 44045.49},
                                {name: '深水埗', value: 40689.64},
                                {name: '九龙城', value: 37659.78},
                                {name: '黄大仙', value: 45180.97},
                                {name: '观塘', value: 55204.26},
                                {name: '葵青', value: 21900.9},
                                {name: '荃湾', value: 4918.26},
                                {name: '屯门', value: 5881.84},
                                {name: '元朗', value: 4178.01},
                                {name: '北区', value: 2227.92},
                                {name: '大埔', value: 2180.98},
                                {name: '沙田', value: 9172.94},
                                {name: '西贡', value: 3368},
                                {name: '离岛', value: 806.98}
                            ],
                            // 自定义名称映射
                            nameMap: {
                                'Central and Western': '中西区',
                                'Eastern': '东区',
                                'Islands': '离岛',
                                'Kowloon City': '九龙城',
                                'Kwai Tsing': '葵青',
                                'Kwun Tong': '观塘',
                                'North': '北区',
                                'Sai Kung': '西贡',
                                'Sha Tin': '沙田',
                                'Sham Shui Po': '深水埗',
                                'Southern': '南区',
                                'Tai Po': '大埔',
                                'Tsuen Wan': '荃湾',
                                'Tuen Mun': '屯门',
                                'Wan Chai': '湾仔',
                                'Wong Tai Sin': '黄大仙',
                                'Yau Tsim Mong': '油尖旺',
                                'Yuen Long': '元朗'
                            }
                        }
                    ]
                };

                myChart.setOption(option);*/

        }
    }
});