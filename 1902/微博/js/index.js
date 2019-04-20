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
		 this.box=document.querySelector(".bBox");
		 this.ul=document.querySelector("ul");
		 this.date = new Date();
	   this.time = this.date.toLocaleString();
			console.log(this.time)
		 
		this.btnClick();
	},
	//绑事件
	//点击button 时 需要实现的功能
	btnClick: function(){
		this.btn.onclick = () => {
			this.tat.value="";
			this.tet.value="";
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
			 console.log(1);
		 //点击发布发布框消失
		 this.container.style.display = "none";
		 //模态框消失
		 this.modal.className = "";
		 //获取输入框的值
		var aTxt = this.tat.value;
		var bTxt= this.tet.value;
		this.box.innerHTML = "用户名:" + bTxt + "<br/>" + "发布内容：" + aTxt + "<br/>"+this.time+ "<br/>"+"<div class='dele'>撤销</div>";
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
				this.box.remove();
			}  
    
		
		}
		this.monltor();
	},
	monltor: function(){
     this.box.oncontextmenu=(e)=>{
			 e=e ||event;
			//阻止 浏览器右键菜单的弹出
			if (e.preventDefault){
					e.preventDefault();
			}	 else{
					e.returnValue = false;
			}
			this.ul.style.display="block";
			this.ul.style.left= e.clientX + "px";
			this.ul.style.top=e.clientY + "px";
			this.ul.style.background="#fff";
		  this.ul.onclick=()=>{
			this.box.style.display = "none";
			this.ul.style.display = "none";
			}
		
		 }
	}
}
new Index();
