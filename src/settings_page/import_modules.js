import { UpdateListingsSW, IsListingPollerWorkSW, DeleteAccountSW, AddNewAccountSW, GetStatusOfListingPollerSW, StopListingPollerSW, GetAllAccountsSW, UpdateAccountDataSW, CloseAllSteamcommuntyMarketTabsSW, DeleteAllDatabasesSW } from '../requests/service_worker_api.js';
import { parseUserData, parseSteamLanguages, parseHistoryMessage, isMarketPageLoadCorrect, whyMyHistoryEmpty } from '../parsers/market_page_parser.js'
import { removeChildrensNode, languagesOfflineDict, isOutOfMemory } from '../utils/utils.js';
import { RequestMarketPage, RequestMyHistory } from '../requests/requests.js';

// request.js
window.RequestMarketPage = RequestMarketPage;
window.RequestMyHistory = RequestMyHistory;

// market_page_parse.js
window.parseUserData = parseUserData;
window.parseSteamLanguages = parseSteamLanguages;
window.parseHistoryMessage = parseHistoryMessage;
window.isMarketPageLoadCorrect = isMarketPageLoadCorrect;
window.whyMyHistoryEmpty = whyMyHistoryEmpty;

// utils.js
window.removeChildrensNode = removeChildrensNode;
window.languagesOfflineDict = languagesOfflineDict;
window.isOutOfMemory = isOutOfMemory;

// service_worker_api.js
window.UpdateListingsSW = UpdateListingsSW;
window.IsListingPollerWorkSW = IsListingPollerWorkSW;
window.GetStatusOfListingPollerSW = GetStatusOfListingPollerSW;
window.StopListingPollerSW = StopListingPollerSW;

window.AddNewAccountSW= AddNewAccountSW;
window.UpdateAccountDataSW = UpdateAccountDataSW;
window.GetAllAccountsSW = GetAllAccountsSW;
window.DeleteAccountSW = DeleteAccountSW;

window.CloseAllSteamcommuntyMarketTabsSW = CloseAllSteamcommuntyMarketTabsSW;
window.DeleteAllDatabasesSW = DeleteAllDatabasesSW;