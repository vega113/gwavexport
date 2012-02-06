function WaveService(){
	const POST = 'POST';
	const JSON_MIME_TYPE = 'application/json';
	const ACCOUNTS_DOMAIN = 'https://www.google.com/accounts/';
	const USER = 'anonymous';
	const SCOPE = 'http://wave.googleusercontent.com/api/rpc';
	const APP_NAME = 'WaveShortcuts';
	const RPC_URL = 'http://www-opensocial.googleusercontent.com/api/rpc';
	const OPERATION_TYPE = new OperationType();
	const PROTOCOL_VERSION = '0.22';
	this.oauth = ChromeExOAuth.initBackgroundPage({
		'request_url': ACCOUNTS_DOMAIN + 'OAuthGetRequestToken',
		'authorize_url': ACCOUNTS_DOMAIN + 'OAuthAuthorizeToken',
		'access_url': ACCOUNTS_DOMAIN + 'OAuthGetAccessToken',
		'consumer_key': USER,
		'consumer_secret': USER,
		'scope': SCOPE,
		'app_name': APP_NAME
	});
	
	this.authorize = function(callback){
		if(enableDebug)console.log('Authorizing');
		this.oauth.authorize(function() {
			if(callback)
				callback();
		});
	};
	
	this.makeRpc = function(body, callback, returnRawData) {
		var requestString = JSON.stringify(body.pendingOperations);
		if(enableDebug)console.log('Request size: ' + requestString.length);
		console.log(body.pendingOperations.length);
		if(body.pendingOperations.length > 2000){
			throw(chrome.i18n.getMessage('requestOperationLimitError'));
		}
		if(requestString.length > 1000000){
			throw(chrome.i18n.getMessage('requestSizeLimitError'));
		}
		/*
		console.log(body.pendingOperations);
		try{
			var obj = body.pendingOperations[1];
		
		console.log(obj.params);
		/*delete obj.params.thread;
		delete obj.params.operationQueue;
		delete obj.params.wavelet;
		/*delete obj.params.content;
		delete obj.params.childBlipIds
		delete obj.params.contributors
		delete obj.params.creator
		delete obj.params.lastModifiedTime
		delete obj.params.version
		delete obj.params.parentBlipId
		delete obj.params.annotations
		delete obj.params.replyThreads*/
		/*for(var i in obj.params){
			console.log(i);
		JSON.stringify(obj.params[i]);
		
		} 
		var ar = [{"method":"wave.document.modify",
			"id":"op2","params":{
				"waveId":"googlewave.com!w+I6sPK7ZkH-a",
				"waveletId":"googlewave.com!conv+root",
				"blipId":"b+yed_8SQQA",
				"modifyAction":{
					"modifyHow":"INSERT_AFTER",
					"values":["\nmanual test"],
					"annotationKey":null,
					"elements":[null],
					"bundledAnnotations":null,
					"useMarkup":false
				}
			}}];
		body.pendingOperations = ar.concat(body.pendingOperations);
		}
		catch(e){console.log(e)};
		console.log(body.pendingOperations);*/
		//"googlewave.com!conv+root"
		//https://wave.google.com/wave/waveref/googlewave.com/w+sM3Fe0XHH/~/conv+root/b+YXSQXrZkFU 
		//body.pendingOperations = JSON.parse('[{"id":"op1","method":"wave.blip.setAuthor","params":{"waveId":"googlewave.com!w+sM3Fe0XHH","waveletId":"googlewave.com!conv+root","blipId":"b+YXSQXrZkFUH","blipAuthor":"vsemenov86"}}]');
		var request = {
			method: POST,
			headers: {'Content-Type': JSON_MIME_TYPE}, 
			body: JSON.stringify(body.pendingOperations)
		};
		
		if(callback && typeof(callback) == 'function'){
			if(enableDebug)console.log('Sending reqeust: ' + JSON.stringify(body.pendingOperations));
			this.oauth.sendSignedRequest(RPC_URL, function(response){
				if(enableDebug)console.log('Got response: ' + response);
				if (returnRawData) {
					callback(response);
				} else {
					callback(JSON.parse(response));
				}
			}, request);
		} else {
			if(enableDebug)console.log('Sending sync reqeust: ' + JSON.stringify(body.pendingOperations));
			var response = this.oauth.sendSyncSignedRequest(RPC_URL, request);
			if(enableDebug)console.log('Got synch response: ' + response);
			if (returnRawData) {
				return response;
			} else {
				return JSON.parse(response);
			}
		}
	};

	this.search = function(query, numResults, callback){
		var searchCallback = function(response){
			callback(response[0]);
		};
		var opQueue = new OperationQueue();
	    opQueue.search(query, numResults);
		this.makeRpc(opQueue, searchCallback);
	};

	this.fetchWaveletData = function(waveId, waveletId, returnRawData){
		var opQueue = new OperationQueue();
		opQueue.fetchWavelet(waveId, waveletId);
	    var response = this.makeRpc(opQueue, undefined, returnRawData);

	    if (returnRawData) {
			return response;
		}
	    
	    response = response[0];
		opQueue.clear();
//		opQueue.notifyRobotInformation("0.22", "0x6b7541dL");
		try{
			return response['data'][ParamsProperty.WAVELET_DATA];
		}
		catch(e){
			console.error(e);
			throw chrome.i18n.getMessage('waveletDataMissingError');
		}
		return 
	};
	
	this.fetchWavelet = function(waveId, waveletId){
		var waveletData = this.fetchWaveletData(waveId, waveletId);
		var blips = {};
		var threads = {};
		var wavelet = Wavelet.deserialize(opQueue, blips, threads, waveletData);
		// Deserialize threads
		var tempThreads = response['data'][ParamsProperty.THREADS];
		for(var entry in tempThreads){
			var thread = tempThreads[entry];
			threads[entry] = new BlipThread(thread.id, thread.location, thread.blipIds, blips);
		}
		// Deserialize blips.
		var blipDatas = response['data'][ParamsProperty.BLIPS];
		for(var entry in blipDatas){
			blips[entry] = Blip.deserialize(opQueue, wavelet, blipDatas[entry]);
		}
		return wavelet;
	};
	
	this.submit = function(wavelet, callback){
		var opQueue = wavelet.getOperationQueue();
		var response = this.makeRpc(opQueue, callback);
		opQueue.clear();
		return response;
	};
}

ChromeExOAuth.prototype.sendSyncSignedRequest = function(url, opt_params) {
	var method = opt_params && opt_params['method'] || 'GET';
	var body = opt_params && opt_params['body'] || null;
	var params = opt_params && opt_params['parameters'] || {};
	var headers = opt_params && opt_params['headers'] || {};
	var signedUrl = this.signURL(url, method, params);
	return ChromeExOAuth.sendSyncRequest(method, signedUrl, headers, body);
};

ChromeExOAuth.sendSyncRequest = function(method, url, headers, body) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, false);
	if (headers) {
		for (var header in headers) {
			if (headers.hasOwnProperty(header)) {
				xhr.setRequestHeader(header, headers[header]);
			}
		}
	}
	xhr.send(body);
	if(xhr.readyState != 4) throw 'XMLHTTPRequest failed';
	return xhr.responseText;
}