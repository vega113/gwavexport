function Annotations(store){
	this.store = {};
	this.size = 0;
    
	this.add = function(name, value, start, end){
		if(!(name in this.store)){
			this.store[name] = [new Annotation(name, value, start, end)];
			this.size++;
			return;
		}
		var annotation = this.store[name];
		var existingSize = annotation.length;
		var newList = [];
		for(var i in this.store[name]){
			var existing = this.store[name][i];
			if (start > existing.getRange().getEnd() || end < existing.getRange().getStart()) {
				// Add non-overlapping annotation to the new list as is.
				newList.push(existing);
			}
			else if (existing.getValue() == value) {
				// Merge the annotation.
				start = Math.min(existing.getRange().getStart(), start);
				end = Math.max(existing.getRange().getEnd(), end);
			}
			else{
				// Chop the bits off the existing annotation.
				if (existing.getRange().getStart() < start) {
					newList.push(new Annotation(existing.getName(), existing.getValue(),
					existing.getRange().getStart(), start));
				}
				if (existing.getRange().getEnd() > end) {
					newList.push(new Annotation(existing.getName(), existing.getValue(),
						end, existing.getRange().getEnd()));
				}
			}
		}
		newList.push(new Annotation(name, value, start, end));
		this.store[name] = newList;
		this.size += newList.length - existingSize;
	}
	
	this.del = function(name, start, end){
		if(this.store[name] == undefined){
			return;
		}
		var annotation = this.store[name];
		var existingSize = annotation.length;
		var newList = [];
		for(var i in this.store[name]){
			var existing = this.store[name][i];
			if(start > existing.getRange().getEnd() || end < existing.getRange().getStart()){
				newList.push(existing);
			}
			else if(start < existing.getRange().getStart() && end > existing.getRange().getEnd()){
				continue;
			}
			else {
				// Chop the bits off the existing annotation.
				if (existing.getRange().getStart() < start) {
					newList.push(new Annotation(existing.getName(), existing.getValue(),
						existing.getRange().getStart(), start));
				}
				if(existing.getRange().getEnd() > end) {
					newList.push(new Annotation(existing.getName(), existing.getValue(),
						end, existing.getRange().getEnd()));
				}
			}
		}
		if(newList.length){
			this.store.put(name, newList);
		}
		else{
			this.store.remove(name);
		}
		this.size -= existingSize - newList.length;
	}
	
	this.shift = function(position, shiftAmount){
		for(var i in this.store){
			var annotations = this.store[i];
			for(var i in annotations){
				var annotation = annotations[i];
				annotation.shift(position, shiftAmount);
			}
		}
		
		// Merge fragmented annotations that should be contiguous, for example:
		// Annotation("foo", "bar", 1, 2) and Annotation("foo", "bar", 2, 3).
		for(var i in this.store){
			var existingList = this.store[i];
			var newList = [];
			for(var j = 0; j < existingList.length; ++j){
				var annotation = existingList[j];
				var name = annotation.getName();
				var value = annotation.getValue();
				var start = annotation.getRange().getStart();
				var end = annotation.getRange().getEnd();
				
				// Find the last end index.
				for(var k = j + 1; k < existingList.length; ++k) {
					if (end < existingList[k].getRange().getStart()){
						break;
					}
					if(end == existingList[k].getRange().getStart() &&
							value == existingList[k].getValue()) {
						end = existingList[k].getRange().getEnd();
						existingList.remove(k--);
					}
				}
				newList.push(new Annotation(name, value, start, end));
			}
			this.store[i] = newList;
		}
	}
	
	this.get = function(name){
		return this.store[name];
	}
	
	this.size = function(){
		return this.store.length;
	}
	
	this.nameSet = function(){
		return this.store;
	}
	
	this.asList = function(){
		var annotations = [];
		for(var i in this.store){
			annotations.push(this.store[i]);
		}
		return annotations;
	}
/*
  @Override
  public Iterator<Annotation> iterator() {
    return new AnnotationIterator(store);
  }*/
}