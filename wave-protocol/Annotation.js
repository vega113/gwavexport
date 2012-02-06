function Annotation(name, value, start, end){
	if(arguments.length == 4){
		this.name = name;
		this.value = value;
		this.range = new Range(start, end);
	}
	else{
		this.name = name;
	    this.value = value;
	    this.range = new Range(start.getStart(), start.getEnd());
	}
	
	this.getName = function(){
		return this.name;
	};
	
	this.getValue = function(){
		return this.value;
	};
	
	this.getRange = function(){
		return this.range;
	};
	
	this.shift = function(position, shiftAmount){
		var start = this.range.getStart();
		if(start >= position){
			start += shiftAmount;
		}
		var end = this.range.getEnd();
		if(end >= position){
			end += shiftAmount;
		}
		this.range = new Range(start, end);
	};
	
	this.toString = function(){
		var res = 'Annotation(';
		if(this.name != null){
			res += this.name;
			res += ',';
		}
		if(this.value != null) {
			res += this.value;
			res += ',';
		}
		res += this.range.toString();
		return res.toString();
	}
}

Annotation.LANG = 'lang';
Annotation.BACKGROUND_COLOR = 'style/backgroundColor';
Annotation.COLOR = 'style/color';
Annotation.FONT_FAMILY = 'style/fontFamily';
Annotation.FONT_SIZE = 'style/fontSize';
Annotation.FONT_STYLE = 'style/fontStyle';
Annotation.FONT_WEIGHT = 'style/fontWeight';
Annotation.TEXT_DECORATION = 'style/textDecoration';
Annotation.VERTICAL_ALIGN = 'style/verticalAlign';