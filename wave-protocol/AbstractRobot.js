AbstractRobot = function(){
	const WAVE_SERVICE = new WaveService();
	this.oauth = WAVE_SERVICE.oauth;
	
	this.signIn = function(callback){
		WAVE_SERVICE.authorize(callback);
	};
	
	this.signOut = function(){
		this.oauth.clearTokens();
	};
	
	this.hasToken = function(){
		return this.oauth.hasToken();
	}
	
	this.search = function(query, numResults, callback){
		WAVE_SERVICE.search(query, numResults, callback);
	};
	
	this.parseLink = function(link){
		var blipId = link.substring(link.lastIndexOf('/') + 1);
		link = link.substring(0, link.lastIndexOf('/'));
		var waveletId = link.substring(link.lastIndexOf('/') + 1);
		link = link.substring(0, link.lastIndexOf('/'));
		link = link.substring(0, link.lastIndexOf('/'));
		var waveId = link.substring(link.lastIndexOf('/') + 1);
		link = link.substring(0, link.lastIndexOf('/'));
		var domain = link.substring(link.lastIndexOf('/') + 1);
		return {
			blipId: blipId,
			domain: domain,
			waveletId: waveletId,
			waveId: waveId
		};
	};
	
	this.fetchWaveletRawData = function(waveId, waveletId, callback){
		return WAVE_SERVICE.fetchWaveletData(waveId, waveletId, true, callback);
	};
	
	this.fetchWavelet = function(waveId, waveletId, callback){
		return WAVE_SERVICE.fetchWavelet(waveId, waveletId, callback);
	};
	
	this.submit = function(wavelet, callback){
		return WAVE_SERVICE.submit(wavelet, callback);
	};
};