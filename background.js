chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { hostContains: '.pinterest'}
					})
				],
				actions: [ new chrome.declarativeContent.ShowPageAction() ]
			}
		]);
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { hostContains: '.pinterdev'}
					})
				],
				actions: [ new chrome.declarativeContent.ShowPageAction() ]
			}
		]);
	});
});

chrome.pageAction.onClicked.addListener(function(tab){
	// edit "username" to match your own ldap name!
	var username = 'your_username';
	var url = tab.url;
	var split = tab.url.split(".com/");

	var host = split[0];
	var params = split.slice(1);
	var joined_params = params.join(".com/");
	
	if(host == 'https://api.pinterest'){
		chrome.tabs.update(tab.id, {url: "https://api-"+username+".pinterdev.com/" + joined_params});
	}
	if(host == 'https://api-'+username+'.pinterdev'){
		chrome.tabs.update(tab.id, {url: "https://api.pinterest.com/" + joined_params});
	}
	if(host == 'https://www.pinterest'){
		chrome.tabs.update(tab.id, {url: "https://"+username+".pinterdev.com/" + joined_params});
	}
	if(host == 'https://'+username+'.pinterdev'){
		chrome.tabs.update(tab.id, {url: "https://www.pinterest.com/" + joined_params});
	}
});

// A generic onclick callback function
function openPinOnClick(info, tab) {
	var newURL = "https://www.pinterest.com/pin/"+info.selectionText;
	chrome.tabs.create({ url: newURL });
}

// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
	var context = contexts[i];
	var title = "Open pin from selection";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context],
	                                   "onclick": openPinOnClick});
}