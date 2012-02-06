function Gadget(properties){
	if(!properties){
		Element.call(this, ElementType.GADGET);
		this.setUrl('');
	}
	else if(typeof properties == 'string'){
		Element.call(this, ElementType.GADGET);
		this.setUrl(url);
	}
	else{
		Element.call(this, ElementType.GADGET, properties);
	}
	
	this.getAuthor = function() {
		return this.getProperty(Gadget.AUTHOR);
	}
	
	this.setAuthor = function(author) {
		this.setProperty(Gadget.AUTHOR, author);
	}
	
	this.getCategory = function() {
		return this.getProperty(Gadget.CATEGORY);
	}
	
	this.setIframe = function(iframe) {
		this.setProperty(Gadget.IFRAME, iframe);
	}
	
	this.getIframe = function() {
		return this.getProperty(Gadget.IFRAME);
	}
	
	this.setCategory = function(category) {
		this.setProperty(Gadget.CATEGORY, category);
	}
	
	this.getPref = function(){
		return this.getProperty(Gadget.PREF);
	}
	
	this.setPref = function(pref) {
		this.setProperty(Gadget.PREF, pref);
	}
	
	this.getThumbnail = function() {
		return this.getProperty(Gadget.THUMBNAIL);
	}
	
	this.setThumbnail = function(thumbnail) {
		this.setProperty(Gadget.THUMBNAIL, thumbnail);
	}
	
	this.getTitle = function() {
		return this.getProperty(Gadget.TITLE);
	}
	
	this.setTitle = function(title) {
		this.setProperty(Gadget.TITLE, title);
	}
	
	this.getUrl = function() {
		return this.getProperty(Gadget.URL);
	}
	
	this.setUrl = function(url) {
		this.setProperty(Gadget.URL, url);
	}
	
	this.restrictByAuthor = function(author) {
		return Parameter.of(Gadget.AUTHOR, author);
	}
	
	this.restrictByCategory = function(category) {
		return Parameter.of(Gadget.CATEGORY, category);
	}
	
	this.restrictByIframe = function(iframe) {
		return Parameter.of(Gadget.IFRAME, iframe);
	}
	
	this.restrictByPref = function(pref) {
		return Parameter.of(Gadget.PREF, pref);
	}
	
	this.restrictByThumbnail = function(thumbnail) {
		return Parameter.of(Gadget.THUMBNAIL, thumbnail);
	}
	
	this.restrictByTitle = function(title) {
		return Parameter.of(Gadget.TITLE, title);
	}
	
	this.restrictByUrl = function(url) {
		return Parameter.of(Gadget.URL, url);
	}
	
	this.restrictByProperty = function(key, value) {
		return Parameter.of(key, value);
	}
}

Gadget.AUTHOR = 'author';
Gadget.CATEGORY = 'category';
Gadget.IFRAME = 'ifr';
Gadget.PREF = 'pref';
Gadget.THUMBNAIL = 'thumbnail';
Gadget.TITLE = 'title';
Gadget.URL = 'url';
