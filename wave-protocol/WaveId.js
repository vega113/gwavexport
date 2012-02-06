WaveId = function(domain, id){
	if(!domain || !id) {
		console.error("Cannot create wave id with null value in [domain:"
          + domain + "] [id:" + id + "]");
    }
	this.domain = domain;
	this.id = id;
	this.cachedSerialisation;
	this.serialise = function(){
		if(!this.cachedSerialisation){
			this.cachedSerialisation = LongIdSerialiser.serialiseWaveId(this);
	    }
	    return this.cachedSerialisation;
	}
	
}

WaveId.deserialise = function(waveIdString){
	return LongIdSerialiser.deserialiseWaveId(waveIdString);
}