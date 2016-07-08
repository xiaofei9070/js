/***
 * 模仿 http://layer.layui.com/ 中layer组件
 */
;!function(a,b){
	"use strict"
	var c,d,e = {
		getPath: function(){
			var a = document.scripts,b = a[a.length - 1], c = b.src;
			if(!b.getAttribute("merge"))return c.substring(0,c.lastIndexOf("/") + 1)
		}(),
		enter: function(a){
//			13 === a.keyCode && a.preventDefault(),
			if(13 === a.keyCode){
				c(this).find('.box_btn1').click();
			}
		},
		config:{},
		end:{},
		type:["dialog","loading","tips","page","iframe"],
		btn:["&#x53D6;&#x6D88;", "&#x786E;&#x5B9A;"]
	},f = {
		v:"1.0",
		ie6: !!a.ActiveXObject && !a.XMLHttpRequest,
		index: 0,
		path: e.getPath,
		config: function(a, b){
			var d = 0;
			return a = a || {},
			f.cache = e.config = c.extend(e.config, a),
			f.path = e.config.path || f.path,
			f.use(b),
			this
		},
		use: function(a){
			var e = c("head")[0],
				a = a.replace(/\s/g,""),
				g = /\.css$/.test(a),
				h = document.createElement(g ? "link":"script"),
				i = "box_" + a.replace(/\.|\//g,"")
			return f.path ? (g && (h.rel = "stylesheet"),
			h[g ? "href" : "src"] = /^http:\/\//.test(a) ? a : f.path + a,
			h.id = i,
			c("#" + i)[0] || e.appendChild(h),
			this) : void 0;
		},
		ready:function(a,b){
			var d = "function" == typeof a;
			return d && (b = a),
			f.config(c.extend(e.config,function(){
				return d ? {} : {path:a}
			}()),b),
			this
		},
		alert:function(a,b,d){
			var e = "function" == typeof b;
			return e && (d = b),
				f.open(c.extend({
					content:a,
					yes : d
				},e ? {} : b))
		},
		tips:function(a,b,d){
			var e = "string" == typeof b;
			return e && 
				f.open(c.extend({
					content:a,
					shade:0,
					type:2,
					fix:!1,
					follow:b,
					status:1
				},e ? d : {}))
		},
		confirm:function(a,b,d){
			var g = "function" == typeof b;
			return g && (d = b),
				f.open(c.extend({
					btn:e.btn,
					content:a,
					yes:d,
					icon:3
				},g ? {} : b))
		},
		msg:function(a,b){
			var g = "object" == typeof b;
			return f.open(c.extend({
					btn :!1,
					content:a,
					shade:0,
					time:2000
				},g ? b : {}))
		},
		loading:function(a){
			return f.open(c.extend({
				type:1,
				shade:0,
				icon:1,
				content:' ',
				time:2000
			},a))
		}
	},g = function(a){
		var b = this;
		b.index = ++f.index,
		b.config = c.extend({}, b.config, e.config, a),
		b.create();
	};
	var h = ["box_mask","box_skin","box_btn","box_dialog","box_loading","box_tips"]
	g.pt = g.prototype;
	g.pt.config = {
		type:0,
		shade:0.3,
		fix:!0,
		width:8,
		icon:1,
		zIndex:9999,
		tips:2,
		background:'#F90',
		status:1
	},
	g.pt.create = function(){
		var a = this,
			b = a.config,
			g = a.index,
			i = b.content,
			j = "object" == typeof i;
			if(!c("#" + b.id)[0]){
				switch(b.type){
					case 0:
						b.btn = "btn" in b ? b.btn : e.btn[1],
						f.closeAll("dialog");
						break;
					case 1:
						f.closeAll("loading");
						break;
					case 2:
						b.icon = 'undefined' == typeof b.icon || 'number' == typeof b.icon ? 'r' : b.icon;
						switch(b.status){
							case 1:
								b.background = '#F90';
								break;
							case 0:
								b.background = '#F00';
								break;
							case 2:
								b.background = '#03a9f4';
								break;
							default:
								break;
						}
						f.closeAll("tips",b.follow);
						break;
					default:
						break;
				}
				a.vessel(j,function(d){
					c("body").append(d[0]),
					a.box = c('#' + h[1] + g);
				}),
				b.btn && c(document).off('keydown',e.enter).on('keydown',e.enter),
				b.btn && a.box.on('keydown',function(){
					c(document).off('keydown',e.enter);
				}),
				b.type == 2 ? a.tips():a.offset(),
				b.fix && d.on('resize',function(){
					a.offset();
				}),
				a.callback();
			}
	},
	g.pt.vessel = function(a,b){
		var c = this,
			d = c.index,
			f = c.config,
			g = f.zIndex + d;
		return f.zIndex = g,
			b([(f.fix ? '<div class="'+h[0]+'" id="' + h[0] + d + '" style="z-index:' + (g-1) + ';background-color:' + (f.shade[0] || "#000") + ';opacity:' + f.shade +';filter:alpha(opacity=' + (f.shade * 100) + ')"></div>':'') + function(){
				var iconBox = f.type == 2 ? 'style="background:' + f.background + '"':'',iconColor = f.type == 2 && (f.icon == 'r' || f.icon == 'l' ?  'style="border-bottom-color:':'style="border-left-color:') + f.background + ';"'
				var iconHtml = '<div class="box_content box-padding" '+iconBox+'><i class="' + (!f.type ? 'box_icon':'') + ' box_icon_' + f.icon + '" '+iconColor+'></i>' + (f.content ? f.content:'提示') +'</div>';
				return '<div class="'+ h[1]+' box_banch box_' + e.type[f.type] + '"'+(f.type == 2 ? 'tip="'+f.follow+'"':'')+' index="'+d+'" style="z-index:' + g + ';'+(f.fix ? '':'position:absolute;')+'" id="box_skin' + d + '">' + iconHtml
			}() + (f.btn ? function(){
				var a = '';
				"string" == typeof f.btn && (f.btn = [f.btn]);
				for(var j=0,c=f.btn.length;j<c;j++){
					a += '<a class="'+ h[2] + (c == 1 ? '1':j) +'">' + f.btn[j] + '</a>';
				}
				return '<div class="'+ h[2] + '">'+ a +'</div>'
			}():'')+'</div>']),
			c
	},
	g.pt.offset = function(){
		var a = this,
			b = a.config,
			c = a.box,
			e = [c.outerWidth(),c.outerHeight()],
			f = 'object' == typeof b.offset;
			a.offsetTop = (d.height() - e[1])/2,
			a.offsetLeft = (d.width() - e[0])/2,
			c.css({
				left:a.offsetLeft,
				top:a.offsetTop
			});
	},
	g.pt.tips = function(){
		var a = this,
			b = a.config,
			g = a.box,
			f = b.follow,
			e = [c(f).outerWidth(),c(f).outerHeight(),c(f).offset().left,c(f).offset().top],
			k = [g.outerWidth(),g.outerHeight()];
			b.follow && b.icon == 'l' && g.css({
				left:e[2] - k[0] - b.width,top: e[3]
			})
			b.follow && b.icon == 'r' && g.css({
				left:e[0] + e[2] + b.width,top: e[3]
			})
			b.follow && b.icon == 't' && g.css({
				left:e[2],top: e[3] - k[1] - b.width
			})
			b.follow && b.icon == 'b' && g.css({
				left:e[2],top: e[1] + e[3] + b.width
			})
	},
	g.pt.callback = function(){
		var b = this,
			d = b.config,
			g = b.box;
 		g.find('.' + h[2]).children('a').on('click',function(){
			var a = c(this).index();
			f.close(b.index);
			if(1 === a){
				d.yes && d.yes(b.index,g);
			}
		});
		d.time && setTimeout(function(){
			f.close(b.index);
		},d.time)
	}
	a.box = f,
	f.closeAll = function(a,t){
		function m(){
			f.close(c(this).attr('index'));
		}
		a = ('undefined'!= typeof a) ? a : 'skin',
		'undefined' != typeof t ? c('[tip="' + t + '"]').each(m):c('.box_' + a).each(m);
	},
	f.close = function(a){
		var b = c('#' + h[0] + a),
			d = c('#' + h[1] + a);
		if(d[0]){
			b.remove(),d.remove()
		}
		c(document).off('keydown',e.enter);
	}
	e.run = function(){
		c = jQuery,d = c(a),h.html = c('html')
		f.open = function(a){
			var b = new g(a);
			return b.index;
		}
	},"function" == typeof define ? define(function(){
		return e.run(),f
	}) : function(){
		e.run(),
		f.use('css/box.css')
	}()
}(window)

//box.msg("删除成功")

//box.loading()
