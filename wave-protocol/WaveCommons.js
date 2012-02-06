function cloneObject(source){
	for (i in source) {
		if (typeof source[i] == 'source') {
			this[i] = new cloneObject(source[i]);
		}
		else{
			this[i] = source[i];
		}
	}
}

function extend(Child, Parent) {
    var F = function() { }
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.superclass = Parent.prototype    
}

var emptyFn = function(){};