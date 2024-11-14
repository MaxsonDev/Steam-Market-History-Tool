function RequestAppFilters(appid, language) {
    let url = "https://steamcommunity.com/market/appfilters/" + appid;
    if (language) {
        url += "?l=" + language;
    }
    return fetch(url)
    .then((response) => {
        return onresponse(response, true);
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        onerror(error);
    })
}

function RequestItemClassHover(appid, classid, instanceid, language) {
    let url = 'https://steamcommunity.com/economy/itemclasshover/' + appid + '/' + classid + '/' + instanceid;
    // url += '?content_only=1'
    if (language) {
        url += "&l=" + language;
    }
    return fetch(url)
    .then((response) => {
        return onresponse(response);
    })
    .then((html) => {
        return html;
    })
    .catch((error) => {
        onerror(error);
    })
}

function RequestMarketPage(language) {
    let url = "https://steamcommunity.com/market/"
    if (language) {
        url += "?l=" + language;
    }
    return fetch(url)
    .then((response) => {
        return onresponse(response);
    })
    .then((html) => {
        return html;
    })
    .catch((error) => {
        onerror(error);
    })
}

function RequestMyHistory(start, language, count) {
    let url = 'https://steamcommunity.com/market/myhistory/';
    if (typeof start == 'number') {
        count = count || 500;
        url += `render/?query=&start=${start}&count=${count}`;
    }
    if (language) {
        url += `&l=${language}`;
    }
    return fetch(url)
    .then((response) => {
        return onresponse(response, true);
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        onerror(error);
    })

}

function onresponse(response, isJSON=false) {
    if (response.status == 200 && response.ok) {
        if (isJSON) {
            return response.json();
        } else {
            return response.text();
        }
    }
    if (response.status == 429) {
        throw 'TooManyRequests';
    }
    if (500 <= response.status) {
        throw 'ServerError';
    }
}

function onerror(error) {
    if (typeof error == 'string') {
        throw error;
    }
    if (error.message == "Failed to fetch") {
        throw "NoInternetConnection";
    }
    throw "RequestError";
}

export { RequestMarketPage, RequestMyHistory, RequestAppFilters, RequestItemClassHover }