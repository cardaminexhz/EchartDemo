/**
 * 通过当前点击的btn，定位到此btn所在的div_pannel
 * 在此div_pannel下，创建下一个div
 */
function createNextDiv(btn,currentDiv){
	 //找到该btn所在的ever_list_pannel_body
	 //创建一个新的div,追加到ever_list_pannel_body上
	 var uuid = Math.uuid();
	 var new_div = "<div id='"+uuid+"' class='pre-basepanel-div container-fluid hide table-boder' style='min-height: 200px; padding:0px 0px 0px 0px; margin:0px 0px 0px 0px; border:0px;'></div>";
	 currentDiv.after(new_div);
	 return uuid;
}

/**
 * 点击新建、修改、删除、查看按钮时，触发的方法
 * @param btn
 * @returns {Boolean}
 */
function buttonClick(btn, tipMsg){
	if(!tipMsg){
		tipMsg = "确认执行该操作吗？";
	}
	 var $me = $(btn)
	 if($me.hasClass("confirm")){   //点击删除按钮，触发事件
		  var url = $me.attr('href');
		  if(url){
			  confirmMsg(tipMsg, "default", function(){
				  $.ajax({   
					  type: "POST",  
					  dataType: "text",  
					  url: url,      //提交到一般处理程序请求数据  
					  success: function(data) {
						  if(data){
								data = eval("("+data+")");
								if(data.msg == ""){
									data["msg"] = "操作成功！";
								}
							}else{
								data = {};
								data["msg"] = "操作成功！";
							}
						  alertMsg(data.msg, "success");
						  initTable($me);
					  },
					  error: function(data) {
						  if(data){
								data = eval("("+data+")");
								if(data.msg == ""){
									data["msg"] = "操作成功！";
								}
							}else{
								data = {};
								data["msg"] = "操作成功！";
							}
						  alertMsg(data.msg, "error");
					  }
				  });
			  });
		  }
		  return false;
	 }
	 else{   //若点击的不是删除按钮
		 //获得本按钮定义的curid/preid/nextid属性
		 var slide_action = $me.attr("slide-action").split(" ");
		 var slide_action_map = new Map();
		 for(var i=0; i<slide_action.length; i++){
			 slide_action_map.put(slide_action[i], slide_action[i]);
		 }
		 if(slide_action_map && slide_action_map.get("new")){        //点击按钮，创建新页面 
			 //找到该按钮所在的slide_div
			 var ever_current_div_id = $me.attr("curid");
			 if(!$me.attr("curid")){
				 //找到该按钮所在slide_div的id属性
				 ever_current_div_id = $me.closest(".basepanel").attr("id");
				 //将该Id绑定到该按钮上
				 $me.attr("curid", ever_current_div_id);
			 }
			 var $ever_current_div = $("#"+ever_current_div_id);
			 
			 //创建一个新的div，追加到ever_list_pannel_body下面
			 var new_div_id = createNextDiv($me,$ever_current_div);
			 //创建出来的div的id，追加到该button的nextid属性上
			 $me.attr("nextid", new_div_id);
			 
			 //找到该按钮nextid所对应的slide_div对象
			 var $ever_next_div = $("#"+$me.attr("nextid"));
			 //当前div动画效果隐藏
			 //取得目新增页面内容，并将内容填充到div页面中
			 $ever_next_div.addClass("mask");
			 var url = $me.attr('href');
			 url = url.replace(/(^\s*)|(\s*$)/g, "");
			 $ever_next_div.load(url, function(){
				 $ever_next_div.removeClass("mask");
				 //从pre-div中，取得标题，插入到当前div中
				 var title = "  ";
				 var count = 0;
				 $ever_current_div.find(".table-boder-title .panel-nav span.panel-a-title").each(function(){
					 title = title + "<span class='panel-a-title'>" + $(this).html() + "</span></span><span class='separator'>/</span>";
					 count++;
				 });
				 var $pre_div = $ever_current_div.find(".table-boder-title .panel-nav span.panel-title");
				 var panel_nav_html = $pre_div.html();
				 title = title + "<span class='panel-a-title'><a class='pre-title' slide-action='index' index="+count+" nextid="+new_div_id+" curid = '"+ever_current_div_id+"' onclick='return buttonClick(this);'>"+panel_nav_html+"</a></span><span class='separator'>/</span>";
				 //获得当前div的标题
				 $ever_next_div.find(".table-boder-title .panel-nav span").before(title);;
				 //查询该div里面所有的btn按钮，为其绑定preid属性
				 $ever_next_div.find("a").each(function(){
					 if($(this).attr("slide-action") && !$(this).hasClass("pre-title")){
						 $(this).attr("preid", ever_current_div_id);
						 $(this).attr("curid", new_div_id);
					 }
				 });
			 });
			 $ever_next_div.slideShow("left", 500);
			 $ever_current_div.slideHide("left", 500);
			 return false;
		 }else if(slide_action_map && slide_action_map.get("back")){     //点击按钮，关闭当前按钮，返回上级div
			 if(slide_action_map && slide_action_map.get("save")){
				 ajaxDown($me);
			 }else{
				 $ever_current_div = $("#"+$me.attr("curid"));
				 $ever_pre_div = $("#"+$me.attr("preid"));
				 $ever_pre_div.slideShow("right", 500);
				 $ever_current_div.slideHide("right",500, function(){
					 //销毁当前对象
					 $ever_current_div.remove();
				 });
			 }
			 return false;
		 }else if(slide_action_map && slide_action_map.get("index")){     //导航title动作
			 $ever_pre_div = $("#"+$me.attr("curid"));
			 
			 var $last_div = $me.closest(".pre-basepanel-div");
			 
			 //查找nextid="id"的a标签
			 var index = $me.attr("index");
			 
			 $ever_pre_div.slideShow("right", 500);
			 $last_div.slideHide("right",500, function(){
				 //遍历删除
				 $last_div.find(".panel-a-title a").each(function(){
					 if($(this).attr("index") > index){
						 $("#" + $(this).attr("curid")).remove();
					 }
				 });
				 //删除当前div
				 $last_div.remove();
			 });	
			 return false;
		 }
		 slide_action_map.clear();
	 }
}