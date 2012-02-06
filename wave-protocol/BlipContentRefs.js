function BlipContentRefs(blip, iterator, parameters){
	this.blip = blip;
    this.iterator = iterator;
    this.parameters = parameters;
    
    this.execute = function(modifyHow, bundledAnnotations, argument){
    	// If there is no match found, return immediately without generating op.
    	if(!this.iterator.hasNext()){
    		return this;
    	}
    	var nextIndex = 0;
    	var next = null;
    	var computed = [];
    	var updatedElements = [];
    	var useMarkup = false;
    	while(this.iterator.hasNext()){
    		var range = this.iterator.next();
    		var start = range.getStart();
    		var end = range.getEnd();
    		if(!this.blip.length() && (start != 0 || end != 0)){
    			throw ("Start and end have to be 0 for empty blip.");
    		}
    		else if(start < 0 || end < 1){
    			throw ("Position outside the blip.");
    		}
    		// TODO 
    		else if((start >/*=*/ this.blip.length() || end > this.blip.length()) &&
    			modifyHow != ModifyHow.INSERT){
				throw "Position outside the blip.";
			}
			else if (start > this.blip.length() && modifyHow == ModifyHow.INSERT) {
				throw ("Position outside the blip.");
			}
			// TODO
			else if (start >/*=*/ end){
				throw ("Start has to be less than end.");
			}
			
			// Get the next argument.
			if (nextIndex < argument.length){
				next = argument[nextIndex];
				// If the next argument is a function, call the function.
				if (next instanceof Function) {
					// Get the matched content.
					var source;
					if (end - start == 1 && (this.blip.getElements()[start] != undefined)){
						source = this.blip.getElements()[start];
					}
					else{
						source = Plaintext.of(this.blip.getContent().substring(start, end));
					}
					// Compute the new content.
					next = next(source);
					if (next instanceof BlipContent){
						computed.push(next);
					}
				}
		        nextIndex = ++nextIndex % argument.length;
			}
			switch (modifyHow){
			case 'DELETE':
				// You can't delete the first newline.
				if (start == 0){
					start = 1;
				}
				blip.deleteAnnotations(start, end);
				blip.shift(end, start - end);
				this.iterator.shift(-1);
				blip.setContent(blip.getContent().substring(0, start) +
						blip.getContent().substring(end));
				break;
			case 'ANNOTATE':
				var annotation = next;
				blip.getAnnotations().add(annotation.getName(), annotation.getValue(), start, end);
				break;
			case 'CLEAR_ANNOTATION':
				var annotationName = argument[0];
				blip.getAnnotations().del(annotationName, start, end);
				break;
			case 'UPDATE_ELEMENT':
				var existingElement = blip.getElements()[start];
				if (existingElement == null) {
					throw "No element found at index " + start + ".";
				}
				var properties = next;
				updatedElements.add(new Element(existingElement.getType(), properties));
				for(var i in properties){
					existingElement.setProperty(i, properties[i]);
				}
				break;
			case 'INSERT':
				end = start;
			case 'INSERT_AFTER':
				start = end;
			case 'REPLACE':
				// Get the plain-text version of next.
				var text = (next && next.getText)?next.getText():' ';
				
				// Compute the shift amount for the iterator.
				var iteratorShiftAmount = text.length - 1;
				if (end == start) {
					iteratorShiftAmount += range.getEnd() - range.getStart();
				}
				iterator.shift(iteratorShiftAmount);
				
				// In the case of a replace, and the replacement text is shorter, 
				// delete the delta.
				if (start != end && text.length < end - start) {
					blip.deleteAnnotations(start + text.length(), end);
				}
				blip.shift(end, text.length + start - end);
				blip.setContent(blip.getContent().substring(0, start) + text +
						blip.getContent().substring(end));
				if (next instanceof Element) {
					blip.getElements()[start] = next;
				}
				else if (bundledAnnotations != null) {
					for(var i in bundledAnnotations) {
						blip.getAnnotations().add(i, bundledAnnotations[i], start, 
								start + text.length());
					}
				}
				break;
			}
			
		}
		
		var op = blip.getOperationQueue().modifyDocument(blip);
		for(var i in parameters){
			op.addParameter(parameters[i]);
		}
		
		// Prepare the operation parameters.
		var values = null;
		var annotationName = null;
		var elements = null;
		switch(modifyHow){
		case 'UPDATE_ELEMENT':
			elements = updatedElements;
			break;
		case 'ANNOTATE':
			values = [];
			for (var i in argument){
				var item = argument[i];
				values.push(item.getValue());
			}
			annotationName = argument[0].getName();
			break;
		case 'CLEAR_ANNOTATION':
			annotationName = argument[0].toString();
			break;
		case 'INSERT':
		case 'INSERT_AFTER':
		case 'REPLACE':
			values = [];
			elements = [];
			var toBeAdded = argument;
			if(argument[0] instanceof Function) {
				toBeAdded = computed;
			}
			for(var i in toBeAdded) {
				var a = toBeAdded[i];
				if (a instanceof Plaintext){
					values.push(a.getText());
					elements.push(null);
				}
				else{
					elements.push(a);
					values.push(null);
				}
			}
			break;
		}
		
		op.addParameter(Parameter.of(ParamsProperty.MODIFY_ACTION,
        		new DocumentModifyAction(modifyHow, values, annotationName, elements, 
        		bundledAnnotations, useMarkup)));
        
        iterator.reset();
        return this;
	}
	
	this.insert = function(bundledAnnotations, a){
		if(arguments.length == 1){
			a = bundledAnnotations;
			bundledAnnotations = null;
		}
		if(typeof a[0] == 'string'){
			var array = [];
			for(var i = 0; i < a.length; ++i){
				array[i] = Plaintext.of(a[i]);
			}
			return this.execute(ModifyHow.INSERT, bundledAnnotations, array);
		}
		return this.execute(ModifyHow.INSERT, bundledAnnotations, a)
	}
	
	this.insertAfter = function(bundledAnnotations, a){
		if(arguments.length == 1){
			a = bundledAnnotations;
			bundledAnnotations = null;
		}
		if(typeof a[0] == 'string'){
			var array = [];
			for(var i = 0; i < a.length; ++i){
				array[i] = Plaintext.of(a[i]);
			}
			return this.execute(ModifyHow.INSERT_AFTER, bundledAnnotations, array);
		}
		return this.execute(ModifyHow.INSERT_AFTER, bundledAnnotations, a);
	}
	
	this.annotate = function(key, values) {
		if (values.length == 0) {
			values = [key];
		}
		var annotations = [];
		for (var i in values) {
			annotations.push(new Annotation(key, values[i], 0, 1));
		}
		return this.execute(ModifyHow.ANNOTATE, null, annotations);
	}
	
	this.replace = function(bundledAnnotations, argument){
		if(arguments.length == 1){
			argument = bundledAnnotations;
			bundledAnnotations = null;
		}
		if(typeof argument[0] == 'string'){
			var array = [];
			for(var i = 0; i < argument.length; ++i){
				array[i] = Plaintext.of(argument[i]);
			}
			return this.execute(ModifyHow.INSERT_AFTER, bundledAnnotations, array);
		}
		return this.execute(ModifyHow.REPLACE, bundledAnnotations, argument);
	}
	
	this.del = function(){
		return this.execute(ModifyHow.DELETE, null, []);
	}
}

BlipContentRefs.all = function(blip, target, maxResult, restrictions){
	switch(arguments.length){
	case 1:
		return new BlipContentRefs(blip, 
			new BlipIterator.SingleshotIterator(blip, 0, blip.getContent().length));
	case 3:
		return new BlipContentRefs(blip,
	        new BlipIterator.TextIterator(blip, target, maxResult),
	        Parameter.of(ParamsProperty.MODIFY_QUERY, new DocumentModifyQuery(target, maxResult)));
	case 4:
		return new BlipContentRefs(blip,
			new BlipIterator.ElementIterator(blip, target, restrictionsAsMap, maxResult),
			Parameter.of(ParamsProperty.MODIFY_QUERY,
			new DocumentModifyQuery(target, restrictionsAsMap, maxResult)));
	}
};

BlipContentRefs.range = function(blip, start, end){
	return new BlipContentRefs(blip,
		new BlipIterator.SingleshotIterator(blip, start, end),
		[Parameter.of(ParamsProperty.RANGE, new Range(start, end))]);
} 