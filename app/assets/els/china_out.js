var effect = {
    show: true,
    scaleSize: 1,
    period: 30,             // 运动周期，无单位，值越大越慢
    color: '#fff',
    shadowBlur : 10 
};

var placelist = {
                '新疆':[84.5757,43.1706],
                '内蒙古':[109.8403,40.6574],
                '北京':[116.4075,39.9040],
                '四川':[104.0665,30.5723],
                '辽宁':[121.6147,42.9140],
                '山西':[113.3001,37.0768],
                '福建':[119.2965,26.0745],
                '台湾':[120.2644,23.1292],
                '广东':[113.2644,23.1292],
                '山东':[117.6005,36.9354],
                '贵州':[106.6302,26.6477],
                '黑龙江':[126.5363,45.8023],
                '河北':[114.5391,38.6256],
                '浙江':[120.1551,30.2741],
                '安徽':[117.2272,31.8206],
                '湖南':[109.9985,27.5550],
                '江苏':[119.0153,33.6104],
                '河南':[113.2418,35.2159],
                '香港':[114.1870,22.3076],
                '澳门':[113.1870,22.0076],
                '云南':[102.8329,24.8801],
                '西藏':[91.1409,33.6456],
                '甘肃':[103.8343,36.0611],
                '江西':[115.8581,28.6832],
                '江苏':[118.7969,32.0603],
                '广西':[108.3661,22.8172],
                '上海':[121.4737,31.2304],
                '天津':[117.2010,39.0842],
                '吉林':[124.5363,44.8023],
                '海南':[109.9870,19.3076],
                '宁夏':[104.9402,35.3416],
                '湖北':[114.3054,30.5931],
                '陕西':[108.9402,34.3416],
                '重庆':[106.5516,29.5630],
                '青海':[100.0343,36.0611],
                '俄罗斯' : [37.4,55.5],
				'德国':[11.3,51.3],
				'意大利':[11.1,44.3],
				'葡萄牙':[-8.1,39.3],
				'西班牙':[-4.1,39.3],
				'捷克':[15.3,49.9],
				'英国':[-2.9,55.3],
				'美国' : [-87.0,38.5],
				'加拿大' : [-117.0,58.5],
				'澳大利亚' : [137.0,-22.5],
				'法国':[3.3,47.3],
				'韩国':[128.3,36.3],
				'日本':[138.3,36.3],
				'新加坡':[102.3,3.3],
				'希腊' : [23.4,37.6],
				'荷兰' : [5.3,52.3],
				'芬兰' : [25.3,62.3],
				'马来西亚':[102.8329,5.0801],
				'菲律宾':[120.8329,15.0801],
				'罗马尼亚':[25.8,46.3],
				'乌克兰':[29.8,56.3],
				'伊朗':[29.8,36.3],
				'印度':[29.8,36.3],
				'瑞士':[29.8,36.3],
				'赞比亚':[29.8,36.3],
				'委内瑞拉':[29.8,36.3],
				'泰国':[29.8,36.3],
				'波兰':[29.8,36.3],
				'巴基斯坦':[29.8,36.3],
				'墨西哥':[29.8,36.3],
				'柬埔寨':[29.8,36.3],
				'伊拉克':[29.8,36.3],
				'印度尼西亚':[29.8,36.3],
				'格鲁吉亚':[29.8,36.3],
				'哥伦比亚':[29.8,36.3],
				'智利':[29.8,36.3],
				'巴西':[29.8,36.3],
				'保加利亚':[29.8,36.3],
				'孟加拉':[29.8,36.3],
				'蒙古':[29.8,36.3],
				'爱尔兰':[-7.5,53.3]
				
				
           };
		   var namelist = [];
		   for (var x in placelist)
		   {
			   var obj = {};
			   obj['name'] = x;
			   namelist.push(obj);
		   }
function itemStyle(idx) {
    return {
        normal: {
            color:'#fff',
            borderWidth:1,
            borderColor:['lime','red'][idx],
            lineStyle: {
                type: 'solid'
            }
        }
    };
};

option = {
    backgroundColor: '#1b1b1b',
    color: ['rgba(30,144,255,1)','lime'],
    tooltip : {
        trigger: 'item',
        formatter: function (v) {
            return v[1].replace(':', ' > ');
        }
    },
	dataRange: {
	        min : 0,
	        max : 100,
			orient : 'horizontal',
	        calculable : true,
	        color: ['#ff3333', 'orange', 'yellow','aqua'],
	        textStyle:{
	            color:'#fff'
	        },
			y : -100
	    },
//    legend: {
//		selectMode : 'single',
//        x:'left',
//		y:'bottom',
//        data:['正常', '异常'],
//        textStyle : {
//            color: '#fff'
//        }
//    },
    series : [
        {
            name: '全部',
            type: 'map',
            roam: true,
            hoverable: false,
            mapType: 'world',
            itemStyle:{
                normal:{
                    borderColor:'rgba(100,149,237,1)',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#1b1b1b'
                    }
                }
            },
            data:[],
			
		    markPoint : {
		       symbol:'emptyCircle',
		       symbolSize : function (v){
		    	   var data=v+"";
		    	   if(v==0) {
		    		   return  v;
		    	   }
		    	   else{
		    		   return  5+data.length;
		    	   }
		       },
		       effect : {
		           show: true,
		           shadowBlur : 0
		       },
		       itemStyle:{
		          	normal:{
		            	label:{show:false}
		             },
                    emphasis: {
                        label:{position:'top'}
                    }
		       },
			   data : []
		   }
        },
        {
            name: '全部2',
            type: 'map',
            roam: true,
            hoverable: false,
            mapType: 'world',
            itemStyle:{
                normal:{
                    borderColor:'rgba(100,149,237,1)',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#1b1b1b'
                    }
                }
            },
            data:[],
			markPoint : {
			   smooth:true,
			    symbol : 'circle', 
                symbolSize : 1,
			   	itemStyle : {
			        normal: {
			          borderWidth:1,
                      color : '#fff',
                      borderColor:'rgba(30,144,255,0.5)',
					  label : {show : false}
			        },
                    emphasis: {
                        label:{position:'top'}
                    }
				},
                data : []
			}
        },
        {
            name: '异常',
            type: 'map',
            mapType: 'world',
            itedmStyle:{
                normal:{
                    borderColor:'red',
                    borderWidth:0.5,
                    areaStyle:{
                        color: '#1b1b1b'
                    },
					color : 'red'
                }
            },
            data:[
			
			],
            markLine : {
                symbol: ['circle', 'arrow'],  
                symbolSize : 1,
				effect : effect,
                itemStyle : itemStyle(1),
                smooth:true,
                data : [
					
                ]
            },
            geoCoord: placelist
        }
    ]
};