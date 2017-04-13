(function(){
	//�ȼ��ȫ���Ƿ��б���ADS
	if( !window.ADS ){
		window['ADS'] = {};
	}
	
	//�жϵ�ǰ������Ƿ������������
	function isCompatible( other ){
		//ʹ���������������Ҫ����
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
		
		//������Ϊ�����ṩ������Ԫ�� 
		for(let i = 0,len = arguments.length; i < len; i++){
			let element = arguments[i];
			
			//����ò�����һ���ַ����Ǽ�������һ��id
			if( typeof element === 'string' ){
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
	
	function getElementsByClassName( className, tag, parent = document ){
		if( !$(parent) ){
			return false;
		}
		
		//��������ƥ��ı�ǩ
		let allTags = ( tag == '*' && parent.all ) ? parent.all : parent.getElementsByTagName( tag );
		let matchingElements = [];
		
		//����һ��������ʽ,�ж�className�Ƿ���ȷ
		className = className.replace( /\-/g, '\\-' );
		let regex = new RegExp( '(^|\\s)' + className + '(\\s|$)' );
		let element;
		//����ÿ��Ԫ��
		for( let i = 0, len = allTags.length; i < len; i++ ){
			element = allTags[i];
			if( regex.test( element.className ) ){
				matchingElements.push( element );
			}
		}
		//�����κ�ƥ���Ԫ��
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
	window['ADS'].bindFunction = bindFunction;
	
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
		if( !(parent = $(parent)) ){
			return false;
		}
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
	
	
	
	
	
	
	
	
	
	
})();