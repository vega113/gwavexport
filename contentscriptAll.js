var popup, blanket;

function compareKeyEvents(a, b){
	if(typeof(a.metaKey) !== undefined && typeof(b.metaKey) !== undefined)
		return a.ctrlKey == b.ctrlKey && a.shiftKey == b.shiftKey && a.altKey == b.altKey
        && a.keyCode == b.keyCode && a.metaKey == b.metaKey;
	else
		return a.ctrlKey == b.ctrlKey && a.shiftKey == b.shiftKey && a.altKey == b.altKey && a.keyCode == b.keyCode;
}

var copyListener = function(e){
	chrome.extension.sendRequest({greeting: 'getOptions'}, function(shortcut){
		if(shortcut.copyLink && compareKeyEvents(e, shortcut.copyLink)){
			showPopup();
			var txt = window.getSelection().toString().replace(/\s+/g,' ');
			var loc = window.location.href;
			chrome.extension.sendRequest({greeting: 'saveLink', loc: loc, txt: txt}, function(){});
			e.preventDefault();
		}
	});
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    switch(request.greeting){
    case 'copyLink':
    	showPopup();
		var txt = window.getSelection().toString().replace(/\s+/g,' ');
		var loc = window.location.href;
		chrome.extension.sendRequest({greeting: 'saveLink', loc: loc, txt: txt}, function(){});
		e.preventDefault();
    }
});

window.addEventListener('keyup', copyListener, true);

var blanketCSS = 'background-color:#111;' +
					'opacity: 0.65;' +
					'filter:alpha(opacity=65);' +
					'position:absolute;' +
					'z-index:9001;' +
					'top:0px;' +
					'left:0px;' +
					'width:100%;';

var popupCSS = 'position:absolute;' +
				'background-color:#eeeeee;' +
				'width:300px;' +
				'height:300px;' +
				'z-index: 9002;';

				function load_binary_resource(url) {  
					console.log(url);
  var req = new XMLHttpRequest();  
  req.open('GET', url, false);  
  //XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]  
  req.overrideMimeType('text/plain; charset=x-user-defined');  
  req.send(null);  
  if (req.status != 200) return '';  
  return req.responseText;  
}  
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    switch(request.greeting){
    case 'setCopyHandler':
    	sendResponse({});
    	console.log(load_binary_resource('https://wave.googleusercontent.com/wave/attachment/.face?id=UdP_P8nF4&key=AH0qf5zZzOQ_9szj4D4oxwT8HF808dP3dQ'));
        setCopyHandler();
        break;
    case 'copyLink':
    	sendResponse({});
    	console.log(load_binary_resource('https://wave.googleusercontent.com/wave/attachment/.face?id=UdP_P8nF4&key=AH0qf5zZzOQ_9szj4D4oxwT8HF808dP3dQ'));
    	copyListener();
    	break;
    }
});

function setCopyHandler(){
	//window.addEventListener('copy', copyListener, true);
}

function showPopup(){
	//TODO
	return;
	var popupId = 'megaPopupId';
	var blanketId = 'megaBlanketId';
	blanket = document.createElement('div');
	blanket.setAttribute('id', blanketId);
	blanket.style.cssText = blanketCSS;
	document.body.appendChild(blanket);
	/*popup = document.createElement('div');
	popup.setAttribute('id', popupId);
	//popup.style.cssText = popupCSS;
	document.body.appendChild(popup);*/
	var windowname = '';
	blanket_size(popupId);
	//window_pos(popupId);
	//toggle(blanketId);
	//toggle(popupId);
	//popup.textContent = 'Copyed';
	setTimeout(hidePopup, 100);
}

function toggle(div_id) {
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	el.style.display = 'block';}
	else {el.style.display = 'none';}
}

function blanket_size(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('megaBlanketId');
	blanket.style.height = blanket_height + 'px';
	//var popUpDiv = document.getElementById(popUpDivVar);
	//popUpDiv_height=blanket_height/2-150;//150 is half popup's height
	//popUpDiv.style.top = popUpDiv_height + 'px';
}
function window_pos(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2-150;//150 is half popup's width
	popUpDiv.style.left = window_width + 'px';
}

function hidePopup(){
	if(blanket){
		document.body.removeChild(blanket);
	}
}