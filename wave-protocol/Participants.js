Participants = function(participants, roles, wavelet, operationQueue){
	this.participants = participants.slice();
    this.roles = roles;
    this.wavelet = wavelet;
    this.operationQueue = operationQueue;
	
	this.add = function(participantId){
		if (participants.indexOf(participantId) != -1) {
			return false;
		}
		operationQueue.addParticipantToWavelet(wavelet, participantId);
		participants.push(participantId);
		return true;
	}
};