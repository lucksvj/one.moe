var tools = {
	/* 获取元素样式
	 * @param  obj  DOMObj 获取样式的元素对象
	 * @param  attr string 要获取的样式名称
	 * @return string 样式结果
	 */
	
	getStyle : function (obj, attr){
		/* if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj, false)[attr];
		} */
		return obj.currentStyle ? 
			obj.currentStyle[attr] : 
			getComputedStyle(obj, false)[attr];
		/* 
		try{
			return obj.currentStyle[attr];
		}catch(){
			return getComputedStyle(obj, false)[attr];
		} */
	},
	
	/* 获取或者设置内联样式
	 * @param obj DOMObj 获取或者设置的对象
	 * @param attr 
	   *      1. string  获取obj的attr属性  
	   *         @return string  得到的属性值
	   *      2. object  设置内联样式
	 */
	css : function(obj, attr){
		if(typeof attr === "string") {
			//获取
			return this.getStyle(obj, attr);
		}else if(typeof attr === "object"){
			//设置
			for(var key in attr){
				obj.style[key] = attr[key];
			}
		}
	},
	
	/* 计算某一个元素到body边缘的距离
	 * @param obj DOMObj 要计算的那个dom元素
	 * @return object {left,top} 
	 */
	
	getBodyDis: function (obj){
		var left = 0, top = 0;
		//只要父级不是null
		while(obj.offsetParent != null){
			//加上边框的宽度和offset
			left += obj.offsetLeft + obj.clientLeft;
			top += obj.offsetTop + obj.clientTop;
			//把自己变成自己的父级（往前走一步）
			obj = obj.offsetParent;
		}
		return {
			"left": left,
			"top" : top
		};
	},
	/* 获取浏览器宽高
	 * @return object {width, height}
	 */
	getBody: function(){
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
			
		};
		
	},
	/* 鼠标滚轮事件绑定
	 * @param obj DOMObj 绑定滚轮事件的对象
	 * @param fn  Function 事件处理函数
	 
	 */
	mousewheel: function(obj, fn){
		console.log(obj.onmousewheel);
		if(obj.onmousewheel !== undefined){
			obj.onmousewheel = function(e){
				e = e || window.event;
				if(e.wheelDelta < 0){
					//向下滚动
					fn("down");
				}else{
					fn("up");
				}
			};
		}else{
			obj.addEventListener("DOMMouseScroll", function(e){
				if(e.detail > 0){
					//向下
					fn("down");
				}else{
					fn("up");
				}
			});
		}
	},
	
	/* 监听事件
	 * @param obj DOMObj 监听事件的对象
	 * @param type string 事件句柄
	 * @param fn   function 事件处理函数 
	 * @param [isCapture] boolean false代表冒泡，true代表捕获 默认值是false
	 */
	on : function(obj, type, fn, isCapture){
		if(isCapture === undefined) isCapture = false;
		if(obj.attachEvent){
			//IE只能再冒泡阶段处理事件
			obj.attachEvent("on"+type, fn);
		}else{
			obj.addEventListener(type, fn, isCapture);
		}
	},
	
	/* 移出监听事件
	* @param obj DOMObj 移出监听事件的对象
	* @param type string 事件句柄
	* @param fn   function 事件处理函数 
	*/
	off: function(obj, type, fn){
		if(obj.detachEvent){
			obj.detachEvent("on"+type, fn);
		}else{
			obj.removeEventListener(type, fn);
		}
	},
	/* 让元素匀速运动
	 * obj DOMObj 运动的DOM元素
	 * attr string 运动的属性
	 * end number 终点值
	 * duration number 运动时间
	 */
	move: function(obj, attr, end, duration){
		//每次进来之前先把上一次的定时器清除
		clearInterval(obj.timer);
		//起始值
		var start = parseInt(this.getStyle(obj, attr));
		//总距离
		var distance = end - start; 
		//总步数
		var steps = Math.floor(duration / 30); 
		//速度（每一步要走的距离）
		var speed = distance / steps;
		
		//timer要唯一，写在对象属性上
		obj.timer = setInterval(function(){
			//往前走一步
			start += speed;
			if(Math.abs(end - start) <= Math.abs(speed)){
				start = end;
				clearInterval(obj.timer);
			}
			
			obj.style[attr] = start + "px";
		},30);
	},
	/* 让元素在body内绝对居中
	 * @param obj  DOMObj 要居中的那个元素
	 
	 */
	showCenter: function(obj){
		obj.style.position = "absolute";
		var _this = this;
		window.onresize = (function center() {
			var left = (_this.getBody().width - obj.offsetWidth) /2,
				top= (_this.getBody().height - obj.offsetHeight) /2;
			
			/* obj.style.left = left + "px";
			obj.style.top = top + "px"; */
			_this.css(obj, {left: left+"px", top: top+"px"});
			
			return center;
		})();
		
		
		/* center();
		window.onresize = center; */
		
		
		
	}
}
