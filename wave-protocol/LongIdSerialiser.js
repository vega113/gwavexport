LongIdSerialiser = function(){
	
	/*
	
  
  @Override
  public String serialiseWaveRef(WaveRef waveRef) {
    StringBuilder result = new StringBuilder(waveRef.getWaveId().getDomain());
    result.append(WAVEREF_PART_SEPARATOR).append(waveRef.getWaveId().getId());
    if (waveRef.hasWaveletId()) {
      if (waveRef.getWaveId().getDomain().equals(waveRef.getWaveletId().getDomain())) {
        result.append(WAVEREF_PART_SEPARATOR).append("~");
      } else {
        result.append(WAVEREF_PART_SEPARATOR).append(waveRef.getWaveletId().getDomain());
      }
      result.append(WAVEREF_PART_SEPARATOR).append(waveRef.getWaveletId().getId());
      
      if (waveRef.hasDocumentId()) {
        result.append(WAVEREF_PART_SEPARATOR).append(waveRef.getDocumentId());
      }
    }
    return result.toString();
  }

  @Override
  public WaveId deserialiseWaveId(String serialisedForm) throws InvalidIdException {
    String[] parts = SimplePrefixEscaper.DEFAULT_ESCAPER.splitWithoutUnescaping(
        PART_SEPARATOR, serialisedForm);
    if ((parts.length != 2) || parts[0].isEmpty() || parts[1].isEmpty()) {
      throw new InvalidIdException(serialisedForm,
          "Wave id must be of the form <domain>" + PART_SEPARATOR + "<id>");
    } else {
      return new WaveId(parts[0], parts[1]);
    }
  }

  @Override
  public WaveletId deserialiseWaveletId(String serialisedForm) throws InvalidIdException {
    String[] parts = SimplePrefixEscaper.DEFAULT_ESCAPER.splitWithoutUnescaping(
        PART_SEPARATOR, serialisedForm);
    if ((parts.length != 2) || parts[0].isEmpty() || parts[1].isEmpty()) {
      throw new InvalidIdException(serialisedForm,
          "Wavelet id must be of the form <domain>" + PART_SEPARATOR + "<id>");
    } else {
      return new WaveletId(parts[0], parts[1]);
    }
  }

  @Override
  public WaveRef deserialiseWaveRef(String serialisedForm) throws InvalidWaveRefException {
    String[] tokens = serialisedForm.split(WAVEREF_PART_SEPARATOR);
    if (tokens.length < 2 || tokens.length == 3) {
      throw new InvalidWaveRefException(serialisedForm, "The waveref must be in the form "
          + "waveDomain/waveId[/waveletDomain/waveletId[/documentId]]");
    }

    if (tokens[0].length() == 0 || tokens[1].length() == 0) {
      throw new InvalidWaveRefException(serialisedForm, "The wave domain and the" +
          "wave Id must not be empty.");
    }
    String waveDomain = tokens[0];
    String waveId = tokens[1];

    if (tokens.length == 2) {
      return WaveRef.of(new WaveId(waveDomain, waveId));
    }

    if (tokens[2].length() == 0 || tokens[3].length() == 0) {
      throw new InvalidWaveRefException(serialisedForm, "The wavelet domain and the" +
      "wavelet Id must not be empty.");
    }
    
    String waveletDomain = tokens[2];
    if (waveletDomain.equals("~")) {
      waveletDomain = waveDomain;
    }
    String waveletId = tokens[3];

    if (tokens.length == 4) {
      return WaveRef.of(new WaveId(waveDomain, waveId), new WaveletId(waveletDomain, waveletId));
    } else {
      String documentId = tokens[4];
      return WaveRef.of(new WaveId(waveDomain, waveId), new WaveletId(waveletDomain, waveletId),
          documentId);
    }
  }
	 */
}

LongIdSerialiser.serialiseWaveId = function(waveId){
	return waveId.domain + IdSerialiser.PART_SEPARATOR + waveId.id;
}

LongIdSerialiser.serialiseWaveletId = function(waveletId){
	return waveletId.domain + IdSerialiser.PART_SEPARATOR + waveletId.id;
}

LongIdSerialiser.deserialiseWaveId = function(serialisedForm){
	var parts = SimplePrefixEscaper.DEFAULT_ESCAPER.splitWithoutUnescaping(
			IdSerialiser.PART_SEPARATOR, serialisedForm);
	if(!parts || !parts[0] || !parts[1]){
		console.error('Wave id must be of the form <domain>' + IdSerialiser.PART_SEPARATOR + '<id>');
	} else{
		return new WaveId(parts[0], parts[1]);
	}
}

LongIdSerialiser.deserialiseWaveletId = function(serialisedForm){
	var parts = SimplePrefixEscaper.DEFAULT_ESCAPER.splitWithoutUnescaping(
			IdSerialiser.PART_SEPARATOR, serialisedForm);
	if(!parts || !parts[0] || !parts[1]){
		console.error('Wave id must be of the form <domain>' + IdSerialiser.PART_SEPARATOR + '<id>');
	} else{
		return new WaveletId(parts[0], parts[1]);
	}
}