/**
 * alert提示框
 * @param str
 * @param status
 * status取值{error:操作错误提示框；success:操作成功提示框；info：信息提示框；}
 * status表示普通警告
 */
	function alertMsg(str, status){
		if(!status){
			status = "";
		}else{
			status = "alert-"+status;
		}
		$('#alertMsg_id').remove();
		$("<div id='alertMsg_id' class='navbar-fixed-top alert "+status+" hide' style='text-align:center;line-height:24px;z-index:9999999;'><a id='alert_close' class=\"close\" data-dismiss=\"alert\">×</a><strong>"+str+"</strong></div>")
   		.prependTo("body");
   		$("#alertMsg_id").slideDown("slow").delay(500).slideUp("500");
   		$('#alert_close').click(function(){
   				$('#alertMsg_id').remove();
   				$("#alertMsg_id").slideUp("500");
   			}
   		);
	}

	function confirmMsg(str, status, callbak){
		if(!status){
			status = "";
		}else if(status == "default"){
			status = "";
		}else{
			status = "alert-"+status;
		}
		if(!str){
			str = "确定要删除吗？";
		}
		$('#confirmMsg_id').remove();
		var str = "<div id='confirmMsg_id' class='navbar-fixed-top alert "+status+" hide' "+
					  "style='line-height:66px; width:350px; z-index:9999999; padding:8px 0px 8px 0px; left:37%; border:7px solid #ddd;'> "+
					  "<div style='height:20px; border-bottom:1px solid rgb(180, 176, 176);'> "+
					  	"<span style='float:left;line-height:20px;margin-left:15px;'><i class='icon-info-sign'></i> 确认提示</span>"+
					  	"<button id='confirm_close' type='button' class='close' style='right:10px;'>×</button>"+
					  "</div>"+
					  "<div style='padding-left:20px;line-height:40px; border-bottom:1px solid rgb(180, 176, 176);'> "+
					  	str+
					  "</div>"+
					  "<div style='margin-top:10px;'> "+
					  	"<a id='confirm_cancel' href='javascript:void(0);' style='float:right; margin-right:13px;' class='btn btn-mini '>取消</a> "+
					  	"<a id='confirm_ok' href='javascript:void(0);' style='float:right; margin-right:6px;' class='btn  btn-mini btn-primary'>确定</a>";
					  "</div>"+
				  "</div>";
		$(str).prependTo("body");
		//$('.modal-backdrop').css("background-color", "rgb(56, 55, 55)");
		$("#alertBackground").fadeIn(200);
		
		$("#confirmMsg_id").slideDown(300);
		$('#confirm_ok').click(function(){
			
			$("#alertBackground").fadeOut(300);;
			$("#confirmMsg_id").stop(true, true).slideUp(300);
			callbak();
		});
		$('#confirm_cancel').click(function(){
			$("#alertBackground").fadeOut(300);;
			$("#confirmMsg_id").stop(true, true).slideUp(300);
			return false;
		});
		$('#confirm_close').click(function(){
			$("#alertBackground").fadeOut(300);;
			$("#confirmMsg_id").stop(true, true).slideUp(300);
			return false;
		});
		return false;
	}
	$('#alertBackground').click(function(){
		$("#alertBackground").fadeOut(300);
		$("#confirmMsg_id").stop(true, true).slideUp(300);
	});

	function alertMsg_bak(str, status){
		if(!status){
			status = "";
		}else{
			status = "alert-"+status;
		}
		$("#alertMsg_id").remove();
	    var str = "<div class='navbar-fixed-top alert "+status+" hide' "+
					  "style='line-height:66px; width:350px; z-index:9999999; padding:8px 0px 8px 0px; left:37%; border:1px solid #ddd;'> "+
					  "<div style='height:20px; border-bottom:1px solid #eee;'> "+
					  	"<span style='float:left;line-height:20px;margin-left:15px;'><i class='icon-info-sign'></i> 确认提示</span>"+
					  	"<button id='alert_close' type='button' class='close' style='right:10px;'>×</button>"+
					  "</div>"+
					  "<div style='padding-left:20px;line-height:40px; border-bottom:1px solid #eee;'> "+
					  	str+
					  "</div>"+
					  "<div style='margin-top:10px;'> "+
					  	"<a id='alert_ok' href='javascript:void(0);' style='float:right; margin-right:6px;' class='btn  btn-mini btn-primary'>确定</a>";
					  "</div>"+
				"</div>";
	   $(str).prependTo("body");
	   $("#alertMsg_id").slideDown("slow");
	   $('#alert_ok').click(function(){
		   $("#alertMsg_id").slideUp("fast");
			return true;
		});
		$('#alert_close').click(function(){
			$("#alertMsg_id").slideUp("fast");
			return false;
		});
	}
