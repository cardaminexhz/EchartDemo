'use strict';

var app = angular.module('EchartsDemo.directives', []);

app.directive('pieChart', function() {
    return {
        restrict: "A",
        replace: true,
        template: "<div>Hello readers, thank you for coming</div>",
        link: function ( scope, element, attrs ) {
/*            var myChart = echarts.init(angular.attribute("#main")[0]);

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
            myChart.setOption(optionPie);*/
        }
    }
});