function sendMessageSW(eventName, eventData) {
	return new Promise(function(resolve) {
		let message = {
			event: eventName
		}
		if (eventData) {
			message.data = eventData;
		}
		chrome.runtime.sendMessage(message, function(result) {
			resolve(result)
		})
	})
}

export function SearchListingsRequestSW(query) {
	return sendMessageSW("SearchListingsRequest", query);
}

export function GetStatusOfListingPollerSW() {
	return sendMessageSW("GetStatusOfListingPoller");
}

export function IsListingPollerWorkSW() {
	return sendMessageSW("IsListingPollerWork");
}

export function GetListOfSupportedAppsSW(steamid) {
	return sendMessageSW("GetListOfSupportedApps", steamid);
}

export function GetAppFiltersSW(appData) {
	return sendMessageSW("GetAppFilters", appData);
}

export function UpdateListingsSW(steamid) {
	return sendMessageSW("UpdateListings", steamid);
}

export function StopListingPollerSW() {
	return sendMessageSW("StopListingPoller");
}

export function GetAllAccountsSW() {
	return sendMessageSW("GetAllAccounts");
}

export function GetAccountSW(steamid) {
	return sendMessageSW("GetAccount", steamid);
}

export function AddNewAccountSW(accountData) {
	return sendMessageSW("AddNewAccount", accountData);	
}

export function UpdateAccountDataSW(accountData) {
	return sendMessageSW("UpdateAccountData", accountData);		
}

export function CreateNewListingsDBSW(steamid) {
	return sendMessageSW("CreateNewListingsDB", steamid);
}

export function DeleteAccountSW(steamid) {
	return sendMessageSW("DeleteAccount", steamid);
}

export function DeleteListingsDBSW(steamid) {
	return sendMessageSW("DeleteListingsDB", steamid);
}

export function OpenTabPageAccountsSW() {
	return sendMessageSW("OpenTabPageAccounts");
}

export function CloseAllSteamcommuntyMarketTabsSW() {
	return sendMessageSW("CloseAllSteamcommuntyMarketTabs");
}

export function DeleteAllDatabasesSW() {
	return sendMessageSW("DeleteAllDatabases")
}