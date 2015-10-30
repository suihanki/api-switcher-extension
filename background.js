// A generic onclick callback function.
function openPinOnClick(info, tab) {
  alert("Here is the text: "+info.selectionText);
  var newURL = "https://www.pinterest.com/pin/"+info.selectionText;
  chrome.tabs.create({ url: newURL });
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Open pin from selection";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": openPinOnClick});
  console.log("'" + context + "' item:" + id);
}

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
	var username = 'brendan';
	var url = tab.url;
	var host = tab.url.split(".com/")[0];
	var params = tab.url.split(".com/")[1];
	if(host == 'https://api.pinterest'){
		chrome.tabs.update(tab.id, {url: "https://api-"+username+".pinterdev.com/" + params});
	}
	if(host == 'https://api-'+username+'.pinterdev'){
		chrome.tabs.update(tab.id, {url: "https://api.pinterest.com/" + params});
	}
});