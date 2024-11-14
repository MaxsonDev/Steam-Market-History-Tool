import { SearchListingsRequestSW, GetAppFiltersSW, OpenTabPageAccountsSW, GetAccountSW, UpdateListingsSW, GetListOfSupportedAppsSW } from '/requests/service_worker_api.js';
import { parseUserData, parseAppList, parseHistoryMessage, isMarketPageLoadCorrect, whyMyHistoryEmpty } from '/parsers/market_page_parser.js';
import { generateID, removeChildrensNode } from '/utils/utils.js';
import { RequestMyHistory } from '/requests/requests.js';

const ModuleBundle = {};

// market_page_parser.js
ModuleBundle['parseUserData'] = parseUserData;
ModuleBundle['parseAppList'] = parseAppList;
ModuleBundle['parseHistoryMessage'] = parseHistoryMessage;
ModuleBundle['isMarketPageLoadCorrect'] = isMarketPageLoadCorrect;
ModuleBundle['whyMyHistoryEmpty'] = whyMyHistoryEmpty;

// utils.js
ModuleBundle['generateID'] = generateID;
ModuleBundle['removeChildrensNode'] = removeChildrensNode;

// requests.js
ModuleBundle['RequestMyHistory'] = RequestMyHistory;

// service_worker_api.js
ModuleBundle['SearchListingsRequestSW'] = SearchListingsRequestSW;
ModuleBundle['GetAppFiltersSW'] = GetAppFiltersSW;
ModuleBundle['OpenTabPageAccountsSW'] = OpenTabPageAccountsSW;
ModuleBundle['GetAccountSW'] = GetAccountSW;
ModuleBundle['UpdateListingsSW'] = UpdateListingsSW;
ModuleBundle['GetListOfSupportedAppsSW'] = GetListOfSupportedAppsSW;


export { ModuleBundle };