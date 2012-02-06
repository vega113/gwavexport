function Wavelet(waveId, waveletId, creator, creationTime, lastModifiedTime, title,
		rootBlipId, rootThread, participantRoles, participants, dataDocuments, tags, 
		blips, threads, operationQueue){
	var ROBOT_ID_PROXY_DELIMITER = '+';
	var ROBOT_ID_VERSION_DELIMITER = '#';
	var ROBOT_ID_DOMAIN_DELIMITER = '@';
	this.waveId = waveId;
	this.waveletId = waveletId;
	this.rootBlipId = rootBlipId;
	this.rootThread = rootThread;
	this.creator = creator;
	this.creationTime = creationTime;
	this.lastModifiedTime = lastModifiedTime;
	this.title = title;
	this.participants = new Participants(participants, participantRoles, this, operationQueue);
	this.blips = blips;
	this.threads = threads;
	this.operationQueue = operationQueue;
	this.dataDocuments = new DataDocuments(dataDocuments, this, operationQueue);
	this.tags = new Tags(tags, this, operationQueue);
	
	/*if(waveId instanceof WaveId){
	    this.dataDocuments = new DataDocuments(new HashMap<String, String>(), this,
	        operationQueue);
	    this.tags = new Tags(Collections.<String>emptySet(), this, operationQueue);
	    this.blips = blips;
	    this.threads = threads;
	    this.operationQueue = operationQueue;
	}else{
		other = waveId;
		this.waveId = other.waveId;
    this.waveletId = other.waveletId;
    this.creator = other.creator;
    this.creationTime = other.creationTime;
    this.lastModifiedTime = other.lastModifiedTime;
    this.title = other.title;
    this.rootBlipId = other.rootBlipId;
    this.rootThread = other.rootThread;
    this.participants = other.participants;
    this.dataDocuments = other.dataDocuments;
    this.tags = other.tags;
    this.blips = other.blips;
    this.threads = other.threads;
    this.robotAddress = other.robotAddress;
    this.operationQueue = waveletId;
	}*/
	
	this.getWaveId = function(){
		return this.waveId;
	};
	
	this.getWaveletId = function(){
		return this.waveletId;
	};
	
	this.getRootBlipId = function(){
		return this.rootBlipId;
	};
	
	this.getRootThread = function(){
		return this.rootThread;
	};
	
	this.getBlip = function(blipId){
		return this.blips[blipId];
	};
	
	this.getBlips = function(){
		return this.blips;
	};
	
	this.getThread = function(threadId){
		if(!threadId){
			return this.getRootThread();
		}
		return this.threads[threadId];
	};

	this.addThread = function(thread){
		this.threads[thread.getId()] = thread;
	};
	
	this.getOperationQueue = function() {
		return this.operationQueue;
	};
};

Wavelet.deserialize = function(operationQueue, blips, threads, waveletData){
	var waveId = WaveId.deserialise(waveletData.waveId);
	var waveletId = WaveletId.deserialise(waveletData.waveletId);
	var creator = waveletData.creator;
	var creationTime = waveletData.creationTime;
	var lastModifiedTime = waveletData.lastModifiedTime;
	var rootBlipId = waveletData.rootBlipId;
	var originalRootThread = waveletData.rootThread;
	var rootThreadBlipIds = (originalRootThread ?
		originalRootThread.blipIds : []) || [];
	var rootThread = new BlipThread("", -1, rootThreadBlipIds, blips);
	var title = waveletData.title;
	var participants = waveletData.participants;
	var tags = waveletData.tags;
	var dataDocuments = waveletData.dataDocuments;
	var roles = waveletData.participantRoles;
	return new Wavelet(waveId, waveletId, creator, creationTime, lastModifiedTime, title,
		rootBlipId, rootThread, roles, participants, dataDocuments, tags, blips, threads,
		operationQueue);
}