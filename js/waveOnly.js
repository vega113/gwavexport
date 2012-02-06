var titleInterval = window.setInterval(changeTitle, 2500);
var helpPanelInterval = null;
var helpPanelOptions = [{
		message: chrome.i18n.getMessage('hideShowBlips'),
		actions: ['collapse', 'expand']
	},{
		message: chrome.i18n.getMessage('hideShowInlineBlips'),
		actions: ['hideAllInlineReplies', 'showAllInlineReplies']
	},{
		message: chrome.i18n.getMessage('nextUnreadMessage'),
		actions: [chrome.i18n.getMessage('space')]
	},{
		message: chrome.i18n.getMessage('editBlip'),
		actions: ['Ctrl+E']
	},{
		message: chrome.i18n.getMessage('deleteBlip'),
		actions: ['deleteMessage']
	},{
		message: chrome.i18n.getMessage('copyPasteBlips'),
		actions: ['copyBlip', 'pasteBlip']
	},{
		message: chrome.i18n.getMessage('emptyBuffer'),
		actions: ['emptyBuffer']
	},{
		message: chrome.i18n.getMessage('copyPasteLink'),
		actions: ['copyLink', 'pasteLink']
	},{
		message: chrome.i18n.getMessage('minimize'),
		actions: ['minimize']
	},{
		message: chrome.i18n.getMessage('closeWave'),
		actions: ['closeWave']
	}
];

function changeTitle(){
	try{
		var els = document.querySelectorAll('div[title="Close wave"]');
		for(var i = 0, el; el = els[i]; i++){
			if(el.style['display']) continue;
			document.title = el.parentNode.parentNode.children[0].innerText + ' - Google Wave';
			return;
		}
		document.title = 'Google Wave';
	}
	catch(e){
		document.title = 'Google Wave';
	}
}

function getKeyCodeString(keyId, keyCode){
    var unicodeReg = /^U\+[0-9A-F]*$/;
    if(unicodeReg.test(keyId)){
    	if(keyId == 'U+007F'){
    		return 'Del';
    	}
    	else{
        	return String.fromCharCode(keyCode);
    	}
    }
    else{
        return keyId;
    }
}

function getShortcutString(shortcut){
    var str = '';
    if(shortcut.altKey) str += 'Alt ';
    if(shortcut.ctrlKey) str += 'Ctrl ';
    if(shortcut.shiftKey) str += 'Shift ';
    if(shortcut.metaKey) str += 'Meta ';
    if(shortcut.button !== undefined){
    	var click = '';
    	switch(shortcut.button){
		case 0:
			click = 'L_Click';
			break;
		case 1:
			click = 'M_Click';
			break;
		case 2:
			click = 'R_Click';
			break;
    	}
    	str += click;
    }
    else{
    	str += getKeyCodeString(shortcut.keyIdentifier, shortcut.keyCode);
    }
    return str.trim().replace(/ /g, '+');
}

function showHelpPanel(){
//	document.body.children[0].style['margin-bottom'] = '30px';
	if(document.getElementById('gwextHelpPanelContainer')) hideHelpPanel();
	var container = document.createElement('div');
	container.setAttribute('id', 'gwextHelpPanelContainer');
	try{
		document.body.children[0].children[0].children[0].children[0].children[0].appendChild(container);
	}
	catch(e){
		return;
	}
	var panel = document.createElement('div');
	panel.setAttribute('id', 'gwextHelpPanel');
	panel.style['background-image'] = 'url(' + chrome.extension.getURL('img/helpPanelBg.png') + ')';
	var closeButton = document.createElement('div');
	closeButton.setAttribute('id', 'helpPanelCloseButton');
	closeButton.style['background-image'] = 'url(' + chrome.extension.getURL('img/helpPanelCloseButton.png') + ')';
	closeButton.onclick = function(){
		chrome.extension.sendRequest({greeting: 'setStoredValue', key: 'hideHelpPanel', value: true});
		hideHelpPanel()
	};
	var div = document.createElement('div');
	div.setAttribute('id', 'helpContainer');
	var animatedContainer = document.createElement('div');
	animatedContainer.setAttribute('id', 'animatedContainer');
	div.appendChild(animatedContainer);
	panel.appendChild(div);
	panel.appendChild(closeButton);
	container.appendChild(panel);
	renderShortcutsHelp();
}

function hideHelpPanel(){
	var div = document.getElementById('gwextHelpPanelContainer');
	if(div) div.parentNode.removeChild(div);
//	document.body.children[0].style['margin-bottom'] = '0';
	if(helpPanelInterval) helpPanelInterval = window.clearInterval(helpPanelInterval);
}

function renderShortcutsHelp(){
	var panel = document.getElementById('animatedContainer');
	if(!panel) return;
	if(helpPanelInterval) window.clearInterval(helpPanelInterval);
	chrome.extension.sendRequest({greeting: 'getAllOptions'}, function(shortcuts){
		for(var i = 0, option; option = helpPanelOptions[i]; i++){
			var el = document.createElement('span');
			var message = document.createElement('span');
			message.innerText = option.message;
			var shortcut = document.createElement('span');
			var shortCutArray = [];
			for(var j = 0, action; action = option.actions[j]; j++){
				var action1 = (shortcuts[0]) ? shortcuts[0][action] : null;
				var action2 = (shortcuts[1]) ? shortcuts[1][action] : null;
				var shortcutObject = action1 || action2;
				if(!shortcutObject){
					shortCutArray.push(action);
					continue;
				}
				shortCutArray.push(getShortcutString(shortcutObject));
			}
			shortcut.innerText = shortCutArray.join('\\');
			shortcut.setAttribute('class', 'bold');
			el.style['background'] = 'url(' + chrome.extension.getURL('img/delimeter.png') + ') top right no-repeat';
			el.appendChild(shortcut);
			el.appendChild(document.createTextNode(' \u2014 '))
			el.appendChild(message);
			panel.appendChild(el);
		}
		helpPanelInterval = window.setInterval(moveHelpPanel, 10000);
	});
}

function moveHelpPanel(){
	var panel = document.getElementById('animatedContainer');
	var containerWidth = panel.offsetWidth;//document.getElementById('helpContainer').offsetWidth;
	var childCount = 1;
	for(var child, offset = panel.children[0].offsetWidth; (child = panel.children[childCount]) && (offset < containerWidth); childCount++){
		offset += child.offsetWidth;
	}
	childCount = Math.max(1, childCount-1);
//	var child = panel.children[0].cloneNode(true);
//	panel.appendChild(child);
//	panel.style['margin-left'] = '-' + child.offsetWidth + 'px';
	panel.style['opacity'] = '0';
	var transitionDuration = 1000;
	setTimeout(function(){
		panel.style['-webkit-transition-duration'] = '0';
//		panel.style['margin-left'] = '0';
//		panel.removeChild(panel.children[0]);
		for(var i = 0; i < childCount; i++){
			panel.appendChild(panel.children[0]);
		}
		setTimeout(function(){
			panel.style['-webkit-transition-duration'] = /*(panel.children[0].offsetWidth*2) + '750ms'*/transitionDuration + 'ms';
			panel.style['opacity'] = '1';
		}, 50);
	}, transitionDuration);
}

function onLoad(){
	chrome.extension.sendRequest({greeting: 'getStoredValue', key: 'hideHelpPanel'}, function(value){
		value = JSON.parse(value);
		if(!value){
			showHelpPanel();
		}
	});
}

function minimize(){
	var minimized = false;
	var divs = document.querySelectorAll('div[title="Restore"]');
	if(divs.length == 3){
		var i = 0;
		for(var div; div = divs[i]; i++){
			if(div.style['display']) break;
		}
		if(i == 3){
			minimized = true;
		}
	}
	if(!minimized){
		divs = document.querySelectorAll('div[title="Minimize"]');
	}
	for(var i = 0, div; div = divs[i]; i++){
		div.dispatchEvent(getMouseClickEvent(div, 0, false, false, false, false));
	}
}

function collapse(flag){
	var title = '';
	if(flag) title = 'Hide replies';
	else title = 'Show replies';
	var elements = document.querySelectorAll('div[title="' + title + '"]');
	var length = elements.length;
	if(flag){
		for(var i = length - 1; i >= 0; i--){
			try{
				elements[i].dispatchEvent(getMouseClickEvent(elements[i], 0, false, false, false, false));
			}
			catch(e){
				console.error(e);
			}
		}
	}
	else{
		for(var i = 0; i < length; i++){
			try{
				elements[i].dispatchEvent(getMouseClickEvent(elements[i], 0, false, false, false, false));
			}
			catch(e){
				console.error(e);
			}
		}
	}
    var action = flag ? 'Collapse' : 'Expand';
    trackAction(action);
}

function focusHack(link){
	var newLink = 'http://www.google.com/url?sa=D&q=' + encodeURIComponent(link);
	var element = document.querySelector('a[href="' + newLink + '"]');
	if(element){
		console.log('focused')
		element.scrollIntoView();
		element.parentNode.dispatchEvent(getMouseClickEvent(element.parentNode, 0, false, false, false, false));
		return true;
	}
	return false;
}

function focusOnBlip(links){
	var link = links.split(',');
	for(var i in link){
		if(focusHack(link[i])){
			setTimeout(function(){focusHack(link[i]);}, 1000);
			return;
		}
		/*var newLink = 'http://www.google.com/url?sa=D&q=' + encodeURIComponent(link[i]);
		var element = document.querySelector('a[href="' + newLink + '"]');
		if(element){
			console.log('focused')
			element.scrollIntoView();
			element.parentNode.dispatchEvent(getMouseClickEvent(element.parentNode, 0, false, false, false, false));
			return;
		}*/
	}
	setTimeout(function(){focusOnBlip(links);}, 1000);
}

function mouseHandler(e){
	EXTENSION.sendRequest({greeting: 'getCopyOptions'}, function(shortcut){
    	if(shortcut.copyBlip && shortcut.copyBlip.button !== undefined && compareMouseEvents(e, shortcut.copyBlip)){
    		var linkCallback = function(link){
				if(link)
					EXTENSION.sendRequest({greeting: 'addLink', link: link}, function(){});
			}
			getLinkToMessage(linkCallback, this);
    		return;
    	}
    	if(shortcut.pasteBlip && shortcut.pasteBlip.button !== undefined && compareMouseEvents(e, shortcut.pasteBlip)){
    		var linkCallback = function(link){
				if(link)
					EXTENSION.sendRequest({greeting: 'copyBlips', link: link}, function(){});
			}
			getLinkToMessage(linkCallback, this);
    		return;
    	}
    	if(shortcut.emptyBuffer && shortcut.emptyBuffer.button !== undefined && compareMouseEvents(e, shortcut.emptyBuffer)){
			EXTENSION.sendRequest({greeting: 'clearBlips'}, function(){});
			return;
    	}
    })
}

window.addEventListener('click', mouseHandler, true);
