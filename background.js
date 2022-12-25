browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	fetch(message.endpoint, {
		'method': 'GET'
	}).then((response) => {
		if (response && response.ok) {
			response.json().then((json) => {
				sendResponse(json);
			});
		}
	}).catch((error) => {
		console.log(error);
	});
	return true;
});

browser.tabs.onUpdated.addListener(
	function (tabId, changeInfo, tab) {
		if (changeInfo.url) {
			browser.tabs.sendMessage(tabId, {
				type: 'update',
				url: changeInfo.url
			})
		}
	}
);