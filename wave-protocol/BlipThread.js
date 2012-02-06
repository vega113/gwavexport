BlipThread = function(id, location, blipIds, blips){
	this.id = id;
	this.location = location;
	this.blipIds = blipIds;
	this.blips = blips;
	
	this.appendBlip = function(blip){
		blipIds.push(blip.id);
	};
	
	this.isEmpty = function(){
		return this.blipIds.length == 0;
	};
	
	this.removeBlip = function(blip){
		for(var i = 0, b; b = this.blipIds[i]; i++){
			if(blip.id == b){
				return this.blipIds.splice(i, 1);
			}
		}
	};
	
	this.setLocation = function(location){
		this.location = location;
	};
	
	this.getId = function(){
		return this.id;
	};
	
	this.getBlips = function(){
		return this.blips;
	};
	
	this.getLocation = function(){
		return this.location;
	};
	
	this.getBlipIds = function(){
		return this.blipIds;
	};
}