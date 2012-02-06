WaveletId = function(domain, id){
	if(!domain || !id)
		console.error("Cannot create WaveletId with null value in [domain:"
          	+ domain + "] [id:" + id + "]");
	this.domain = domain;
	this.id = id;
	this.cachedSerialisation;
	this.serialise = function(){
		if(!this.cachedSerialisation){
			this.cachedSerialisation = LongIdSerialiser.serialiseWaveletId(this);
		}
		return this.cachedSerialisation;
	}
};

WaveletId.deserialise = function(waveletIdString){
	return LongIdSerialiser.deserialiseWaveletId(waveletIdString);
}