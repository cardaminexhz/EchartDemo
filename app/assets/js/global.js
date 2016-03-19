
var _GLOBAL = function () {

    // private functions & variables
	var enums={};
    var intervals = {iframeInterval:null}; // 自定义定时任务ID存储器
    var interval_ids = [];//所有定时任务ID存储器
    var lastHandler;
    var lastModal;
    var lastUrl;
    // public functions
    return {
    	ctx:"",
    	initedMenu:false,//是否初始化过菜单
    	imgUrlPrev:"",
    	lastHandler:lastHandler,
    	lastModal:lastModal,
    	intervals:intervals,
    	lastMenu:null,//上一次点击的菜单
    	lastUrl:lastUrl,//上一次点击的菜单url
    	lastInlineUrl:'',//上一次点击的INLINE类型的BUTTON url
    	initInline:false,//是否需要初始化上一点击的INLINE类型的BUTTON
    	setLastInlineUrl:function(url){
    		
    		this.lastInlineUrl = url;
    		var hash = window.location.hash;
    		var base = hash.split("#!!")[0];
    		window.location.hash =base+("#!!"+url);
    	},
    	getLastInlineUrl:function(){
    		if(!this.lastInlineUrl){
    			var hash = window.location.hash;
        		var bases = hash.split("#!!");
        		if(bases.length==2){
        			this.lastInlineUrl=bases[1];
        		}
    		}
    		return this.lastInlineUrl;
    	},
    	setLastUrl:function(url){
    		
    		this.lastUrl = url;
    		$.cookie('_global_last_url', url,{ expires: 365 });
    	},
    	getLastUrl:function(){
    		if(!this.lastUrl){
    			this.lastUrl = $.cookie('_global_last_url');
    		}
    		return this.lastUrl;
    	},
    	init :function(ctx,imgUrlPrev){
    		_GLOBAL.ctx = ctx;
    		_GLOBAL.imgUrlPrev = imgUrlPrev;
    		
    		$.getJSON(ctx+"/commons/getAllEnum", function(json){
    			  enums = json;
//    			  setTimeout(function(){
//    				  $('[data-type="dropdown"]').xeditDropdown();
//    			  },1000)
    		});
    		
    	},
		pushEnum : function(name,value){
			try{
				enums[name]=value;
			}catch(e){
				console.log(e);
				bootbox.alert("当前页面的某些枚举值可能显示有误。");
			}
		},
		getEnum : function(name,value){
			if(value||value=='0'){
				if(enums[name] && enums[name][value]){
					return enums[name][value];
				}else{
					return value;
				}
			}else{
				return '<span class="label label-default">无</span>';
			}
		},
		getEnums : function(name){
			return enums[name];
		},
		// 定时执行fn，时间间隔为interval(ms) ，返回该任务的id，要取消该任务时，使用 clearInterval(id); 要取消所有定时器，用clearAllIntervals();
		setInterval : function(fn,interval){
			var id = setInterval(fn,interval);
			interval_ids.push(id);
			return id;
		},
		// 取消所有定时器
		clearAllIntervals : function(){
			$.each(interval_ids,function(i,n){
				clearInterval(n);
			})
		},
		getEnums : function(name){
			return enums[name];
		},
		colors:{
			 danger: '#ed4e2a',
			 info: '#57b5e3',
			 primary: '#428bca ',
			 warning: '#fcb322',
			 success: '#3cc051',
			 purple:'#852b99'
	 	}
		
    };

}();