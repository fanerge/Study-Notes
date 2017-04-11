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
			if( typeof element === 'String' ){
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
		return referenceNode.parentNode.insertBefore( node, recalc.nextSibling );
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
	
	
	
	
	
	
	
	
	
	
})();