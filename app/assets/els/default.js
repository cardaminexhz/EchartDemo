
$(document).ready(
function()
{
  $("#as_list .menubtn").click(
  function()
  {
   if($(this).attr("class").indexOf("hidecontent")>=0)
   {
     $("#attack_rank1").animate({left:'40px'},"slow");
     $("#attack_alarm1").animate({left:'40px'},"slow");
     
     $("#as_list").animate({left:'-310px'},"slow");
     $(this).removeClass("hidecontent");
     $(this).addClass("showcontent");
   }
   else
   {
     $("#attack_rank1").animate({left:'-345px'},"slow");
     $("#attack_alarm1").animate({left:'-478px'},"slow");
     $("#as_list").animate({left:'0px'},"slow");
     $(this).addClass("hidecontent");
     $(this).removeClass("showcontent");
   }
  });
  $(".content .title .btn1").click(
  function()
  {
    if($(this).attr("class").indexOf("btn1_hover")>=0)
    {
      $(this).parent().parent().find(".body").stop().animate({height:'show'},"slow");
      $(this).removeClass("btn1_hover");
    }
    else
    {
      $(this).parent().parent().find(".body").stop().animate({height:'hide'},"slow");
      $(this).addClass("btn1_hover");
    }
    
  });
  $("#headermenu .inner li .pic").click(
  function()
  {
    if($(this).attr("class").indexOf("pic_hover")>=0)
    {
      $(this).removeClass("pic_hover");
      $(this).parent().find(".itemlist").stop().animate({height:'hide'});
    }
    else
    {
      $(this).addClass("pic_hover");
      $(this).parent().find(".itemlist").stop().animate({height:'show'});
    }
  });
  $(".radiolist .item").click(
  function(){
  $(this).find(".radio").attr("checked","checked");
  $(this).parent().find(".radiospan").removeClass("radiospancurrent");
  $(this).find(".radiospan").addClass("radiospancurrent");
  });
  $(".checkboxlist .item").click(
  function(){
  if($(this).find(".checkbox").attr("checked"))
  {
    $(this).find(".checkbox").attr("checked",false);
    $(this).find(".checkboxspan").removeClass("checkboxspancurrent");
  }
  else
  {
    $(this).find(".checkbox").attr("checked","checked");
    $(this).find(".checkboxspan").addClass("checkboxspancurrent");
  }
  }); 
    $("#headermenu li").click(function(e){
    e.stopPropagation();
    });
    $(document).click(function(){
    $("#headermenu .inner li .pic").removeClass("pic_hover");
    $("#headermenu .itemlist").stop().animate({height:'hide'});
    });
    "use strict";
    var h = $(window).height();
    var i = h-145-50-63+30;
    $("#scrollcontent").height(i).perfectScrollbar();
    $(window).resize(function() { 
    h = $(window).height();
    i = h-145-50-63+30;
    $('#scrollcontent').height(i).perfectScrollbar('update');
    });
    
    
    
  if($("#ranklist li").length > 8)
  {
  scrollnum = $("#ranklist li").length;
  $("#ranklist ul").append($("#ranklist ul").html());
  bannertimeset = setInterval("scrollimg()",3000);
  $("#ranklist").hover(
  function(){clearTimeout(bannertimeset);},
  function(){bannertimeset = setInterval("scrollimg()",3000);}
  );
  }
  $("#tree").treeview({
    collapsed: false,
    animated: "fast",
    control:"#sidetreecontrol",
    prerendered: true,
    persist: "location"
  });
  
  $("#search_btn").click(function(){
	  var content = $("#search_txt").val();
	  var exp1 = new RegExp('^[0-9]+$');
	  var exp2 = new RegExp('^AS[0-9]+$','i');
	  if(exp1.test(content) || exp2.test(content))
	  {
	  	  window.location.href = 'template.html?as='+content;
	  }
	  else
	  {
		  $("#search_txt").val('');
	  }
  });
  
  $('.cn').click(function(e){
	  e.preventDefault();
	  var href = location.pathname;
  	  var paths = href.split('/');
	  console.log(paths);
	   if(paths[paths.length-1] != 'china_in.html')
  	  {
  		  window.location.href = 'template.html?as='+$(this).text();
  	  }
  })
});
var scrollnum = 0;
var bannertimeset;
function scrollimg()
{
   if($("#ranklist ul").css("top").replace("px","") < (-20 * ($("#ranklist li").length - 9)))
    {
      $("#ranklist ul").css("top",-20 * scrollnum + 160 + 'px');
    }

     $("#ranklist ul").animate({top:'-=20px'});
}
