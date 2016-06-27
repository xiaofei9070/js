;(function($){
	window.validateForm = $.validateForm = {
		checkForm:true,
		suc:'<img src="statics/image/success.jpg" width="18px" height="18px">',
		loading:'<img src="statics/image/loading.gif" width="18px" height="18px">',
		error:'<img src="statics/image/error.png" width="18px" height="18px">',
		role:{password:'/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/'},
		options:{},
		form:null,
		formArr:{},
		init:function(form,options){
			var t = this;
			if(typeof form != 'undefined'){
				t.form = form;
			}
			$('#' + form).find('[data-role]').each(function(){
				$(this).on({
					'focus':function(){
						t.focusValidate(this);
					},
					'blur':function(){
						t.blurValidate(this);
					}
				});
				var name = $(this).attr('name');
				t.formArr[name] = 'null';
			});
			if(typeof options != 'undefined'){
				t.options = options;
			}
		},
		focusValidate:function(obj){
			var name = $(obj).attr('name');
			var msg = $(obj).attr('data-msg');
			$('#' + name).html(msg);
		},
		blurValidate:function(obj){
			var t = this,op = t.options;
			var form = t.form;
			var tip = $(obj).attr('name');
			var role = $(obj).attr('data-role');
			var val = $.trim($(obj).val());
			if(typeof role != 'undefined'){
				if(val == '' || val == null || val == op[tip]){
					$('#' + tip).html(t.error + $(obj).attr('data-null'));
  					t.formArr[tip] = 'false';
  					return;
				}else{
	  				t.formArr[tip] = 'true';
	  			}
				var defaultRole = t.role;
				for(var i in defaultRole){
					if(i == role){
						role = defaultRole[i];
						break;
					}
				}
				if(role.indexOf('/') != -1){
					var regFlag = eval(role).test(val);
	  				if(!regFlag){
	  					$('#' + tip).html(t.error + $(obj).attr('data-error'));
	  					t.formArr[tip] = 'false';
	  					return;
	  				}else{
	  					t.formArr[tip] = 'true';
	  				}
				}
				var confirm = $(obj).attr('data-confirm');
				if(typeof confirm != 'undefined'){
					var first = $('[name="'+confirm+'"]').val();
					if(first != val){
						$('#' + tip).html(t.error + '二次密码不一致');
	  					t.formArr[tip] = 'false';
	  					return;
					}else{
						t.formArr[tip] = 'true';
					}
				}
				var dataAjax = $(obj).attr('data-ajax');
				if(typeof dataAjax != 'undefined'){
  					$.ajax({
    					url:dataAjax,
    					cache:false,
    					data:$('#' + form).serialize(),
    					type:'Post',
    					dataType:'json',
    					async:false,
    					beforeSend:function(){
    						$('#' + tip).html(t.loading);
    					},
    					success:function(data){
    						setTimeout(function(){
    							if(data.status == 200){
    	  							$('#' + tip).html(t.suc);
    	  							t.formArr[tip] = 'true';
    	  						}else{
    	  							$('#' + tip).html(t.error + data.msg);
    	  							t.formArr[tip] = 'false';
    	  						}
    						}, 300);
    					}
    				});
  					return;
				}
				$('#' + tip).html(t.suc);
			}
		},
		validateSubmit:function(callback){
			var t = this;
			var formArr = t.formArr;
			for(var i in formArr){
				if(formArr[i] == 'null'){
					t.blurValidate($('[name="'+i+'"]'));
				}
				if(formArr[i] == 'false'){
					t.checkForm = false;
				}
			}
			if(t.checkForm){
				callback();
			}
		}
	}
 })(jQuery);
/**
 * var validate = $.validateForm;
   validate.init('userReg',{phone:'请输入11位手机号码',
							code:'请输入验证码',
							phoneCode:'请输入手机验证码',
							password:'建议至少使用两种字符组合',
							confirmPassword:'再次输入密码'});
 * validate.validateSubmit(function(){
  			$.ajax({
  				url:'reg',
  				cache:false,
  				data:$('#userReg').serialize(),
  				type:'Post',
				dataType:'json',
				beforeSend:function(){
					$('#userReg').loading();
				},
				success:function(data){
					if(data.status == 200){
						setTimeout(function(){
							window.location.href="<%=basePath%>user/regSuccess";
						}, 300);
					}else{
						$('#' + data.tip).html(data.msg);
					}
				},
				complete:function(){
					$('#userReg').lComplete();
				}
  			});
  		});
 * 
 * 
 **/