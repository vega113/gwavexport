function OperationQueue(operations){
	this.nextOpId = 1;
	this.OPERATION_NAMESPACE = 'wave';
	this.OP_ID_FORMAT = 'op';
	if(operations){
		this.pendingOperations = operations;
	}
	else{
		this.pendingOperations = [];
	}
	
	this.clear = function(){
		this.pendingOperations = [];
	};
	
	var temporaryBlipIdCount = 1;
	var generateTempBlipId = function(wavelet){
		return 'TBD_' + wavelet.waveletId.serialise() + '_' + 
				temporaryBlipIdCount++;
	};
	
	this.addOperation = function(opType, waveId, waveletId, blipId, index, parameters){
		waveIdString = null;
		if(waveId){
			waveIdString = waveId.serialise();
		}
		waveletIdString = null;
		if(waveletId){
			waveletIdString = waveletId.serialise();
		}
		var id = (index == 0)?"0":this.OP_ID_FORMAT + this.nextOpId++;
		var operation = new OperationRequest(opType.method, id, waveIdString, waveletIdString,
				blipId, parameters);
		this.pendingOperations.splice(index, 0, operation);
		return operation;
	};
	
	this.addParticipantToWavelet = function(wavelet, participantId){
		this.appendOperation(new OperationType(this.OPERATION_NAMESPACE + '.' + OperationType.WAVELET_ADD_PARTICIPANT_NEWSYNTAX), 
				wavelet, [Parameter.of(ParamsProperty.PARTICIPANT_ID, participantId)]);
	};
	
	this.appendOperation = function(opType, waveId, waveletId, blipId, parameters){
		if(arguments.length == 3){
			if(arguments[1].getBlipId){
				return this.addOperation(opType, arguments[1].getWaveId(), arguments[1].getWaveletId(), 
						arguments[1].getBlipId(), this.pendingOperations.length, arguments[2]);
			}
			else{
				return this.addOperation(opType, arguments[1].getWaveId(), arguments[1].getWaveletId(),
						null, this.pendingOperations.length, arguments[2]);
			}
		}
		if(arguments.length == 2){
			return this.addOperation(opType, null, null, null, this.pendingOperations.length, arguments[1]);
		}
		return this.addOperation(opType, waveId, waveletId, blipId, this.pendingOperations.length, parameters);
	};
	
	this.fetchWavelet = function(waveId, waveletId){
		this.appendOperation(new OperationType(this.OPERATION_NAMESPACE + '.' + OperationType.ROBOT_FETCH_WAVE), waveId, waveletId, null);
	};
	
	this.search = function(query, numResults){
		this.appendOperation(new OperationType(this.OPERATION_NAMESPACE + '.' + OperationType.ROBOT_SEARCH), null, null, null, 
				[Parameter.of(ParamsProperty.QUERY, query), Parameter.of(ParamsProperty.NUM_RESULTS, numResults)]);
	};
	
	this.clear = function(){
		this.pendingOperations = [];
	};
	
	this.createChildOfBlip = function(blip){
		// Create a new thread.
		var tempBlipId = generateTempBlipId(blip.getWavelet());
		var wavelet = blip.getWavelet();
		var thread = new BlipThread(tempBlipId, -1, [], wavelet.getBlips());
		blip.addThread(thread);
		wavelet.addThread(thread);

	    // Add the new thread to the blip and wavelet.
	    blip.addThread(thread);
	    wavelet.addThread(thread);
	
	    // Create a new blip in the new thread.
	    var newBlip = OperationQueue.newBlip(blip.getWavelet(), '', blip.getBlipId(), tempBlipId, thread.getId());
	    this.appendOperation(new OperationType(this.OPERATION_NAMESPACE + '.' + OperationType.BLIP_CREATE_CHILD), blip, 
	    		[Parameter.of(ParamsProperty.BLIP_DATA, newBlip.serialize())]);
	    return newBlip;
	};
	
	this.continueThread = function(blip){
		// Create a new thread.
		var tempBlipId = generateTempBlipId(blip.getWavelet());
		var wavelet = blip.getWavelet();
		var thread = new BlipThread(tempBlipId, -1, [], wavelet.getBlips());
		blip.addThread(thread);
		wavelet.addThread(thread);

	    // Add the new thread to the blip and wavelet.
	    blip.addThread(thread);
	    wavelet.addThread(thread);
	
	    // Create a new blip in the new thread.
	    var newBlip = OperationQueue.newBlip(blip.getWavelet(), '', blip.getBlipId(), tempBlipId, thread.getId());
	    this.appendOperation(new OperationType(this.OPERATION_NAMESPACE + '.' + OperationType.BLIP_CONTINUE_THREAD), blip, 
	    		[Parameter.of(ParamsProperty.BLIP_DATA, newBlip.serialize())]);
	    return newBlip;
	};
	
	this.modifyDocument = function(blip) {
		return this.appendOperation(new OperationType(this.OPERATION_NAMESPACE + '.' + OperationType.DOCUMENT_MODIFY), blip, []);
	}
	
	this.insertInlineBlipToDocument = function(blip, position) {
		// Create a new thread.
		var tempBlipId = generateTempBlipId(blip.getWavelet());
		var wavelet = blip.getWavelet();
		var thread = new BlipThread(tempBlipId, position, [], wavelet.getBlips());
		
		// Add the new thread to the blip and wavelet.
		blip.addThread(thread);
		wavelet.addThread(thread);
		
		// Create a new blip in the new thread.
		var inlineBlip = OperationQueue.newBlip(blip.getWavelet(), "", blip.getBlipId(), tempBlipId,
				thread.getId());
		this.appendOperation(new OperationType(this.OPERATION_NAMESPACE + '.' + 
				OperationType.DOCUMENT_INSERT_INLINE_BLIP), blip, [Parameter.of(ParamsProperty.INDEX, 
				position), Parameter.of(ParamsProperty.BLIP_DATA, inlineBlip.serialize())]);
		return inlineBlip;
	}
	
	this.setBlipAuthor = function(blip, participantId){
		this.appendOperation(new OperationType(this.OPERATION_NAMESPACE + '.' + OperationType.BLIP_SET_AUTHOR),
				blip.getWaveId(), blip.getWaveletId(), blip.getBlipId(), [Parameter.of(ParamsProperty.BLIP_AUTHOR, participantId)]);
	}
	
	this.notifyRobotInformation = function(protocolVersion, capabilitiesHash) {
		this.prependOperation(new OperationType(this.OPERATION_NAMESPACE+ '.' + OperationType.ROBOT_NOTIFY), null, null, null,
		[Parameter.of(ParamsProperty.PROTOCOL_VERSION, protocolVersion),
		Parameter.of(ParamsProperty.CAPABILITIES_HASH, capabilitiesHash)]);
	}
	
	this.prependOperation = function(opType, waveId, waveletId, blipId, parameters) {
		return this.addOperation(opType, waveId, waveletId, blipId, 0, parameters);
	}
};

OperationQueue.generateTempBlipId = function(wavelet){
	return 'TBD_' + wavelet.waveletId.serialise() + '_' + 
			Math.floor(Math.random()*1000000);
};

OperationQueue.newBlip = function(wavelet, initialContent, parentBlipId, blipId, threadId){
	var newBlip = new Blip(blipId, [], initialContent, [], null, -1, -1, parentBlipId,
			threadId, [], {}, [], wavelet);
	if(parentBlipId != null){
		var parentBlip = wavelet.getBlips()[parentBlipId];
		if(parentBlip != null){
			parentBlip.getChildBlipIds().push(newBlip.getBlipId());
		}
	}
	wavelet.getBlips()[newBlip.getBlipId()] = newBlip;
	var thread = wavelet.getThread(threadId);
	if(thread != null){
		thread.appendBlip(newBlip);
	}
	return newBlip;
};
