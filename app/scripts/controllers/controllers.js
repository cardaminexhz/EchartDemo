'use strict';

var app = angular.module('EchartsDemo', ['EchartsDemo.services', 'EchartsDemo.directives']);

app.controller('PieController', ['$scope',
    function($scope) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.querySelector('div[id=main]'));
        console.log("myChart");

        // 指定图表的配置项和数据
        var optionPie = {
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    roseType: 'angle',  // roseType设置南丁格尔图:通过半径表示数据的大小
                    radius: '55%',
                    data:[
                        {value:400, name:'搜索引擎'},
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:274, name:'联盟广告'},
                        {value:235, name:'视频广告'}
                    ]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(optionPie);
    }
]);
