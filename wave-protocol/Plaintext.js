Plaintext = function(text){
	BlipContent.call(this);
	this.text = text;
	
	this.append = function(text){
		this.text.concat(text);
		return this;
	}
	
	this.getText = function(){
		return this.text;
	}
	
	this.equals = function(o){
		try{
			var res = this.text == o.text;
			return res;
		}
		catch(e){
			return false;
		}
	}
}

Plaintext.of = function(text){
	return new Plaintext(text)
}
/*
  @Override
  public int hashCode() {
    return text.toString().hashCode();
  }

  
}
*/