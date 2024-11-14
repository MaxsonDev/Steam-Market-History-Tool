import { DatabasesCallback } from './bundle/bundle.js';
import { ListingPollerCallback } from './bundle/bundle.js';
import { TagsCallback } from './bundle/bundle.js';
import { SearchListingsCallback } from './bundle/bundle.js';
import { StatusPollerCallback } from './bundle/bundle.js';
import { OpenTabsCallback } from './utils/open_tabs.js';

chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == 'install') {
        OpenTabsCallback.OpenTabPageAccounts();
    }
})

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (['GetAllAccounts', 'AddNewAccount', 'GetAccount', 'DeleteAccount', 'UpdateAccountData', 'GetListOfSupportedApps', 'DeleteAllDatabases'].includes(message.event)) {
        asyncResponseManager(DatabasesCallback, message, sendResponse);
        return true;
    }

    if (['GetStatusOfListingPoller'].includes(message.event)) {
        asyncResponseManager(StatusPollerCallback, message, sendResponse, sender);
        return true;
    }    

    if (['UpdateListings', 'StopListingPoller', 'IsListingPollerWork'].includes(message.event)) {
        asyncResponseManager(ListingPollerCallback, message, sendResponse);
        return true;
    }

    if (['GetAppFilters'].includes(message.event)) {
        asyncResponseManager(TagsCallback, message, sendResponse);
        return true;
    }

    if (['SearchListingsRequest'].includes(message.event)) {
        asyncResponseManager(SearchListingsCallback, message, sendResponse, sender);
        return true;
    }

    if (['OpenTabPageAccounts', 'CloseAllSteamcommuntyMarketTabs'].includes(message.event)) {
        asyncResponseManager(OpenTabsCallback, message, sendResponse, sender);
        return true;
    }
})

async function asyncResponseManager(callback, message, sendResponse, sender) {
    let result;
    if (message.data) {
        if (sender) {
            result = await callback[message.event](message.data, sender);
        } else {
            result = await callback[message.event](message.data);    
        }
        
    } else {
        if (sender) {
            result = await callback[message.event](sender);
        } else {
            result = await callback[message.event]();
        }
    }
    sendResponse(result);
}
