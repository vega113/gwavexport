OperationRequest = function(method, id, waveId, waveletId, blipId, parameters){
	this.id = id;
	this.method = method;
	this.params = {};
	if(waveId){
		this.params['waveId'] = waveId;
	}
	if(waveletId){
		this.params['waveletId'] = waveletId;
	}
	if(blipId){
		this.params['blipId'] = blipId;
	}
	if(parameters){
		for(var p in parameters)
			for(var i in parameters[p])
				this.params[i] = parameters[p][i];
	}
	
	this.addParameter = function(parameters){
		for(var p in parameters)
			this.params[p] = parameters[p];
	};
};

function Parameter(){}
Parameter.of = function(key, value){
	var param = {};
	param[key] = value;
	return param;
}