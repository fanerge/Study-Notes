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
		return referenceNode.parentNode.insertBefore( node, recalc.nextSibling );
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
	
	
	
	
	
	
	
	
	
	
})();