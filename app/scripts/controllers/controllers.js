'use strict';

var app = angular.module('EchartsDemo', ['EchartsDemo.services', 'EchartsDemo.directives']);

app.controller('PieController', ['$scope',
    function($scope) {
        // ����׼���õ�dom����ʼ��echartsʵ��
        var myChart = echarts.init(document.querySelector('div[id=main]'));
        console.log("myChart");

        // ָ��ͼ��������������
        var optionPie = {
            series : [
                {
                    name: '������Դ',
                    type: 'pie',
                    roseType: 'angle',  // roseType�����϶����ͼ:ͨ���뾶��ʾ���ݵĴ�С
                    radius: '55%',
                    data:[
                        {value:400, name:'��������'},
                        {value:335, name:'ֱ�ӷ���'},
                        {value:310, name:'�ʼ�Ӫ��'},
                        {value:274, name:'���˹��'},
                        {value:235, name:'��Ƶ���'}
                    ]
                }
            ]
        };

        // ʹ�ø�ָ�����������������ʾͼ��
        myChart.setOption(optionPie);
    }
]);
