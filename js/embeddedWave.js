const WAVE_TITLE_CONTAINER_ID = 'gwextEmbeddedTitle';

function keydownHandler(e){
	if(e.altKey == false &&
		e.ctrlKey == true &&
		e.metaKey == false &&
		e.shiftKey == false &&
		e.keyCode == 69){
		var button = document.querySelector('div[title="Edit message [Ctrl+E]"]');
		button.dispatchEvent(getMouseClickEvent(button, 0, false, false, false, false));
		e.preventDefault();
		return;
	}
	/*if(e.altKey == false &&
		e.ctrlKey == false &&
		e.metaKey == false &&
		e.shiftKey == false &&
		e.keyCode == 13){
		var button = document.querySelector('div[title="Insert reply [Enter]"]');
		button.dispatchEvent(getMouseClickEvent(button, 0, false, false, false, false));
		e.preventDefault();
		return;
	}*/
}

function changeTitle(){
	try{
	   var title = document.querySelector('.document').querySelector('div').innerText;
	}
	catch(e){
		return;
	}
	var el = document.getElementById(WAVE_TITLE_CONTAINER_ID);
	if(el){
		el.innerText = title;
		return;
	}
	var logo = document.querySelector('img[src="static/images/wave_logo_embed.png"]');
	var container = logo.parentNode;
	var titleDiv = document.createElement('div');
	titleDiv.setAttribute('id', WAVE_TITLE_CONTAINER_ID);
	titleDiv.setAttribute('style', 'font-weight: bold; margin-left: 110px; font-size: 12px; margin-top: 0.3em;');
	titleDiv.innerText = title;
	container.appendChild(titleDiv);
}

window.setInterval(changeTitle, 2500);
window.addEventListener('keydown', keydownHandler, true);
