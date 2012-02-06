var txt, loc, copyNotification;
const ACTION = chrome.browserAction;
const EXTENSION = chrome.extension;
const URL = 'http://www-opensocial.googleusercontent.com/api/rpc';
const WAVE_URL = 'https://wave.google.com/';
var id;
var robot = new AbstractRobot();
var enableDebug = 1;
var copyObject = {};

function removeOldVersion(id){
	chrome.management.uninstall(id);
}

function findWaveTabs(callback){
	chrome.windows.getAll({populate: true}, function(ws){
		var tabs = [];
		for(var i in ws){
			for(var j = 0, tab; tab = ws[i].tabs[j]; j++){
				if(tab.url.indexOf(WAVE_URL) !== 0) continue;
				tabs.push(tab);
			}
		}
		callback(tabs);
	});
}

function injectContent(){
	/*findWaveTabs(function(tabs){
		for(var i = 0, tab; tab = tabs[i]; i++){
			chrome.tabs.insertCSS(tab.id, {file: 'css/wave.css', allFrames: true});
		}
	});*/
}

function onInstall() {
	console.log("Extension Installed");
	injectContent();
//	removeOldVersion('eghllbnfdmhbenoojecngpoodhbmimlb')
}

function onUpdate() {
	console.log("Extension Updated");
	injectContent();
}

function onReload(){
	console.log('Extension reloaded');
	injectContent();
}
  
function getVersion() {
	var version = 'NaN';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
	xhr.send(null);
	var manifest = JSON.parse(xhr.responseText);
	console.log(manifest.version)
	return manifest.version;
}

// Check if the version has changed.
var currentVersion = getVersion();
var prevVersion = localStorage['version']
if (currentVersion != prevVersion) {
	// Check if we just installed this extension.
	if (typeof prevVersion == 'undefined') {
		onInstall();
	}
	else {
		onUpdate();
	}
	localStorage['version'] = currentVersion;
}
else{
	onReload();
}

ACTION.setTitle({title: 'WaveShortcuts'});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
    switch(request.greeting){
    case 'redirect':
    	sendResponse();
    	chrome.tabs.getSelected(null, function(tab){
			chrome.tabs.sendRequest(tab.id, request.params, function(){});
    	});
    	break;
    case 'getStoredValue':
    	sendResponse(localStorage[request.key]);
    	break;
    case 'setStoredValue':
    	sendResponse();
    	localStorage[request.key] = request.value;
    	break;
    case 'changeHelpPanelVisibility':
    	sendResponse();
    	changeHelpPanelVisibility(request.visible);
    	break;
    case 'clearLocalStorage':
    	if(localStorage.waveExtensionShortcuts !== undefined){
    		delete localStorage.waveExtensionShortcuts;
    	}
    	if(localStorage['enableEditMode'] !== undefined){
    		delete localStorage['enableEditMode'];
    	}
    	if(localStorage['copyShortcuts'] !== undefined){
    		delete localStorage['copyShortcuts'];
    	}
    	sendResponse({});
    	break;
    case 'getAllOptions':
    	sendResponse([getCurrentOptions(), getCopyOptions()]);
    	break;
    case 'getOptions':
        sendResponse(getCurrentOptions());
        break;
	case 'getCopyOptions':
		sendResponse(getCopyOptions());
		break;
    case 'setOptions':
        setShortcuts(request.shortcut);
        sendResponse({});
        break;
	case 'setCopyOptions':
		setCopyShortcuts(request.shortcut);
		sendResponse({});
		break;
	case 'setEditMode':
		localStorage['enableEditMode'] = request.checked;
		sendResponse({});
		break;
	case 'getEditMode':
		sendResponse({checked: localStorage['enableEditMode']});
		break;
	case 'saveLink':
		sendResponse({});
		copyAction(request.txt, request.loc);
		break;
	case 'getLink':
		var res = {txt: txt, loc: loc};
		sendResponse(res);
		break;
	case 'googleAnalytics':
		sendResponse();
		trackAction(request.title, request.action);
		break;
	case 'showNotification':
		sendResponse();
		showNotification(request.owner, request.txt);
		break;
	case 'getNotifier':
		if(!localStorage.searchNotifier) {
            sendResponse({text: ''});
        }
        else{
        	sendResponse({text: localStorage.searchNotifier});
        }
		break;
    case 'setNotifier':
		sendResponse({});
		localStorage.searchNotifier = request.text;
		break;
	case 'addParticipant':
		sendResponse({});
		var ref = robot.parseLink(request.link);
		try{
			var wavelet = robot.fetchWavelet(new WaveId(ref.domain, ref.waveId), 
					new WaveletId(ref.domain, ref.waveletId));
			wavelet.participants.add(request.participantId);
			robot.submit(wavelet, emptyFn);
		}
		catch(e){
			alert(e);
		}
    	break;
    case 'addLink':
    	sendResponse({});
    	addLink(request.link);
    	break;
    case 'copyBlips':
    	sendResponse({});
    	try{
    		copyBlips(request.link);
    	}
    	catch(e){
    		alert(e);
    	}
    	copyObject = {};
    	break;
    case 'exportWaveToRizzoma':
    	sendResponse({});
    	try{
    		exportWaveToRizomma(request.link);
    	}
    	catch(e){
    		alert(e);
    	}
    	copyObject = {};
    	break;
    case 'clearBlips':
    	sendResponse({});
    	clearBlips();
    	break;
    case 'getVersion':
    	sendResponse(currentVersion);
    	break;
    }
});

function getCopyOptions(){
	if(!localStorage['copyShortcuts']){
		return getDefaultCopyShortcuts();
	}
	else{
		return JSON.parse(localStorage['copyShortcuts']);
	}
}

function getCurrentOptions(){
	if(!localStorage.waveExtensionShortcuts) {
        return getDefaultShortcuts();
    }
    else {
		var defaults = getDefaultShortcuts();
		var current = JSON.parse(localStorage.waveExtensionShortcuts);
		for(var shortcut in current){
			defaults[shortcut] = current[shortcut];
		}
        return defaults;
    }
}

function showNotification(owner, text){
	(window.webkitNotifications.createNotification(
		'icon48.png',
		'WaveShortcuts: ' + owner,
		text
	)).show();
}

function copyAction(header, url){
	txt = header;
	loc = url;
	if(copyNotification !== undefined) return;
	(copyNotification = window.webkitNotifications.createNotification(
		'icon48.png',
		'WaveShortcuts: ' + chrome.i18n.getMessage('copyLinkOption'),
		chrome.i18n.getMessage('Text') + ': ' + txt + '.\n URL: ' + loc
	)).show();
	setTimeout(function(){
		try{
			copyNotification.cancel();
			copyNotification = undefined;
		}
		catch(e){}
	}, 2000);
}

function trackAction(title, action) {
	title = title.replace(/Google Wave$/, '');
	title = title.replace(/ - $/, '');
	title = title.replace(/\(\d+.*\)$/, '');
	if(title.length == 0){
		title = 'NoName user';
	}
	gaq.push(['_trackEvent', title, action]);
};

function setShortcuts(shortcut){
    localStorage.waveExtensionShortcuts = JSON.stringify(shortcut);
}

function setCopyShortcuts(shortcut){
	localStorage['copyShortcuts'] = JSON.stringify(shortcut);
}

function getDefaultShortcuts(){
	var shortcuts = {
		'collapse':{
			'ctrlKey': true,
			'shiftKey': false,
			'altKey': false,
			'metaKey': false,
			'keyCode': 38,
			'keyIdentifier': 'Up'
		},
		'expand':{
			'ctrlKey': true,
			'shiftKey': false,
			'altKey': false,
			'metaKey': false,
			'keyCode': 40,
			'keyIdentifier': 'Down'
		},
		'copyLink':{
			'ctrlKey': false,
			'shiftKey': false,
			'altKey': true,
			'metaKey': false,
			'keyCode': 67,
			'keyIdentifier': 'U+0043'
		},
		'pasteLink':{
			'ctrlKey': false,
			'shiftKey': false,
			'altKey': true,
			'metaKey': false,
			'keyCode': 86,
			'keyIdentifier': 'U+0056'
		},
		'showAllInlineReplies':{
			'ctrlKey': true,
			'shiftKey': false,
			'altKey': false,
			'metaKey': false,
			'keyCode': 39,
			'keyIdentifier': 'Right'
		},
		'hideAllInlineReplies':{
			'ctrlKey': true,
			'shiftKey': false,
			'altKey': false,
			'metaKey': false,
			'keyCode': 37,
			'keyIdentifier': 'Left'
		},
		'deleteMessage':{
			'ctrlKey': true,
			'shiftKey': false,
			'altKey': false,
			'metaKey': false,
			'keyCode': 46,
			'keyIdentifier': 'U+007F'
		},
		'minimize':{
			'ctrlKey': false,
			'shiftKey': false,
			'altKey': true,
			'metaKey': false,
			'keyCode': 82,
			'keyIdentifier': 'U+0052'
		},
		'closeWave':{
			'ctrlKey': false,
			'shiftKey': false,
			'altKey': true,
			'metaKey': false,
			'keyCode': 87,
			'keyIdentifier': 'U+0057'
		}
	};
	if(navigator.userAgent.indexOf("Mac")!=-1){
		shortcuts['minimize'] = {
			'ctrlKey': true,
			'shiftKey': false,
			'altKey': true,
			'metaKey': false,
			'keyCode': 68,
			'keyIdentifier': 'U+0044'
		}
		shortcuts['copyLink'] = {
			'ctrlKey': true,
			'shiftKey': false,
			'altKey': false,
			'metaKey': false,
			'keyCode': 67,
			'keyIdentifier': 'U+0043'
		},
		shortcuts['pasteLink'] = {
			'ctrlKey': true,
			'shiftKey': false,
			'altKey': false,
			'metaKey': false,
			'keyCode': 86,
			'keyIdentifier': 'U+0056'
		}
	}
	return shortcuts;
}

function getDefaultCopyShortcuts(){
	var shortcuts = {
		'copyBlip': {
			'altKey': true,
			'shiftKey': false,
			'ctrlKey': true,
			'metaKey': false,
			'keyCode': 67,
			'keyIdentifier': 'U+0043'
		},
		'pasteBlip': {
			'altKey': true,
			'shiftKey': false,
			'ctrlKey': true,
			'metaKey': false,
			'keyCode': 86,
			'keyIdentifier': 'U+0056'
		},
		'emptyBuffer': {
			'altKey': true,
			'shiftKey': true,
			'ctrlKey': false,
			'metaKey': false,
			'button': 0
		}
	}
	if(navigator.userAgent.indexOf("Mac")!=-1){
		shortcuts['copyBlip'] = {
			'altKey': true,
			'shiftKey': true,
			'ctrlKey': false,
			'metaKey': false,
			'keyCode': 67,
			'keyIdentifier': 'U+0043'
		}
		shortcuts['pasteBlip'] = {
			'altKey': true,
			'shiftKey': true,
			'ctrlKey': false,
			'metaKey': false,
			'keyCode': 86,
			'keyIdentifier': 'U+0056'
		}
	}
		
	return shortcuts;
}

function initialize() {
	ACTION.setBadgeText({text: 'X'});
}

initialize();
function format(string, size){
	var str = "";
	string = string.toString();
	for(var i = string.length; i < size; i++){
		str += '0';
	}
	return str+string;
}

function syncronize(){
	if(localStorage.searchNotifier === undefined || localStorage.searchNotifier == ''){
		ACTION.setBadgeText({text: '?'});
		return;
	}
	ACTION.setBadgeText({text: '...'});
	const numResults = 101;
	var d = new Date();
	var date = format(d.getDate(), 2);
	var month = format(d.getMonth()+1, 2);
	try{
		var callback = function(response){
			const RESULTS = response.data.searchResults;
			localStorage.digests = JSON.stringify(RESULTS.digests);
			var res;
			if(RESULTS.numResults){
				if(RESULTS.numResults > 100)
					res = '100+';
				else
					res = RESULTS.numResults;
			}
			else
				res = '';
			ACTION.setBadgeText({text: res.toString()});
		};
		robot.search(localStorage.searchNotifier.replace(/\[\[TODAY\]\]/gi, date + '.' + month), numResults, callback);
	}
	catch(e){
		console.error(e);
		ACTION.setBadgeText({text: '!'});
	}
	localStorage.digests = '';
}

function addLink(link){
	var blip = robot.parseLink(link);
	if(!(blip.domain in copyObject)){
		copyObject[blip.domain] = {};
	}
	if(!(blip.waveId in copyObject[blip.domain])){
		copyObject[blip.domain][blip.waveId] = {};
	}
	if(!(blip.waveletId in copyObject[blip.domain][blip.waveId])){
		copyObject[blip.domain][blip.waveId][blip.waveletId] = {};
	}
	copyObject[blip.domain][blip.waveId][blip.waveletId][blip.blipId] = {};
}

function clearBlips(){
	copyObject = {};
}

var copyedBlips = {};
var rootBlipId;
var copyError = false;

function isEmpty(obj){
	for(var i in obj) return false;
	return true;
}

function getQueryParameters(url){
	url = url.substring(url.indexOf('?') + 1);
	var hashIndex = url.indexOf('#');
	if(hashIndex == -1) hashIndex = url.length;
	var params = url.substring(0, hashIndex);
	params = params.split("&");
	var queryStringList = {};
	
	for(var i=0;i<params.length;i++){
		var tmp = params[i].split("=");
	    queryStringList[tmp[0]] = tmp[1] ? tmp[1] : '';
	}
	return queryStringList;
}

function copyBlipContent(waveletFrom, blipFrom, waveletTo, blipTo, gwextMarkedLinks){
	if(!waveletFrom || !blipFrom){
		console.error('Got null source');
		return;
	}
	if(!waveletTo || !blipTo){
		console.error('Got null target');
		return;
	}
	if(blipFrom.getBlipId() == blipTo.getBlipId() && 
			waveletFrom.getWaveletId().domain == waveletTo.getWaveletId().domain &&
			waveletFrom.getWaveletId().id == waveletTo.getWaveletId().id &&
			waveletFrom.getWaveId().domain == waveletTo.getWaveId().domain && 
			waveletFrom.getWaveId().id == waveletTo.getWaveId().id){
		if(enableDebug)
			console.log('continued');
		return;
	}
	if(blipFrom.getBlipId() in copyedBlips)	return;
	copyedBlips[blipFrom.getBlipId()] = '';
//	blipTo.setAuthor(blipFrom.getCreator());
	var creator = blipFrom.getCreator();
	if(!blipTo.length() || blipTo.getContent().charAt(blipTo.length()-1) != '\n'){
		creator = '\n' + creator;
	}
	creator = creator.substring(0, creator.indexOf('@'));
	var creatorOffset = blipTo.length();
	blipTo.append(creator + ':');
	var elements = blipFrom.getElements();
	var content = blipFrom.getContent();
	var offset = blipTo.length();
	var start = 0;
	for(var i in elements){
		i = parseInt(i);
		var element = elements[i];
		if(element.getType() == ElementType.ATTACHMENT/* || element.getType() == ElementType.IMAGE*/) continue;
		if(element.getType() == ElementType.LINE && (!element.properties || isEmpty(element.properties))) continue;
		if(start < i){
			var str = content.substring(start, i);
			blipTo.append(str);
//			console.log('appending:' + str);
		}
		start = i + 1;
		switch(element.getType()){
		case ElementType.INLINE_BLIP:
			var thread = waveletFrom.threads[element.getProperty('id')];
			if(!thread || !thread.blipIds){
				blipTo.append(' ');
				continue;
			}
//			var inlineCreated = false;
			var inlineTo = null;
			for(var blipIndex = 0, blipId; blipId = thread.blipIds[blipIndex]; blipIndex++){
				var blip = waveletFrom.getBlip(blipId);
				if(!blip) continue;
				if(inlineTo){
					inlineTo = inlineTo.continueThread();
				}
				else{
					inlineTo = blipTo.insertInlineBlip(offset+i);
				}
				copyBlipContent(waveletFrom, blip, waveletTo, inlineTo, gwextMarkedLinks);
			}
			/*if(!inlineFrom){
				copyError = true;
				var childBlips = blipFrom.getChildBlips();
				for(var j in childBlips){
					if(!(childBlips[j].getBlipId() in copyedBlips)){
						inlineFrom = childBlips[j];
						break;
					}
				}
			}
			else{
				copyBlipContent(waveletFrom, inlineFrom, waveletTo, inlineTo);
			}*/
			break;
		case ElementType.ATTACHMENT:
		case ElementType.IMAGE:
			/*var attachment = new Attachment(element[Attachment.CAPTION], element[Attachment.DATA]);
			console.error(attachment);
			console.error(element);
			blipTo.append(attachment);*/
			blipTo.append(' ');
			break;
		case ElementType.LINE:
		case ElementType.GADGET:
		case ElementType.INPUT:
		case ElementType.PASSWORD:
		case ElementType.CHECK:
		case ElementType.LABEL:
		case ElementType.BUTTON:
		case ElementType.RADIO_BUTTON:
		case ElementType.RADIO_BUTTON_GROUP:
		case ElementType.TEXTAREA:
		case ElementType.INSTALLER:
			blipTo.append(element);
			break;
		}
	}
	var str = content.substring(start);
	if(str){
		blipTo.append(str);
	}
	var creatorRange = blipTo.range(creatorOffset, creatorOffset+creator.length);
	creatorRange.annotate("style/color", ["rgb(153, 153, 153)"]);
	creatorRange.annotate("style/fontWeight", ["bold"]);
	var annotations = blipFrom.getAnnotations();
	var skippedAnnotations = {}
	if(annotations.store['event_id']){
		for(var i in annotations.store['event_id']){
			var annotation = annotations.store['event_id'][i];
			skippedAnnotations[annotation.getRange().getStart()] = ''
		}
	}
	for(var i in annotations.store){
		for(var j  in annotations.store[i]){
			var annotation = annotations.store[i][j];
			var range = annotation.getRange();
			if(range.getStart() in skippedAnnotations){
				continue;
			}
			var name = annotation.getName();
			var value = annotation.getValue();
			if(name == 'link/manual'){
				var href = value;
				var params = getQueryParameters(href);
				console.log(params);
				if('gwextMark' in params){
					var blipId = blipTo.blipId;
					if(!gwextMarkedLinks[blipId]){
						gwextMarkedLinks[blipId] = {
							blip: blipTo,
							annotations: []
						}
					}
					gwextMarkedLinks[blipId].annotations.push({
						start: range.getStart()+offset,
						end: range.getEnd()+offset,
						value: href
					});
					continue;
				}
			}
			blipTo.range(range.getStart()+offset, range.getEnd()+offset).annotate(name, [value]);
		}
	}
	var threads = blipFrom.replyThreads;
	for(var j = 0, thread; thread = threads[j]; j++){
		var blipReply = null;
		if(!thread.blipIds) continue;
		for(var k = 0, blipId; blipId = thread.blipIds[k]; k++){
			console.log(blipId);
			var blip = waveletFrom.getBlip(blipId);
			if(!blip) continue;
			if(blipReply){
				blipReply = blipReply.continueThread();
			}
			else{
				blipReply = blipTo.reply();
			}
			copyBlipContent(waveletFrom, blip, waveletTo, blipReply, gwextMarkedLinks);
		}
	}
}

var isLocked = 0;

function copyBlips(copyToLink){
	var pathTo = robot.parseLink(copyToLink);
	var waveletTo = robot.fetchWavelet(new WaveId(pathTo.domain, pathTo.waveId), new WaveletId(pathTo.domain, 
			pathTo.waveletId));
			console.log(waveletTo);
	var blipTo = waveletTo.getBlip(pathTo.blipId);
	var hasOperation = false;
	copyError = false;
	for(var domain in copyObject){
		for(var waveId in copyObject[domain]){
			for(var waveletId in copyObject[domain][waveId]){
				var blipsFrom = copyObject[domain][waveId][waveletId];
				var waveletFrom = robot.fetchWavelet(new WaveId(domain, waveId), new WaveletId(domain, waveletId));
				var gwextMarkedLinks = {}
				for(var blip in blipsFrom){
					var blipFrom = waveletFrom.getBlip(blip);
					if(enableDebug){
						console.log(waveletFrom);
						console.log(blipFrom);
						console.log(waveletTo);
						console.log(blipTo)
					}
					copyedBlips = {};
					rootBlipId = blipFrom.getBlipId();
					hasOperation = true;
					copyBlipContent(waveletFrom, blipFrom, waveletTo, blipTo, gwextMarkedLinks);
					delete copyObject[domain][waveId][waveletId][blip];
				}
				if(hasOperation){
					console.debug(gwextMarkedLinks);
					var ops = [].concat(waveletTo.getOperationQueue().pendingOperations);
					var responses = robot.submit(waveletTo);
					for(var i = 0, response; response = responses[i]; i++){
						var data = response.data;
						if(!data['newBlipId']) continue;
//						gwextMarkedLinks[data.blipId] = data.newBlipId;
						try{
							gwextMarkedLinks[ops[i].params.blipData.blipId].blip.blipId = data['newBlipId'];
						}
						catch(e){
							console.warn(e);
						}
						
					}
					for(var blipId in gwextMarkedLinks){
						var blip = gwextMarkedLinks[blipId].blip;
						console.log(blip)
						var annotations = gwextMarkedLinks[blipId].annotations;
						for(var i = 0, annotation; annotation = annotations[i]; i++){
							var link = annotation.value;
							var url = annotation.value;
							var queryStartIndex = url.indexOf('?') + 1;
							var queryEndIndex = url.indexOf('#');
							if(queryStartIndex){
								link = link.substring(0, queryStartIndex);
								console.log(link);
							}
							var params = getQueryParameters(url);
							params['waveId'] = encodeURIComponent(waveletTo.waveId.cachedSerialisation);
							params['waveletId'] = encodeURIComponent(waveletTo.waveletId.cachedSerialisation);
							params['blipId'] = encodeURIComponent(blip.blipId);
							var addAmp = false;
							for(var key in params){
								if(addAmp) link += '&';
								link += key + '=' + params[key];
								addAmp = true;
							}
							if(queryEndIndex > 0){
								link += url.substring(queryEndIndex);
							}
							try{
								blip.range(annotation.start, annotation.end).annotate('link/manual', [link]);
							}
							catch(e){
								console.error(e);
							}
						}
					}
					robot.submit(waveletTo);
				}
			}
		}
	}
	if(copyError){
		showNotification('Copy Blips', 'Some inline blips weren\'t copied');
	}
}

function sendXHR(url, data, successFn, errorFn, method, async) {
	if (async == undefined) {
		async = true;
	}
	if (method == undefined) {
		method = 'GET';
	}
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, async);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return
		clearTimeout(timeout); // очистить таймаут при наступлении readyState 4
		if (xhr.status == 200) {
			successFn(xhr.responseText);
		} else {
			errorFn({ code: xhr.status, message: xhr.statusText}); // вызвать обработчик ошибки с текстом ответа
		}
	};
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(data);
	// Таймаут 10 секунд
	var timeout = setTimeout(function() {
		xhr.abort();
		errorFn({ code: -1, message: "request time out"});
	}, 10000);
}

function catchExportResp(resp) {
	var respObj = JSON.parse(resp);
	if (respObj.type == 'info') {
		return chrome.i18n.getMessage("exportToRizzomaSuccess") + '<a target="blank" href="http://rizzoma.com/import/#waveId=' + respObj.data.gWaveId + '">http://rizzoma.com/import/</a>';
	} else {
		switch(respObj.message) {
			case "AuthError":
				return chrome.i18n.getMessage("exportToRizzomaAuthError") + '<a target="blank" href="http://rizzoma.com/">http://rizzoma.com/</a>';
			case "WrongParamError":
				return chrome.i18n.getMessage("exportToRizzomaWrongParamError");
			case "SourceParseImportError":
				return chrome.i18n.getMessage("exportToRizzomaSourceParseImportError");
			case "WaveAlreadyImportedImportError":
				return chrome.i18n.getMessage("exportToRizzomaWaveAlreadyImportedImportError") + '<a target="blank" href="http://rizzoma.com/wave/#waveId=' + respObj.data.importedWaveId +'">http://rizzoma.com/</a>';
			case "WaveImportingInProcessImportError":
				return chrome.i18n.getMessage("exportToRizzomaWaveImportingInProcessImportError") + '<a target="blank" href="http://rizzoma.com/import/#waveId=' + respObj.data.gWaveId + '">http://rizzoma.com/import/</a>';
			case "InternalError":
				return chrome.i18n.getMessage("exportToRizzomaInternalError");
			default:
				return respObj.message;
		}
	}
	
}

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = Base64._utf8_encode(input);

	    while (i < input.length) {

	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);

	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;

	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	            enc4 = 64;
	        }

	        output = output +
	        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

	    }

	    return output;
	},

	// public method for decoding
	decode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	    while (i < input.length) {

	        enc1 = this._keyStr.indexOf(input.charAt(i++));
	        enc2 = this._keyStr.indexOf(input.charAt(i++));
	        enc3 = this._keyStr.indexOf(input.charAt(i++));
	        enc4 = this._keyStr.indexOf(input.charAt(i++));

	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;

	        output = output + String.fromCharCode(chr1);

	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }

	    }

	    output = Base64._utf8_decode(output);

	    return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";

	    for (var n = 0; n < string.length; n++) {

	        var c = string.charCodeAt(n);

	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }

	    }

	    return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;

	    while ( i < utftext.length ) {

	        c = utftext.charCodeAt(i);

	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i+1);
	            c3 = utftext.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }

	    }

	    return string;
	}
}

function showHtmlNotification(owner, text){
	var tmpl = "<html>" +
				"<head>" +
					'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
				"</head>" +
				"<body>" +
				"<b>"+ owner +"</b> <br />" +
				text +
				"</body>" +
			"</html>";
	(window.webkitNotifications.createHTMLNotification(
			"data:text/html;charset=utf-8;base64," + Base64.encode(tmpl)
	)).show();
}

function getParticipants(dataObj) {
	if (!dataObj || !dataObj[0] || !dataObj[0].data || !dataObj[0].data.waveletData || !dataObj[0].data.waveletData.participantRoles) {
		return [];
	}
	var participantRoles = dataObj[0].data.waveletData.participantRoles;
	var participants = [];
	for (var email in participantRoles) {
		if (email == 'public@a.gwave.com') {
			continue;
		}
		var role = participantRoles[email];
		email = email.replace('@googlewave.com','@gmail.com');
		participants.push("'" + email + ":" + role + "'");
	}
	return participants;
}

function isWavePublic(dataObj) {
	if (!dataObj || !dataObj[0] || !dataObj[0].data ||
			!dataObj[0].data.waveletData || 
			!dataObj[0].data.waveletData.participantRoles) {
		return false;
	}
	return !!dataObj[0].data.waveletData.participantRoles['public@a.gwave.com'];
}

function pingRizzomaImportService(sucessCallback, errorCallback) {
	sendXHR(
			"http://rizzoma.com/import/ping/",
			null,
			sucessCallback,
			errorCallback,
			"GET");
}

/*RIZZOMA_PING_TIMEOUT = 60;//(sec)
function startPingRizzomaImportService(pingNow, sucessCallback, errorCallback) {
	if (pingNow) {
		pingRizzomaImportService(sucessCallback, errorCallback);
	}
	setTimeout(function() {
		pingRizzomaImportService(sucessCallback, errorCallback);
	}, RIZZOMA_PING_TIMEOUT * 1000);
}*/

var WAVE_TITLE_LENGTH = 62;
function getWaveTitle(dataObj) {
	var sourceData = dataObj[0].data;
	var blipsData = sourceData.blips;
	var waveletData = sourceData.waveletData;
	if (waveletData && waveletData.rootBlipId && blipsData[waveletData.rootBlipId]) {
		var blipData = blipsData[waveletData.rootBlipId];
		var lastIndex = blipData.content.substr(1).indexOf("\n");
		if (lastIndex == -1) {
			lastIndex = WAVE_TITLE_LENGTH;
		}
		var title = blipData.content.substring(0, lastIndex+1);
		if (title.length > WAVE_TITLE_LENGTH) {
			title = title.substr(0, WAVE_TITLE_LENGTH - 2) + "…";
		}
		if (title[0] == "\n") {
			title = title.substr(1);
		}
		return title;
	}
	return null;
}

function exportWaveToRizzoma(copyLink) {
	var pathFrom = robot.parseLink(copyLink);
	var waveletData = robot.fetchWaveletRawData(new WaveId(pathFrom.domain, pathFrom.waveId), new WaveletId(pathFrom.domain, pathFrom.waveletId));
	var dataObj = JSON.parse(waveletData);
	var participants = getParticipants(dataObj);
	var waveTitle = getWaveTitle(dataObj);
	if (!waveTitle) {
		pathFrom.domain + pathFrom.waveId + pathFrom.waveletId;
	}
	var confirmMessage = chrome.i18n.getMessage("exportToRizzomaAvailableConfirm") + participants.join(", ");
	if (isWavePublic(dataObj)) {
		confirmMessage += chrome.i18n.getMessage("exportToRizzomaPublicConfirm");
	}
	if(confirm(confirmMessage)) {
		sendXHR(
			"http://rizzoma.com/import/",
			"simpleResponse=1&waveletJson=" + encodeURIComponent(waveletData),
			function(resp) {
				message = catchExportResp(resp);
				showHtmlNotification(chrome.i18n.getMessage("exportToRizzomaNotificationHeader") + '"' + waveTitle + '"', message);
			},
			function(error) {
				showHtmlNotification(chrome.i18n.getMessage("exportToRizzomaNotificationHeader") + '"' + waveTitle + '"', 'ERROR: ' + error.code + ' ' + error.message);
			}, "POST");
	}
}

var authCallback = function() {
	if(enableDebug)console.log('Authorize succed');
	ACTION.setBadgeText({text: ''});
	syncronize();
	id = setInterval(syncronize, 60000);
};

function signIn(){
	robot.signIn(authCallback);
}

function signOut(){
	clearInterval(id);
	delete localStorage.digests;
	robot.signOut();
	initialize();
}

function changeHelpPanelVisibility(visible){
	var greeting = (visible) ? 'showHelpPanel' : 'hideHelpPanel';
	findWaveTabs(function(tabs){
		for(var i = 0, tab; tab = tabs[i]; i++){
			chrome.tabs.sendRequest(tab.id, {greeting: greeting}, function(){});
		}
	});
}

signIn();
