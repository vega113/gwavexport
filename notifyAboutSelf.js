chrome.extension.sendRequest({greeting: 'getVersion'}, function(version){
	document.cookie = 'WaveShortCut=' + version;
});