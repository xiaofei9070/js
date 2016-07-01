;!function(a,b){
	console.log(a)
	"use strict"
	var c,d,e = {
		getPath: function(){
			var a = document.scripts,b = a[a.length - 1], c = b.src;
			if(!b.getAttribute("merge"))return c.substring(0,c.lastIndexOf("/") + 1)
		}(),
		enter: function(a){
			13 === a.keyCode && a.preventDefault()
		},
		config:{},
		end:{},
		type:["dialog","loading","tips","page","iframe"]
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
			this
		},
		use: function(a,b,d){
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
		}
	},g = function(a){
		var b = this;
		b.index = ++f.index,
		b.config = c.extend({}, b.config, e.config, a),
		b.create();
	};
	g.pt = g.prototype;
	e.run = function(){
		c = jQuery,d = c(a),
		f.open = function(a){
			var b = new g(a);
			return b.index;
		}
	},"function" == typeof define ? define(function(){
		return e.run(),f
	}) : function(){
		e.run()
		
	}()
	console.log(f.open())
}(window)
