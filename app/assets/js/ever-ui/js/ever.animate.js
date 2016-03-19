//扩展jquery对象，添加自定义方法
(function($){
	$.fn.extend({
		slideShow: function (direction, delay, callback) {
			var $me = this;
	        var left = $me.width();
	        if (direction && new String(direction).toLowerCase() == "right"){
	        	left = left * -1 + 10;
	        }else{
	        	left = 1350;
	        }
	        $me.stop(true, true).css({ left: left }).animate({ left: 0 }, delay, function () {
	        	$me.fadeIn(300);
	            if (typeof (callback) == "function"){
	                callback.call(this);
	            }
	        });
		},
		slideHide: function (direction, delay, callback) {
			var $me2 = this;
	        var left = $me2.width();
	        if (!direction || new String(direction).toLowerCase() == "left"){
	        	left = left * -1-160;
	        }else{
	        	left = left + 60;
	        }
	        $me2.stop(true, true).css({ left: 0 }).animate({ left: left }, delay, function () {
	        	$me2.fadeOut(10);
	            if (typeof (callback) == "function"){
	                callback.call(this);
	            }
	        });
		}
	});
})(jQuery);