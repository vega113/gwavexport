function Blip(blipId, childBlipIds, content, contributors, creator, lastModifiedTime,
			version, parentBlipId, threadId, annotations, elements, replyThreadIds,
			wavelet){
	if(arguments.length == 2){
		var other = blipId;
		var operationQueue = childBlipIds;
		this.blipId = other.blipId;
	    this.childBlipIds = other.childBlipIds;
	    this.inlineReplyThreads = other.inlineReplyThreads;
	    this.replyThreads = other.replyThreads;
	    this.content = other.content;
	    this.contributors = other.contributors;
	    this.creator = other.creator;
	    this.lastModifiedTime = other.lastModifiedTime;
	    this.version = other.version;
	    this.parentBlipId = other.parentBlipId;
	    this.thread = other.thread;
	    this.annotations = other.annotations;
	    this.elements = other.elements;
	    this.wavelet = other.wavelet;
	    this.operationQueue = operationQueue;
	}
	else{
		this.blipId = blipId;
		this.content = content;
		this.childBlipIds = childBlipIds;
		this.contributors = contributors.slice();
		this.creator = creator;
		this.lastModifiedTime = lastModifiedTime;
		this.version = version;
		this.parentBlipId = parentBlipId;
		this.thread = wavelet.getThread(threadId);
		this.annotations = new Annotations();
		for (var i in annotations) {
			this.annotations.add(annotations[i].getName(), annotations[i].getValue(),
				annotations[i].getRange().getStart(), annotations[i].getRange().getEnd());
		};
		this.inlineReplyThreads = [];
		this.elements = new cloneObject(elements);
		this.replyThreads = [];
		for (var replyThreadId in replyThreadIds) {
			var thread = wavelet.getThread(replyThreadIds[replyThreadId]);
			if (thread.location != -1) {
				this.inlineReplyThreads[thread.location] = thread;
			}
			else{
				this.replyThreads.push(thread);
			}
	    }
	    
	    if(!this.content){
			this.content = '\n';
		}
		else if(this.content.charAt(0) != '\n'){
			this.content = '\n' + this.content;
		}
	    
	    this.wavelet = wavelet;
	    this.operationQueue = wavelet.getOperationQueue();
	}
	var INLINE_BLIP_ELEMENT_ID_KEY = 'id';
	
    this.getBlipId = function(){
		return this.blipId;
	};
	
	this.getWaveId = function(){
		return this.wavelet.getWaveId();
	};
	
	this.getWaveletId = function(){
		return this.wavelet.getWaveletId();
	};
	
	this.getChildBlipIds = function(){
		return this.childBlipIds;
	};
	
	this.getChildBlips = function(){
		var result = [];
		for(var i in this.childBlipIds){
			var childBlip = this.wavelet.getBlips()[this.childBlipIds[i]];
			if(childBlip){
				result.push(childBlip);
			}
		}
	    return result;
	};
	
	this.getInlineReplyThreads = function(){
		var values = [];
		for(var i in this.inlineReplyThreads){
			values.push(this.inlineReplyThreads[i]);
		}
		return values;
	};
	
	this.getReplyThreads = function(){
		return this.replyThreads;
	};
	
	this.getContributors = function(){
		return this.contributors;
	};
	
	this.getCreator = function(){
		return this.creator;
	};

	this.getLastModifiedTime = function(){
		return this.lastModifiedTime;
	}
	
	this.getVersion = function(){
		return this.version;
	};

	this.getParentBlipId = function(){
		return this.parentBlipId;
	};

	this.getParentBlip = function(){
		if(this.parentBlipId == null){
			return null;
		}
		return this.wavelet.getBlips()[parentBlipId];
	};
	
	this.getThread = function(){
		return this.thread;
	};
	
	this.isRoot = function(){
		return this.blipId = this.wavelet.getRootBlipId();
	};
	
	this.getAnnotations = function(){
		return this.annotations;
	};

	this.getElements = function(){
		return this.elements;
	};
	
	this.getContent = function(){
		return this.content;
	};
	
	this.setContent = function(content){
		if(content[0] != '\n'){
			content = '\n' + content;
		}
		this.content = content;
	};
	
	this.length = function(){
		return this.content.length;
	};
	
	this.getWavelet = function(){
		return this.wavelet;
	};
	
	this.getOperationQueue = function() {
		return this.operationQueue;
	};
		
	this.insertInlineBlip = function(position){
		if (position <= 0 || position > this.content.length){
			console.error("Illegal inline blip position: " + position +
			". Position has to be greater than 0 and less than or equal to length.");
		}
		
		// Shift the elements.
		this.shift(position, 1);
		this.content = this.content.substring(0, position) + ' ' + this.content.substring(position);
		
		// Generate the operation.
		var inlineBlip =  this.operationQueue.insertInlineBlipToDocument(this, position);
		
		// Insert the inline blip element.
		var element = new Element(ElementType.INLINE_BLIP);
		element.setProperty(INLINE_BLIP_ELEMENT_ID_KEY, inlineBlip.getBlipId());
		this.elements[position] = element;
		return inlineBlip;
	};
	
	this.reply = function(){
		return this.operationQueue.createChildOfBlip(this);
	};
	
	this.continueThread = function(){
		return this.operationQueue.continueThread(this);
	};
	
	this.addThread = function(thread){
		if(thread.getLocation() == -1){
			this.replyThreads.push(thread);
		}
		else{
			this.inlineReplyThreads[thread.getLocation()] = thread;
		}
	};
	
	this.serialize = function(){
		var blipData = new BlipData();
		
		// Add primitive properties.
		blipData.setBlipId(blipId);
	    blipData.setWaveId(wavelet.getWaveId().serialise());
	    blipData.setWaveletId(wavelet.getWaveletId().serialise());
	    blipData.setParentBlipId(parentBlipId);
	    blipData.setThreadId(this.thread.getId());
	    blipData.setCreator(creator);
	    blipData.setLastModifiedTime(lastModifiedTime);
	    blipData.setVersion(version);
	    blipData.setContent(content);
	    
	    // Add list and map properties.
		blipData.setChildBlipIds(childBlipIds);
		blipData.setContributors(contributors);
		blipData.setElements(elements);
		
		// Add annotations.
		var annotations = cloneObject(this.annotations);
		blipData.setAnnotations(annotations);
		
		// Add reply threads ids.
		var replyThreadIds = [];
		for(var i in this.inlineReplyThreads){
			replyThreadIds.push(this.inlineReplyThreads[i].getId());
		}
		for(var i in this.replyThreads){
			replyThreadIds.push(this.replyThreads[i].getId());
		}
		blipData.setReplyThreadIds(replyThreadIds);
		
		return blipData;
	}
	
	this.shift = function(position, shiftAmount){
		var newElements = {};
		var newInlineReplyThreads = [];
		for(var i = 0; i < position && i < this.elements.length; i++){
			newElements[i] = this.elements[i];
			newInlineReplyThreads[i] = this.inlineReplyThreads[i];
		}
		for(var i = position; i < this.elements.length; i++){
			newElements[i + shiftAmount] = this.elements[i];
			var thread = this.inlineReplyThreads[i];
			tread.setLocation(thread.getLocation() + shiftAmount);
			newInlineReplyThreads[i] = thread;
		}
		this.elements = newElements;
		this.inlineReplyThreads = newInlineReplyThreads;
		this.annotations.shift(position, shiftAmount);
	}
	
	this.deleteAnnotations = function(start, end){
		var nameSet = this.annotations.nameSet();
		for (var i in nameSet){
			var name = nameSet[i];
		}
		this.annotations.del(name, start, end);
	}
	
	this.append = function(argument) {
		var array = [argument];
		return BlipContentRefs.all(this).insertAfter(array);
	}
	
	this.range = function(start, end){
		return BlipContentRefs.range(this, start, end);
	}

	this.all = function(target, maxResult, restrictions){
		switch(arguments.length){
		case 0:
			return BlipContentRefs.all(this);
			break;
		case 1:
			return BlipContentRefs.all(this, target, -1);
			break;
		case 2:
			if(target instanceof ElementType){
				return BlipContentRefs.all(this, target, -1, maxResult);
			}
			else{
				return BlipContentRefs.all(this, target, maxResult);
			}
			break;
		case 3:
			return BlipContentRefs.all(this, target, maxResult, restrictions);
		}
	}
	
	this.setAuthor = function(participantId){
		this.operationQueue.setBlipAuthor(this, participantId);
	}
};

Blip.deserialize = function(operationQueue, wavelet, blipData){
	// Extract primitive properties.
	var blipId = blipData.blipId;
	var parentBlipId = blipData.parentBlipId;
	var threadId = blipData.threadId;
	var creator = blipData.creator;
	var lastModifiedTime = blipData.lastModifiedTime;
	var version = blipData.version;
	var content = blipData.content;
	var childBlipIds = blipData.childBlipIds.sort();
	var replyThreadIds = blipData.replyThreadIds;
	var contributors = blipData.contributors;
	var annotations = [];
	for(var i in blipData.annotations){
		var annotation = blipData.annotations[i];
		var range = annotation.range;
		annotations.push(new Annotation(annotation.name, annotation.value, range.start, range.end));
	}
	var elements = {};
	for(var i in blipData.elements)
		elements[i] = new Element(blipData.elements[i].type, blipData.elements[i].properties);
	
	return new Blip(blipId, childBlipIds, content, contributors, creator, lastModifiedTime,
		version, parentBlipId, threadId, annotations, elements, replyThreadIds, wavelet)
}
