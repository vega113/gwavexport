DataDocuments = function(dataDocuments, wavelet, operationQueue){
	this.dataDocuments = cloneObject(dataDocuments);
    this.wavelet = wavelet;
    this.operationQueue = operationQueue;
	
};