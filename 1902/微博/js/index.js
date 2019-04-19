// 所有的逻辑处理
function Index() {
	//调用init
	this.init();
}
//Index的原型  对象和方法
Index.prototype = {
	//构造函数
	constructor: Index,
	//初始化 找到所有的元素 属性 对象
	init: function(){
		this.btn = document.querySelector("button");
		this.modal = document.createElement("div");
		this.modal.className = "modal";
		this.container = document.querySelector("#container");
		
		// console.log(this.aBtn)
	
		this.container.innerHTML =`
		<p><span>用户名:</span> <input type="text" id="test"></p>
		<input type="text" id="bust">
		<button id="btn">发布</button>
		
		`;
		// this.text=document.querySelector("#bust");
		 this.aBtn=document.querySelector("#btn");
		 this.tet =document.querySelector("#test");
		 this.tat=document.querySelector("#bust");
		 this.box=document.querySelector(".box")
		 
		this.btnClick();
	},
	//绑事件
	//点击button 时 需要实现的功能
	btnClick: function(){
		this.btn.onclick = () => {
			//把modal插入页面中
			document.body.appendChild(this.modal);
			//让登陆框显示
			this.container.style.display = "block";
			//让登陆框居中
			tools.showCenter(this.container);
		}
		this.Cntent()
	},
 	
 Cntent:function(){
     this.aBtn.onclick=()=>{
		 //点击发布发布框消失
		 this.container.style.display = "none";
		 //模态框消失
		 this.modal.className = "";
		 //获取输入框的值
		var aTxt = this.tat.value;
		var bTxt= this.tet.value;
		this.box.innerHTML = "用户名:" + bTxt + "<br/>" + "发布内容：" + aTxt + "<br/>"+"<div class='dele'>撤销</div>"
		this.box.style.display="block";
		
	 }
	 this.Revoke();
},

    Revoke :function(){ 
		
	  // 清除默认行为；
	  
		// if(e.preventDefault){
		// 	e.preventDefault();
		// }else{
		// 	window.event.returnValue = false
		// }
		//在页面创建一个按钮 用于撤回
		this.container.onclick=(e)=>{
			e=e||event;
			let target=e.target ||e.srcElement;
			console.log(target)
			if(target.className === "dele"){
				this.container.style.display = "none";
			}

		
		}
}
}
new Index();
