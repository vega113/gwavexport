BlipContent = function(){
	this.asElement = function(){
		if (!(this instanceof Element)){
			return null;
		}
		return this;
	}
	
	this.asPlaintext = function(){
		if(!(this instanceof Plaintext)){
			return null;
		}
		return this;
	}
}