var TableAjax = function () {
	
	/**
	 * 生成操作按钮
	 * options table的总配置
	 * col aoColumns中的操作按钮组
	 */
	var handleUxOptions = function(options,col){
		
		col.sTitle=' ';
		col.sWidth=options.uxDrapable?'100px':'60px';
		col.bSortable = false;
		col.mData = 'id';
		
		col.mRender=function(data, type, full){
			var result = [];
			
			// 自定义按钮组
			var cogs = col.uxCogs;
			result.push('<div class=" btn-group ">'+
					'<a class="btn btn-xs blue" href="#" data-toggle="dropdown" data-close-others="true">'+
					'<i class="ace-icon fa fa-cog"></i> <i class="ace-icon fa fa-angle-down"></i></a>'+
					'<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">');
			$.each(cogs,function(i,cog){
				result.push(generateMenu(cog,data, type, full,options));
			})
			result.push('</ul></div>');
			
			// 拖拽排序
			if(options.uxDrapable){
				var sortField = 'sort';
				if(options.uxSortField){
					sortField = options.uxSortField;
				}
				 var dragStr = ' <div class="btn-group">'+
                 '<a class="btn btn-xs blue" href="#" data-toggle="dropdown" data-close-others="true"><i sort="'+full[sortField]+'" id="'+data+'"  class="fa fa-sort"></i>'+
				 ' <i class="fa fa-angle-down"></i></a>'+
				 '<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close" >'+
				 '	<li><a data-handler="CONFIRM" href="'+options.uxUrlPrev+'sort?id='+data+'&p=1&sort='+full[sortField]+'"><i class="ace-icon fa fa-angle-double-up primary"></i> 置顶</a></li>'+
				 '	<li><a data-handler="CONFIRM" href="'+options.uxUrlPrev+'sort?id='+data+'&p=2&sort='+full[sortField]+'"><i class="ace-icon fa fa-angle-double-down primary"></i> 置底</a></li>'+
				 '	<li><a data-handler="CONFIRM" href="'+options.uxUrlPrev+'sort?id='+data+'&p=3&sort='+full[sortField]+'"><i class="ace-icon fa fa-angle-up primary"></i> 前移</a></li>'+
				 '	<li><a data-handler="CONFIRM" href="'+options.uxUrlPrev+'sort?id='+data+'&p=4&sort='+full[sortField]+'"><i class="ace-icon fa fa-angle-down primary"></i> 后移</a></li>'+
				 '</ul>'+
				 '</div>';
				 result.push(dragStr);
			}
			return result.join('');
		}
	}
	var generateMenu = function(cog,data, type, full,options){
		var cc = {
			name:'default',
			uri:'view',
			aclsss:'',
			dataHandler:'MODAL',
			modalSize:'',
			simple:false,
			iclass:'ace-icon fa fa-info primary',
			dataForm:false
		}
		cc = $.extend(cc,cog);
		if(cc.name=='查看'){
			cc.uri='view';
			cc.aclsss='dblclick blue';
			cc.dataHandler='MODAL';
			cc.iclass= 'ace-icon fa fa-search-plus bigger-130';
			cc.dataForm = false;
		}
		else if(cc.name=='修改'){
			cc.uri='edit';
			cc.aclsss='green';
			cc.dataHandler='INLINE';
			cc.iclass= 'ace-icon fa fa-pencil bigger-130';
			cc.dataForm = true;
		}
		else if(cc.name=='删除'){
			cc.uri='delete';
			cc.aclsss='red';
			cc.dataHandler='CONFIRM';
			cc.iclass= 'ace-icon fa fa-trash-o bigger-130';
			cc.dataForm = false;
		}
		
		
		// 按钮是否可点击
		var active=true;
		if(cc.isShow){
			if(!cc.isShow(data, type, full)){
				active = false;
				return '';
			}
		}
		
		var title = cc.dataTitle;
		if(!title){
			title = options.uxDataTitle+'-'+cc.name;
		}
		return '<li ><a href="'+options.uxUrlPrev+cc.uri+(cc.name=='删除'?'?ids=':'?id=')+data+'" class="'+cc.aclsss+'" modal-simple='+cc.simple+'   data-handler="'+cc.dataHandler+'" modal-size="'+cc.modalSize+'" data-title="'+title+'"><i class="'+cc.iclass+'" ></i> '+cc.name+'</a></li>';
		
	}
	
	
    return {
    	
        //main function to initiate the module
        init: function (tableId,opt) {
            
            if (!jQuery().dataTable) {
                return;
            }
            
            function getPageNo(aoData){
            	var start = aoData[3].value;
            	var length = aoData[4].value;
            	
            	return Math.ceil( start/length)+1;
            }
            function getSort(aoData){
            	var sort = {};
            	var cols = aoData[1].value;
            	var isort = aoData[5+cols].value;
            	sort.fieldName = aoData[5+isort].value;
            	sort.compositorType = aoData[6+cols].value;
            	return sort;
            }
            function getPageLength(aoData){
            	return aoData[4].value ;
            }
            function setFilter(data){
            	$('#'+tableId).parent().parent().parent().find("form input").each(function(i,t){
            		
            		data[$(t).attr('name')]= $(t).val();
            	})
            	$('#'+tableId).parent().parent().parent().find("form select").each(function(i,t){
            		
            		data[$(t).attr('name')]= $(t).val();
            	})
            	return data;
            }
            
            var saveOrder = function(){
            	
            	var $this = $(this);
            	var this_sort = $this.find('i.fa-sort').attr('sort');
            	var this_id = $this.find('i.fa-sort').attr('id');
            	var before_sort= $this.prev('tr').find('i.fa-sort').attr('sort');
            	var after_sort = $this.next('tr').find('i.fa-sort').attr('sort');
            	if(!before_sort){
            		before_sort = -1;
            	}
            	if(!after_sort){
            		after_sort = -1;
            	}
            	
            	$.ajax({
					type: "POST",
					cache: false,
					url: options.uxUrlPrev+'sort',
					dataType: "json",
					data:{
						id:this_id,
						sort:this_sort,
						beforeSort:before_sort,
						afterSort:after_sort
					},
					success: function (res) {
						oTable.fnDraw(false);
						toastr[res.type?res.type:'info'](res.message, '系统消息'); 
					},
					error: function (xhr, ajaxOptions, thrownError) {
						bootbox.alert("操作失败，请尝试刷新页面以解决该问题。");
						oTable.fnDraw(false);
					},
					async: false
				});
            }
            
            var options = {
//                  "sDom" : "<'row'<'col-md-6 col-sm-12'l><'col-md-12 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", //default layout without horizontal scroll(remove this setting to enable horizontal scroll for the table)
                    bLengthChange:true,
                    bAutoWidth: false,  
                    bFilter: false,
           		 	uxCheckable:false,
           		 	uxCloseScroll:true,
                    bProcessing: true,
                    bServerSide: true,
                    bStateSave: false,
                    sAjaxDataProp: "pageData.result",
                    // set the initial value
                    iDisplayLength: 10,
                    sPaginationType: "bootstrap",
//                    "sPaginationType": "full_numbers",
                    oLanguage: {
                    	"sProcessing": '<img src="'+_GLOBAL.ctx+'/assets/img/loading.gif" >',
                    	"sLengthMenu": "每页&nbsp_MENU_&nbsp条 ",
                    	"sZeroRecords": "没有您要搜索的内容",
                    	"sInfo": "第_START_ 条 至第 _END_ 条   共 _TOTAL_ 条",
                    	"sInfoEmpty": "记录数为0",
                    	"sInfoFiltered": "(全部记录数 _MAX_  条)",
                    	"sInfoPostFix": "",
                    	"sSearch": "搜索",
                    	"sUrl": "",
                    	"oPaginate": {
                    	"sFirst":    "第一页",
                    	"sPrevious": "上一页 ",
                    	"sNext":     "下一页",
                    	"sLast":     "最后一页 "
                    	}
                   },
                   
                    "fnDrawCallback": function(oSettings, json) {
                        App.initAjax();
                       
                        // 双击事件
                        oTable.$('tr').on('dblclick',function(e){
                        	$($(this)[0]).find('a.dblclick').click();
                        }); 
                        
                        // 初始化操作按钮的tooltips
                        //console.log(jQuery('#'+tableId+' tbody tr'));
                        jQuery('#'+tableId+' tbody i.fa-cog').tooltip({
                        	title:'操作'
                        });
                        jQuery('#'+tableId+' tbody i.fa-sort').tooltip({
                        	title:'排序'
                        });
                        
                        // 拖拽事件
                        if(opt.uxDrapable){
                        	jQuery('#'+tableId+' tbody').dragsort("destroy");
                            jQuery('#'+tableId+' tbody').dragsort({ dragBetween: true, dragEnd: saveOrder});
                        }
                        
                        // scrollable
                        if(opt.uxCloseScroll){
                        	jQuery('#'+tableId).parent().css({
                            	'overflow-x':'visible',
                            	'overflow-y':'visible'
                            		});
                        }
                        // 取消check
                        if(options.uxCheckable){
                        	var checkAll = jQuery('#'+tableId+' .group-checkable');
                        	checkAll.attr("checked", false);
                        	jQuery.uniform.update(checkAll);
                        	jQuery('#'+tableId+' tbody tr .checkboxes').change(function(){
                        		$(this).parents('tr').toggleClass("active");
                        	});
                        }
                        
                        //初始化上一点击的INLINE类型的BUTTON
                    	if(_GLOBAL.initInline){
                    		_GLOBAL.initInline = false;
                    		App.clickLastInlineBtn();
                    	}
                        
                     },
                    "fnServerData": function ( sSource, aoData, fnCallback, oSettings ) {
//                    	  console.log(aoData);
                    	  var pageNo = getPageNo(aoData);
                    	  var pageLength = getPageLength(aoData);
                    	  var sort = getSort(aoData);
                    	  var data={
                    			  	pageNo:pageNo,
                    			  	pageLength:pageLength,
                    			  	fieldName:sort.fieldName?sort.fieldName:'',
                    				compositorType:sort.compositorType?sort.compositorType:''
                    				};
                    	  data = setFilter(data);
                    	  
	                      oSettings.jqXHR = $.ajax( {
	                          "dataType": 'json',
	                          "type": "POST",
	                          "url": sSource,
	                          "data": data,
	                          "success": fnCallback
	                        } );
                      }
                };
            if (typeof(opt) !== 'object') opt = {};
            var options = $.extend(options, opt);
            
            
            // 是否可以多选
            if(options.uxCheckable){
            	options.aoColumns.unshift({
               	    sTitle:'<input type="checkbox" class="group-checkable"  />',
             	    mData: "id",
                    bSortable: false,
                    sWidth:'20px',
                    mRender:function(data){
                 	   return '<input type="checkbox" class="checkboxes" value="'+data+'" />';
                    }
                });
            }
            
            
            // 个性化配置
            $.each(options.aoColumns,function(i,n){
            	// 设置默认值
            	if(!n.sDefaultContent){
            		n.sDefaultContent = '<span class="label label-light arrowed-in-right">无</span>';
            	}
            	
            	//  如果是图片
            	if(n.uxImg){
            		n.mRender = Common.img;
            		n.bSortable = false;
            		n.sWidth = "20px";
            	}else if(n.uxLongText){ // 长内容自动换行
            		n.sClass = "word-break";
            	}else if(n.uxCogs){ // 按钮下拉菜单
            		handleUxOptions(options,n);
            	}else if(n.uxEnum){// 枚举
            		n.mRender = function(data,type,full){
            			var result = [];
            			
            			// 快速设置
            			if(n.uxFastSetUri || n.uxFastSet){
            				result.push(' <div class=" btn-group ">'+
            						'<a class="btn btn-xs " href="#" data-toggle="dropdown" data-close-others="true">'+
            						_GLOBAL.getEnum(n.uxEnum,data)+
            						' <i class="fa fa-angle-down"></i></a>'+
            						'<ul class="dropdown-menu pull-right">');
            				var es = _GLOBAL.getEnums(n.uxEnum);
            				var uri = n.uxFastSetUri?n.uxFastSetUri:('set'+Common.toUpperCase1(n.mData));
            				if(es){
            					$.each(es,function(enumKey,enumValue){
            						if(data!=enumKey){
            							result.push('<li ><a href="'+options.uxUrlPrev+uri+'?id='+full.id+'&value='+enumKey+'" data-handler="CONFIRM" >'+enumValue+'</a></li>');
            						}
            					})
            				}
            				
            				result.push('</ul></div>');
            			}else{
            				result.push(_GLOBAL.getEnum(n.uxEnum,data));
            			}
            			return result.join('');
            		};
            	}
            	// 如果可以拖拽排序 则禁用手动排序
//                if(options.uxDrapable){
////                	n.bSortable = false;
//                }
            })
            
            // init table
            var oTable = $('#'+tableId).dataTable(options);
            
            
            // 每页显示N条 样式
//            jQuery('#'+tableId+'_wrapper .dataTables_length select').addClass("select2me form-control input-xsmall").unwrap().unwrap().unwrap();
            
            // 分页按钮样式
            //<a tabindex="0" class="previous paginate_button paginate_button_disabled" id="example_previous">Previous</a>
//            jQuery('#'+tableId+'_info').removeClass();
            
            
            // handle search btn
            $('#'+tableId).parent().parent().parent().find("form a.search").on('click',function(){
//            	alert(1);
            	oTable.fnDraw();
            });
            // handle input enter event
            $('#'+tableId).parent().parent().parent().find("form input").keyup(function(e){
                if(e.keyCode == 13){
                
                	oTable.fnDraw();
                	
                }
                e.preventDefault();
            });
            // handle reload btn
            $('#'+tableId).parent().parent().parent().parent().parent().find("a[data-action=reload]").on('click',function(){
//            	alert(1);
            	oTable.fnDraw(false);
            });
           
          
            // begin hadle check box
            jQuery('#'+tableId+' .group-checkable').change(function () {
                var set = jQuery('#'+tableId+' .checkboxes');
                var checked = jQuery(this).is(":checked");
                
                jQuery(set).each(function () {
                    if (checked) {
                        $(this).attr("checked", true);
                        $(this).prop('checked',true);
                        $(this).parents('tr').addClass("active");
                    } else {
                        $(this).attr("checked", false);
                        $(this).prop('checked',false);
                        $(this).parents('tr').removeClass("active");
                    }
                    jQuery.uniform.update($(this));
                });

            });
            
            // end hadle check box
            
            
        }
    

    };

}();