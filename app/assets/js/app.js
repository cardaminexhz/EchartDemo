var App ={
		
	   
		   // 默认样式配置
	    _themeDefaultConfig:{
	    		layout:'fluid', // fluid | boxed
	    		header:'fixed', // fixed | default
	    		sidebar:'fixed', // fixed | default
	    		footer:'default', // fixed | default
	    		color:'default',// default | blue | brown | purple | grey | light
	    		fullscreen:false, // true | false
	    		sidebarHide:false, // true | false 是否隐藏功能菜单
	    		openFirstMenu:true // 是否展开第一个菜单目录
	    },
		_dataSetName : "ids", //　表格中多选提交时参数的name
		// wrapper function to scroll(focus) to an element
        scrollTo: function (el, offeset) {
            pos = (el && el.size() > 0) ? el.offset().top : 0;
            jQuery('html,body').animate({
                scrollTop: pos + (offeset ? offeset : 0)
            }, 'slow');
        },

        // function to scroll to the top
        scrollTop: function () {
            App.scrollTo();
        },

        // wrapper function to  block element(indicate loading)
        blockUI: function (el, centerY) {
            var el = jQuery(el);
            if (el.height() <= 400) {
                centerY = true;
            }
            el.block({
                message: '<img src="'+_GLOBAL.ctx+'/assets/img/ajax-loading.gif" align="">',
                centerY: centerY != undefined ? centerY : true,
                css: {
                    top: '10%',
                    border: 'none',
                    padding: '2px',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.05,
                    cursor: 'wait'
                }
            });
        },

        // wrapper function to  un-block element(finish loading)
        unblockUI: function (el, clean) {
            jQuery(el).unblock({
                onUnblock: function () {
                    jQuery(el).css('position', '');
                    jQuery(el).css('zoom', '');
                }
            });
        }
};

jQuery(function($) {
	//sometimes we try to use 'tap' event instead of 'click' if jquery mobile plugin is available
	



// 初始化菜单
 var handleAjaxPage = function(url,title){
		  var pageContent = $('.page-content');
	      var pageContentBody = $('.page-content .page-content-body');
	      var pageContentBodyIframe = $('.page-content .page-content-body-iframe');
//    	App.blockUI(pageContent, false);
	     
    	
        $.ajax({
            type: "GET",
            cache: false,
            url: url,
            dataType: "html",
            success: function (res) {
//                App.unblockUI(pageContent);
                _GLOBAL.clearAllIntervals();
            	pageContentBody.html(res);
            	pageContentBodyIframe.empty();
//            	App.fixContentHeight(); // fix content height
            	App.initAjax(); // initialize core stuff
            	
            	//初始化上一点击的INLINE类型的BUTTON
            	if(_GLOBAL.initInline){
            		_GLOBAL.initInline = !clickLastInlineBtn();;
            	}
            },
            error: function (xhr, ajaxOptions, thrownError) {
                pageContentBody.html('<h4>无法加载请求页面.</h4><br/>请尝试<a href="javascript:location.reload();">刷新页面</a>以解决该问题.');
//                App.unblockUI(pageContent);
            },
            async: true
        });
    }
 // Handles Bootstrap Tooltips.
 var handleTooltips = function () {
 	jQuery('.tooltips').tooltip();
 }

    var handleMenuClickUrl = function(url,menu){
    	if(url.endWith('/list')){
        	url+='Page';
        }
        if(url.indexOf('/list?')!=-1){
        	url = url.replace('/list?','/listPage?');
        }
        $(window).unbind('hashchange');
        window.location.hash = '#!' + url;
        
        // 将当前按钮保存到全局变量
        _GLOBAL.lastMenu = menu;
        _GLOBAL.setLastUrl(url);
        
        setTimeout(bindHashchange,1);
        return url;
    }
    
    
    var bindHashchange = function(){
    	$(window).bind('hashchange', function(eve) {
        	handleSideBarInitState();
        });
    }
    var findTitleBread = function(title,tmp){
    	var pul = tmp.parent().parent();
    	
    	if(!pul || pul.attr('id')=='_main_page_sidebar_menu'){
			return;
		}
    	if(pul.hasClass('submenu')){
    		tmp = pul.prevUntil('a.dropdown-toggle').prev();
    		var pul = tmp.parent().parent();
        	if(!pul || pul.attr('id')=='_main_page_sidebar_menu'){
        		var icon = $(tmp.find('i')[0]).attr('class').replace('menu-icon','');
        		title.unshift('<li><i class="ace-icon '+icon+'"></i>'+tmp.text()+'</li>');
    			return;
    		}else{
    			title.unshift('<li>'+tmp.text()+'</li>');
    		}
    	}
    	findTitleBread(title,tmp);
    }
    var handleMenuTitle = function($this){
    	if($this){
    		var title = [];
    		var pul = $this.parent().parent();
        	
        	if(!pul || pul.attr('id')=='_main_page_sidebar_menu'){
        		var icon = $($this.find('i')[0]).attr('class').replace('menu-icon','');
        		title.unshift('<li><i class="ace-icon '+icon+'"></i>'+$this.text()+'</li>');
    		}else{
    			
    			title=['<li>'+$this.text()+'</li>'];
    			var tmp=$this;
    			findTitleBread(title,tmp);
    		}
//    		while(true){
//    			var pul = tmp.parent().parent();
//    			title.push('<li>'+$(pul.find('a')[0]).text()+'</li>');
//    			tmp=$(pul.find('a')[0]);
//        		if(pul && pul.attr('id')=='_main_page_sidebar_menu'){
//        			break;
//        		}
//    		}
    		var pageContentTitle = $('#_main_page_title');
    		if(title){
    			pageContentTitle.html(title.join(''));
    		}
    	}
    }
    // Handle sidebar menu
    var handleSidebarMenu = function () {
        jQuery('#_main_page_sidebar_menu').on('click', 'li > a', function (e) {
        	
        	 var url = $(this).attr("href");
        	// 如果url === "###" 则表示当前菜单不可用
            if(url=="###" || url == "javascript:;"){
            	return;
            }
            if ($(this).next().hasClass('submenu') == true) {
                
                return;
            }

            e.preventDefault();
        });

        // handle ajax links
        jQuery('#_main_page_sidebar_menu').on('click', ' li > a.ajaxify', function (e) {
            e.preventDefault();
            
            
            var url = $(this).attr("href");
            // 如果url === "###" 则表示当前菜单不可用
            if(url=="###" ||  url == "javascript:;"){
            	return;
            }
           
            handleMenuTitle($(this));
           if($(this).parents('li').hasClass('active')){
        	   if(_GLOBAL.lastMenu){
        		   _GLOBAL.lastMenu.parents('li').removeClass('active');
        	   }
           }else{
        	   
        	   var menuContainer = jQuery('#_main_page_sidebar_menu');
        	   var lastActive = menuContainer.find('li.active');
        	   if(lastActive){
        		   lastActive.removeClass('active');
        		   lastActive.removeClass('open');
        		   var lastActiveUl = lastActive.find('ul.nav-show');
        		   lastActiveUl.removeClass('nav-show');
        		   lastActiveUl.slideUp(250);
        	   }
           }
            
            $(this).parents('li').addClass('active');
            
            // 如果为list 则 转换为listPage ,为了适应单独ajax请求的列表页面
            url = handleMenuClickUrl(url,$(this));
            handleAjaxPage(url,$(this).text());
            
        });
        // 处理iframe 
        jQuery('#_main_page_sidebar_menu').on('click', ' li > a.iframefy', function (e) {
        	e.preventDefault();
//        	App.scrollTop();
        	
        	var url = $(this).attr("href");
        	// 如果url === "###" 则表示当前菜单不可用
        	if(url=="###"){
        		return;
        	}
        	
        	  handleMenuTitle($(this));
        	
        	if($(this).parents('li').hasClass('active')){
         	   if(_GLOBAL.lastMenu){
         		   _GLOBAL.lastMenu.parents('li').removeClass('active');
         	   }
            }else{
         	   
         	   var menuContainer = jQuery('#_main_page_sidebar_menu');
         	   var lastActive = menuContainer.find('li.active');
         	   if(lastActive){
         		   lastActive.removeClass('active');
         		   lastActive.removeClass('open');
         		   var lastActiveUl = lastActive.find('ul.nav-show');
         		   lastActiveUl.removeClass('nav-show');
         		   lastActiveUl.slideUp(250);
         	   }
            }
             
             $(this).parents('li').addClass('active');
        	// 如果为list 则 转换为listPage ,为了适应单独ajax请求的列表页面
        	url = handleMenuClickUrl(url,$(this));
        	
        	
        	
        	var pageContent = $('.page-content');
  	      var pageContentBody = $('.page-content .page-content-body');
  	      var pageContentBodyIframe = $('.page-content .page-content-body-iframe');

//        	App.blockUI(pageContent, false);
        	pageContentBody.empty();
        	var iContent = pageContentBodyIframe.html('<iframe  class="page-content-body"   frameborder="0" scrolling="no" style="width: 100%"   ></iframe>');
        	// iframe高度自适应子页面
        	var iframeWin = iContent.children().first();
        	iframeWin.iframeAutoHeight();
        	iframeWin.load(function(){
//        		 App.unblockUI(pageContent);
        		 var iframe = this;
        		 _GLOBAL.clearAllIntervals();
        		_GLOBAL.intervals['iframeInterval']= _GLOBAL.setInterval(function(){
        			if(iframe.contentWindow){
        				var newHeight = iframe.contentWindow.document.body.scrollHeight;
        				iframe.style.height = newHeight + 'px';
        			}else{
        				_GLOBAL.clearAllIntervals();
        			}
        		}, 500);
        	});
        	iframeWin.attr('src',url);
        });
    }
    
    
    
    
 // Handle full screen mode toggle
    var handleFullScreenMode = function() {
        // mozfullscreenerror event handler
       
        // toggle full screen
        function toggleFullScreen() {
          if (!document.fullscreenElement &&    // alternative standard method
              !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
              document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            $.cookie('fullscreen','1',{ expires: 365 });
          } else {
            if (document.cancelFullScreen) {
              document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            }
            $.cookie('fullscreen','0',{ expires: 365 });
          }
        }

        $('#trigger_fullscreen').click(function() {
            toggleFullScreen();
        });
        if(($.cookie('fullscreen') && $.cookie('fullscreen')=='1')|| !$.cookie('fullscreen') && (App._themeDefaultConfig.fullscreen)){
        	
//        	bootbox.confirm("是否全屏显示？",function(result){
//        		if(result){
//        			toggleFullScreen();
//        		}else{
//        			$.cookie('fullscreen','0',{ expires: 365 });
//        		}
//        	});
        	
        	 bootbox.dialog({
                 message: "是否全屏显示？",
                 title: "系统消息",
                 buttons: {
                   danger: {
                     label: "不,谢谢",
                     className: "red",
                     callback: function() {
                    	 $.cookie('fullscreen','0',{ expires: 365 });
                     }
                   },
                   main: {
                     label: "全屏显示",
                     className: "blue",
                     callback: function() {
                    	 toggleFullScreen();
                     }
                   }
                 }
             });
        }
    }
    
    
    
    
    // Handle logout
    var handleLogout = function() {
    	// mozfullscreenerror event handler
    	
    	// toggle full screen
    	function logout() {
    		
    		bootbox.confirm("确认要退出系统吗?", function(result) {
    			if(result){
    				window.location.href=_GLOBAL.ctx+"/j_spring_security_logout";
    			}
             });
    	}
    	
    	$('#trigger_logout').click(function() {
    		logout();
    	});
    }
    
    // Handles custom checkboxes & radios using jQuery Uniform plugin
    var handleUniform = function () {
        if (!jQuery().uniform) {
            return;
        }
        var test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)");
        if (test.size() > 0) {
            test.each(function () {
                if ($(this).parents(".checker").size() == 0) {
                    $(this).show();
                    $(this).uniform();
                }
            });
        }
    }
    
    
    /**
     *  按钮触发事件响应数据的处理类型(data-handler)
     *  "INLINE":用返回的html内容替换当前的portlet
     *  "MESSAGE":返回简单的结果信息{content:''}
     *  "CONFIRM" 确认
     *  "MODAL":将返回的html以modal 的形式展示
     *  
     */
    var handleDataHandler = function(){
    	handleMenu4INLINE(" [data-handler='INLINE']");
    	handleMenu4MESSAGE(" [data-handler='MESSAGE']");
    	handleMenu4CONFIRM(" [data-handler='CONFIRM']");
    	handleMenu4MODAL(" [data-handler='MODAL']");
    	handleMenu4PAGE(" [data-handler='PAGE']");
    }
    
    
    // 获取列表中选中的行的值集合
    var _getDataSetValues=function(dataSet){
    	var data = {};
    	if(dataSet){
    		var values = [];
    		$(dataSet).each(function () {
                if($(this).attr("checked") ||$(this).prop("checked") ) {
                	values.push($(this).val());
                } 
            });
    		if(values.length<=0){
    			bootbox.alert("请选择数据进行该操作！");
    			return false;
    		}
    		var valuesStr = values.toString();
    		data[App._dataSetName] = valuesStr;
    	}
    	return data;
    }
    
    var handleMenu4INLINE = function (selector) {
    	 
    	 $(selector).unbind("click");
	   	 $(selector).on('click',function(e){
	   		
	   		 e.preventDefault();
	   		 var $portA = $(this).parents('.widget-box');
	   		 var $this = $(this);
	   		 var $portAParent = $portA.parent();
	   		 var url = $this.attr('href');
	   		 var title = $this.attr('data-title');
	   		 var form = $this.attr('data-form');
	   		 var dataSet =  $this.attr('data-set');
	   		 var picon =  $this.attr('portlet-icon');
	   		 picon= picon?picon:'fa fa-edit';
	   		 var data = _getDataSetValues(dataSet);
	   		 if(!data){
	   			 return;
	   		 }
	   		 // 利用hash来记录上次点击的菜单URL
	   		 _GLOBAL.setLastInlineUrl(url);
	   		 
	   		 
	   		App.blockUI($portAParent, false);
	   		 //加载下一个portlet
	   		 $portA.animate({right: '+200%',opacity: 'toggle'},'nomal','swing',function(){
//		   			 App.blockUI($portAParent, false);
		   			 $.ajax({
		   				 type: "post",
		   				 cache: false,
		   				 url: url,
		   				 data:data,
		   				 dataType: "html",
		   				 success: function (res) {
		   				    App.unblockUI($portAParent);
		   				    _GLOBAL.clearAllIntervals(); 
		   					var tmpl = res;
		   					 if(title){
		   						tmpl = [
		   									'<div class="widget-box  widget-color-blue2">',
		   									'<div class="widget-header widget-header-flat">',
		   									'<div class="widget-title"><i class="ace-icon '+picon+'"></i>'+title+'</div>',
		   									'<div class="widget-toolbar">',
		   									'<a href="javascript:;" data-action="fullscreen" class="orange2"><i class="ace-icon fa fa-expand"></i></a>',
		   									'<a href="javascript:;" class="remove" data-action="close"><i class="ace-icon fa fa-times"></i></a>',
		   									'</div>',
		   									'</div>',
		   									'<div class="widget-body '+(form?'form':'')+'">',
		   									'<div class="widget-main">',
		   										res,
		   									'</div>',
		   									'</div>',
		   									'</div>'

		   					              ].join('');
		   					 }
		   					 
		   					 $portA.after(tmpl);
//		   					 App.fixContentHeight(); // fix content height
		   					 App.initAjax(); // initialize core stuff
		   					 
		   					 // 管理返回按钮 
		   					 var $portB = $portA.next();
		   					 var $backMenu = $portB.find('.widget-header > .widget-toolbar > a.remove');
		   					 var fnback = function(e){
		   						 e.preventDefault();
		   						 
		   						 $portB.hide('fast','swing',function(){
		   							 $portB.empty();
		   							 $portB.remove();
		   							 $portA.animate({right: '+0%',opacity: 'toggle'},'fast','swing',function(){
		   								 // 刷新 portlet
//		   								 window.location.hash = window.location.hash.split("#!!")[0];
		   								 $portA.find('  .widget-toolbar > a.reload').click();
		   							 });
		   						 });
		   					 }
		   					 $backMenu.unbind();
		   					 $backMenu.on('click',fnback);
			   				 var $backMenu2 = $portB.find('button.remove');
			   				
			   				 if($backMenu2){
			   					$backMenu2.on('click',fnback);
			   				 }
		   					 
		   				 },
		   				 error: function (xhr, ajaxOptions, thrownError) {
		   					App.unblockUI($portAParent);
		   					 $portAParent.html('<h4>无法加载请求页面.</h4><br/>请尝试<a href="javascript:location.reload();">刷新页面</a>以解决该问题.');
//		   					 App.unblockUI($portAParent);
		   				 },
		   				 async: true
		   			 });
	   		 });
	   		 
	   	 })
    }
    var handleMenu4PAGE = function (selector) {
    		$(selector).unbind("click");
    		$(selector).on('click',function(e){
	    		e.preventDefault();
//	    		_GLOBAL.lastHandler=$(this);
//	    		var $portA = $(this).parents('.portlet');
	    		var url = $(this).attr('href');
//		   		 var dataSet =  $(this).attr('data-set');
	    		handleAjaxPage(url,$(this).attr('title'));
    		})
    }
    var handleMenu4MODAL = function (selector) {
    	$(selector).unbind("click");
    	$(selector).on('click',function(e){
    		e.preventDefault();
    		_GLOBAL.lastHandler=$(this);
    		var $portA = $(this).parents('.wedget-box');
    		var url = $(this).attr('href');
    		var dataSet =  $(this).attr('data-set');
    		
    		var modal = openModal({
    			url:url,
    			simple:$(this).attr('modal-simple'),
    			title:$(this).attr('data-title'),
    			size:$(this).attr('modal-size'),
    			dataSet:dataSet
    		});
    		
    	})
    }
    var handleMenu4MESSAGE = function (selector) {
    	$(selector).unbind("click");
    	$(selector).on('click',function(e){
    		e.preventDefault();
    		
    		
    		var size = $(this).attr('modal-size')?$(this).attr('modal-size'):'400';
			var title = $(this).attr('data-title')?$(this).attr('data-title'):'By System.';
			var content = $(this).attr('data-content')?$(this).attr('data-content'):'';
			var icon = $(this).attr('modal-icon')?$(this).attr('modal-icon'):'fa-smile-o';
			var color = $(this).attr('modal-color')?$(this).attr('modal-color'):'blue';
    		var tmpl = [
		            '<div class="modal fade " tabindex="-1" data-width="'+size+'" data-replace="false">',
		            '<div class="dashboard-stat '+color+'">',
			        	'<div class="visual">',
			        		'<i class="fa '+icon+'"></i>',
			        	'</div>',
			        	'<div class="details">',
			        		'<div class="number">'+content+'</div>',
			        		'<div class="desc">'+title+'</div>',
			        	'</div>',
		        	'</div>',
		            '</div>'
		            ].join('');
    		$(tmpl).modal().on('hidden.bs.modal', function (e) {
		    	 // do something...
		    	 $(this).empty();
			})
    	})
    }
    
    var openModal = function(opt){
    	
    	 var data = _getDataSetValues(opt.dataSet);
    	 if(!data){
   			 return;
   		 }
//    	 $('body').modalmanager('loading');
    	 $.ajax({
				 type: "post",
				 cache: false,
				 url: opt.url,
				 dataType: "html",
				 data:data,
				 success: function (res) {
					 // general settings
					var size = opt.size?opt.size:'75%';
					var title = opt.title?opt.title:'';
		            var tmpl;
		            if(opt.simple && opt.simple=='true'){
		            	tmpl = [
		            	        // data-replace 为true时 表示替换已经打开的modal，为false时表示新打开一个modal
					            '<div class="modal fade " tabindex="-1" data-width="'+size+'" data-replace="false">',
					            res,
					            '</div>'
					            
					            ].join('');
		            }else{
		            	 tmpl = [
									'<div class="modal  fade " tabindex="-1" data-replace="false" data-width="'+size+'" >',
										'<div class="modal-dialog" style="width:'+size+'">',
											'<div class="modal-content">',
												'<div class="modal-header no-padding">',
													'<div class="table-header">',
													'<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="white">&times;</span></button>',
													title?title:'',
													'</div>',
												'</div>',
												'<div class="modal-body">',
												res,
												'</div>',
											'</div>',
										'</div>',
									'</div>'

					              ].join('');
		            }
		            setTimeout(function(){
		        	   var modal = $(tmpl).modal();
			            modal.on('hidden.bs.modal', function (e) {
					    	 
					    	 // do something...
//					    	 if ($('.modal:visible').size() <= 0) {
//				            	 $('body').removeClass('modal-open-noscroll');
//				             }
					    	 $(this).empty();
						});
//					    	 if ($('.modal:visible').size() == 0) {
//					    		 $('body').addClass('modal-open-noscroll');
//					    	 } 
					    _GLOBAL.lastModal= modal; 
			            
						 App.initAjax();
		           },150)
				 },
				 error: function (xhr, ajaxOptions, thrownError) {
					bootbox.alert("操作失败，请尝试刷新页面以解决该问题。");
				 },
				 async: true
			 });
    	
    }
    var handleMenu4CONFIRM = function (selector) {
    	$(selector).unbind("click");
    	$(selector).on('click',function(e){
    		e.preventDefault();
    		var $portA = $(this).parents('.widget-box');
    		var url = $(this).attr('href');
    		 var dataSet =  $(this).attr('data-set');
    		 var dataTitle =  $(this).attr('data-title');
    		 var callback =  $(this).attr('data-callback');
    		 var data = _getDataSetValues(dataSet);
    		 if(!data){
    			 return;
    		 }
    		//加载下一个portlet
    		bootbox.confirm(dataTitle?dataTitle:'确定要执行此操作吗？',function(result){
    			
    			if(result){
    				App.blockUI('body',true);
    				$.ajax({
    					type: "post",
    					cache: false,
    					url: url,
    					data:data,
    					dataType: "json",
    					success: function (res) {
//		   					bootbox.alert(res.message);
//    						console.log(res);
    						App.unblockUI('body',true);
    						
    						toastr[res.type?res.type:'info'](res.message, '系统消息'); 
    						
    						if(callback){
    							try {
    								eval(callback);
								} catch (e) {
								}
    						}else{
    							$portA.find('.widget-toolbar > a.reload').click();
    						}
    					},
    					error: function (xhr, ajaxOptions, thrownError) {
    						bootbox.alert("操作失败，请尝试刷新页面以解决该问题。");
    					},
    					async: true
    				});
    			}
    		})
    	})
    }
    	
    
    var handleSideBarInitState = function(){
    	// 显示页面
//    	setTimeout('$("html").removeClass("hideall")',200);
    	 // 打开上次的页面
    	 var oldHash = window.location.hash;
    	 var oldHashs = oldHash.split("#!!");
    	 var urlHistory = oldHashs[0].split("#!");
    	 if(urlHistory && urlHistory.length>1){
    		 
    		 if(urlHistory[1]!=_GLOBAL.lastUrl || oldHashs.length==1){
    			 if(oldHashs.length>1){
    				 _GLOBAL.initInline = true;
    			 }
    			 if( urlHistory[1]!='/commons/homePage' ){
    				 
    	    		 openSidebarMenu(urlHistory[1]);
    	    		 if(oldHashs.length>1){
    	    			 window.location.hash = oldHash;
    	    		 }
    	    	 }else{
    	    		
    	    		 _GLOBAL.initInline = false;
    	    		 // 打开首页
    	    		 $("#_main_page_sidebar_menu li:eq(0) a:eq(0)").click();
    	    		 // 打开第一个菜单目录
//    	    		 if(App._themeDefaultConfig.openFirstMenu){
//    	    			 setTimeout(function(){
//    	    				 $("#_main_page_sidebar_menu li:eq(1) a:eq(0)").click();
//    	    			 },800);
//    	    		 }
    	    	 } 
    		 }
    	 }else{
    		 _GLOBAL.initInline = false;
    		 // 打开首页
    		 $("#_main_page_sidebar_menu li:eq(0) a:eq(0)").click();
    		 // 打开第一个菜单目录
//    		 if(App._themeDefaultConfig.openFirstMenu){
//    			 setTimeout(function(){
//    				 $("#_main_page_sidebar_menu li:eq(2) a:eq(0)").click();
//    			 },800);
//    		 }
    	 }
    	 
    	 
    }
    
    
    /**
     * 根据菜单的url 打开菜单
     */
    var openSidebarMenu = function(menu_url){
    	$('#_main_page_sidebar_menu  li > a').each(function(i,t){
    		var url = $(t).attr('href');
    		if(url){
//    			console.log(url);
    			if(url.endWith('/list')){
    				url+='Page';
    			}
    			if(url.indexOf('/list?')!=-1){
    				url = url.replace('/list?','/listPage?');
    			}
    			if(  url == menu_url){
	    			$(t).click();
	    			return false;
    			}
    		}
    	})
    }

    var clickLastInlineBtn = function(){
    	var url = _GLOBAL.getLastInlineUrl();
    	if(url){
    		var lastBtn = $('#_global_main_page-content-body').find('[href="'+url+'"][data-handler="INLINE"]');
//    		console.log(lastBtn);
    		if(lastBtn && lastBtn.length>0){
    			lastBtn.click();
    			return true;
    		}
    	}
    	return false;
    }
    
    App.clickLastInlineBtn = clickLastInlineBtn;
    
    
    // 初始化
    App.init = function(){
    	if(!_GLOBAL.initedMenu){
    		_GLOBAL.initedMenu=true;
    		$.ajax({
    			url:_GLOBAL.ctx+"/sys/main/getNav",
    			success: function(data){
    				
    				$("#_main_page_sidebar_menu").append(data);
//    				_GLOBAL.initedMenu=true;
    				ace.handle_side_menu(jQuery);
    			},
    			dataType:"text",
    			async:false
    		});
    	}
    	
    	handleSidebarMenu(); // 菜单点击事件
    	handleLogout();
    	handleFullScreenMode();
    	App.initAjax();
    	// 打开首页  显示整个页面  展开第一个菜单目录 
        handleSideBarInitState();
    }
    
    App.initAjax = function(){
    	handleDataHandler();
    	handleUniform();
    	handleDataHandler(); // 按钮事件
    	handleTooltips();
    }
    
})