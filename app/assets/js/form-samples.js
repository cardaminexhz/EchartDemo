var FormSamples={
		init:function(opt){
			FnFormSamples().init(opt);
		}
}

var FnFormSamples = function () {
	
	var config = {
		formId:'',
		// 表单提交成功后触发的方法
		success:function(res){
			try {
				
				$('#'+config.formId).parents('div.widget-box').find('.widget-toolbar > .remove').click();
			} catch (e) {
			}
			try {
				
				$('#'+config.formId).find('div.form-actions button.remove').click();
			} catch (e) {
			}
			try {
				$('#'+config.formId).parents('div.modal').find('div.modal-header button.close').click();
				
			} catch (e) {
				
			}
			
		},
		// 对表单内的select2控件的配置，主要配置结果格式化方法
		select2:{
			
		},
		confirm:false // 提交表单前是否需要确认 
	};
    
    var createUploadIframe=function(id){
    		
	    	
    		//create frame
            var frameId = id;
            
            var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="display:none;"';
			iframeHtml += ' />';
			jQuery(iframeHtml).appendTo(document.body);

            return $('#' + frameId);			
    }
  	 var  handleForm4iframe = function (){
  		var iframeId = config.formId+"_iframe";
  		
  		if($('#' + iframeId).size()!=0){
  			$('#'+config.formId).attr('target',iframeId);
        	return;
        }
  		var iframe = createUploadIframe(iframeId);
  		var uploadCallback = function(isTimeout){		
		    	var xml = {};
		    	var frameId = iframeId;
				var io = document.getElementById(frameId);
				try 
				{				
					if(io.contentWindow)
					{
						 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerText:null;
						 
					}else if(io.contentDocument)
					{
						 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerText:null;
					}						
				}catch(e)
				{
					alert(e);
				}
				if ( xml || isTimeout == "timeout"){	
					App.unblockUI($("#"+config.formId));
//					alert(xml.responseText);
					var res=$.parseJSON(xml.responseText)
					toastr[res.type?res.type:'info'](res.message, '系统消息'); 
					if(res.type=='success'){
						config.success(res);
					}
				}
	       }
  		$('#'+config.formId).attr('target',iframeId);
  		iframe.load(uploadCallback);
  	 }
  	 
  	 
  	 var handleColorPicker = function () {
         if (!jQuery().colorpicker) {
             return;
         }
         $('.colorpicker-default').colorpicker({
             format: 'hex'
         });
         $('.colorpicker-rgba').colorpicker();
     }
  	 
  	var handleSwitch = function(){
  		$('#'+config.formId).find('.make-switch').each(function(t){
  			
  			try {
  				 var $this = $(this);
  				 $this.bootstrapSwitch();
	      		} catch (e) {
	      		}
		});	
  		
  	}
    return {
        init: function (opt) {
        	
	    	config = $.extend(config,opt);
	    	
	    	$("#"+config.formId).validate({
		    		
		  		  submitHandler: function(form) {
		  			
		  			  
		  			if(config.confirm){
		  				bootbox.confirm("确认要提交表单吗？",function(result){
		  					if(result){
		  						// 去掉空值字段
		  			  			$("#"+config.formId+" input").each(function(i,t){
		  			  		    	if($(t).attr('name') && $(t).attr('name').indexOf('.')!=-1 && !$(t).val()){
		  			  		    		console.log($(t).attr('name'));
		  			  		    		$(t).attr('name','');
		  			  		    	}
		  			  		    })
		  						form.submit();
		  					}
		  				})
		  			}else{
		  			    // 去掉空值字段
  			  			$("#"+config.formId+" input").each(function(i,t){
  			  		    	if($(t).attr('name') && $(t).attr('name').indexOf('.')!=-1 && !$(t).val()){
  			  		    		console.log($(t).attr('name'));
  			  		    		$(t).attr('name','');
  			  		    	}
  			  		    })
		  				form.submit();
		  			}
	//	  		    alert(1);
		  			App.blockUI(form, false);
		  			return false;
		  		  }
	    	
	  	    });
	        	
	    	// 为form创建iframe 并获取返回值
	      	handleForm4iframe();
	      	
	      	handleSwitch();
	      	 
	      	Select2Ex.init({target:$("#"+config.formId)});
	      	
	      	handleColorPicker();
        }

    };

};
var Select2Ex={
		init:function(opt){
			FnSelect2Ex().init(opt);
		},
		handleForm4select2:function(opt){
			FnSelect2Ex().handleForm4select2(opt);
		},
		handleForm4select2me:function(opt){
			FnSelect2Ex().handleForm4select2me(opt);
		}
}
var FnSelect2Ex = function(){
	var config = {
			target:'body',
			select2:{}
	};
	config.select2 =  $.extend(config.select2,CustomSelect2);
	
	var handleForm4select2me = function(opt){
		  config = $.extend(config,opt);
	  	  if (jQuery().select2) {
	      		$(opt.target?opt.target:'body').find('.select2me').each(function(t){
	      			try {
		      				 var $this = $(this);
		      				$this.select2({
			      				placeholder: "请选择...",
			      				allowClear: true
			      			});
				      		} catch (e) {
				      		}
	      		});	
	      }
	};
  	var handleForm4select2 = function(opt){
  		  config = $.extend(config,opt);
		 $(opt.target?opt.target:'body').find('.select2').each(function(t){
	  		 var $this = $(this);
	  		 var display_field = $this.attr('result-field');
	  		 var result_callback = $this.attr('result-callback');
	  		 function movieFormatResult(m) {
	  			 var markup = "<table class='movie-result'><tr>";
	  			 
	  			 markup += "<td valign='top'><h5>" + m[display_field] + "</h5>";
	//             markup += "<div class='movie-synopsis'>" + m.createTime + "</div>";
	  			 markup += "</td></tr></table>"
	  			 return markup;
	  		 }
	  		 function movieFormatSelection(m) {
	  			try {
	  				 if(result_callback){
		  				 eval(result_callback);
		  			 }
				} catch (e) {
					
				}
	  			 return m[display_field];
	  		 }
	  		 $this.select2({
	               placeholder: $this.attr('placeholder')?$this.attr('placeholder'):'请选择...',
	               minimumInputLength: 0,
	               multiple :false,
	               allowClear: true,
	               ajax: { 
	                   url: _GLOBAL.ctx+($this.attr('url')?$this.attr('url'):$this.attr('lookup-url')),
	                   dataType: 'json',
	                   type:'POST',
	                   data: function (term, page) {
//	                	   console.log(term+','+page);
	                  	 var para={
	                      	
	                           pageLength: 100
	                       };
	                  	 para[$this.attr('filter')]=term;
	                  	  var cusf = $this.attr('custom-filter');
	                  	  try{
	                  		  if(cusf){
	                  			  var cusfo = eval("("+cusf+")");
	                  			  for(var key in cusfo){
	                  				  para[key]=$(config.target).find(cusfo[key]).val();
	                  			  }
	                  		  }
	                  	  }catch(e){
	                  		  console.log("custom select2 error:"+e);
	                  	  }
	                      return para;
	                   },
	                   results: function (data, page) { // parse the results into the format expected by Select2.
	                       // since we are using custom formatting functions we do not need to alter remote JSON data
	                       
	                       return {
	                           results: data.pageData.result
	                       };
	                   }
	               },
	               initSelection: function (element, callback) {
	                   var text = $(element).attr('display-value');
	                   var para={
	                       	
	                           
	                       };
	                   para[display_field]=text;
	                   return callback(para);
	               },
	               formatResult: config.select2[$this.attr('result-formatter')]?config.select2[$this.attr('result-formatter')]:movieFormatResult, // omitted for brevity, see the source of this page
	               formatSelection: movieFormatSelection, // omitted for brevity, see the source of this page
	               dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
	               escapeMarkup: function (m) {
	              	
	                   return m;
	               } // we do not want to escape markup since we are displaying html in results
	           });
	  	 });
	}
	return{
		init:function(opt){
			handleForm4select2(opt);
			handleForm4select2me(opt);
		},
		handleForm4select2:handleForm4select2,
		handleForm4select2me:handleForm4select2me,
		setFormatResult:function(fn){
			config.select2 = $.extend(config.select2,fn);
		}
	}
};
