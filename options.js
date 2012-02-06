document.onkeydown = null;
var hasStorage = localStorage != null;
var participantCount = 0, searchCount = 0;
var shortcutIds = ['collapse', 'expand', 'copyLink', 'pasteLink', 'showAllInlineReplies',
		'hideAllInlineReplies', 'deleteMessage', 'minimize', 'closeWave'];
var copyShortcutIds = {'copyBlip':1, 'pasteBlip':1,	'emptyBuffer':1}
var EXTENSION = chrome.extension;

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
    if(shortcut.altKey){
        str += 'Alt ';
    }
    if(shortcut.ctrlKey){
        str += 'Ctrl ';
    }
    if(shortcut.shiftKey){
        str += 'Shift ';
    }
    if(shortcut.metaKey){
        str += 'Meta ';
    }
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

function restore_options(){
    if(!hasStorage){
        alert("There's no storage enabled, you can't modify options");
        return;
    }
    for(var i = 0, id; id = shortcutIds[i]; i++){
    	try{
    		document.getElementById(id + 'Button').disabled = false;
    	}
    	catch(e){}
    }
    document.getElementById('addPartButton').disabled = false;
    document.getElementById('addSearchButton').disabled = false;
    EXTENSION.sendRequest({greeting: 'getOptions'}, function(shortcuts){
    	for(var name in shortcuts){
    		try{
    			switch(name){
	    			case 'participants':
	    				for(var i = 0, part; part = shortcuts['participants'][i]; i++){
		    				var name1 = 'participant' + participantCount;
			    			addParticipantTableElements();
			    			var shortcutEl = document.getElementById(name1 + 'Shortcut');
			    			shortcutEl.value = getShortcutString(part.shortcut);
				    		shortcutEl.shortcut = part.shortcut;
				    		var nameEl = document.getElementById(name1 + 'Name');
				    		nameEl.value = part.name;
				    		nameEl.style['color'] = 'black';
		    			}
	    			break;
	    			case 'search':
	    				for(var i = 0, search; search = shortcuts['search'][i]; i++){
	    					var name1 = 'search' + searchCount;
			    			addSearchTableElements();
			    			var shortcutEl = document.getElementById(name1 + 'Shortcut');
				    		shortcutEl.value = getShortcutString(search.shortcut);
				    		shortcutEl.shortcut = search.shortcut;
				    		var nameEl = document.getElementById(name1 + 'Name');
				    		nameEl.value = search.name;
				    		nameEl.style['color'] = 'black';
	    				}
	    			break;
	    			default:
	    				var shortcutEl = document.getElementById(name + 'Shortcut');
			    		shortcutEl.value = getShortcutString(shortcuts[name]);
			    		shortcutEl.shortcut = shortcuts[name];
			    		var button = document.getElementById(name + 'Button');
			    		button.disabled = false;
			    		button.innerHTML = chrome.i18n.getMessage('changeButton');
		    		break;
	    		}
    		}
    		catch(e){}
    	}
    });
    EXTENSION.sendRequest({greeting: 'getNotifier'}, function(response){
    	document.getElementById('notifier').value = response.text; 
    });
//    var editMode = document.getElementById("enableInEditMode");
//    EXTENSION.sendRequest({greeting: 'getEditMode'}, function(response){
//    	if(!response.checked || response.checked === 'false'){
//    		response.checked = false;
//    	}
//    	else{
//    		response.checked = true;
//    	}
//    	editMode.checked = response.checked;
//    });
    restoreCopyShortcuts();
}

function restoreCopyShortcuts(){
	EXTENSION.sendRequest({greeting: 'getCopyOptions'}, function(shortcuts){
    	for(var name in shortcuts){
    		var shortcutEl = document.getElementById(name + 'Shortcut');
    		shortcutEl.value = getShortcutString(shortcuts[name]);
    		shortcutEl.shortcut = shortcuts[name];
    		document.getElementById(name + 'Button').disabled = false;
    	}
	});
}

function collectShortcut(el) {
    var res = new Object();
    res.altKey = el.altKey;
    res.shiftKey = el.shiftKey;
    res.keyCode = el.keyCode;
    res.keyIdentifier = el.keyIdentifier;
    res.ctrlKey = el.ctrlKey;
    res.metaKey = el.metaKey;
    return res;
}

function save_options() {
    var shortcut = new Object();
    for(var i = 0, sId; sId = shortcutIds[i]; i++){
    	var s = undefined;
    	try{
    		s = collectShortcut(document.getElementById(sId + 'Shortcut').shortcut);
    	}
    	catch(e){}
    	if(s){
    		shortcut[sId] = s;
    	}
    }
    var participants = [];
    var trs = document.getElementById('partTable').childNodes;
    var table = document.getElementById('partTable'); 
    for(var i = 0, tr; tr = trs[i]; i++){
    	var baseId = tr.getAttribute('id');
    	var inputName = document.getElementById(baseId + 'Name');
    	var inputShortcut = document.getElementById(baseId + 'Shortcut');
    	if(inputName.value == '' || inputShortcut.value == '') continue;
    	var participant = {
    		name: inputName.value,
    		shortcut: collectShortcut(inputShortcut.shortcut)
    	};
    	participants.push(participant);
    }
    if(participants.length){
    	shortcut['participants'] = participants;  
    }
    var searches = [];
    trs = document.getElementById('searchTable').childNodes;
    table = document.getElementById('searchTable'); 
    for(var i = 0, tr; tr = trs[i]; i++){
    	var baseId = tr.getAttribute('id');
    	var inputName = document.getElementById(baseId + 'Name');
    	var inputShortcut = document.getElementById(baseId + 'Shortcut');
    	if(inputName.value == '' || inputShortcut.value == '') continue;
    	var search = {
    		name: inputName.value,
    		shortcut: collectShortcut(inputShortcut.shortcut)
    	};
    	searches.push(search);
    }
    if(searches.length){
    	shortcut['search'] = searches;  
    }
    EXTENSION.sendRequest({greeting: 'setOptions', shortcut: shortcut}, function(){});
//    var enableInEditMode = document.getElementById("enableInEditMode");
//    EXTENSION.sendRequest({greeting: 'setEditMode', checked: enableInEditMode.checked}, function(){});
    saveCopyOptions();
    setChangeButtonsDefaultState();
    chrome.extension.sendRequest({greeting: 'getStoredValue', key: 'hideHelpPanel'}, function(value){
    	value = JSON.parse(value);
    	chrome.extension.sendRequest({greeting: 'changeHelpPanelVisibility', visible: !value}, function(){});
    });
}

function saveCopyOptions(){
	var shortcut = {};
    for(var sId in copyShortcutIds){
    	var s = undefined;
    	try{
    		s = document.getElementById(sId + 'Shortcut').shortcut;
    	}
    	catch(e){}
    	if(s){
    		shortcut[sId] = s;
    	}
    }
    EXTENSION.sendRequest({greeting: 'setCopyOptions', shortcut: shortcut}, function(){});
}

function setChangeButtonsDefaultState(){
	var buttons = document.getElementsByTagName('button');
	for(var i = 0, button; button = buttons[i]; i++){
		var id = button.getAttribute('id');
		var value = button.innerText;
		if(value == 'Ok'){
			var baseId = id.substring(0, id.length-6)
			if(baseId in copyShortcutIds){
				stopMouseKeyTraking(baseId);
			}
			else{
				stopKeyTraking(baseId);
			}
		}
	} 
}

function startKeyTraking(id){
	setChangeButtonsDefaultState();
	document.getElementById('saveButton').disabled = false;
	var button = document.getElementById(id + 'Button');
	button.innerHTML = chrome.i18n.getMessage('okButton');
	button.onclick = function(){
		stopKeyTraking(id);
	};
    var shortcut = new Object();
    document.onkeydown = function(){
    	var el = document.getElementById(id + 'Shortcut');
    	console.log(event);
        shortcut.altKey = event.altKey;
        shortcut.shiftKey = event.shiftKey;
        shortcut.keyCode = event.keyCode;
        shortcut.keyIdentifier = event.keyIdentifier;
        shortcut.ctrlKey = event.ctrlKey;
        shortcut.metaKey = event.metaKey;
        el.shortcut = shortcut;
        el.value = getShortcutString(shortcut);
    };
}

function stopKeyTraking(baseId){
	var button = document.getElementById(baseId + 'Button');
	button.innerHTML = chrome.i18n.getMessage('changeButton');
	button.onclick = function(){
		startKeyTraking(baseId);
	};
	document.onkeydown = null;
}

function startMouseKeyTraking(id){
	setChangeButtonsDefaultState();
	document.getElementById('saveButton').disabled = false;
	var button = document.getElementById(id + 'Button');
	button.innerHTML = chrome.i18n.getMessage('okButton');
	button.onclick = function(){
		stopMouseKeyTraking(id);
	};
    var shortcut = new Object();
    var input = document.getElementById(id + 'Shortcut');
    input.disabled = false;
    input.onclick = function(event){
    	console.log(event);
    	event.preventDefault();
    	var shortcut = {};
    	shortcut.altKey = event.altKey;
    	shortcut.button = event.button;
    	shortcut.ctrlKey = event.ctrlKey;
    	shortcut.metaKey = event.metaKey;
    	shortcut.shiftKey = event.shiftKey;
    	input.shortcut = shortcut;
    	input.value = getShortcutString(shortcut);
    }
    document.onkeydown = function(){
    	console.log(event);
    	event.preventDefault();
        shortcut.altKey = event.altKey;
        shortcut.shiftKey = event.shiftKey;
        shortcut.keyCode = event.keyCode;
        shortcut.keyIdentifier = event.keyIdentifier;
        shortcut.ctrlKey = event.ctrlKey;
        shortcut.metaKey = event.metaKey;
        input.shortcut = shortcut;
        console.log(input.shortcut);
        input.value = getShortcutString(shortcut);
    };
}

function stopMouseKeyTraking(baseId){
	var button = document.getElementById(baseId + 'Button');
	button.innerHTML = chrome.i18n.getMessage('changeButton');
	button.onclick = function(){
		startMouseKeyTraking(baseId);
	};
	document.onkeydown = null;
	var input = document.getElementById(baseId + 'Shortcut'); 
	input.onclick = null;
	input.disabled = true;
}

function addParticipantTableElements(){
	var baseId = 'participant' + participantCount++;
	var table = document.getElementById('partTable');
	var tr = document.createElement('tr');
	tr.setAttribute('id', baseId);
	var participantInput = createTextInput('Participant e-mail');
	participantInput.setAttribute('id', baseId + 'Name');
	participantInput.setAttribute('style', 'color: gray');
	participantInput.setAttribute('value', chrome.i18n.getMessage('participantIdInputLabel'));
	participantInput.onfocus = function(){
		if(participantInput.style['color'] != 'gray') return;
		participantInput.style['color'] = 'black';
		participantInput.setAttribute('value', '');
	}
	var participantInputTd = document.createElement('td');
	participantInputTd.appendChild(participantInput);
	var shortcutInput = createTextInput('Shortcut');
	shortcutInput.setAttribute('id', baseId + 'Shortcut');
	shortcutInput.setAttribute('disabled', 'true');
	var shortcutInputTd = document.createElement('td');
	shortcutInputTd.appendChild(shortcutInput);
	var changeButton = createButton(chrome.i18n.getMessage('changeButton'), 'Change Hotkey', false);
	changeButton.setAttribute('id', baseId + 'Button');
	changeButton.onclick = function(){
		startKeyTraking(baseId);
	};
	var removeButton = createButton(chrome.i18n.getMessage('removeButton'), 'Remove Participant', false);
	removeButton.onclick = function(){
		removeTableRow('partTable', baseId);
	};
	var buttonsTd = document.createElement('td');
	buttonsTd.appendChild(changeButton);
	buttonsTd.appendChild(removeButton);
	tr.appendChild(participantInputTd);
	tr.appendChild(shortcutInputTd);
	tr.appendChild(buttonsTd);
	table.appendChild(tr);
}

function addSearchTableElements(){
	var baseId = 'search' + searchCount++;
	var table = document.getElementById('searchTable');
	var tr = document.createElement('tr');
	tr.setAttribute('id', baseId);
	var participantInput = createTextInput('Search string');
	participantInput.setAttribute('id', baseId + 'Name');
	participantInput.setAttribute('style', 'color: gray');
	participantInput.setAttribute('value', chrome.i18n.getMessage('searchInputLabel'));
	participantInput.onfocus = function(){
		if(participantInput.style['color'] != 'gray') return;
		participantInput.style['color'] = 'black';
		participantInput.setAttribute('value', '');
	}
	var participantInputTd = document.createElement('td');
	participantInputTd.appendChild(participantInput);
	var shortcutInput = createTextInput('Shortcut');
	shortcutInput.setAttribute('id', baseId + 'Shortcut');
	shortcutInput.setAttribute('disabled', 'true');
	var shortcutInputTd = document.createElement('td');
	shortcutInputTd.appendChild(shortcutInput);
	var changeButton = createButton(chrome.i18n.getMessage('changeButton'), 'Change Hotkey', false);
	changeButton.setAttribute('id', baseId + 'Button');
	changeButton.onclick = function(){
		startKeyTraking(baseId);
	};
	var removeButton = createButton(chrome.i18n.getMessage('removeButton'), 'Remove Search string', false);
	removeButton.onclick = function(){
		removeTableRow('searchTable', baseId);
	};
	var buttonsTd = document.createElement('td');
	buttonsTd.appendChild(changeButton);
	buttonsTd.appendChild(removeButton);
	tr.appendChild(participantInputTd);
	tr.appendChild(shortcutInputTd);
	tr.appendChild(buttonsTd);
	table.appendChild(tr);
}

function removeTableRow(tableId, rowId){
	var table = document.getElementById(tableId);
	var row = document.getElementById(rowId);
	table.removeChild(row);
	document.getElementById('saveButton').disabled = false;
}

function createTextInput(title){
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	//input.setAttribute('title', title);
	return input;
}

function createButton(name, title, disabled){
	var button = document.createElement('button');
	//button.setAttribute('title', title);
	if(disabled){
		button.setAttribute('disabled', disabled);
	}
	button.appendChild(document.createTextNode(name));
	return button;
}

function restoreDefaults(){
	chrome.extension.sendRequest({greeting: 'clearLocalStorage'}, function(){});
	chrome.extension.sendRequest({greeting: 'getStoredValue', key: 'hideHelpPanel'}, function(value){
    	value = JSON.parse(value);
    	console.log(value);
    	chrome.extension.sendRequest({greeting: 'changeHelpPanelVisibility', visible: !value}, function(){});
    	location.reload();
    });
}

function saveNotifier(){
	chrome.extension.sendRequest({greeting: 'setNotifier', text: document.getElementById('notifier').value}, function(){
		chrome.extension.getBackgroundPage().syncronize();
	});
}

function hideShortcutsHelpPanel(e){
	chrome.extension.sendRequest({greeting: 'setStoredValue', key: 'hideHelpPanel', value: e.target.checked}, function(){});
	chrome.extension.sendRequest({greeting: 'changeHelpPanelVisibility', visible: !e.target.checked}, function(){});
}

window.addEventListener('load', function(){
	chrome.extension.sendRequest({greeting: 'getStoredValue', key: 'hideHelpPanel'}, function(value){
		value = JSON.parse(value);
		var helpPanelCheckbox = document.getElementById('enableHelpPanelCheckbox');
		helpPanelCheckbox.checked = value;
		helpPanelCheckbox.onchange = hideShortcutsHelpPanel;
	});
}, true)
