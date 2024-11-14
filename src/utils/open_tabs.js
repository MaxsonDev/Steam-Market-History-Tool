const OpenTabsCallback = {
	OpenTabPageAccounts: function(sender) {
		chrome.tabs.query({})
		.then(function(tabsList) {
			let extensionHost = chrome.runtime.getURL('');
			for (let tab of tabsList) {
				if (tab.url.includes(extensionHost)) {
					chrome.tabs.update(tab.id, {active: true});
					chrome.windows.update(tab.windowId, {focused: true});
					return
				}
			}
			let createProperties = {url: "/settings_page/settings.html#accounts"};
			if (sender && sender.tab) createProperties.windowId = sender.tab.windowId;
			chrome.tabs.create(createProperties);
		});
		return true;
	},

	CloseAllSteamcommuntyMarketTabs: function() {
		chrome.tabs.query({})
		.then(function(tabsList) {
			let promiseList = [];
			for (let tab of tabsList) {
				if (tab.url.match(/steamcommunity\.com\/market(?:\/?$|\/?[?#])/m)) {
					promiseList.push(chrome.tabs.remove(tab.id));
				}
			}
			return Promise.all(promiseList).then(() => {return true});
		})
	}
}

export { OpenTabsCallback }