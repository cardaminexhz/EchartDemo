'use strict';

// 练习
app.directive('myDirective', function() {
    return {
        restrict: 'A',
        replace: true,
        template: '<a href="{{ myUrl }}">{{ myLinkText }}123</a>',
        scope: {
            myUrl: '=', //绑定策略
            myLinkText: '@' //绑定策略
        },
        link: function($scope, $element, $attrs) {
            // TODO: 获取 myUrl
            console.log("myUrl: " + $attrs.myUrl);
            console.log("myLinkText: " + $attrs.myLinkText);

            var a = angular.element('<a>');
            a.text("appendElement");
            $element.append(a);
        }
    }
});

// 饼图-指令实现
app.directive('myPieChart', function() {
    return {
        restrict: "A",
        replace: true,
        controller: function($scope, $attrs) {

            // [方法1] loadPieChart()在controller中定义
            //$scope.loadPieChart("#" + $attrs.id);


            //TODO: 3.由$attrs中获得DOM ID；由$scope中获得data。完成echarts加载
            // [方法2] TODO: 将元素ID作为参数传进来
            // 基于准备好的dom，初始化echarts实例
            //var myChart = echarts.init(document.querySelector("#pie2"));
            var myChart = echarts.init(document.querySelector("#" + $attrs.id));

            // 指定图表的配置项和数据
            var optionPie = {
                series : [
                    {
                        name: '饼图',
                        type: 'pie',
                        roseType: 'angle',
                        radius: '55%',
                        // TODO: 如何确定获取的是piedata1还是piedata2
                        data: $scope.piedata
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(optionPie);
        }
    }
});