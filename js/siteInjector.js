var buttonsConfig = [{
	buttonText: chrome.i18n.getMessage('hideAllOption'),
	params: {
		greeting: 'collapse'
	}
},{
	buttonText: chrome.i18n.getMessage('showAllOption'),
	params: {
		greeting: 'expand'
	}
},{
	buttonText: chrome.i18n.getMessage('deleteMessageOption'),
	params: {
		greeting: 'deleteMessage'
	},
	confirm: true,
	confirmText: chrome.i18n.getMessage('deleteConfirmation')
},{
	buttonText: chrome.i18n.getMessage('hideAllInsideOption'),
	params: {
		greeting: 'hideAllInlineReplies'
	}
},{
	buttonText: chrome.i18n.getMessage('showAllInsideOption'),
	params: {
		greeting: 'showAllInlineReplies'
	}
}];
//Копировать\Вставить сообщения
function clicker(button, config){
	button.onclick = function(){
		if(!config.confirm || (config.confirm && window.confirm(config.confirmText))){
			chrome.extension.sendRequest({greeting: 'redirect', params: config.params}, function(){});
		}
	}
}

function injectButtons(place, configuration){
    for(var i = 0, config; config = buttonsConfig[i]; i++){
    	var button = document.createElement('span');
    	button.setAttribute('class', 'btn');
    	if(configuration){
    		if(configuration['style']) button.setAttribute('style', configuration['style']);
    		if(configuration['class']) button.setAttribute('class', configuration['class']);
    	}
    	var a = document.createElement('a');
    	a.setAttribute('href', '#');
    	a.innerText = config.buttonText;
    	button.appendChild(a);
    	clicker(button, config);
    	place.appendChild(button)
    }
}

function onLoad(){
	var footer = document.getElementById('page-footer')
    var div = footer.querySelector('.footer-container');
    for(var i = 0, child; child = div.children[i];){
        div.removeChild(child);
    }
    injectButtons(div);
    div.style['padding-right'] = '75px';
    var allButton = document.createElement('span');
    allButton.setAttribute('class', 'inactive-btn btn');
    var a = document.createElement('a');
    a.setAttribute('href', '#');
    a.innerText = chrome.i18n.getMessage('All');
    allButton.appendChild(a);
    allButton.setAttribute('style', 'position:absolute; right:0; top:0;');
    var tooltip = document.createElement('div');
    tooltip.setAttribute('class', 'b-tooltip');
    tooltip.setAttribute('style', 'right:0; bottom:20px;');
    var arrow_down = document.createElement('div');
    arrow_down.setAttribute('class', 'b-arrow-down');
    arrow_down.setAttribute('style', 'background-position-x: 95%;');
    var container = document.createElement('div');
    container.setAttribute('class', 'b-tooltip-container');
    injectButtons(container, {'class': 'highlight', 'style': 'display: block; margin: 5px 0; text-align: left; padding: 2px 0;'});
    arrow_down.appendChild(container);
    tooltip.appendChild(arrow_down);
    allButton.appendChild(tooltip);
    allButton.onmouseover = function(){
    	tooltip.style['display'] = 'block';
    };
    allButton.onmouseout = function(){
        tooltip.style['display'] = 'none';
    };
    footer.appendChild(allButton);
}

onLoad();
