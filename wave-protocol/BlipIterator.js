function BlipIterator(blip, target, maxHits, rangeSize){
	this.blip = blip;
	this.target = target;
	this.maxHits = maxHits;
	this.rangeSize = rangeSize;
	
	this.reset = function(){
		this.position = -1;
		this.hitsLeft = maxHits;
	}
	
	this.hasNext = function(){
		return this.hitsLeft != 0  && this.getNextIndex() != -1;
	}
	
	this.next = function(){
		if(this.hitsLeft == 0){
			throw 'NoSuchElementException()';
		};
		
		var index = this.getNextIndex();
		if(index == -1){
			throw 'NoSuchElementException()';
		}
		this.hitsLeft--;
		this.position = index;
		return new Range(this.position, this.position + this.rangeSize);
	}
	
	this.remove = function(){
		throw 'UnsupportedOperationException()';
	}
	
	this.shift = function(shiftAmount){
		this.position += shiftAmount;
	}
	
	this.reset();
}

BlipIterator.TextIterator = function(blip, target, maxHits){
	BlipIterator.call(this, blip, target, maxHits, target.length);
	
	this.getNextIndex = function(){
		return blip.getContent().indexOf(target, this.position + 1);
    }
}

BlipIterator.SingleshotIterator = function(blip, start, end){
	BlipIterator.call(this, blip, null, 1, end - start);
	this.start = start;

	this.getNextIndex = function(){
		return this.start;
	}
}

BlipIterator.ElementIterator = function(blip, target, restrictions, maxHits){
	BlipIterator.call(this, blip, target, maxHits, 1)
	this.restrictions = restrictions;

	this.getNextIndex = function(){
		var index = -1;
		var elems = this.blip.getElements();
		for(var i in elems){
			if(i < this.position + 1) continue;
			if(this.match(elems[i])){
				index = i;
				break;
			}
		}
	}

	this.match = function(element){
		if(element.getType() != this.target) {
			return false;
		}
		
		if(this.restrictions == null){
			return true;
		}
		
		for(var i in this.restrictions){
			if(this.restrictions[i] != element.getProperty(i)){
				return false;
			}
		}
		return true;
	}
  }