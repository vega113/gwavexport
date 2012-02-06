function Element(type, properties){
	BlipContent.call(this);
	if(arguments.length == 1){
		this.type = type;
		this.properties = {};
	}
	else{
		this.type = type;
    	this.properties = properties;
	}
	
	this.getType = function(){
		return this.type;
	}
	
	this.getProperties = function(){
		return this.properties;
	}
	
	this.setProperty = function(name, value){
		this.properties[name] = value;
	}
	
	this.getProperty = function(name, defaultValue){
		if(defaultValue == undefined){
			defaultValue = null;
		}
		var property = this.properties[name];
		if(property != undefined && property != null){
			return property;
		}
		return defaultValue;
	}
	
	this.isGadget = function(){
		return this.type == ElementType.GADGET;
	}
	
	this.isInlineBlip = function(){
		return this.type == ElementType.INLINE_BLIP;
	}
	
	this.isImage = function(){
		return this.type == ElementType.IMAGE;
	}
	
	this.isAttachment = function(){
		return this.type == ElementType.ATTACHMENT;
	}
	
	this.getText = function(){
		return this.type == ElementType.LINE ? "\n" : " ";
	}
}

/*  public boolean isFormElement() {
    return FormElement.getFormElementTypes().contains(type);
  }
}*/