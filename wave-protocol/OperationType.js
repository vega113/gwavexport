OperationType = function(method){
	this.method = method;
};

OperationType.UNKNOWN = 'unknown';
OperationType.WAVELET_APPEND_BLIP = 'wavelet.appendBlip';
OperationType.WAVELET_CREATE = 'wavelet.create';
OperationType.WAVELET_REMOVE_SELF = 'wavelet.removeSelf';
OperationType.WAVELET_SET_TITLE = 'wavelet.setTitle';

OperationType.WAVELET_ADD_PARTICIPANT_NEWSYNTAX = 'wavelet.addParticipant';
OperationType.WAVELET_REMOVE_PARTICIPANT_NEWSYNTAX = 'wavelet.removeParticipant';

OperationType.WAVELET_APPEND_DATADOC = 'wavelet.appendDatadoc';
OperationType.WAVELET_SET_DATADOC = 'wavelet.setDatadoc';
OperationType.WAVELET_MODIFY_TAG = 'wavelet.modifyTag';
OperationType.WAVELET_MODIFY_PARTICIPANT_ROLE = 'wavelet.modifyParticipantRole';

OperationType.BLIP_CONTINUE_THREAD = 'blip.continueThread';
OperationType.BLIP_CREATE_CHILD = 'blip.createChild';
OperationType.BLIP_DELETE = 'blip.delete';
OperationType.BLIP_SET_AUTHOR = 'blip.setAuthor';
OperationType.BLIP_SET_CREATION_TIME = 'blip.setCreationTime';

OperationType.DOCUMENT_DELETE_ANNOTATION = 'document.deleteAnnotation';
OperationType.DOCUMENT_SET_ANNOTATION = 'document.setAnnotation';
OperationType.DOCUMENT_SET_ANNOTATION_NORANGE = 'document.setAnnotationNoRange';

OperationType.DOCUMENT_APPEND = 'document.append';
OperationType.DOCUMENT_APPEND_MARKUP = 'document.appendMarkup';
OperationType.DOCUMENT_APPEND_STYLED_TEXT = 'document.appendStyledText';
OperationType.DOCUMENT_DELETE = 'document.delete';
OperationType.DOCUMENT_INSERT = 'document.insert';
OperationType.DOCUMENT_MODIFY = 'document.modify';
OperationType.DOCUMENT_REPLACE = 'document.replace';

OperationType.DOCUMENT_APPEND_ELEMENT = 'document.appendElement';
OperationType.DOCUMENT_DELETE_ELEMENT = 'document.deleteElement';
OperationType.DOCUMENT_INSERT_ELEMENT = 'document.insertElement';
OperationType.DOCUMENT_INSERT_ELEMENT_AFTER = 'document.insertElementAfter';
OperationType.DOCUMENT_INSERT_ELEMENT_BEFORE = 'document.insertElementBefore';
OperationType.DOCUMENT_MODIFY_ELEMENT_ATTRS = 'document.modifyElementAttrs';
OperationType.DOCUMENT_REPLACE_ELEMENT = 'document.replaceElement';

OperationType.DOCUMENT_APPEND_INLINE_BLIP = 'document.appendInlineBlip';
OperationType.DOCUMENT_INSERT_INLINE_BLIP = 'document.insertInlineBlip';
OperationType.DOCUMENT_INSERT_INLINE_BLIP_AFTER_ELEMENT = 'document.insertInlineBlipAfterElement';

// Some operations not associated with a context
OperationType.ROBOT_FOLDER_ACTION = 'robot.folderAction';
OperationType.ROBOT_CREATE_WAVELET = 'robot.createWavelet';
OperationType.ROBOT_FETCH_MY_PROFILE = 'robot.fetchMyProfile';
OperationType.ROBOT_FETCH_PROFILES = 'robot.fetchProfiles';
OperationType.ROBOT_FETCH_WAVE = 'robot.fetchWave';
OperationType.ROBOT_NOTIFY = 'robot.notify';
OperationType.ROBOT_SEARCH = 'robot.search';