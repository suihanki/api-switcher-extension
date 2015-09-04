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