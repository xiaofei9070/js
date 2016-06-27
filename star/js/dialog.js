;(function($){
				window.dialog = $.dialog = {
					obj:null,
					maskObj:null,
					cssUrl:'css/dialog.css',
		version:navigator.appVersion,
		useCss3:function(){
			return this.version.indexOf('MSIE 7.0') == -1 && this.version.indexOf('MSIE 8.0') == -1 && this.version.indexOf('MSIE 9.0') == -1;
		},
		defaultInit:true,
		close:function(){
			var t = this;
			if(t.useCss3()){
				$(t.obj).removeClass('left_fadeIn').addClass('right_fadeOut').fadeOut(300);
				setTimeout(function(){
					$(t.obj).remove();
					$(t.maskObj).remove();
				},300);
			}else{
				$(t.obj).remove();
				$(t.maskObj).remove();
			}
		},
		initCss:function(){
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = this.cssUrl;
			document.getElementsByTagName('head')[0].appendChild(link);
		},
		open:function(content,callback,type){
			var t = this;
			if(t.defaultInit){
				t.initCss();
			}
			var diamask = document.createElement('div');
			diamask.setAttribute('class','dialog_mask');
			document.body.appendChild(diamask);
			t.maskObj = diamask;
			switch(type){
				case 'success':
					t.createSuccess(content,callback);
					break;
				case 'confirm':
					t.createConfirm(content,callback);
					break;
				case 'error':
					t.createError(content,callback);
					break;
				case 'warn':
					t.createWarn(content,callback);
					break;
				default:
					break;
			}
		},
		createSuccess:function(content,callback){
			var t = this;
			t.createContent(content,callback,'dia_success','成功');
		},
		createConfirm:function(content,callback){
			var t = this;
			t.createContent(content,callback,'dia_confirm','是否确认','<span class="canle_btn">取&nbsp;消</span>');
		},
		createError:function(content,callback){
			var t = this;
			t.createContent(content,callback,'dia_error','系统出错');
		},
		createWarn:function(content,callback){
			var t = this;
			t.createContent(content,callback,'dia_warn','警告');
		},
		createContent:function(content,callback,iconClass,defaultContent,html){
			var t = this;
			if(content != null && $.trim(content) != '' && typeof content == 'function'){
				callback = content;
				content = defaultContent;
			}else if(content == null || $.trim(content) == ''){
				content = defaultContent;
			}
			var dialog = document.createElement('div');
			dialog.setAttribute('class','dialog dia_animation left_fadeIn');
			if(typeof html == 'undefined')html = '';
			var dialogHtml = '<div class="icon ' + iconClass + ' dia_animation rotateX">' +
								content + 
							'</div>' +
							'<div class="dia_oper dia_animation rotateX">' +
								html + '<span class="success_btn">确&nbsp;定</span>' +
							'</div>';
			dialog.innerHTML = dialogHtml;
			document.body.appendChild(dialog);
			t.obj = dialog;
			t.bindSuccessEvent(callback);
			t.bindCancleEvent();
		},
		bindCancleEvent:function(){
			var t = this;
			$('.canle_btn').on('click',function(){
				t.close();
			})
		},
		bindSuccessEvent:function(callback){
			var t = this;
			$('.success_btn').on('click',function(){
				t.close();
				if(t.useCss3()){
					if(typeof callback == 'function'){
						setTimeout(function(){
							callback();
						},300);
					}
				}else{
					callback();
				}
			})
		}
	}
	$.dialog.success = function(content,callback){
		var t = this;
		t.open(content,callback,'success');
	};
	$.dialog.confirm = function(content,callback){
		var t = this;
		t.open(content,callback,'confirm');
	}
	$.dialog.error = function(content,callback){
		var t = this;
		t.open(content,callback,'error');
	}
	$.dialog.warn = function(content,callback){
		var t = this;
		t.open(content,callback,'warn');
	}
})(jQuery)
/*$.dialog.success()*/
$.dialog.confirm('确认删除',function(){
	alert(1);
})
/*$.dialog.error();*/
/*$.dialog.warn()*/