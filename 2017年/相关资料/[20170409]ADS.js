//��չString����
if( !String.prototype.trim ){
	String.prototype.trim = function(){
		this.replace(/^\s+|\s+$/g,'');
	};
}

(function(){
	//�ȼ��ȫ���Ƿ��б���ADS
	if( !window.ADS ){
		window['ADS'] = {};
	}
	
	//�жϵ�ǰ������Ƿ������������
	function isCompatible( other ){
		//ʹ���������������Ҫ����(�ж��Ƿ�֧��es6�﷨)
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
		
		//������Ϊ�����ṩ������Ԫ�� 
		for(let i = 0,len = arguments.length; i < len; i++){
			let element = arguments[i];
			
			//����ò�����һ���ַ����Ǽ�������һ��id
			if( typeof element === 'String' ){
				element = document.getElementById( element );	
			}
			
			//���ֵ�ṩһ���������������������Ԫ��
			if( arguments.length === 1 ){
				return element;
			}
			//���򣬽�����ӵ�������
			elements.push( element );
		}
		
		//���ذ������������Ԫ�ص�����
		return elements;
	};
	window['ADS']['$'] = $;
	
	function exampleLibraryMethod( obj ){
		if( !(obj = $(obj)) ){
			return false;
		}
	};
	window['ADS']['exampleLibraryMethod'] = exampleLibraryMethod;
	
	//����¼�
	function addEvent( node, type, listener ){
		//ʹ��ǰ��ķ����������Ա�֤ƽ���˻�
		if( !isCompatible() ){
			return false;
		}
		
		//����ڵ㲻����
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
		
		//������ֶ���֧��
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
		
		//���߶���֧��
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
		
		//���ɾ����һ���ӽڵ�
		while ( parent.firstChild ){
			parent.firstChild.parentNode.removeChild( parent.firstChild );
		}
		//�ڷ��ظ�Ԫ�أ��Ա�ʵ����׺
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
			//�������һ���ӽڵ㣬��������ӽڵ�֮ǰ����
			parent.insertBefore( newChild, parent.firstChild );
		}else{
			//���û���ӽڵ㣬��ֱ�����
			parent.appendChild( newChild );
		}
		//���ظ�Ԫ�أ��Ա�ʵ����׺
		return parent;
	};
	window['ADS']['prependChildren'] = prependChildren;
	
	//�޸ķ�����ִ�л���
	function bindFunction( obj, func){
		return fucntion(){
			func.apply( obj, arguments);
		};
	}
	window['ADS']['bindFunction'] = bindFunction;
	
	//��ȡ���ڴ�С������һ������
	function getBrowserWindowSize(){
		let de = document.documentElement;
		return {
			'width': ( window.innerWidth || ( de && de.body.clientWidth ) ),
			'height': ( window.innerHeight || ( de && de.body.clientHeight ) )
		}
	}
	window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;
	
	//��־����
	function MyLogger( id = 'ADSLogWindow' ){
		//˽������
		let logWindow = null;
		//˽�з��������ܱ����ķ���������־���ڣ�
		let createWindow = function (){ 
		
			//ȡ���´������������
			//���з���ʱ�����Ͻ�λ��
			let browserWindowSize = ADS.getBrowserWindowSize();
			let top = (( browserWindowSize.height -200 ) / 2) || 0;
			let left = (( browserWindowSize.width -200 ) / 2) || 0;
			
			//������Ϊ��־���ڵ�DOM�ڵ�
			//ʹ���ܱ�����logWindow����ά������
			logWindow = createElement('ul');
			//ָ��IDֵ���Ա��Ҫʱ��DOM�����ܹ�ʶ����
			logWindow.setAttribut( 'id', id );
			
			//Ϊ��־���ڶ�λ
			logWindow.style.position = 'absolute';
			logWindow.style.top = top + 'px';
			logWindow.style.left = left + 'px';
			
			//Ϊ��־�������ô�С
			logWindow.style.width = '200px';
			logWindow.style.height = '200px';
			logWindow.style.overflow = 'scroll';
			
			//���һЩ��ʽ
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
			
			//��ӵ��ĵ���
			document.body.appendChild( logWindow );
		};
		
		//��Ȩ����
		this.writeRaw = function ( msg ){ 
			
			//�жϴ����Ƿ����
			if( !logWindow ){
				createWindow();
			}
			//�����б�������ʽ
			let li = document.createElement('li');
			li.style = {
				padding: '2px',
				border: '0',
				borderBottom: '1px dotted black',
				margin: '0',
				color: '#000',
				font: '9px/9px Sans'			
			};
			//Ϊ�ڵ������Ϣ
			if( typeof msg === 'undefined' ){
				li.appendChild( document.createTextNode('msg was undefined') );
			}else if(typeof li.innerHTML !== undefined){
				li.innerHTML = msg;
			}else{
				li.appendChild( document.createTextNode(msg) );
			}
			//����Ŀ��ӵ�ul��
			logWindow.appendChild(li);
			return true;
		};
	}
	//���з���
	MyLogger.prototype = {
		write: function ( msg ){
			//����msgΪ��ֵ
			if( typeof msg === 'string' && msg.length === 0 ){
				return this.writeRaw('ADS.log: null msg');
			}
			//���msg�����ַ��������Ե���toString(),���������ڸ÷������¼��������
			if( typeof msg !== 'string' ){
				if( msg.toString ){
					return this.writeRaw( msg.toString() );
				}else{
					return this.writeRaw( typeof msg );
				}
				//ת��<��>�Ա�.innerHTML���Ὣmsg��ΪHTML����
				msg = msg.replace(/</g,'&lt;').replace(/>/,'&gt;');
				return this.writeRaw( msg );
			}
		},
		//����־����д��һ������
		header: function ( msg ){
			msg = '<span style="color:white;background-color:black;font-weight:bold;padding:0 5px;">' + 
				msg + '</span>';
			return this.writeRaw( msg );
		}
	};
	window['ADS']['log'] = new MyLogger();
	
	//���prependChild
	function prependChild( child, parent ){
		if( parent.firstChild ){
			parent.insertBefore( child, parent.firstChild );
		}else{
			parent.appendChild( child );
		}
		return parent;    //ʵ����׺����
	}
	window['ADS']['prependChild'] = prependChild;
	
	//���insertAfter
	function insertAfter(newChild, refChild, parent){
		if( refChild.nextSibling ){
			parent.insertBefore( newChild, refChild.nextSibling );
		}else{
			parent.appendChild( newChild );
		}
		return parent;
	}
	window['ADS']['insertAfter'] = insertAfter;
	
	//����DOM
	function walkElementsLinear( func, node = window.document ){
		let nodes = node.getElementsByTagName( '*' );
		for( let i = 0, len = nodes.length; i < len; i++  ){
			func.call( nodes[i] );
		}
	}
	window['ADS']['walkElementsLinear'] = walkElementsLinear;
	
	//�ݹ����DOM
	function walkTheDOMRecursive( func, node = window.document, depth, returnedFromParent ){
		let returnedFromParent = func.call( node, depth++, returnedFromParent )
		let node = node.firstChild;
		while( node ){
			walkTheDOMRecursive( func, node,depth, returnedFromParent);
			node = node.nextSibling;
		}
	}
	window['ADS']['walkTheDOMRecursive'] = walkTheDOMRecursive;
	
	//�ݹ����DOM����
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
	
	/*��word-word ת��Ϊ wordWord*/
	function camelize( s ){
		return s.replace(/-(\w)/g,function( strMatch, p1 ){
			return p1.toUpperCase();
		});
	}
	window['ADS']['camelize'] = camelize;
	
	/*�� wordWordת��Ϊ word-word*/
	function uncamelize( s ){
		return s.replace(/([A-Z])/g,'-$1').toLowerCase();
	}
	
	//��ֹ�¼�ð��
	function stopPropagation( e ){
		e = e || window.event;
		if( e.stopPropagation ){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
	}
	window['ADS']['stopPropagation'] = stopPropagation;
	
	//��ֹ�¼�Ĭ����Ϊ
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
		
		//���waitForImages����Ϊtrue
		if( waitForImages ){
			return addEvent(window, 'load', loadEvent);
		}
		
		//������Ҫ��װloadEvent������Ҫȷ���¼�����ִ������
		let init = function(){
			//��������Ѿ�ִ�й���
			if( arguements.callee.done ){
				return ;
			}
			//������Ϊtrue����ʾִ�й���
			arguements.callee.done = true;
			//��docuemnt�Ļ�����ע���¼�
			loadEvent.apply( document, arguments );
		};
		
		//ΪDOMContentLoaded�¼�ע���¼�������
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
	
	//��ȡ�¼�Ŀ�����
	function getTarget( e ){
		e = e || window.event;
		//����W3c��ie
		let target = e.target || e.srcElement;
		return target;
	}
	window['ADS']['getTarget'] = getTarget;
	
	//������갴��
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
	
	//������������ĵ���λ��
	function getPointerPositionInDocument( e ){
		e = e || window.event;
		//�Ⱥ����safari��w3c��ie
		let x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft));
		let y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));
		return {
			'x': x,
			'y': y
		}
	}
	window['ADS']['getPointerPositionInDocument'] = getPointerPositionInDocument;
	
	//����
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
	
	//ͨ��id�޸ĵ���Ԫ�ص���ʽ
	function setStyleById( element, styles ){
		if( !(element = $(element)) ){
			return false;
		}
		//ѭ������styles����Ӧ��ÿ������
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
	
	//ͨ�������޸Ķ��Ԫ�ص���ʽ
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
	
	//ͨ����ǩ���޸Ķ��Ԫ�ص���ʽ
	function setStylesByTagName( tagName, styles, parent ){
		parent = $(parent) || document;
		let elements = parent.getElementByTagName(tagName);
		for( let e = 0, len = elements.length; e < len; e++ ){
			setStyeleById(elements[e], styles);
		}
		return true;
	}
	window['ADS']['setStylesByTagName'] = setStylesByTagName;
	
	//ȡ�ð���Ԫ������������
	function getClassNames( element ){
		if( !(element = $(element)) ){
			return false;
		}
		return element.className.replace(/\s+/,' ').split(' ');
	}
	window['ADS']['getClassNames'] = getClassNames;
	
	//���Ԫ�����Ƿ���ڸ���
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
	
	//ΪԪ�������
	function addClassName( element, className ){
		if( !(element = $(element)) ){
			return false;
		}
		element.className += (element.className ? ' ' : '') + className;
		return true;
	}
	window['ADS']['addClassName'] = addClassName;
	
	//ΪԪ��ɾ����
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
	
	//��̬������ʽ��
	function addStyleSheet( url, media = 'screen' ){
		let link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', url);
		link.setAttribute('media', media);
		document.getElementsByTagNae('head')[0].appendChild(link);
	}
	window['ADS']['addStyleSheet'] = addStyleSheet;
	
	//�Ƴ���ʽ��
	function removeStyleSheet( url, media ){
		let styles = getStyleSheets( url, media );
		for( let i = 0, len = styles.length; i < len; i++ ){
			let node = styles[i].ownerNode || styles[i]owningElement;
			styles[i].disabled = true;
			node.parentNode.removeChild(node);
		}
	}
	window['ADS']['removeStyleSheet'] = removeStyleSheet;
	
	//��ȡ��ʽ�б�
	function getStyleSheets( url, media ){
		let sheets = [];
		for( let i = 0, len = document.styleSheets.length; i < len; i++ ){
			if( url && document.styleSheets[i].href.indexOf( url ) == -1 ){
				continue;
			}
			if( media ){
				//�淶��media�ַ���
				media = media.replace(/,\s*/,',');
				let sheetMedia;
				if(document.styleSheet[i].media.mediaText){
					//DOM����
					sheetMedia = document.styleSheet[i].media.mediaText.replace(/,\s*/,',');
					//safari��Ӷ���Ķ��úͿո�
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
	
	//�༭һ����ʽ����
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
	
	//���һ��css����
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
	
	//������ʽ
	function getStyle( element, property ){
		if( !(element = $(element)) || !property ){
			return false;
		}
		let value = element.style[camelize(property)];
		if( !value ){
			//ȡ�ü������ʽ
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
		//����Ĭ��ѡ��
		options.method = options.method || 'GET';
		options.send = options.send || null;
		
		//Ϊ�����ֵ�ÿ���׶ζ��岻ͬ��������
		req.onreadystatechange = function(){
			switch( req.readyState ){
				case 1: 
					//������
					if( options.loadListener ){
						options.loadListener.apply( req.arguments );
					}
					break;
				case 2:
					//�������
					if( options.loadListener ){
						options.loadListener.apply( req.arguments );
					}
				case 3:
					//����
					if( options.ineractiveListener ){
						options.ineractiveListener.apply( req, arguments );
					}
					break;
				case 4:
					//���
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
							//�����Ӧ��ɵ�������
							if( options.completeListener ){
								options.completeListener.apply(req, arguments);
							}
						}else{
							//��Ӧ���ִ���
							if( options.errorListener ){
								options.errorListener.apply(req, arguments);
							}
						}
					}catch(e){
						//���Դ���
					}
					break;
			}
		};
		//��������
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
	
	//������
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
	
	//��¡һ������
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