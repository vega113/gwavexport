SimplePrefixEscaper = function(){
	this.prefix = arguments[0];
	this.needsEscaping = [];
	this.needsEscaping.push(this.prefix);
	for(var i = 1; i < arguments.length; i++) {
		this.needsEscaping.push(arguments[i]);
	}
	
	this.splitWithoutUnescaping = function(separator, toSplit){
		if(separator == this.prefix){
			console.error('It\'s unsafe to split strings together the prefix char.');
		}
		var ret = [];
		var start = 0;
		while(start <= toSplit.length){
			var end = start;
			
			while(end < toSplit.length && toSplit.charAt(end) != separator) {
				end += toSplit.charAt(end) == this.prefix ? 2 : 1;
			}
			if (end >= toSplit.length) {
				end = toSplit.length;
			}
			
			ret.push(toSplit.substring(start, end));
			start = end + 1;
			end = end + 1;
		}
		return ret;
	}
}

SimplePrefixEscaper.DEFAULT_ESCAPER = new SimplePrefixEscaper('~', '+', '!');