function Attachment(properties, data){
	if(typeof properties == 'string'){
		Element.call(ElementType.ATTACHMENT);
		this.setCaption(properties);
		this.data = data;
	}
	else{
		Element.call(ElementType.ATTACHMENT, properties);
		this.data = data;
	}
	
	this.getAttachmentId = function(){
		return this.getProperty(Attachment.ATTACHMENT_ID);
	}
	
	this.getAttachmentUrl = function(){
		return this.getProperty(Attachment.ATTACHMENT_URL);
	}
	
	this.setCaption = function(caption){
		this.setProperty(Attachment.CAPTION, caption);
	}
	
	this.getCaption = function(){
		return this.getProperty(Attachment.CAPTION);
	}
	
	this.getData = function(){
		if (!this.data){
			try{
				this.fetch();
			}
			catch (e){
				console.error(e);
			}
		}
		return this.data;
	}
	
	this.hasData = function(){
		return this.data != null && this.data != undefined;
	}
	
	this.getMimeType = function(){
		return this.getProperty(Attachment.MIME_TYPE);
	}
	
	this.restrictByCaption = function(caption){
		return Restriction.of(Attachment.CAPTION, caption);
	}
	
	this.restrictByMimeType = function(mimeType){
		return Restriction.of(Attachment.MIME_TYPE, mimeType);
	}
	
	this.restrictByAttachmentId = function(attachmentId){
		return Restriction.of(Attachment.ATTACHMENT_ID, attachmentId);
	}
	
	this.fetch = function(){
		if(this.getAttachmentUrl()){
			chrome.tabs.getSelected(null, function(tab){
				chrome.tabs.sendRequest(tab.id, {greeting: message}, function(response){
					
				});
			});
			/*InputStream input = null;
      ByteArrayOutputStream output = null;
      try {
        URL url = new URL(getAttachmentUrl());
        input = url.openStream();
        output = new ByteArrayOutputStream();
        int i;
        while ((i = input.read()) != -1) {
          output.write(i);
        }
        this.data = output.toByteArray();
      } finally {
        if (input != null) {
          input.close();
        }
        if (output != null) {
          output.close();
        }
      }*/
		}
	}
}

Attachment.ATTACHMENT_ID = 'attachmentId';
Attachment.CAPTION = 'caption';
Attachment.MIME_TYPE = 'mimeType';
Attachment.DATA = 'data';
Attachment.ATTACHMENT_URL = 'attachmentUrl';