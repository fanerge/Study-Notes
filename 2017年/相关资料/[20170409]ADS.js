(function(){
	//先检查全局是否有变量ADS
	if( !window.ADS ){
		window['ADS'] = {};
	}
	
	//判断当前浏览器是否与整个库兼容
	function isCompatible( other ){
		//使用能力检测来检查必要条件
		if( other === false 
			|| !Array.prototype.push 
			|| !Object.hasOwnProperty
			|| !document.createElement
			|| !document.getElementsByTagName
			){
			return false;	
		}
		return true;
	};
	window['ADS']['isCompatible'] = isCompatible;
	
	function $(){
		let elements = [];
		
		//查找作为参数提供的所有元素 
		for(let i = 0,len = arguments.length; i < len; i++){
			let element = arguments[i];
			
			//如果该参数是一个字符串那假设它是一个id
			if( typeof element === 'string' ){
				element = document.getElementById( element );	
			}
			
			//如果值提供一个参数，则立即返回这个元素
			if( arguments.length === 1 ){
				return element;
			}
			//否则，将它添加到数组中
			elements.push( element );
		}
		
		//返回包含多个被请求元素的数组
		return elements;
	};
	window['ADS']['$'] = $;
	
	function exampleLibraryMethod( obj ){
		if( !(obj = $(obj)) ){
			return false;
		}
	};
	window['ADS']['exampleLibraryMethod'] = exampleLibraryMethod;
	
	//添加事件
	function addEvent( node, type, listener ){
		//使用前面的方法兼容性以保证平稳退化
		if( !isCompatible() ){
			return false;
		}
		
		//如果节点不存在
		if( !(node = $(node)) ){
			return false;
		}
		
		//W3C
		if( node.addEventListener ){
			node.addEventListener( type, listener, false );
			return true;
		}
		
		//IE
		if( node.attachEvent ){
			node.attachEvent( 'on' + type, listener );
			return true;
		}
		
		//如果两种都不支持
		return false;
	};
	window['ADS']['addEvent'] = addEvent;
	
	function removeEvent( node, type, listener ){
		if( !(node = $(node)) ){
			return false;
		}
		
		//W3C
		if( node.removeEventListener ){
			node.removeEventListener( type, listener, false );
			return true;
		}
		
		//IE
		if( node.detachEvent ){
			node.detachEvent( 'on' + type, listener );
			return true;
		}
		
		//两者都不支持
		return false;
	};
	window['ADS']['removeEvent'] = removeEvent;
	
	function getElementsByClassName( className, tag, parent = document ){
		if( !$(parent) ){
			return false;
		}
		
		//查找所有匹配的标签
		let allTags = ( tag == '*' && parent.all ) ? parent.all : parent.getElementsByTagName( tag );
		let matchingElements = [];
		
		//创建一个正则表达式,判断className是否正确
		className = className.replace( /\-/g, '\\-' );
		let regex = new RegExp( '(^|\\s)' + className + '(\\s|$)' );
		let element;
		//查找每个元素
		for( let i = 0, len = allTags.length; i < len; i++ ){
			element = allTags[i];
			if( regex.test( element.className ) ){
				matchingElements.push( element );
			}
		}
		//返回任何匹配的元素
		return matchingElements;
	}; 
	window['ADS']['getElementsByClassName'] = getElementsByClassName;
	
	function toggleDisplay( node, value = '' ){
		if( !(node = $(node)) ){
			return false;
		}
		
		let show = node.style.display;
		if( show !== 'none' ){
			show = 'none';
		}else{
			show = value;
		}
		return false;
	};
	window['ADS']['toggleDisplay'] = toggleDisplay;
	
	function insertAfter( node, referenceNode ){
		if( !(node = $(node)) ){
			return false;
		}
		if( !(referenceNode = $(referenceNode)) ){
			return false;
		}
		return referenceNode.parentNode.insertBefore( node, referenceNode.nextSibling );
	};
	window['ADS']['insertAfter'] = insertAfter;
	
	function removeChildren( parent ){
		if( !(parent = $(parent)) ) {
			return false;
		}
		
		//逐个删除第一个子节点
		while ( parent.firstChild ){
			parent.firstChild.parentNode.removeChild( parent.firstChild );
		}
		//在返回父元素，以便实现连缀
		return parent;
	};
	window['ADS']['removeChildren'] = removeChildren;
	
	function prependChildren( parent, newChild ){
		if( !(parent = $(parent)) ){
			return false;
		}
		if( !(newChild = $(newChild)) ){
			return false;
		}
		
		if( parent.firstChild ){
			//如果存在一个子节点，则在这个子节点之前插入
			parent.insertBefore( newChild, parent.firstChild );
		}else{
			//如果没有子节点，则直接添加
			parent.appendChild( newChild );
		}
		//返回父元素，以便实现连缀
		return parent;
	};
	window['ADS']['prependChildren'] = prependChildren;
	
	//修改方法的执行环境
	function bindFunction( obj, func){
		return fucntion(){
			func.apply( obj, arguments);
		};
	}
	window['ADS'].bindFunction = bindFunction;
	
	//获取窗口大小，返回一个对象
	function getBrowserWindowSize(){
		let de = document.documentElement;
		return {
			'width': ( window.innerWidth || ( de && de.body.clientWidth ) ),
			'height': ( window.innerHeight || ( de && de.body.clientHeight ) )
		}
	}
	window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;
	
	//日志工具
	function MyLogger( id = 'ADSLogWindow' ){
		//私有属性
		let logWindow = null;
		//私有方法（用受保护的方法创建日志窗口）
		let createWindow = function (){ 
		
			//取得新窗口在浏览器中
			//居中放置时的左上角位置
			let browserWindowSize = ADS.getBrowserWindowSize();
			let top = (( browserWindowSize.height -200 ) / 2) || 0;
			let left = (( browserWindowSize.width -200 ) / 2) || 0;
			
			//创建作为日志窗口的DOM节点
			//使用受保护的logWindow属性维护引用
			logWindow = createElement('ul');
			//指定ID值，以便必要时在DOM树中能够识别它
			logWindow.setAttribut( 'id', id );
			
			//为日志窗口定位
			logWindow.style.position = 'absolute';
			logWindow.style.top = top + 'px';
			logWindow.style.left = left + 'px';
			
			//为日志窗口设置大小
			logWindow.style.width = '200px';
			logWindow.style.height = '200px';
			logWindow.style.overflow = 'scroll';
			
			//添加一些样式
			//logWindow.style.padding = '0';
			//logWindow.style.margin = '0';
			//logWindow.style.border = '1px solid black';
			logWindow.style = {
				padding: '0',
				marging: '0',
				border: '1px solid black',
				backgroundColor: 'white',
				listStyle: 'none',
				font: '10px/10px Sans'
			};
			
			//添加到文档中
			document.body.appendChild( logWindow );
		};
		
		//特权方法
		this.writeRaw = function ( msg ){ 
			
			//判断窗口是否存在
			if( !logWindow ){
				createWindow();
			}
			//创建列表项并添加样式
			let li = document.createElement('li');
			li.style = {
				padding: '2px',
				border: '0',
				borderBottom: '1px dotted black',
				margin: '0',
				color: '#000',
				font: '9px/9px Sans'			
			};
			//为节点添加信息
			if( typeof msg === 'undefined' ){
				li.appendChild( document.createTextNode('msg was undefined') );
			}else if(typeof li.innerHTML !== undefined){
				li.innerHTML = msg;
			}else{
				li.appendChild( document.createTextNode(msg) );
			}
			//将项目添加到ul上
			logWindow.appendChild(li);
			return true;
		};
	}
	//公有方法
	MyLogger.prototype = {
		write: function ( msg ){
			//警告msg为空值
			if( typeof msg === 'string' && msg.length === 0 ){
				return this.writeRaw('ADS.log: null msg');
			}
			//如果msg不是字符串，则尝试调用toString(),若果不存在该访问则记录对象类型
			if( typeof msg !== 'string' ){
				if( msg.toString ){
					return this.writeRaw( msg.toString() );
				}else{
					return this.writeRaw( typeof msg );
				}
				//转换<和>以便.innerHTML不会将msg作为HTML解析
				msg = msg.replace(/</g,'&lt;').replace(/>/,'&gt;');
				return this.writeRaw( msg );
			}
		},
		//向日志窗口写入一个标题
		header: function ( msg ){
			msg = '<span style="color:white;background-color:black;font-weight:bold;padding:0 5px;">' + 
				msg + '</span>';
			return this.writeRaw( msg );
		}
	};
	window['ADS']['log'] = new MyLogger();
	
	//添加prependChild
	function prependChild( child, parent ){
		if( !(parent = $(parent)) ){
			return false;
		}
		if( parent.firstChild ){
			parent.insertBefore( child, parent.firstChild );
		}else{
			parent.appendChild( child );
		}
		return parent;    //实现连缀调用
	}
	window['ADS']['prependChild'] = prependChild;
	
	//添加insertAfter
	function insertAfter(newChild, refChild, parent){
		if( refChild.nextSibling ){
			parent.insertBefore( newChild, refChild.nextSibling );
		}else{
			parent.appendChild( newChild );
		}
		return parent;
	}
	window['ADS']['insertAfter'] = insertAfter;
	
	//遍历DOM
	function walkElementsLinear( func, node = window.document ){
		let nodes = node.getElementsByTagName( '*' );
		for( let i = 0, len = nodes.length; i < len; i++  ){
			func.call( nodes[i] );
		}
	}
	window['ADS']['walkElementsLinear'] = walkElementsLinear;
	
	//递归遍历DOM
	function walkTheDOMRecursive( func, node = window.document, depth, returnedFromParent ){
		let returnedFromParent = func.call( node, depth++, returnedFromParent )
		let node = node.firstChild;
		while( node ){
			walkTheDOMRecursive( func, node,depth, returnedFromParent);
			node = node.nextSibling;
		}
	}
	window['ADS']['walkTheDOMRecursive'] = walkTheDOMRecursive;
	
	//递归遍历DOM属性
	function walkTheDOMWithAttributes( func, node = window.document, depth, returnedFromParent ){
		let returnedFromParent = func.call( node, depth++, returnedFromParent )
		if( node.attributes ){
			for( let i = 0,len = node.attributes.length; i < len; i++ ){
				walkTheDOMWithAttributes( func, node.attributes[i], depth-1, returnedFromParent )
			}
		}
		if( node.nodeType === 2 ){
			node = node.firstChild;
			while( node ){
				walkTheDOMWithAttributes( func, node, depath, returnedFromParent );
				node = node.nextSibling;
			}
		}
	}
	window['ADS']['walkTheDOMWithAttributes'] = walkTheDOMWithAttributes;
	
	
	
	
	
	
	
	
	
	
})();