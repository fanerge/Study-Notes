//扩展String对象
if( !String.prototype.trim ){
	String.prototype.trim = function(){
		this.replace(/^\s+|\s+$/g,'');
	};
}

(function(){
	//先检查全局是否有变量ADS
	if( !window.ADS ){
		window['ADS'] = {};
	}
	
	//判断当前浏览器是否与整个库兼容
	function isCompatible( other ){
		//使用能力检测来检查必要条件(判断是否支持es6语法)
		if( other === false 
			|| !Array.isArray
			|| !Array.prototype.include
			|| !Object.keys
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
	window['ADS']['bindFunction'] = bindFunction;
	
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
	
	/*把word-word 转化为 wordWord*/
	function camelize( s ){
		return s.replace(/-(\w)/g,function( strMatch, p1 ){
			return p1.toUpperCase();
		});
	}
	window['ADS']['camelize'] = camelize;
	
	/*把 wordWord转化为 word-word*/
	function uncamelize( s ){
		return s.replace(/([A-Z])/g,'-$1').toLowerCase();
	}
	
	//阻止事件冒泡
	function stopPropagation( e ){
		e = e || window.event;
		if( e.stopPropagation ){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	}
	window['ADS']['stopPropagation'] = stopPropagation;
	
	//阻止事件默认行为
	function preventDefault( e ){
		e = e || window.event;
		if( e.preventDefault ){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	}
	window['ADS']['preventDefault'] = preventDefault;
	
	function addLoadEvent( loadEvent, waitForImages ){
		if( !isCompatible ){
			return false;
		}
		
		//如果waitForImages设置为true
		if( waitForImages ){
			return addEvent(window, 'load', loadEvent);
		}
		
		//否则需要包装loadEvent，但需要确保事件不会执行两次
		let init = function(){
			//如果函数已经执行过了
			if( arguements.callee.done ){
				return ;
			}
			//将其标记为true，表示执行过了
			arguements.callee.done = true;
			//在docuemnt的环境中注册事件
			loadEvent.apply( document, arguments );
		};
		
		//为DOMContentLoaded事件注册事件侦听器
		if( document.addEventListener ){
			document.addEventListener( 'DOMContentLoaded', init, false );
		}
		
		//safiri
		if( /Webkit/i,test( navigator.userAgent ) ){
			let _timer = setInterval( function(){
				if( /loaded|complete/.test( docuemnt.readyState ) ){
					clearInterval( _timer );
					init();
				}
			} );
		}
		
		//IE
		/*@cc_on @*/
		/*@if (@_win32)*/
		document.write("<script id=__ie_onload defer src=javascript:void(0)></script>");
		let script = document.getElementById('__ie_onload');
		script.onreadystatechange = function(){
			if( this.readyState === 'complete' ){
				init();
			}
		};
		/*@end @*/
		return true;
	}
	window['ADS']['addLoadEvent'] = addLoadEvent;
	
	//获取事件目标对象
	function getTarget( e ){
		e = e || window.event;
		//兼容W3c和ie
		let target = e.target || e.srcElement;
		return target;
	}
	window['ADS']['getTarget'] = getTarget;
	
	//兼容鼠标按键
	function getMouseButton( e ){
		e = e || window.event;
		let buttons = {
			'left': false,
			'middle': false,
			'right': false
		};
		if( e.toString && e.toSting().indexOf('MouseEvent') !== -1 ){
			//w3c
			switch( e.button ){
				case 0: buttons.left = true; break;
				case 1: buttons.middle = true; break;
				case 2: buttons.right = true; break;
				fefault: break;
			}
		}else if( e.button ){
			//ie
			switch( e.button ){
				case 1: buttons.left = true; break;
				case 2: buttons.right = true; break;
				case 3:
					buttons.left = true;
					buttons.right = true;
					break;
				case 4: button.middle = true; break;
				case 5:
					buttons.left = true;
					buttons.middle = true;
					break;
				case 6:
					buttons.middle = true;
					buttons.right = true;
					break;
				case 7:
					buttons.left = true;
					buttons.middle = true;
					buttons.right = true;
					break;
				default : break;
			}
		}else{
			return false;
		}
		return buttons;
	}
	window.['ADS']['getMouseButton'] = getMouseButton;
	
	//获得鼠标相对于文档的位置
	function getPointerPositionInDocument( e ){
		e = e || window.event;
		//先后兼容safari、w3c、ie
		let x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
		let y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
		return {
			'x': x,
			'y': y
		}
	}
	window['ADS']['getPointerPositionInDocument'] = getPointerPositionInDocument;
	
	//键盘
	function getKeyPressed( e ){
		e = e || window.event;
		let code = e.keyCode;
		let value = String.fromCharCode(code);
		return {
			'code': code,
			'value': value
		};
	}
	window['ADS']['getKeyPressed'] = getKeyPressed;
	
	//通过id修改单个元素的样式
	function setStyleById( element, styles ){
		if( !(element = $(element)) ){
			return false;
		}
		//循环遍历styles对象并应用每个属性
		for( property in styles ){
			if( !styles.hasOwnProperty(property) ){
				continue;
			}
			if( element.style.setProperty ){
				//w3c
				element.style.setProperty(uncamelize(property,'-'), styeles[property], null);
			}else{
				//ie
				element.style[camelize(property)] = styles[property];
			}
		}
		return true;
	}
	//window['ADS']['setStyle'] = setStyleById;
	window['ADS']['setStyleById'] = setStyleById;
	
	//通过类名修改多个元素的样式
	function setStyleByClassName( parent, tag, className, styles ){
		if( !parent = $(parent) ){
			return false;
		}
		let elements = getElementsByClassName(className, tag, parent);
		for( let e = 0, len = elements.length; e < len; e++ ){
			setStyeleById(elements[e], styles);
		}
		return true;
	}
	window['ADS']['setStylesByClassName'] = setStylesByClassName;
	
	//通过标签名修改多个元素的样式
	function setStylesByTagName( tagName, styles, parent ){
		parent = $(parent) || document;
		let elements = parent.getElementByTagName(tagName);
		for( let e = 0, len = elements.length; e < len; e++ ){
			setStyeleById(elements[e], styles);
		}
		return true;
	}
	window['ADS']['setStylesByTagName'] = setStylesByTagName;
	
	//取得包含元素类名的数组
	function getClassNames( element ){
		if( !(element = $(element)) ){
			return false;
		}
		return element.className.replace(/\s+/,' ').split(' ');
	}
	window['ADS']['getClassNames'] = getClassNames;
	
	//检查元素中是否存在该类
	function hasClassName( element, className ){
		if( !(element = $(element)) ){
			return false;	
		}
		let calsses = getClassNames(element);
		for( let i = 0, len = classes.length; i++ ){
			if( classes[i] === className ){
				return true;
			}
		}
		return false;
	}
	window['ADS']['hasClassName'] = hasClassName;
	
	//为元素添加类
	function addClassName( element, className ){
		if( !(element = $(element)) ){
			return false;
		}
		element.className += (element.className ? ' ' : '') + className;
		return true;
	}
	window['ADS']['addClassName'] = addClassName;
	
	//为元素删除类
	function removeClassName( element, className ){
		if( !(element = $(element)) ){
			return false;
		}
		let classes = getClassNames(element);
		let len = classes.length;
		for( let i = len - 1; i >= 0 ;i-- ){
			if( classes[i] === className ){
				delete(classes[i]);
			}
		}
		element.className = classes.join(' ');
		return (len === classes.length ? false : true);
	}
	window['ADS']['removeClassName'] = removeClassName;
	
	//动态载入样式表
	function addStyleSheet( url, media = 'screen' ){
		let link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', url);
		link.setAttribute('media', media);
		document.getElementsByTagNae('head')[0].appendChild(link);
	}
	window['ADS']['addStyleSheet'] = addStyleSheet;
	
	//移除样式表
	function removeStyleSheet( url, media ){
		let styles = getStyleSheets( url, media );
		for( let i = 0, len = styles.length; i < len; i++ ){
			let node = styles[i].ownerNode || styles[i]owningElement;
			styles[i].disabled = true;
			node.parentNode.removeChild(node);
		}
	}
	window['ADS']['removeStyleSheet'] = removeStyleSheet;
	
	//获取样式列表
	function getStyleSheets( url, media ){
		let sheets = [];
		for( let i = 0, len = document.styleSheets.length; i < len; i++ ){
			if( url && document.styleSheets[i].href.indexOf( url ) == -1 ){
				continue;
			}
			if( media ){
				//规范化media字符串
				media = media.replace(/,\s*/,',');
				let sheetMedia;
				if(document.styleSheet[i].media.mediaText){
					//DOM方法
					sheetMedia = document.styleSheet[i].media.mediaText.replace(/,\s*/,',');
					//safari添加额外的都好和空格
					sheetMedia = sheetMedia.replace(/,\s*$/,'');
				}else{
					//MSIE
					sheetMedia = document.styleSheets[i].media.replace(/,\s*/,',');
				}
				if( media != sheetMedia ){
					continue;
				}
			}
			sheets.push(document.styleSheet[i]);
		}
		return sheets;	
	}
	window['ADS']['getStyleSheets'] = getStyleSheets;
	
	//编辑一天样式规则
	function editCSSRule( selector, styles, url, media ){
		let styleSheets = (typeof url === 'array' ? url : getStyleSheets( url, media ))
		for( let i = 0, len = styleSheets.length; i < len; i++  ){
			let rules = styleSheets[i].rules || styleSheets[i].rules;
			if( !rules ){
				continue;
			}
			selector = selector.toUpperCase();
			for( let j = 0, len = rules.length; i < len ; i++ ){
				if( rules[j].selectorText.toUpperCase() === selector ){
					for( property in styles ){
						if( !styles.hasOwnProperty(property) ){
							continue;
						}
						rules[j].style[camelize(property)] = styles[property];
					}
				}
			}
		}
	}
	window['ADS']['editCSSRule'] = editCSSRule;
	
	//添加一条css规则
	function addCSSRule( selector, styles, index, url, media ){
		let declaration = '';
		for( property in styles ){
			if( !styles.hasOwnProperty(property) ){
				continue;
			}
			declaration += property + ':' + style[property] + '; ';
		}
		let styleSheets = (typeof url === 'array' ? url : getStyleSheets(url, media));
		let newIndex;
		for( let i = 0; i < styleSheets.length; i++ ){
			if( styleSheets[i].insertRule ){
				inewIndex = (index >= 0 ? index : styleSheets[i].cssRules.length);
				styleSheets[i].insertRule(
					selector + '{' + declaration + '}',
					newIndex
				);
			}else if( styleSheets[i].addRule ){
				newIndex = (index >= 0 ? index : -1);
				styleSheets[i].addRule(selector, declaration, newIndex);
			}
		}
	}
	window['ADS']['addCSSRule'] = addCSSRule;
	
	//计算样式
	function getStyle( element, property ){
		if( !(element = $(element)) || !property ){
			return false;
		}
		let value = element.style[camelize(property)];
		if( !value ){
			//取得计算的样式
			if( docuemnt.defaultView && document.defaultView.getComputedStyle ){
				//w3c
				let css = document.defaultView.getComputedStyle( element, null );
				value = css ? css.getPropertyValue(property) : null;
			}else if( element.currentStyle ){
				//ie
				value = element.currentStyle[camelize(property)];
			}
		}
		return value === 'auto' ? '' : value;
	}
	window['ADS']['getStyle'] = getStyle;
	window['ADS']['getStyleById'] = getStyle;
	
	//XMLHttpRequest
	function getRequestObject( url, options = {} ){
		let req = null;
		if( window.XMLHttpRequest ){
			req = new window.XMLHttpRequest();
		}else if( window.ActiveXObject ){
			req = new window.ActiveXObject('Microsofr.XMLHTTP');
		}
		if( !req ){
			return false;
		}
		//定义默认选项
		options.method = options.method || 'GET';
		options.send = options.send || null;
		
		//为请求种的每个阶段定义不同的侦听器
		req.onreadystatechange = function(){
			switch( req.readyState ){
				case 1: 
					//载入中
					if( options.loadListener ){
						options.loadListener.apply( req.arguments );
					}
					break;
				case 2:
					//载入完成
					if( options.loadListener ){
						options.loadListener.apply( req.arguments );
					}
				case 3:
					//交互
					if( options.ineractiveListener ){
						options.ineractiveListener.apply( req, arguments );
					}
					break;
				case 4:
					//完成
					try{
						if( req.status && req.status == 200 ){
							let contentType = req.getResponseHeader( 'Content-Type' );
							let mimeType = contentType.match( /\s*([^;]+)\s*(;|$)/i )[1];
							switch( mimeType ){
								case 'text/javascript':
								case 'application/javascript':
									if( options.jsResponseListener ){
										options.jsResponseListener.call(req, req.responseText)
									}
									break;
								case 'application/json':
									if( options.jsonResponseListener ){
										try{
											let jons = parseJSON(req.responseText);
										}catch( e ){
											let json = false;
										}
										options.jsonResponseListener.call(req, json);
									}
									break;
								case 'text/xml':
								case 'application/xml':
								case 'application/xhtml + xml':	
									if( options.xmlResponseListener ){
										options.xmlResponseListener.call(req, req.responseXML);	
									}
									break;
								case 'text/html':
									if( options.htmlResponseListener ){
										options.htmlResponseListener.call(req, req.responseText);
									}
									break;
							}
							//针对响应完成的侦听器
							if( options.completeListener ){
								options.completeListener.apply(req, arguments);
							}
						}else{
							//响应出现错误
							if( options.errorListener ){
								options.errorListener.apply(req, arguments);
							}
						}
					}catch(e){
						//忽略错误
					}
					break;
			}
		};
		//开启请求
		req.open(options.method, url, true);
		req.setRequestHeader('X-ADS-Ajax-Request', 'AjaxRequest');
		return req;
	}
	window['ADS']['getRequestObject'] = getRequestObject;
	
	//
	function ajaxRequest( url, options ){
		let req = getRequestObject( url, options );
		return req.send( options.send );
	}
	window['ADS']['ajaxRequest'] = ajaxRequest;
	
	//跨域解决
	let XssHttpRequestCount = 0;
	let XssHttpRequest = function(){
		this.requestId = 'XSS_HTTP_REQUEST_' + (++XssHttpRequestCount);
	};
	XssHttpRequest.prorotype = {
		url: null,
		scriptObject: null,
		responseJSON: null,
		status: 0,
		readyState: 0,
		timeout: 30000,
		onreadystatechange: function(){
			
		},
		setReadyState: function( newReadyState ){
			if( this.readyState < newReadyState || newReadyState == 0 ){
				this.readyState = newReadyState;
				this.onreaystatechange();
			}
		},
		open: function( url, timeout ){
			this.timeout = timeout || 30000;
			this.url = url
				+ ((url.indexOf('?') != -1 ? '&' : '?'))
				+ 'XSS_HTTP_REQUEST_CALLBACK='
				+ this.requestID
				+ '_CALLBACK';
			this.setReadyState(0);
		},
		send: function(){
			let requestObject = this;
			this.scriptObject = document.createElement('script');
			this.scriptObject.setAttribute('id', this.requestID);
			this.scriptObject.setAttribute('type', 'text/javascript');
			let timeoutWatcher = setTimeout(function(){
				window[requestObject.requestID + '_CALLBACK'] = function(){};
				requestObject.scriptObject.parentNode.removeChild(requestObject.scriptObject);
				requestObject.status = 2;
				requestObject.statusText = 'Timwout after '
					+ requestObject.timeout
					+ ' millseconds.';
				requestObject.setReadyState(2);
				requestObject.setReadyState(3);
				requestObject.setReadyState(4);
			}, this.timeout);
			window[this.requestI + '_CALLBACK'] = function( JSON ){
				clearTimeout( timeoutWatcher );
				requestObject.setReadyState(2);
				requestObject.setReadyState(3);
				requestObject.responseJSON = JSON;
				requestObject.status = 1;
				requestObject.statusText = 'Loaded';
				requestObject.setReadyState(4);
			}
			this.setReadyState(1);
			this.scriptObject.setAttribute('src',this.url);
			let head = document.getElementsByTagName('head')[0];
			head.appendChild(this.scriptObject);
		}
	};
	window['ADS']['XssHttpRequest']= XssHttpRequest;
	
	//克隆一个对象
	function clone( myObj ){
		if( typeof(myObj) != 'object' ){
			return myObj;
		}
		if( myObj === null ){
			reutn myObj;
		}
		let myNewObj = {};
		for( let i in myObj ){
			myNewObj[i] = clone(myObj[i]);
		}
		return myNewObj;
	}
	window['ADS']['clone'] = clone;
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})();