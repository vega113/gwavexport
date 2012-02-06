var ACTIVE_BLIP = ["url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAATUlEQVR42mNgAILIHl6RmG7ODiB+AsTfQWIMMV1cu4CcvzDMENvDWQhk/AFhIHtSTC+3PgOQ8xCI/wHxGod6BhaIVojA/+geLlMGKAAACKMgrp+V8cQAAAAASUVORK5CYII=)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAFCAYAAAD1/OoBAAAAGUlEQVR42mOI6eb8M5Ixw4gPgFEwCkY2AAC/WvYBMY2IcwAAAABJRU5ErkJggg==)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAASElEQVR42mOI6eb8B8QPY3s4CxlgACjwHyrxJ6aLa1dkD68IQ3QPlylQYA1YsJvzLxB3gFU71DOwALVPggo+QRjTy60PFfwOANokIK7/ylvYAAAAAElFTkSuQmCC)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAABACAYAAADS+r06AAAAHUlEQVR42mOI6eb8A8IMyGBUcFRwVHBUcFSQkCAAV+X2AeQ6xf0AAAAASUVORK5CYII=)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAABACAYAAADS+r06AAAAHklEQVR42mNgQAIx3Zx/QJhhVHBUcFRwVHBUkJAgAM8x9gHMoCAcAAAAAElFTkSuQmCC)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAASklEQVR42mOI6eb8DsR/Y3q59RlgACjwBCQY28M5yaGegQUm2AFW2c35B4jXRPdwmTJE9vCKxHRx7YIK/gPi/3BjgNoLgQIPQRIAg3YgrhU7OFoAAAAASUVORK5CYII=)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAFCAYAAAD1/OoBAAAAGUlEQVR42mNgGAWjYGSDmG7OPyMZj/gAAACx7/YBqHUTqgAAAABJRU5ErkJggg==)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAATElEQVR42mNggILoHi7TmG7O/0D8DyzgUM/AAuSsAQkA8UOGmF5u/dgezklAzh8QBrILGYCMv3DcxbULrBXI+Q7ET4C4I7KHVwQkBgBVBiCuFuGQawAAAABJRU5ErkJggg==)"];

var EDIT_BLIP = ["url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAR0lEQVR42mNgAILIHl6RmG7ODiB+AsTfQWIMMV1cu4Ccs9FdXM2x3Vy+DLE9nIUggdhuzgiQAFgQKPAQqLIVJgAT/IcsAMIAj/0hJsf/K38AAAAASUVORK5CYII=)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAFCAYAAAD1/OoBAAAAHklEQVR42mOI6eb8M5IxQ2w3l+9IxqMBMOIDYKQDAH8BalC+sTWiAAAAAElFTkSuQmCC)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAARElEQVR42mOI6eb8B8QPY3s4CxlgILabyzemi6sVKHEWSO+K7OEVAQtCMGcEWKKbswNJkMs3uourGSj4BEUQbFQ353cAj94hJpCU1skAAAAASUVORK5CYII=)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAABACAYAAADS+r06AAAAIUlEQVR42mOI6eb8E9vN5QvDDCAwKjgqOCo4KjgqSEgQABPValCvxJGAAAAAAElFTkSuQmCC)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAABACAYAAADS+r06AAAAIklEQVR42mNgAILYbi5fGI7p5vzDMCo4KjgqOCo4KkhIEABjXWpQJfgjGwAAAABJRU5ErkJggg==)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAQElEQVR42mOI6eb8HtvN5YuMGYCCT6K7uJrRBTuA+GxsN2cEXDCyh1ckpotrF0gCSLeCBWEgtoezECjxEIj/AQAL7SEm2YrfxwAAAABJRU5ErkJggg==)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAFCAYAAAD1/OoBAAAAHklEQVR42mNgGOkgtpvLdyTj0QAY8QEQ0835ZyRjAHYPalCKJMYyAAAAAElFTkSuQmCC)",
				"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAQklEQVR42mOI7ebyRcYx3Zz/GFAEurhagYIPkQQ5I4ACZ2N7OAvBgtFdXM0gAaDKXQwgAOR8B+InQNwR2cMrAhIDAAvOISadilbOAAAAAElFTkSuQmCC)"]

var EXTENSION = chrome.extension;
var GWEXT_MARK = 'gwextMark';
var emptyFn = function(){};
var pasteVerified = undefined;
var windowInit = undefined;
var frameCounter = 0;

function trackAction(action){
	chrome.extension.sendRequest({greeting: 'googleAnalytics', title: document.title, action: action}, function(){});
}

function compareKeyEvents(a, b){
	if(typeof(a.metaKey) !== undefined && typeof(b.metaKey) !== undefined)
		return a.ctrlKey == b.ctrlKey && a.shiftKey == b.shiftKey && a.altKey == b.altKey
        && a.keyCode == b.keyCode && a.metaKey == b.metaKey;
	else
		return a.ctrlKey == b.ctrlKey && a.shiftKey == b.shiftKey && a.altKey == b.altKey && a.keyCode == b.keyCode;
}

function compareMouseEvents(a, b){
	if(typeof(a.metaKey) !== undefined && typeof(b.metaKey) !== undefined)
		return a.ctrlKey == b.ctrlKey && a.shiftKey == b.shiftKey && a.altKey == b.altKey
        && a.button == b.button && a.metaKey == b.metaKey;
	else
		return a.ctrlKey == b.ctrlKey && a.shiftKey == b.shiftKey && a.altKey == b.altKey && a.button == b.button;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    switch(request.greeting){
    case 'collapse':
        collapse(true);
        sendResponse({});
        break;
    case 'expand':
        collapse(false);
        sendResponse({});
        break;
    case 'pasteLink':
    	pasteLink();
    	sendResponse({});
    	break;
	case 'hideAllInlineReplies':
		sendResponse({});
		dispatchMoreActionsItem(function(){}, this, 'Hide all inline replies');
		break;
	case 'showAllInlineReplies':
		sendResponse({});
		dispatchMoreActionsItem(function(){}, this, 'Show all inline replies');
		break;
	case 'deleteMessage':
		sendResponse({});
		dispatchMoreActionsItem(function(){}, this, 'Delete message');
		break;
	case 'minimize':
		sendResponse({});
    	minimize();
    	break;
    case 'getLinkToMessage':
    	getLinkToMessage(sendResponse, this);
    	break;
    case 'hideHelpPanel':
		hideHelpPanel();
    	break;
	case 'showHelpPanel':
		showHelpPanel();
		break;
    }
});

function pasteLink(){
	chrome.extension.sendRequest({greeting: 'getLink'}, function(txt){
		if(!txt || !txt.txt || !txt.txt.length || !txt.loc || !txt.loc.length){
			chrome.extension.sendRequest({greeting: 'showNotification', 
				owner: 'Paste Link', txt: 'Extension buffer is empty'}, function(){});
			return;
		}
		var linkTitle = /^Link$/;
		var spans = document.getElementsByTagName('span');
		for(var i = 0, span; span = spans[i]; i++){
			if(!linkTitle.test(span.title))continue;
			else{
				span.dispatchEvent(getMouseClickEvent(span, 0, false, false, false, false));
				var inputs = document.getElementsByTagName('input');
    			inputs[inputs.length-1].value = txt.loc;
    			inputs[inputs.length-2].value = txt.txt;
    			var rootDiv = getParentDiv(inputs[inputs.length-1]);
    			var divs = rootDiv.getElementsByTagName('div');
    			for(var j = 0, div; div = divs[j]; j++){
    				if(div.textContent == 'Insert link'){
    					div.dispatchEvent(getMouseClickEvent(div, 0, false, false, false, false));
    					return;
    				}
    			}
			}
		}
    });
    trackAction('PasteLink');
}

function getMouseClickEvent(element, button, ctrl, alt, shift, meta){
	var event = document.createEvent('MouseEvent');
    event.initMouseEvent('click',	// eventName
    					true,		//bubbles
    					true,		//cancelable
    					window,		//view
    					1,			//detail
    					0,			//screenX
    					0,			//screenY
    					0,			//clientX
    					0,			//clientY
    					ctrl,		//ctrlKey
    					alt,		//altKey
    					shift,		//shiftKey
    					meta,		//metaKey
    					button,		//button
    					element
    					);
    return event;
}

function getMouseUpEvent(element, button, ctrl, alt, shift, meta){
	var event = document.createEvent('MouseEvent');
    event.initMouseEvent('mouseup',	// eventName
    					true,		//bubbles
    					true,		//cancelable
    					window,		//view
    					0,			//detail
    					0,			//screenX
    					0,			//screenY
    					0,			//clientX
    					0,			//clientY
    					ctrl,		//ctrlKey
    					alt,		//altKey
    					shift,		//shiftKey
    					meta,		//metaKey
    					button,		//button
    					element
    					);
    return event;
}

function getContextMenuEvent(element, button, detail, ctrl, alt, shift, meta){
	var event = document.createEvent('MouseEvent');
    event.initMouseEvent('contextmenu',	// eventName
    					true,		//bubbles
    					true,		//cancelable
    					window,		//view
    					detail,		//detail
    					0,			//screenX
    					0,			//screenY
    					0,			//clientX
    					0,			//clientY
    					ctrl,		//ctrlKey
    					alt,		//altKey
    					shift,		//shiftKey
    					meta,		//metaKey
    					button,		//button
    					element
    					);
    return event;
}

function getKeyDownEvent(keyCode, ctrl, alt, shift, meta){
	var event = document.createEvent('KeyboardEvent');
    event.initKeyboardEvent('keydown',	//eventName
    					true,		//bubbles
    					true,		//cancelable
    					window,		//view
    					ctrl,		//ctrlKey
    					alt,		//altKey
    					shift,		//shiftKey
    					meta,		//metaKey
    					keyCode,	//keyCode
    					0			//charCode
    					);
    return event;
}

function getBlurEvent(){
	var event = document.createEvent('Event');
    event.initEvent('blur',	//eventName
    				true,	//bubbles
    				true	//cancelable
    				);
    return event;
}

function addParticipant(participantName){
	var elements = document.getElementsByTagName('div');
	for(var element, i = 0; element = elements[i]; i++){
		if(element.title == 'Add user or group to wave'){
			element.dispatchEvent(getMouseClickEvent(element, 0, false, false, false, false));
		}
	}
	var closeEl = getCloseAddParticipantWindowElement();
	var rootEl = getRootDiv(closeEl);
	var input = rootEl.getElementsByTagName('input')[0];
	input.focus();
	input.value = participantName;
	/*for(var i = 0; i < participantName.length; i++){
		//input.dispatchEvent(getKeyDownEvent(50, false, false, false, false));
		input.dispatchEvent(getKeyDownEvent(participantName.charCodeAt(i), false, false, false, false));
	}*/
	input.dispatchEvent(getKeyDownEvent(39, false, false, false, false));	
	//addParticipantAction(rootEl, closeEl, 0);
	
	/*elements = rootEl.getElementsByTagName('div');
	for(var i = 0, element; element = elements[i]; i++){
		if(element.title == 'Click here to search (or press Enter)'){
			element.dispatchEvent(getMouseClickEvent(element, 0, false, false, false, false));
			break;
		}
	}*/
	//addParticipantByName(rootEl,'Robot');
	trackAction('AddParticipant');
}

function addParticipantAction(rootEl, closeEl, attempt){
	if(attempt == 10) return;
	var childEls = rootEl.getElementsByClassName('A-');
	/*for(var i = 0; i < childEls.length; i++){
		console.log(childEls[i].parentNode.parentNode);
		childEls[i] = childEls[i].parentNode.parentNode;
		console.log(childEls[i]);
	}
	/*if(childEls.length != 1 && childEls[1].parentNode.parentNode.style.display != 'none'){
		return setTimeout(addParticipant, 10, rootEl, attempt+1);
	}*/
	var childCount = 0;
	for(var i = 0; i < childEls.length; i++){
		if(childEls[i].parentNode.parentNode.style && childEls[i].parentNode.parentNode.style.display){
			childCount++;
		}
	}
	if(childEls.length - childCount == 2){
		var toDispatch = childEls[0].parentNode.parentNode;
		toDispatch.dispatchEvent(getMouseClickEvent(toDispatch));
		closeEl.dispatchEvent(getMouseClickEvent(closeEl));
	}
	else{
		setTimeout(addParticipantAction, 200, rootEl, closeEl, attempt+1);
	}
}

function getParentDiv(element){
	while(true){
		if(element.tagName == 'DIV'){
			return element;
		}
		else{
			element = element.parentNode;
		}
	}
}

function getRootDiv(element){
	while(true){
		if(element.parentNode.tagName == 'DIV'){
			element = element.parentNode;
		}
		else{
			return element;
		}
	}
}

function getCloseAddParticipantWindowElement(){
	var elements = document.getElementsByClassName('button');
	for(var i = 0, element; element = elements[i]; i++){
		if(element.title == 'Close contacts'){
			return element;
		}
	}
}

function format(string, size){
	var str = "";
	string = string.toString();
	for(var i = string.length; i < size; i++){
		str += '0';
	}
	return str+string;
}

function makeSearch(string){
	var d = new Date();
	var date = format(d.getDate(), 2);
	var month = format(d.getMonth()+1, 2);
	string = string.replace(/\[\[TODAY\]\]/gi, date + '.' + month);
	var divs = document.getElementsByTagName('DIV');
	for(var i = 0, button; button = divs[i]; i++){
		if(button.title && button.title == "Click here to search (or press Enter)"){
			var tr = button.parentNode.parentNode;
			var input = tr.cells[1].children[0];
			input.focus();
			input.value = string;
			button.dispatchEvent(getMouseClickEvent(button, 0, false, false, false, false));
		}
	}
	trackAction('MakeSearch ' + string);
}

function notify(){
	// Or create an HTML notification:
	var notification = webkitNotifications.createHTMLNotification(
		'notification.html'  // html url - can be relative
	);
	
	// Then show the notification.
	notification.show();
}

function keyHandler(e) {
    chrome.extension.sendRequest({greeting: 'getOptions'}, function(shortcut){
        if(compareKeyEvents(shortcut.collapse, e)){
            collapse(true);
            return;
        }
        if(compareKeyEvents(shortcut.expand, e)){
            collapse(false);
            return;
        }
        var callback = function(){}
        if(shortcut.showAllInlineReplies && compareKeyEvents(shortcut.showAllInlineReplies, e)){
            dispatchMoreActionsItem(callback, this, 'Show all inline replies');
            return;
        }
        if(shortcut.hideAllInlineReplies && compareKeyEvents(shortcut.hideAllInlineReplies, e)){
            dispatchMoreActionsItem(callback, this, 'Hide all inline replies');
            return;
        }
        if(shortcut.deleteMessage && compareKeyEvents(shortcut.deleteMessage, e)){
            dispatchMoreActionsItem(callback, this, 'Delete message');
            return;
        }
        if(shortcut.pasteLink && compareKeyEvents(shortcut.pasteLink, e)){
        	pasteLink();
        	e.preventDefault();
        	pasteVerified = true;
        	return;
        }
        if(shortcut.participants){
        	var parts = shortcut.participants;
	        for(var i = 0, part; part = parts[i]; i++){
	        	if(compareKeyEvents(e, part.shortcut)){
	        		console.log(part);
	        		var callback = function(link, part){
	        			if(!link)return;
		        		chrome.extension.sendRequest({greeting: 'addParticipant', 
		        				link: link, participantId: part.name}, function(){});
		        		//addParticipant(part.name);
		        		return;
	        		}
	        		getLinkToMessage(callback, this, part);
	        		return;
	        	}
	        }
        }
        if(shortcut.search){
        	var search = shortcut.search;
        	for(var i = 0, sstr; sstr = search[i]; i++){
        		if(compareKeyEvents(e, sstr.shortcut)){
        			makeSearch(sstr.name);
        			return;
        		}
        	}
        }
        if(shortcut.insertInlineBlip && compareKeyEvents(e, shortcut.insertInlineBlip)){
        	dispatchContextMenuItem('Insert comment');
        	e.preventDefault();
        	return;
        }
        if(shortcut.minimize && compareKeyEvents(e, shortcut.minimize)){
        	minimize();
        	e.preventDefault();
        	return;
        }
        if(shortcut.closeWave && compareKeyEvents(e, shortcut.closeWave)){
        	closeWave();
        	e.preventDefault();
        	return;
        }
        EXTENSION.sendRequest({greeting: 'getCopyOptions'}, function(shortcut){
        	if(shortcut.copyBlip && shortcut.copyBlip.button === undefined && compareKeyEvents(e, shortcut.copyBlip)){
        		var linkCallback = function(link){
					if(link)
						EXTENSION.sendRequest({greeting: 'addLink', link: link}, function(){});
				}
				getLinkToMessage(linkCallback, this);
        		return;
        	}
        	if(shortcut.pasteBlip && shortcut.pasteBlip.button === undefined && compareKeyEvents(e, shortcut.pasteBlip)){
        		var linkCallback = function(link){
					if(link)
						EXTENSION.sendRequest({greeting: 'copyBlips', link: link}, function(){});
				}
				getLinkToMessage(linkCallback, this);
        		return;
        	}
        	if(shortcut.emptyBuffer && shortcut.emptyBuffer.button === undefined && compareKeyEvents(e, shortcut.emptyBuffer)){
				EXTENSION.sendRequest({greeting: 'clearBlips'}, function(){});
				return;
        	}
        })
    });
}

function closeWave(){
	var callback = function(currentDiv){
		if(!currentDiv) return;
		while(!currentDiv.className || currentDiv.className != 'conv-panel'){
			currentDiv = currentDiv.parentElement;
		}
		currentDiv = currentDiv.parentElement.parentElement.parentElement;
		var els = document.getElementsByClassName('gwt-Label');
		for(var i in els){
			var el = els[i];
			if(el.title != 'Close wave'){
				continue;
			}
			console.log(els[i]);
			while(el.tagName != 'BODY'){
				if(el == currentDiv){
					els[i].dispatchEvent(getMouseClickEvent(els[i], 0, false, false, false, false));
					return;
				}
				el = el.parentElement;
			}
		}
	}
	getActiveBlip(callback, this);
}

function dispatchMoreActionsItem(callback, _this, item){
	var buttonCallback = function(button){
		if(button){
			button.dispatchEvent(getMouseClickEvent(button, 0, false, false, false, false));
		}
		else{
			console.warn('More Actions button not found');
			return;
		}
		var divs = document.getElementsByTagName('DIV');
		for(var i = divs.length-1; i >= 0; i--){
			try{
				if(divs[i].innerText == item){
					divs[i].dispatchEvent(getMouseClickEvent(divs[i], 0, false, false, false, false));
					callback.call(_this);
					break;
				}
			}
			catch(e){
				console.warn(e)
			}
		}
		trackAction(item);
	}
	getMoreActionsButton(buttonCallback, this);
}

function getMoreActionsButton(callback, _this){
	var getActiveBlipCallback = function(activeDiv){
		if(!activeDiv)return false;
		var divs = activeDiv.getElementsByClassName('button');
		for(var i = 0, div; div = divs[i]; i++){
			if(div.title == "More actions"){
				callback.call(_this, div);
				return;
			}
		}
		callback.call(_this, false);
	}
	getActiveBlip(getActiveBlipCallback, this);
}

function getActiveBlip(callback, _this){
	var divs = document.getElementsByTagName('DIV');
	EXTENSION.sendRequest({greeting: 'getEditMode'}, function(response){
		var editMode = true;
    	if(!response.checked || response.checked === 'false'){
    		editMode = false;
    	}
    	for(var i = 0, div; div = divs[i]; i++){
			var image = document.defaultView.getComputedStyle(div,null).getPropertyValue('background-image');
			if(image == "none")continue;
			for(var j = 0, img, img1; img = ACTIVE_BLIP[j], img1 = EDIT_BLIP[j]; j++){
				if(image == img || (editMode && image == img1)){
					callback.call(_this, div.parentNode.parentNode.parentNode.parentNode);
					return;
				}
			}
		}
		callback.call(_this, false);
    });
}

function getContextMenu(){
	var callback = function(activeBlip){
		if(!activeBlip) return;
		activeBlip = activeBlip.childNodes[0];
		if(!activeBlip) return;
		activeBlip.dispatchEvent(getContextMenuEvent(activeBlip, 0, 0, false, false, false, false));
	}
	getActiveBlip(callback, this);
}

var contextMenu = '';
var catchContext = false;

function dispatchContextMenuItem(menu, count){
	catchContext = true;
	contextMenu = menu;
	getContextMenu();
	var divs = document.getElementsByTagName('DIV');
	for(var i = divs.length-1; i >= divs.length-5; i--){
		if(divs[i].innerHTML == 'Delete'){
			divs[i].dispatchEvent(getMouseUpEvent(divs[i], 0, false, false, false, false));
			return;
		}
	}
	console.log('failed');
}

function getLinkToMessage(callback, _this, part){
	var moreActionsCallback = function(){
		var body = document.getElementsByTagName('BODY')[0];
		var divPanel = body.childNodes[body.childNodes.length-2];
		if(divPanel.tagName != 'DIV') return;
		var link = divPanel.childNodes[1].childNodes[2].childNodes[5].innerText;
		var button = divPanel.childNodes[1].childNodes[0];
		button.dispatchEvent(getMouseClickEvent(button, 0, false, false, false, false));
		callback.call(_this, link, part);
	}
	dispatchMoreActionsItem(moreActionsCallback, _this, 'Link to message...');
}

function removeGwextWindow(){
	var frame = document.getElementById('gwextIfr' + frameCounter++);
	if(frame) frame.parentNode.removeChild(frame);
	var wnd = document.getElementById('gwextWnd');
	if(wnd) wnd.parentNode.removeChild(wnd);
}

function onAnchorClick(e){
	var target = e.target;
	var wnd = document.getElementById('gwextWnd');
	if(wnd){
		var eventTarget = target;
		while(eventTarget){
			if(eventTarget == wnd){
				break;
			}
			eventTarget = eventTarget.parentNode;
		}
		if(!eventTarget){
			removeGwextWindow();
		}
	}
	if(!(target instanceof HTMLAnchorElement)) return;
	var href = target.getAttribute('href').replace('http://www.google.com/url?sa=D&q=', '');
	if(href != target.getAttribute('href')){
		href = decodeURIComponent(href);
	}
	var testHref = href.substring(href.indexOf('?')+1);
	var hasMark = false;
	var params = testHref.split('&')
	for(var i in params){
		var param = params[i].split('=')
		if(param[0] == GWEXT_MARK){
			hasMark = true;
			break;
		}
	}
	if(!hasMark) return;
//	href += '&gwextRand=' + Math.random().toString().replace('.', '');
	if(e.altKey || e.button || e.ctrlKey || e.metaKey || e.shiftKey) return;
	var gwextWnd = document.createElement('div');
	gwextWnd.setAttribute('id', 'gwextWnd');
	var gwextWndHeader = document.createElement('div');
	gwextWndHeader.setAttribute('id', 'gwextWndHeader');
	var rightBkgPic = document.createElement('div');
	rightBkgPic.setAttribute('id', 'rightBkgPic');
	var leftBkgPic = document.createElement('div');
	leftBkgPic.setAttribute('id', 'leftBkgPic');
	
	var gwextWndTitle = document.createElement('div');
	gwextWndTitle.setAttribute('id', 'gwextWndTitle');
	gwextWndHeader.appendChild(rightBkgPic);
	rightBkgPic.appendChild(leftBkgPic);
	
	leftBkgPic.appendChild(gwextWndTitle);
	var buttonPanel = document.createElement('div');
	buttonPanel.setAttribute('style', 'font-size: 13px;height: 15px;left: auto;margin: 4px;position: absolute;right: 0px;top: 0;visibility: visible;');
	var closeButton = document.createElement('div')
	closeButton.setAttribute('id', 'gwextWndClose');
	closeButton.setAttribute('title', 'Close window');
	closeButton.onclick = removeGwextWindow;
	buttonPanel.appendChild(closeButton);
	gwextWndHeader.appendChild(buttonPanel);
	gwextWnd.appendChild(gwextWndHeader);
	var spaceLine = document.createElement('div');
	spaceLine.setAttribute('style', 'background-color: white; height: 1px;');
	gwextWnd.appendChild(spaceLine);
//	setTimeout(function(){document.getElementById('gwextWndClose').onclick = removeGwextWindow;}, 0)
	var gwextIfrDiv = document.createElement('div');
	gwextIfrDiv.setAttribute('id', 'gwextIfrDiv');
	gwextIfrDiv.setAttribute('style', 'height: 150px; border: 0px; border-top: 1px solid #999999;');
	var iframe = document.createElement('iframe');
	iframe.setAttribute('id', 'gwextIfr' + frameCounter);
	iframe.setAttribute('src', href);
	iframe.setAttribute('style', 'border: 0px; height: 150px; width: 320px; -webkit-border-bottom-left-radius: 5px; -webkit-border-bottom-right-radius: 5px;');
//	setTimeout(function(){window.open(href, 'gwextIfr');}, 0);
//	setTimeout(function(){gwextIfrDiv.appendChild(iframe);}, 0);
	gwextIfrDiv.appendChild(iframe);
	gwextWnd.appendChild(gwextIfrDiv);
//'<div style="background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#61A7F2), to(#5590D2)); border-left-color: #86B7ED;border-left-style: solid;border-left-width: 1px;border-top-left-radius: 5px;border-top-right-radius: 5px;color: black;height: 24px;">' +
	gwextWnd.style.left = (e.clientX + document.body.scrollLeft - document.body.clientLeft) + 'px';
	gwextWnd.style.top = (e.clientY + document.body.scrollTop - document.body.clientTop) + 'px';
	var dragHandler = function(e){
		console.log(e)
		gwextWnd.style.left=(e.clientX - e.target.mouseOffsetX) +"px";
		gwextWnd.style.top=(e.clientY - e.target.mouseOffsetY)+"px";
	}
//	gwextWnd.addEventListener('drag', dragHandler, true);
	gwextWnd.addEventListener('dragstart', function(e){
		console.error(e);
		e.target.mouseOffsetX = e.clientX - parseInt(e.target.style.left);
		e.target.mouseOffsetY = e.clientY - parseInt(e.target.style.top);
		console.warn(e.dataTransfer);
		e.dataTransfer.effectAllowed = 'move';
		return false;
	}, false);
	gwextWnd.addEventListener('dragend', function(e){
		e.target.style.left = (e.clientX - e.target.mouseOffsetX) + 'px';
		e.target.style.top = (e.clientY - e.target.mouseOffsetY) + 'px';
		e.preventDefault();
		e.stopPropagation();
		return false;
	}, true);
//	gwextWnd.addEventListener('dragover', function(e){
//		e.preventDefault();
//		console.warn(e.dataTransfer);
//		e.dataTransfer.dropEffect = 'move';
//		return false;
//	}, false);
//	document.ondragover = function(e){
//		console.warn(e);
//		e.dataTransfer.effectAllowed = 'move';
//		e.dataTransfer.dropEffect = 'move';
//	}
//	gwextWnd.draggable = true;
	document.body.appendChild(gwextWnd);
	e.preventDefault();
	e.stopPropagation();
	setTimeout(adjustWnd, 1);
}

function adjustWnd(){
	var gwextWnd = document.getElementById('gwextWnd');
	gwextWnd.style.left = Math.max(0, Math.min(gwextWnd.offsetLeft, window.innerWidth+window.pageXOffset-gwextWnd.clientWidth-20)) + 'px';
	gwextWnd.style.top = Math.max(0, Math.min(gwextWnd.offsetTop, window.innerHeight+window.pageYOffset-gwextWnd.clientHeight-20)) + 'px';
}

function onMessage(e){
	if(!e.data) return;
//	console.log(e.data)
	try{
		var objs = JSON.parse(e.data);
	}
	catch(e){
		return;
	}
	var gwextWnd = document.getElementById('gwextWnd');
//	if(!gwextWnd) return;
	for(var i in objs){
		var obj = objs[i];
		if(!obj.action) continue;
		try{
			switch(obj.action){
			case 'closeGwextWnd':
				console.log('closing window');
				removeGwextWindow();
				break;
			case 'setGwextFrameHeight':
				if(!obj.height) continue;
				document.getElementById('gwextIfr' + frameCounter).style.height = obj.height;
				document.getElementById('gwextIfrDiv').style.height = obj.height;
				adjustWnd();
				break;
			case 'setGwextFrameWidth':
				if(!obj.width) continue;
				document.getElementById('gwextIfr' + frameCounter).style.width = obj.width;
				document.getElementById('gwextIfrDiv').style.width = obj.width;
				adjustWnd();
				break;
			case 'setGwextWndTitle':
				if(!obj.title) continue;
				document.getElementById('gwextWndTitle').innerText = obj.title;
				break;
			case 'setGwextWndTitleStyle':
				if(!obj.style) continue;
				document.getElementById('gwextWndTitle').setAttribute('style', obj.style);
				break;
			case 'openGwextPopupWindow':
				if(!obj.url) continue;
				if(!obj.title) obj.title = '';
				if(!obj.features) obj.features = 'height=400,width=600';
				var wnd = window.open(obj.url, obj.title, obj.features);
				break;
			case 'setGwextFocusOnBlip':
				if(!obj.link) continue;
				focusOnBlip(obj.link);
				break;
			}
		}
		catch(e){}
	}
}

window.addEventListener('keyup', keyHandler, true);
window.addEventListener('click', onAnchorClick, true);
window.addEventListener('message', onMessage, false);
