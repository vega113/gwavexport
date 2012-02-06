BlipData = function(waveId, waveletId, blipId, initialContent){
	if(arguments.length == 0){
		this.annotations = [];
		this.elements = {};
		this.childBlipIds = [];
		this.content = "\n";
		this.contributors = [];
		this.lastModifiedTime = -1;
		this.version = -1;
	}
	else if(arguments.length == 1){
		// Deep copy annotations.
		var blip = arguments[0];
		var blipAnnotations = blip.getAnnotations();
		this.annotations = [];
		for(var i in blipAnnotations){
			var an = blipAnnotations[i];
			var range = an.getRange();
			this.annotations.push(new Annotation(an.getName(), an.getValue(), range.getStart(), range.getEnd()));
		}
		// Deep copy form elements.
		var elements = cloneObject(blip.getElements());
		
		/*var elements = new HashMap<Integer, Element>();
    for (Entry<Integer, Element> entry : blip.getElements().entrySet()) {
      ElementType type = entry.getValue().getType();
      Element result = null;
      if (FormElement.getFormElementTypes().contains(type)) {
        result = new FormElement(type, entry.getValue().getProperties());
      } else if (type == ElementType.GADGET) {
        result = new Gadget(entry.getValue().getProperties());
      } else if (type == ElementType.IMAGE) {
        result = new Image(entry.getValue().getProperties());
      } else if (type == ElementType.LINE) {
        result = new Line(entry.getValue().getProperties());
      } else {
        result = new Element(type, entry.getValue().getProperties());
      }
      elements.put(entry.getKey(), result);
    }*/

		this.creator = blip.getCreator();
		this.childBlipIds = blip.getChildBlipIds();
		this.content = blip.getContent();
		this.contributors = blip.getContributors();
		this.blipId = blip.getBlipId();
		this.lastModifiedTime = blip.getLastModifiedTime();
		this.version = blip.getVersion();
		this.parentBlipId = blip.getParentBlipId();
		this.waveId = blip.getWaveId();
		this.waveletId = blip.getWaveletId();
		this.replyThreadIds = blip.getReplyThreadIds();
		this.threadId = blip.getThreadId();
	}
	else{
		this.annotations = [];
		this.elements = {};
		this.childBlipIds = [];
		this.contributors = [];
		this.waveId = waveId;
		this.waveletId = waveletId;
		
		// Make sure that initial content is valid, and starts with newline.
		if (!initialContent || !initialContent.length) {
			initialContent = "\n";
		} else if (!initialContent[0] != '\n') {
			initialContent = '\n' + initialContent;
		}
		this.content = initialContent;
	}
	
	this.addAnnotation = function(annotation){
    	this.annotations.push(annotation);
    };

	this.getAnnotations = function(){
		return this.annotations ? [] : this.annotations;
	};
	
	this.addElement = function(position, element){
		this.elements[position] = element;
	};
	
	this.getElements = function(){
		return this.elements;
	};
	
	this.getBlipId = function(){
		return this.blipId;
	};
	
	this.getChildBlipIds = function(){
		return this.childBlipIds;
	};
	
	this.getContributors = function(){
		return this.contributors;
	};
	
	this.getCreator = function(){
		return this.creator;
	};
	
	this.getContent = function(){
		return this.content;
	};
	
	this.getLastModifiedTime = function(){
		return this.lastModifiedTime;
	};
	
	this.getParentBlipId = function(){
		return this.parentBlipId;
	};
	
	this.getVersion = function(){
		return this.version;
	};
	
	this.getWaveId = function(){
		return this.waveId;
	};
	
	this.getWaveletId = function(){
		return this.waveletId;
	};
	
	this.setAnnotations = function(annotations){
		this.annotations = annotations;
	};
	
	this.setElements = function(map){
		this.elements = map;
	};
	
	this.setBlipId = function(blipId){
		this.blipId = blipId;
	};
	
	this.setChildBlipIds = function(childBlipIds){
		this.childBlipIds = childBlipIds;
	};

	this.addChildBlipId = function(blipId){
		this.childBlipIds.push(blipId);
	};
	
	this.setContributors = function(contributors){
		this.contributors = contributors;
	};
	
	this.addContributor = function(contributor){
		this.contributors.push(contributor);
	};

	this.setCreator = function(creator){
		this.creator = creator;
	};
	
	this.setContent = function(content){
		this.content = content;
	};
	
	this.setLastModifiedTime = function(lastModifiedTime){
		this.lastModifiedTime = lastModifiedTime;
	};
	
	this.setParentBlipId = function(parentBlipId){
		this.parentBlipId = parentBlipId;
	};
	
	this.setVersion = function(version){
		this.version = version;
	};
	
	this.setWaveId = function(waveId){
		this.waveId = waveId;
	};
	
	this.setWaveletId = function(waveletId){
		this.waveletId = waveletId;
	};
	
	this.removeChildBlipId = function(blipId){
		delete childBlipIds[blipId];
	};
	
	this.getReplyThreadIds = function(){
		return this.replyThreadIds;
	};
	
	this.setReplyThreadIds = function(replyThreadIds){
		this.replyThreadIds = replyThreadIds;
	};
	
	this.getThreadId = function(){
		return this.threadId;
	};
	
	this.setThreadId = function(threadId){
		this.threadId = threadId;
	};
};