function Range(start, end){
	this.start = start;
	this.end = end;
	
	this.getStart = function(){
		return this.start;
	};
	
	this.getEnd = function(){
		return this.end;
	};
	
	this.hashCode = function(){
		var prime = 31;
		var result = 1;
		result = prime * result + this.end;
		result = prime * result + this.start;
		return result;
	};
	
	this.equals = function(obj){
		if(!obj) return false;
		if(typeof obj != 'object') return false;
		if(obj.start == undefined || obj.end == undefined) return false;
		return this.start == obj.start && this.end == obj.end;
	};
}