Array.prototype.contains = function (element) {
		  
		    for (var i = 0; i < this.length; i++) {
		        if (this[i] == element) {
		            return true;
		        }
		    }
		    return false;
}

/**
* 时间对象的格式化
*/
Date.prototype.format = function(format){
	/*
	* format="yyyy-MM-dd hh:mm:ss";
	*/
	var o = {
	"M+" : this.getMonth() + 1,
	"d+" : this.getDate(),
	"h+" : this.getHours(),
	"m+" : this.getMinutes(),
	"s+" : this.getSeconds(),
	"q+" : Math.floor((this.getMonth() + 3) / 3),
	"S" : this.getMilliseconds()
	}

	if (/(y+)/.test(format))
	{
	format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
	- RegExp.$1.length));
	}

	for (var k in o)
	{
	if (new RegExp("(" + k + ")").test(format))
	{
	format = format.replace(RegExp.$1, RegExp.$1.length == 1
	? o[k]
	: ("00" + o[k]).substr(("" + o[k]).length));
	}
	}
	return format;
}
String.prototype.endWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substring(this.length-str.length)==str)
	  return true;
	else
	  return false;
	return true;
}
var Common = function () {

    // private functions & variables

    var myFunc = function(text) {
        alert(name);
    }
    var name="";
    // public functions
    return {
    	
    	toUpperCase1:function(str){ 
    	       var reg = /\b(\w)|\s(\w)/g; 
//    	       str = str.toLowerCase(); 
    	       return str.replace(reg,function(m){return m.toUpperCase()}) 
    	 },
        //main function
    	formatDateTime: function (data) {
    		return new Date(data).format('yyyy-MM-dd hh:mm:ss');
        },
        formatDate: function (data) {
        	return new Date(data).format('yyyy-MM-dd');
        },
        formatTime: function (data) {
        	return new Date(data).format('hh:mm:ss');
        },
        img:function(data){
        	 return '<img width="22" height="22"  src="'+_GLOBAL.imgUrlPrev+'/'+data+'" alt="" />';
        },
        star:function(data){
        	if(data){
        		var d = data/2;
        		var fullNum = Math.floor(d);
        		var isHalf = false;
        		if((d-fullNum)>=0.5){
        			isHalf = true;
        		}
        		var resultArray = ["<span style='color:#35aa47;'>"];
        		var i=0;
        		for(;i<fullNum;i++){
        			resultArray.push("<i class='fa fa-star'></i>");
        		}
        		if(isHalf){
        			resultArray.push("<i class='fa fa-star-half-o'></i>");
        			i++;
        		}
        		for(;i<5;i++){
        			resultArray.push("<i class='fa fa-star-o'></i>");
        		}
        		resultArray.push("</span>");
        		return resultArray.join('');
        	}else{
        		return "无";
        	}
        },
        
        cutText:function(value,maxLength){
        	var showText = value;
        	if(!maxLength){
        		maxLength = 5;
        	}
        	if(value && value.length>maxLength){
        		showText = value.substring(0,maxLength)+"...";
        	}
        	return '<span class="tooltips"  title="'+value+'">'+showText+'</span>';
        },
        
        pulsate:function(opt){
        	var cc = {
        			title:'',
        			pulsate:'warning',
        			icon:'fa fa-warning warning'
        		}
        	cc = $.extend(cc,opt);
        	return '<span class="pull-right tooltips" pulsate="warning" data-container="body" data-placement="top" data-original-title="'+cc.title+'" ><i class="'+cc.icon+'"></i></span>';
        },
        badge:function(opt){
        	var cc = {
        			title:'',
        			color:'info',
        			value:'0'
        	}
        	cc = $.extend(cc,opt);
        	return '<span class="pull-right tooltips badge badge-info"  data-container="body" data-placement="top" data-original-title="'+cc.title+'">'+cc.value+'</span>';
        },
        
        iframeResize:function(iframe){

            // Check if browser is Opera or Safari(Webkit so Chrome as well)
            if ($.browser.safari || $.browser.opera) {
                    var delayedResize = function () {
                        resizeHeight(iframe);
                    };
                    setTimeout(delayedResize, 0);
                    // Safari and Opera need a kick-start.
                    var source = $(this).attr('src');
                    $(iframe).attr('src', '');
                    $(iframe).attr('src', source);
            }else {
                    resizeHeight(iframe);
            }

            // resizeHeight
            function resizeHeight(iframe) {
                // Set inline style to equal the body height of the iframed content plus a little
                var newHeight = iframe.contentWindow.document.body.offsetHeight + options.heightOffset;
                iframe.style.height = newHeight + 'px';
            }
        }
        
    };

}();