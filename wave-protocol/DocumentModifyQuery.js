function DocumentModifyQuery(match, restrictions, maxRes){
	switch(!argumets.length){
	case 0:
		this.textMatch = null;
		this.elementMatch = null;
		this.restrictions = null;
		this.maxRes = -1;
		break;
	case 2:
		var maxRes = restrictions;
		this.textMatch = match;
		this.elementMatch = null;
		this.restrictions = null;
		this.maxRes = maxRes;
		break;
	case 3:
		this.textMatch = null;
		this.elementMatch = match;
		this.restrictions = restrictions;
		this.maxRes = maxRes;
		break;
	}
	
	this.getTextMatch = function(){
		return this.textMatch;
	}
	
	this.getElementMatch = function(){
		return this.elementMatch;
	}
	
	this.getRestrictions = function(){
		return this.restrictions;
	}
	
	this.getMaxRes = function(){
		return this.maxRes;
	}
}