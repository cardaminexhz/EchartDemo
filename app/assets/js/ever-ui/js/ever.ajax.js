/**
 * save方法的ajax提交
 * @param {Object} form
 */
var $ever_current_div = null;
var $ever_pre_div = null;
var $me = null;
function ajaxDown(btn){
   var options = {  
	    success: showResponse,      //提交后的回调函数  
	    error:errorResponse,        //提交失败
	    timeout: 5000,               //限制请求的时间，当请求大于3秒后，跳出请求  
	    dataType: null,           //html(默认), xml, script, json...接受服务端返回的类型  
	    clearForm: true,          //成功提交后，清除所有表单元素的值  
	    resetForm: true          //成功提交后，重置所有表单元素的值  
	    //target: '#alertMsg',          //把服务器返回的内容放入id为output的元素中      
	    //beforeSubmit: showRequest,  //提交前的回调函数  
	    //url: url,                 //默认是form的action， 如果申明，则会覆盖  
	    //type: type,               //默认是form的method（get or post），如果申明，则会覆盖  
	}
    $me = $(btn);
	$ever_current_div = $me.closest(".slide_div");
	$ever_pre_div = $("#"+$me.attr("preid"));
	
	// 提交表单
	var form = $ever_current_div.find("form");
	$me.button('loading')
	$(form).ajaxSubmit(options);
	// 为了防止普通浏览器进行表单提交和产生页面导航（防止页面刷新？）返回false
	return false;
		
}

function showResponse(data){
	$me.button('reset');
	if(data){
		data = eval("("+data+")");
		if(data.msg == ""){
			data["msg"] = "操作成功！";
		}
		if(data.code && (data.code == '200' || data.code == '0')){
			//弹出成功提示
			alertMsg(data.msg, "success");
			$ever_current_div.slideHide("right", 500,function(){
				//销毁当前页面
				$ever_current_div.remove();
				$ever_current_div = null;
			});
			$ever_pre_div.slideShow("right", 500);
			//刷新table页面
			initTable($ever_pre_div);
			
			$ever_pre_div = null;
			$me = null;
		}else{
			alertMsg("保存失败！", "error");
			return;
		}
	}else{
		alertMsg("保存失败！", "error");
		return;
	}
	
}

function errorResponse(){
	//弹出成功提示
	alertMsg("保存失败！", "error");
}