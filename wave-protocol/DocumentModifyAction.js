function DocumentModifyAction(modifyHow, values, annotationKey, elements, 
		initialAnnotations, useMarkup){
	this.modifyHow = null;
	this.values = null;
	this.annotationKey = null;
	this.elements = null;
	this.useMarkup = false;
	this.bundledAnnotations = null;
	if(arguments.length){
		this.modifyHow = modifyHow;
		this.values = values;
		this.annotationKey = annotationKey;
		this.elements = elements;
		this.useMarkup = useMarkup;
		this.bundledAnnotations = initialAnnotations;
	}
	
	this.getModifyHow = function(){
		return this.modifyHow;
	}
	
	this.getValues = function() {
		return this.values;
	}
	
	this.getAnnotationKey = function() {
		return this.annotationKey;
	}
	
	this.getElements = function() {
		return this.elements;
	}
	
	this.isUseMarkup = function() {
		return this.useMarkup;
	}
	
	this.getValue = function(valueIndex) {
		if (this.values == null || !this.values.length) {
			return null;
		}
		return this.values[valueIndex % this.values.length];
	}
	
	this.getElement = function(valueIndex) {
		if (this.elements == null || !this.elements.length) {
			return null;
		}
		return this.elements[valueIndex % this.elements.length];
	}
	
	this.hasTextAt = function(valueIndex){
		if (this.values == null || !this.values.length) {
			return false;
		}
		return this.values[valueIndex % this.values.length] != null;
	}

	this.getBundledAnnotations = function() {
		return this.bundledAnnotations;
	}
}