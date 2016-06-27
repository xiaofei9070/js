;(function($){
	window.timeTick = $.timeTick = {
		year : 0,
		month : 0,
		day : 0,
		week : 0,
		days : 0,
		day30 : [4,6,9,11],
		day31 : [1,3,5,7,8,10,12],
		chineseMonth : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		obj : null,
		defaultFirst:true,
		cssUrl:'css/time_ticker.css',
		init : function(data){
			var date = new Date();
			this.year = date.getFullYear();
			this.month = date.getMonth() + 1;
			this.day = date.getDate();
			if(this.defaultFirst){
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = this.cssUrl;
				document.getElementsByTagName('head')[0].appendChild(link);
				var timeDiv = document.createElement('div');
				var timeTickHTML = '<div class="dt">' +
					'<div class="dt_calendar_head">' +
						'<div class="dt_calendar_head_left">' +
							'<div class="dt_calendar_year_pre selectYear" data-num="-1">' +
								'<span class="dt_ca_year_pre model"></span>' +
								'<span class="dt_ca_year_pre model" style="margin-left:-5px;"></span>' +
							'</div>' +
							'<span class="dt_calendar_month_pre model selectMonth" data-num="-1"></span>' +
						'</div>' +
						'<span class="dt_calendar_head_detail"><!--六月、2016--></span>' +
						'<div class="dt_calendar_head_right">' +
							'<div class="dt_calendar_year_next selectYear" data-num="1">' +
								'<span class="dt_ca_year_next model"></span>' +
								'<span class="dt_ca_year_next model" style="margin-right:-5px;"></span>' +
							'</div>' +
							'<span class="dt_calendar_month_next model selectMonth" data-num="1"></span>' +
						'</div>' +
					'</div>' +
					'<div class="dt_calendar_detail">' +
						'<div class="dt_calendar_detail_week">' +
							'<span>一</span>' +
							'<span>二</span>' +
							'<span>三</span>' +
							'<span>四</span>' +
							'<span>五</span>' +
							'<span>六</span>' +
							'<span>七</span>' +
						'</div>' +
						'<div class="dt_calendar_detail_day" id="day">' +
							'<!--<span></span>' +
							'<span class="active">1</span>' +
							'<span class="dt_day">1</span>-->' +
						'</div>' +
					'</div>' +
					'<div class="dt_calendar_bottom"> ' + 
					'<span class="btn clear">清空</span>' +
					'<span class="btn curTime">今天</span>' +
					'<span class="btn close">关闭</span>' +
					'</div>' +
				'</div>';
				timeDiv.innerHTML = timeTickHTML;
				document.body.appendChild(timeDiv);
				this.initEvent();
				this.defaultFirst = false;
			}
			if(data){
				this.timeTickerEvent();
			}
		},
		initEvent:function(){
			this.leave();
			this.clear();
			this.close();
			this.curTime();
			this.selectMonth();
			this.selectYear();
		},
		totalDay : function(){
			for(var i in this.day30){
				if(this.month == this.day30[i]){
					this.days = 30;
					return;
				}
			}
			for(var i in this.day31){
				if(this.month == this.day31[i]){
					this.days = 31;
					return;
				}
			}
			this.days = this.monthTwoDays(); 
		},
		monthTwoDays : function(){
			var y = parseInt(this.year);
			if(y % 4 == 0){
				if(y % 100 == 0 && y % 400 != 0){
					return 28;
				}
				return 29;
			}else{
				return 28;
			}
		},
		weekFun : function(){
			var date = new Date(parseInt(this.year), parseInt(this.month)-1, 1);
			this.week = date.getDay();
			if(this.week == 0){
				this.week = 7;
			}
		},
		timeInitDate:function(time){
			if(time != null && time.indexOf('-') != -1){
				var arr = time.split('-');
				this.year = arr[0];
				this.month = arr[1];
				this.day = arr[2];
			}else{
				this.init();
			}
		},
		changeTime:function(obj){
			$(obj).parent().find('span').removeClass('active').addClass('dt_day');
			$(obj).removeClass('dt_day');
			$(obj).addClass('active')
			var day = $(obj).text();
			this.day = day;
			var time = this.year + '-' + this.month + '-' + this.day;
			$(this.obj).val(time);
		},
		reckYear:function(count){
			var y = parseInt(this.year) + parseInt(count);
			if(y >= 1900)this.year = y;
			this.loadTime();
		},
		selectYear:function(){
			var t = this;
			$('.selectYear').on('click',function(){
				var count = $(this).attr('data-num')
				t.reckYear(count);
			})
		},
		selectMonth:function(){
			var t = this;
			$('.selectMonth').on('click',function(){
				var count = $(this).attr('data-num');
				var m = parseInt(t.month) + parseInt(count);
				if(m > 12){
					t.month = 1;
					t.reckYear(1);
				}else if(m < 1){
					t.month = 12;
					t.reckYear(-1);
				}else{
					t.month = m;
					t.reckYear(0);
				}
			})
		},
		leave:function(){
			$('.dt').on('mouseleave',function(){
				$('.dt').removeClass('show');
			})
		},
		clear:function(){
			var t = this;
			$('.dt .dt_calendar_bottom .clear').on('click',function(){
				$(t.obj).val('');
			});
		},
		close:function(){
			$('.dt .dt_calendar_bottom .close').on('click',function(){
				$('.dt').removeClass('show');
			})
		},
		curTime:function(){
			var t = this;
			$('.dt .dt_calendar_bottom .curTime').click(function(){
				t.init();
				t.loadTime();
				var time = t.year + '-' + t.month + '-' + t.day;
				$(t.obj).val(time);
			})
		},
		loadTime : function(){
			var html = '';
			this.weekFun();
			for(var i=1;i<this.week;i++){
				html += '<span></span>';
			}
			this.totalDay();
			for(var i=1;i<this.days + 1;i++){
				if(i == this.day){
					html += '<span class="active">' + i + '</span>';
				}else{
					html += '<span class="dt_day">' + i + '</span>';
				}
			}
			document.getElementById('day').innerHTML = html;
			var t = this;
			$('.dt .dt_calendar_detail .dt_calendar_detail_day .dt_day').on('click',function(){
				t.changeTime(this);
			});
			$('.dt_calendar_head_detail').html(this.year + '年' + this.chineseMonth[this.month - 1]);
		},
		timeTickerEvent:function(){
			var t = this;
			$('.timeTicker').off('click');
			$('.timeTicker').on('click',function(){
				var val = $(this).val();
				t.timeInitDate(val);
				t.loadTime();
				t.obj = this;
				var left = $(this).offset().left;
				var top = $(this).offset().top + $(this).height() + 7;
				$('.dt').css({top:top,left:left}).addClass('show');
			})
		}
	}
})(jQuery);
var tick = $.timeTick;
	tick.init(true);
