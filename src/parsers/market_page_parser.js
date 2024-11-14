function parseUserData(dom) {
	let user_data = {
		steamid: undefined,
		currency_code: undefined,
		icon_url: undefined,
		username: undefined,
		current_language: undefined
	}
	let user_avatar = dom.getElementsByClassName('user_avatar');
	if (user_avatar.length == 0) {
		return null
	}
	user_avatar = user_avatar[0].getElementsByTagName('img')[0];
	user_data.icon_url = user_avatar.getAttribute('src');
	user_data.username = user_avatar.getAttribute('alt');
	let html = dom.getElementsByTagName('html')[0].innerHTML;
	user_data.currency_code = parseCurrencyCode(html);
	user_data.steamid = parseSteamId(html);
	user_data.current_language = parseCurrentSteamLanguage(html);
	return user_data;
}

function parseUserIconUrl(html) {
	return _parseUsernameAndIconUrl(html, 'src');
}

function parseUsername(html) {
	return _parseUsernameAndIconUrl(html, 'alt');	
}

function _parseUsernameAndIconUrl(html, tag_name) {
	let RegEx = tag_name + '=".+?"';
	let userInfoDIV = html.match(/user_avatar.+?<\/a/s)[0];
	let data = userInfoDIV.match(RegEx)[0];
	data = data.match(/".+"/)[0].replace(/"/g, '').trim();
	return data
}

function parseCurrencyCode(html) {
	let g_rgWalletInfo = html.match(/var g_rgWalletInfo = {.+}/g)[0];
	g_rgWalletInfo = g_rgWalletInfo.match(/{.+}/g)[0];
	g_rgWalletInfo = JSON.parse(g_rgWalletInfo);
	return g_rgWalletInfo.wallet_currency;
}

function parseCurrentSteamLanguage(html) {
	let strLanguage = html.match(/g_strLanguage = ".+";/)[0];
	strLanguage = strLanguage.match(/".+"/)[0].replace(/"/g, '').trim();
	return strLanguage;
}

function parseSteamId(html) {
	let steam_id = html.match(/g_steamID = ".+";/)[0];
	steam_id = steam_id.match(/".+"/)[0].replace(/"/g, '').trim();
	return steam_id;
}

function parseAppList(html) {
	let g_rgAppContextData = html.match(/var g_rgAppContextData = {.+}/g)[0];
	g_rgAppContextData = g_rgAppContextData.match(/{.+}/g)[0];
	g_rgAppContextData = JSON.parse(g_rgAppContextData);
	return g_rgAppContextData;
}

function parseHistoryMessage(html) {
	let message = html.match(/market_listing_table_message.+?<\/div/s)[0];
	message = message.match(/>.+</)[0].replace(/[><]/g, '').trim();
	return message;
}

// Sometimes the server does not return the user's language in language list. Why, Valve? Why?
function parseSteamLanguages(dom) {
	let leng = {};
	let aTags = dom.getElementById('language_dropdown');
	aTags = aTags.getElementsByTagName('a');
	for (let i=0; i < aTags.length; i++) {
		let a = aTags[i];
		let value = a.getAttribute('href');
		if (!value.includes('?l=')) {
			continue
		}
		value = value.replace('?l=', '');
		let buttonText = a.textContent;
		leng[value] = buttonText;
	}
	return leng;
}

function isMarketPageLoadCorrect(html) {
    let pageIsLoadCorrect = html.match(/id="tabMyListings"/);
    if (!pageIsLoadCorrect) {
        return "PageLoadWithError";
    }
    let data_userinfo = html.match(/data-userinfo/);
    if (!data_userinfo) {
        return "NeedLoginInSteamcommunity";
    }
    return ""
}

function whyMyHistoryEmpty(message) {
    if (message == '장터에 이용 내역이 없습니다.') {
        return 'HaventHistory';
    }
    if (message == '귀하의 장터 사용 내역을 불러오지 못했습니다. 나중에 다시 시도해 주세요.') {
    	return 'ErrorLoadHistory';
    }
    if (message.match(/login\/home/)) {
        return 'NeedLoginInSteamcommunity';
    }
    return 'ServerError';
}

export { parseUserData, parseSteamLanguages, parseHistoryMessage, isMarketPageLoadCorrect, whyMyHistoryEmpty, parseCurrencyCode, parseAppList, parseSteamId }