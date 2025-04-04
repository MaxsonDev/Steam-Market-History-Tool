const p = {
    'currentPage': null,
    'a': null,
    'b': {},
    'c': function () {
        this['currentPage'] < this['a'] - 0x1 && this['d'](this['currentPage'] + 0x1);
    },
    'e': function () {
        this['currentPage'] > 0x1 && this['d'](this['currentPage'] - 0x1);
    },
    'd': function (ad) {
        let ae = s();
        g_lastQuery && ae == g_lastQuery && (ae += '&index_cursor=' + this['b'][ad]), q(ae);
    },
    'f': function (ad) {
        ad['page_matrix'] && (this['b'] = ad['page_matrix'], this['a'] = ad['max_page'], this['currentPage'] = 0x1);
        ad['index_cursor'] && (this['currentPage'] = this['g'](ad['index_cursor']));
        let ae = this['a'], af = this['currentPage'] - 0x1;
        document['getElementById']('SMHT_total_listing')['textContent'] = ad['total_count'];
        let ag = document['getElementById']('SMHT_page_btn_prev'), ah = document['getElementById']('SMHT_page_btn_next'), ai = document['getElementById']('SMHT_pages_block');
        ae <= 0x1 ? ai['classList']['add']('hide-content') : (ai['classList']['remove']('hide-content'), af > 0x0 ? ag['classList']['remove']('disabled') : ag['classList']['add']('disabled'), af + 0x1 == ae ? ah['classList']['add']('disabled') : ah['classList']['remove']('disabled'));
        let aj = document['getElementById']('SMHT_pages');
        removeChildrensNode(aj);
        let ak = 0x2, al = Math['max'](af - ak, 0x1), lastPage = Math['min'](af + ak * 0x2 + (al - af), ae - 0x2);
        lastPage - af < ak && (al = Math['max'](af - ak * 0x2 + (lastPage - af), 0x1));
        this['h'](aj, 0x1);
        al != 0x1 && aj['append']('\x20...\x20');
        for (let am = al; am <= lastPage; am++) {
            this['h'](aj, am + 0x1);
        }
        lastPage != ae - 0x2 && aj['append']('\x20...\x20'), this['h'](aj, ae);
    },
    'g'(ad) {
        for (let ae in this['b']) {
            if (this['b'][ae] == ad)
                return ae;
        }
    },
    'h': function (ad, ae) {
        let af = Object['assign'](document['createElement']('span'), {
            'textContent': ae + '\x20',
            'className': 'market_paging_pagelink'
        });
        af['setAttribute']('data-page', ae), this['currentPage'] == ae ? af['classList']['add']('active') : af['addEventListener']('click', ag => {
            this['d'](ag['currentTarget']['getAttribute']('data-page'));
        }), ad['append'](af);
    }
};
function q(ad) {
    if (g_isLoadingListings)
        return;
    g_isLoadingListings = !![];
    !ad['includes']('&index_cursor=') && (g_lastQuery = ad);
    let table = document['getElementById']('SMHT_table');
    removeChildrensNode(table), table['append'](a2()), SearchListingsRequestSW(ad)['then'](function (ae) {
        if (ae) {
            let listingsRowsTable = P(ae['listings']);
            removeChildrensNode(table), table['append'](listingsRowsTable), a3(ae['listings']), p['f'](ae), document['getElementById']('SMHT_table_header')['scrollIntoView']();
        } else {
            removeChildrensNode(table);
            let tableMessage = x();
            table['append'](tableMessage);
            let af = document['getElementById']('SMHT_pages_block');
            af['classList']['add']('hide-content'), document['getElementById']('SMHT_total_listing')['textContent'] = '0';
        }
        g_isLoadingListings = ![];
    })['catch'](function () {
        let table = document['getElementById']('SMHT_table');
        removeChildrensNode(table);
        let tableMessage = x();
        table['append'](tableMessage);
        let ae = document['getElementById']('SMHT_pages_block');
        ae['classList']['add']('hide-content'), document['getElementById']('SMHT_total_listing')['textContent'] = '0', g_isLoadingListings = ![];
    });
}
async function r() {
    const ad = chrome['runtime']['getURL']('smht/import_modules.js'), ae = await import(ad);
    for (let af of Object['keys'](ae['ModuleBundle'])) {
        window[af] = ae['ModuleBundle'][af];
    }
}
function s() {
    let ad = '', ae = document['getElementById']('SMHT_request_data');
    for (let af of new FormData(ae)['entries']()) {
        ad += af[0x0] + '=' + af[0x1] + '&';
    }
    return ad['slice'](0x0, -0x1);
}
async function t(appid) {
    let ad = document['getElementById']('smht_advancedsearch_tags');
    if (appid == 0x0) {
        removeChildrensNode(ad), ad['style'] = 'text-align:\x20inherit', ad['textContent'] = 'Pick\x20a\x20game\x20from\x20the\x20drop-down\x20list\x20above\x20to\x20see\x20the\x20available\x20filters.';
        return;
    }
    GetAppFiltersSW({
        'appid': appid,
        'language': g_currentLanguage
    })['then'](function (ae) {
        removeChildrensNode(ad);
        if (Object['keys'](ae)['length'] > 0x0) {
            let af = 0x0;
            for (let category of Object['keys'](ae)) {
                if (ae[category]['type'] == 'dropdown') {
                    let ag = ae[category], ah = Object['assign'](document['createElement']('div'), { 'className': 'econ_tag_filter_category' });
                    ah['innerHTML'] = '<div\x20class=\x22econ_tag_filter_category_label\x22>' + ag['localized_name'] + '</div>';
                    let ai = Object['assign'](document['createElement']('select'), { 'name': 'category_' + category });
                    ai['append'](Object['assign'](document['createElement']('option'), {
                        'value': 'any',
                        'textContent': 'Any'
                    }));
                    let tagList = Object['entries'](ae[category]['tags'])['map'](([aj, ak]) => {
                        return ak['tag_name'] = aj, ak;
                    });
                    tagList['forEach'](aj => {
                        var ak = Object['assign'](document['createElement']('option'), {
                            'value': aj['tag_name'],
                            'textContent': aj['localized_name']
                        });
                        ai['append'](ak);
                    }), ah['append'](ai), ad['append'](ah), af++;
                }
            }
            af > 0x0 && ad['append'](document['createElement']('br'));
            for (let category of Object['keys'](ae)) {
                if (ae[category]['type'] == 'checkbox') {
                    let aj = ae[category], ak = Object['assign'](document['createElement']('div'), { 'className': 'econ_tag_filter_category' });
                    ak['innerHTML'] = '<div\x20class=\x22econ_tag_filter_category_label\x22>' + aj['localized_name'] + '</div>';
                    let tagList = Object['entries'](ae[category]['tags'])['map'](([al, am]) => {
                        return am['tag_name'] = al, am;
                    });
                    tagList['forEach'](al => {
                        let am = 'tag_' + category + '_' + al['tag_name'], an = Object['assign'](document['createElement']('div'), { 'className': 'econ_tag_filter_container' }), ao = Object['assign'](document['createElement']('input'), {
                                'id': am,
                                'value': al['tag_name'],
                                'name': 'category_' + category,
                                'className': 'econ_tag_filter_checkbox',
                                'type': 'checkbox'
                            });
                        an['append'](ao);
                        let ap = Object['assign'](document['createElement']('label'), { 'className': 'econ_tag_filter_label' });
                        ap['setAttribute']('for', am);
                        let aq = Object['assign'](document['createElement']('span'), { 'textContent': al['localized_name'] });
                        al['color'] && (aq['style'] = 'color:\x20#' + al['color']), ap['append'](aq), an['append'](ap), ak['append'](an);
                    }), ad['append'](ak);
                }
            }
        } else
            ad['style'] = 'text-align:\x20inherit', ad['textContent'] = 'There\x20are\x20no\x20filters\x20available\x20for\x20this\x20game.\x20Click\x20the\x20search\x20button\x20to\x20view\x20all\x20listings\x20for\x20this\x20game.';
    })['catch'](function (ae) {
        removeChildrensNode(ad), ad['style'] = 'text-align:\x20inherit', ad['textContent'] = 'There\x20was\x20a\x20problem\x20loading\x20filters\x20for\x20this\x20game.\x20Refresh\x20the\x20page\x20and\x20try\x20again.';
    });
}
function u() {
    let ad = document['getElementById']('SMHT_content');
    if (isAccountLoggin && isAccountInDB) {
        if (g_currentAccount['recorded_count'] == 0x0) {
            ad['append'](y());
            return;
        }
        let ae = z(), af = N();
        ad['append'](ae, af);
        let ag = s();
        q(ag);
    } else
        isAccountLoggin && !isAccountInDB ? ad['append'](w()) : ad['append'](v());
}
function v() {
    let messageContainer = Object['assign'](document['createElement']('div'), { 'className': 'market_listing_table_message' }), ad = Object['assign'](document['createElement']('a'), {
            'textContent': 'Login',
            'href': 'https://steamcommunity.com/login/home/'
        }), ae = '\x20to\x20view\x20your\x20Community\x20Market\x20history.';
    return messageContainer['append'](ad, ae), messageContainer;
}
function w() {
    let messageContainer = Object['assign'](document['createElement']('div'), { 'className': 'market_listing_table_message' }), ad = Object['assign'](document['createElement']('a'), { 'textContent': 'add\x20account' });
    ad['addEventListener']('click', OpenTabPageAccountsSW);
    let ae = 'You\x20need\x20to\x20', af = '\x20in\x20to\x20the\x20Database!';
    return messageContainer['append'](ae, ad, af), messageContainer;
}
function x() {
    let messageContainer = Object['assign'](document['createElement']('div'), { 'className': 'market_listing_table_message' });
    return messageContainer['textContent'] = 'There\x20were\x20no\x20items\x20matching\x20your\x20search.\x20Try\x20again\x20with\x20different\x20keywords.', messageContainer;
}
function y() {
    let messageContainer = Object['assign'](document['createElement']('div'), { 'className': 'market_listing_table_message' }), ad = 'You\x20don\x27t\x20have\x20any\x20history\x20in\x20the\x20Database.\x20But\x20if\x20you\x20have\x20a\x20history\x20in\x20the\x20Community\x20Market,\x20try\x20', ae = Object['assign'](document['createElement']('a'), { 'textContent': 'Update\x20Listings' });
    return ae['addEventListener']('click', OpenTabPageAccountsSW), messageContainer['append'](ad, ae, '.'), messageContainer;
}
function z() {
    let ad = Object['assign'](document['createElement']('div'), { 'id': 'SMHT_search' }), ae = A(), af = Object['assign'](document['createElement']('form'), { 'id': 'SMHT_request_data' });
    af['setAttribute']('onsubmit', 'return\x20false;');
    let ag = B(), ah = H(), ai = L();
    af['append'](ag, ah, ai);
    let aj = M(), ak = Object['assign'](document['createElement']('div'), { 'id': 'SMHT_hide_show_settings' });
    return ak['append'](af, aj), ad['append'](ae, ak), ad;
}
function A() {
    let ad = Object['assign'](document['createElement']('div'), { 'className': 'smht-title-block' }), ae = Object['assign'](document['createElement']('span'), {
            'className': 'smht-title\x20newmodal_header',
            'textContent': 'Steam\x20Market\x20History\x20Tool'
        }), af = Object['assign'](document['createElement']('div'), { 'className': 'smht_hide_show_settings_button' }), ag = Object['assign'](document['createElement']('div'), {
            'id': 'smht_hide_show_settings_arrow',
            'className': 'smht_hide_show_settings_arrow_up'
        });
    return af['append'](ag), af['addEventListener']('click', function () {
        let ah = document['getElementById']('smht_hide_show_settings_arrow'), ai = document['getElementById']('SMHT_hide_show_settings');
        ah['classList']['contains']('smht_hide_show_settings_arrow_up') ? (ai['classList']['add']('hide-content'), ah['classList']['remove']('smht_hide_show_settings_arrow_up'), ah['classList']['add']('smht_hide_show_settings_arrow_down')) : (ai['classList']['remove']('hide-content'), ah['classList']['remove']('smht_hide_show_settings_arrow_down'), ah['classList']['add']('smht_hide_show_settings_arrow_up'));
    }), ad['append'](ae, af), ad;
}
function B() {
    const ad = [
        {
            'title': 'Sort\x20By',
            'type': 'select',
            'i': 'sort_by',
            'j': [
                {
                    'value': 'time.desc',
                    'textContent': 'New\x20Transactions'
                },
                {
                    'value': 'time.asc',
                    'textContent': 'Old\x20Transactions'
                }
            ]
        },
        {
            'title': 'Transactions',
            'type': 'select',
            'i': 'transactions',
            'j': [
                {
                    'value': 'all',
                    'textContent': 'All\x20Transactions'
                },
                {
                    'value': 'buy',
                    'textContent': 'Buy'
                },
                {
                    'value': 'sell',
                    'textContent': 'Sell'
                }
            ]
        },
        {
            'title': 'Per\x20Page',
            'type': 'select',
            'i': 'pagesize',
            'j': [
                {
                    'value': '10',
                    'textContent': '10'
                },
                {
                    'value': '25',
                    'textContent': '25'
                },
                {
                    'value': '50',
                    'textContent': '50'
                },
                {
                    'value': '100',
                    'textContent': '100'
                },
                {
                    'value': '500',
                    'textContent': '500'
                }
            ]
        }
    ];
    let ae = Object['assign'](document['createElement']('div'), { 'className': 'smht-setting-preferences-container' }), af = Object['assign'](document['createElement']('div'), { 'className': 'smht-setting-preferences' }), ag = E();
    for (let data of ad) {
        let ah = C(data);
        af['append'](ah);
    }
    return ae['append'](af, ag), ae;
}
function C(data, ad = ![]) {
    let ae = Object['assign'](document['createElement']('div'), { 'className': 'smht-setting-container' }), af = Object['assign'](document['createElement']('span'), {
            'textContent': data['title'],
            'className': 'smht-setting-title'
        }), ag = Object['assign'](document['createElement']('div'), { 'className': 'smht-setting' }), ah;
    return ad ? ah = G() : ah = D(data), ag['append'](ah), ae['append'](af, ag), ae;
}
function D(data) {
    let ad = Object['assign'](document['createElement']('select'), {
        'name': data['i'],
        'className': 'smht-select-style'
    });
    for (let ae of data['j']) {
        let af = Object['assign'](document['createElement']('option'), {
            'value': ae['value'],
            'textContent': ae['textContent']
        });
        ad['append'](af);
    }
    return ad;
}
function E() {
    let ad = Object['assign'](document['createElement']('div'), { 'className': 'copy-market-search-box' }), ae = C({ 'title': 'Search\x20For\x20Items' }, !![]), af = F();
    return ad['append'](ae, af), ad;
}
function F() {
    let ad = Object['assign'](document['createElement']('div'), {
            'id': 'smht_search_advanced_show',
            'className': 'market_search_advanced_button'
        }), ae = Object['assign'](document['createElement']('span'), {
            'id': 'search_advanced_text',
            'textContent': 'Show\x20advanced\x20options...'
        }), af = Object['assign'](document['createElement']('span'), {
            'id': 'search_advanced_arrow',
            'className': 'btn_details_arrow\x20down'
        });
    return ad['addEventListener']('click', ag => {
        let ah = ag['currentTarget'], ai = document['getElementById']('smht_advancedsearch_filters'), aj = document['getElementById']('search_advanced_text'), ak = document['getElementById']('search_advanced_arrow');
        ah['classList']['contains']('clicked') ? (ai['classList']['add']('hide-content'), ah['style'] = '', ah['classList']['remove']('clicked'), aj['textContent'] = 'Show\x20advanced\x20options...', ak['classList']['remove']('up'), ak['classList']['add']('down')) : (ai['classList']['remove']('hide-content'), ah['style'] = 'background:\x20#324965;', ah['classList']['add']('clicked'), aj['textContent'] = 'Close\x20advanced\x20options...', ak['classList']['remove']('down'), ak['classList']['add']('up'));
    }), ad['append'](ae, af), ad;
}
function G() {
    let ad = Object['assign'](document['createElement']('div'), { 'className': 'smht-search-box' }), ae = Object['assign'](document['createElement']('img'), {
            'src': 'https://community.akamai.steamstatic.com/public/images/economy/market/search_icon.png',
            'className': 'smht-search-icon'
        }), af = Object['assign'](document['createElement']('input'), {
            'id': 'SMHT_search_input',
            'className': 'find-items-search-box',
            'name': 'search',
            'placeholder': 'Search',
            'autocomplete': 'off'
        });
    return af['addEventListener']('keydown', function (ag) {
        ag['keyCode'] == 0xd && this['blur']();
    }), ad['append'](ae, af), ad;
}
function H() {
    let ad = Object['assign'](document['createElement']('div'), {
            'id': 'smht_advancedsearch_filters',
            'className': 'hide-content'
        }), ae = Object['assign'](document['createElement']('div'), { 'className': 'smht-advancedsearch-filters-container' }), af = Object['assign'](document['createElement']('div'), { 'className': 'rightcol_controls_rule' }), ag = I();
    return ae['append'](af, ag), ad['append'](ae), ad;
}
function I() {
    let ad = '\x0a\x09\x09<div\x20class=\x22market_app_selector\x22>\x0a\x09\x09\x09<div\x20id=\x22smht_advancedsearch_appselect\x22\x20class=\x22appselect\x22>\x0a\x09\x09\x09\x09<div\x20id=\x22smht_advancedsearch_appselect_activeapp\x22\x20class=\x22option\x22>\x0a\x09\x09\x09\x09\x09<div\x20id=\x22selected_app_option\x22\x20class=\x22popup_item\x20popup_menu_item\x20market_advancedsearch_appname\x22\x20data-appid=\x220\x22>\x0a\x09\x09\x09\x09\x09\x09<span>All\x20Games</span>\x0a\x09\x09\x09\x09\x09</div>\x0a\x09\x09\x09\x09</div>\x0a\x09\x09\x09</div>\x0a\x09\x09\x09<div\x20id=\x22smht_advancedsearch_appselect_options\x22\x20class=\x22popup_block_new\x20hide-content\x22>\x0a\x09\x09\x09\x09<div\x20id=\x22smht_advancedsearch_appselect_options_apps\x22\x20class=\x22popup_body\x20popup_menu\x22></div>\x0a\x09\x09\x09</div>\x0a\x09\x09</div>\x0a\x09', ae = Object['assign'](document['createElement']('div'), { 'className': 'smht-advancedsearch-filters' });
    ae['innerHTML'] = ad;
    let af = Object['assign'](document['createElement']('div'), {
        'textContent': 'Pick\x20a\x20game\x20from\x20the\x20drop-down\x20list\x20above\x20to\x20see\x20the\x20available\x20filters.',
        'id': 'smht_advancedsearch_tags',
        'className': 'market_advancedsearch_filters'
    });
    ae['append'](af);
    let ag = ae['getElementsByClassName']('popup_body')[0x0], ah = J();
    for (let aj of ah) {
        ag['append'](aj);
    }
    ah['length'] > 0x6 && (ag['style'] = 'overflow-y:\x20scroll;');
    let ai = ae['getElementsByClassName']('appselect')[0x0];
    return ai['addEventListener']('click', V), ae;
}
function J() {
    let ad = [];
    ad['push'](K({
        'appid': 0x0,
        'name': 'All\x20Games'
    }));
    for (let ae of Object['keys'](g_supportApps)) {
        ad['push'](K(g_supportApps[ae]));
    }
    return ad;
}
function K(data) {
    let ad = Object['assign'](document['createElement']('div'), {
        'id': 'app_choose_' + data['appid'],
        'className': 'popup_item\x20popup_menu_item\x20market_advancedsearch_appname'
    });
    ad['setAttribute']('data-appid', data['appid']);
    if (data['icon']) {
        let ae = Object['assign'](document['createElement']('img'), {
            'src': data['icon'],
            'alt': data['name']
        });
        ad['append'](ae);
    }
    let nameNode = Object['assign'](document['createElement']('span'), { 'textContent': data['name'] });
    return ad['append'](nameNode), ad;
}
function L() {
    let ad = [
            {
                'name': 'sessionid',
                'value': g_sessionId
            },
            {
                'name': 'steamid',
                'value': g_steamId
            },
            {
                'name': 'language',
                'value': g_currentLanguage
            },
            {
                'name': 'currency',
                'value': g_currencyCode
            }
        ], ae = Object['assign'](document['createElement']('div'), { 'id': 'hidden_inputs' }), af = function (data) {
            return Object['assign'](document['createElement']('input'), {
                'name': data['name'],
                'value': data['value'],
                'type': 'hidden'
            });
        };
    for (let data of ad) {
        ae['append'](af(data));
    }
    return ae;
}
function M() {
    let ad = Object['assign'](document['createElement']('div'), { 'className': 'market-advancedsearch-bottombuttons' }), ae = Object['assign'](document['createElement']('div'), { 'className': 'rightcol_controls_rule' }), af = Object['assign'](document['createElement']('div'), { 'className': 'market_advancedsearch_bottombuttons_container' }), ag = Object['assign'](document['createElement']('a'), { 'textContent': 'Reset' }), ah = Object['assign'](document['createElement']('div'), { 'className': 'btn_medium\x20btn_green_white_innerfade\x20search_submit' });
    ah['append'](Object['assign'](document['createElement']('span'), { 'textContent': 'Search' })), ah['addEventListener']('click', function () {
        let ak = s();
        q(ak);
    }), ag['addEventListener']('click', function () {
        document['getElementById']('SMHT_search_input')['value'] = '', W(0x0), t(0x0);
        let ak = document['getElementById']('smht_advancedsearch_appselect_activeapp');
        removeChildrensNode(ak);
        let al = document['getElementById']('app_choose_0')['cloneNode'](!![]);
        al['id'] = 'selected_app_option', ak['append'](al);
    });
    let ai = Object['assign'](document['createElement']('div'), { 'id': 'thanks_block' }), aj = Object['assign'](document['createElement']('span'), { 'id': 'thanks_text' });
    return aj['innerHTML'] = 'If\x20you\x20want\x20to\x20thank\x20me,\x20you\x20can\x20send\x20something\x20in\x20the\x20<a\x20href=\x22https://steamcommunity.com/tradeoffer/new/?partner=159899971&token=PAmgn0ig\x22\x20target=\x22_blank\x22\x20style=\x22color:\x20#4582a5;\x22>trade</a>!<br>Thanks\x20for\x20using!', ai['append'](aj), af['append'](ag, ah, ai), ad['append'](ae, af), ad;
}
function N() {
    let ad = Object['assign'](document['createElement']('div'), {
            'id': 'SMHT_table_container',
            'className': 'market_home_listing_table\x20market_home_main_listing_table'
        }), tableHeader = O(), tableRowNode = Object['assign'](document['createElement']('div'), { 'id': 'SMHT_table' }), tablePageNode = T();
    return ad['append'](tableHeader, tableRowNode, tablePageNode), ad;
}
function O() {
    let ad = Object['assign'](document['createElement']('div'), {
            'id': 'SMHT_table_header',
            'className': 'market_listing_table_header'
        }), ae = Object['assign'](document['createElement']('div'), { 'className': 'market_listing_left_cell\x20market_listing_gainorloss' }), priceNode = Object['assign'](document['createElement']('div'), {
            'textContent': 'PRICE',
            'className': 'market_listing_right_cell\x20market_listing_their_price'
        }), af = Object['assign'](document['createElement']('div'), {
            'textContent': 'ACTED\x20ON',
            'className': 'market_listing_right_cell\x20market_listing_listed_date\x20can_combine'
        }), listedNode = Object['assign'](document['createElement']('div'), {
            'textContent': 'LISTED\x20ON',
            'className': 'market_listing_right_cell\x20market_listing_listed_date\x20can_combine'
        }), nameNode = document['createElement']('div');
    return nameNode['append'](Object['assign'](document['createElement']('span'), {
        'textContent': 'NAME',
        'className': 'market_listing_header_namespacer'
    })), ad['append'](ae, priceNode, af, listedNode, nameNode), ad;
}
function P(listings) {
    let ad = Object['assign'](document['createElement']('div'), { 'id': 'SMHT_table_rows' });
    for (let ae of listings) {
        let af = Q(ae);
        ad['append'](af);
    }
    return ad;
}
function Q(ad) {
    let ae = Object['assign'](document['createElement']('div'), {
        'id': 'transaction_id_' + ad['transaction_id'],
        'className': 'market_listing_row\x20market_recent_listing_row'
    });
    ae['style'] = 'height:\x20unset;';
    let af = Object['assign'](document['createElement']('div'), {
            'textContent': ad['transaction'] == 'sell' ? '-' : '+',
            'className': 'market_listing_left_cell\x20market_listing_gainorloss'
        }), ag = Object['assign'](document['createElement']('img'), {
            'id': 'image_transaction_id_' + ad['transaction_id'],
            'src': 'https://community.akamai.steamstatic.com/economy/image/' + ad['icon_url'] + '/62fx62f',
            'className': 'market_listing_item_img\x20economy_item_hoverable'
        });
    if (ad['name_color'] || ad['background_color']) {
        ad['name_color'] && (ag['style']['borderColor'] = '#' + ad['name_color']);
        if (ad['background_color']) {
            ag['style']['background'] = '#' + ad['background_color'];
            ;
        }
    }
    let priceContainer = Object['assign'](document['createElement']('div'), { 'className': 'market_listing_right_cell\x20market_listing_their_price' }), ah = Object['assign'](document['createElement']('span'), { 'className': 'market_table_value' }), ai = Object['assign'](document['createElement']('span'), {
            'textContent': ad['transaction'] == 'sell' ? '+' + ad['price'] : '-' + ad['price'],
            'className': 'market_listing_price'
        });
    ah['append'](ai, document['createElement']('br')), priceContainer['append'](ah);
    let aj = Object['assign'](document['createElement']('div'), {
            'textContent': ad['acted_date'],
            'className': 'market_listing_right_cell\x20market_listing_listed_date\x20can_combine'
        }), listedNode = Object['assign'](document['createElement']('div'), {
            'textContent': ad['listed_date'],
            'className': 'market_listing_right_cell\x20market_listing_listed_date\x20can_combine'
        }), nameContainer = Object['assign'](document['createElement']('div'), { 'className': 'market_listing_item_name_block' }), ak = Object['assign'](document['createElement']('span'), {
            'id': 'name_transaction_id_' + ad['transaction_id'],
            'className': 'market_listing_item_name\x20economy_item_hoverable'
        }), al = Object['assign'](document['createElement']('a'), {
            'textContent': ad['market_name'],
            'href': 'https://steamcommunity.com/market/listings/' + ad['appid'] + '/' + encodeURI(ad['market_hash_name'])
        });
    al['setAttribute']('target', '_blank'), ak['append'](al);
    ad['name_color'] && (ak['style']['color'] = '#' + ad['name_color']);
    spanGameName = Object['assign'](document['createElement']('span'), {
        'textContent': g_supportApps[ad['appid']]['name'],
        'className': 'market_listing_game_name'
    }), nameContainer['append'](ak, document['createElement']('br'), spanGameName);
    let am = R(ad);
    am && nameContainer['append'](am);
    let an = Object['assign'](document['createElement']('div'), { 'style': 'clear:\x20both;' });
    return ae['append'](af, ag, priceContainer, aj, listedNode, nameContainer, an), ae;
}
function R(ad) {
    if (!ad['descriptions'] || ad['descriptions']['length'] == 0x0)
        return null;
    let ae, af;
    for (let ah in ad['descriptions']) {
        let ai = ad['descriptions'][ah];
        ai['name'] && [
            'sticker_info',
            'keychain_info'
        ]['includes'](ai['name']) && (ai['name'] == 'sticker_info' && (ae = ai['value']), ai['name'] == 'keychain_info' && (af = ai['value']));
    }
    if (!ae && !af)
        return null;
    let ag = Object['assign'](document['createElement']('div'), {
        'id': 'listing_' + ad['transaction_id'] + '_details',
        'className': 'market_listing_row_details'
    });
    ag['append'](document['createElement']('br'));
    if (ae) {
        let aj = S('sticker_info', ae);
        aj['style'] = 'margin:2px', ag['append'](aj, document['createElement']('br'));
    }
    if (af) {
        let ak = S('keychain_info', af);
        ak['style'] = 'margin:2px', ag['append'](ak);
    }
    return ag;
}
function S(ad, ae) {
    let af = new DOMParser()['parseFromString'](ae, 'text/html'), ag = af['getElementsByTagName']('img'), ah = Object['assign'](document['createElement']('div'), {
            'id': ad,
            'className': ad
        });
    for (let ai = 0x0; ai < ag['length']; ai++) {
        ak = Object['assign'](document['createElement']('img'), { 
            'src': ag[ai]['getAttribute']('src'),
            'title': ag[ai]['getAttribute']('title')
             });
        ah['append'](ak);
    }
    return ah;
}
function T() {
    let ad = Object['assign'](document['createElement']('div'), {
            'id': 'SMHT_pages_container',
            'className': 'market_paging'
        }), ae = Object['assign'](document['createElement']('div'), {
            'id': 'SMHT_pages_block',
            'className': 'market_paging_controls'
        }), af = Object['assign'](document['createElement']('span'), {
            'id': 'SMHT_page_btn_prev',
            'className': 'pagebtn\x20disabled',
            'textContent': '<'
        }), ag = Object['assign'](document['createElement']('span'), { 'id': 'SMHT_pages' }), ah = Object['assign'](document['createElement']('span'), {
            'id': 'SMHT_page_btn_next',
            'className': 'pagebtn\x20disabled',
            'textContent': '>'
        });
    af['addEventListener']('click', () => {
        p['e']();
    }), ah['addEventListener']('click', () => {
        p['c']();
    }), ae['append'](af, ag, ah);
    let ai = Object['assign'](document['createElement']('span'), {
            'textContent': 'Total\x20Listings:\x20',
            'className': 'market_paging_summary\x20ellipsis\x20myellipsis'
        }), aj = Object['assign'](document['createElement']('span'), { 'id': 'SMHT_total_listing' }), ak = Object['assign'](document['createElement']('div'), { 'style': 'clear:\x20both;' });
    return ad['append'](ae, ai, aj, ak), ad;
}
function U(ad) {
    document['getElementById']('smht_advancedsearch_appselect_options')['classList']['add']('hide-content'), document['removeEventListener']('click', U);
    let ae = ad['target']['closest']('.market_advancedsearch_appname');
    if (ae && ad['target']['closest']('#smht_advancedsearch_appselect_options')) {
        let af = document['getElementById']('selected_app_option'), ag = ae['getAttribute']('data-appid'), ah = af['getAttribute']('data-appid');
        if (ag != ah) {
            af['remove']();
            let aj = ae['cloneNode'](!![]);
            aj['id'] = 'selected_app_option', document['getElementById']('smht_advancedsearch_appselect_activeapp')['append'](aj);
        }
        let ai = document['getElementById']('smht_advancedsearch_tags');
        removeChildrensNode(ai), ai['append'](a2()), W(ag), t(ag);
    }
    setTimeout(() => {
        document['getElementById']('smht_advancedsearch_appselect')['addEventListener']('click', V);
    }, 0x64);
}
function V() {
    let ad = document['getElementById']('smht_advancedsearch_appselect_options');
    ad['classList']['contains']('hide-content') && (ad['classList']['remove']('hide-content'), setTimeout(() => {
        document['addEventListener']('click', U);
    }, 0x64), document['getElementById']('smht_advancedsearch_appselect')['removeEventListener']('click', V));
}
function W(appid) {
    let ad = document['getElementById']('selected_appid_input');
    if (appid == 0x0)
        ad && ad['remove']();
    else {
        if (ad)
            ad['value'] = appid;
        else {
            let ae = document['getElementById']('hidden_inputs');
            ae['append'](Object['assign'](document['createElement']('input'), {
                'id': 'selected_appid_input',
                'name': 'appid',
                'value': appid,
                'type': 'hidden'
            }));
        }
    }
}
async function X() {
    await r(), isSMHTTabRendered = ![], isAccountLoggin = ![], isAccountInDB = ![], isCurrencyChange = ![], g_isLoadingListings = ![], g_supportApps = {}, g_sessionId = generateID(), g_currentAccount = null, g_steamId = null, g_currentLanguage = null, g_currencyCode = null, g_lastQuery = null;
    let ad = parseUserData(document);
    if (ad) {
        isAccountLoggin = !![];
        let ae = await GetAccountSW(ad['steamid']);
        ae && (isAccountInDB = !![], g_currentAccount = ae, g_steamId = g_currentAccount['steamid'], g_currentLanguage = g_currentAccount['current_language'], g_currencyCode = ae['currency_code'], await Y(g_steamId), Z(), ae['currency_code'] != ad['currency_code'] && (isCurrencyChange = !![], console['log']('error\x20ne\x20ravni\x20currency_code')));
    }
    a1();
}
async function Y(steamid) {
    g_supportApps = {};
    let ad = await GetListOfSupportedAppsSW(steamid), ae = parseAppList(document['documentElement']['outerHTML']), af = ad['length'];
    for (let appid of Object['keys'](ae)) {
        ad['includes'](Number(appid)) && (g_supportApps[appid] = ae[appid], af -= 0x1);
        if (af == 0x0)
            break;
    }
}
function Z() {
    RequestMyHistory(null, 'koreana')['then'](function (data) {
        data['total_count'] > 0x0 && data['total_count'] != g_currentAccount['last_index'] && UpdateListingsSW(g_steamId);
    });
}
function a0() {
    let ad = Object['assign'](document['createElement']('a'), {
            'id': 'SMHT_tab',
            'className': 'market_tab_well_tab\x20market_tab_well_tab_inactive'
        }), tabTitle = Object['assign'](document['createElement']('span'), {
            'className': 'market_tab_well_tab_contents',
            'textContent': 'SMHT'
        });
    return ad['addEventListener']('click', ae => {
        let af = ae['currentTarget'];
        if (af['classList']['contains']('market_tab_well_tab_inactive')) {
            let tabsButtonsIDList = [
                'MyListings',
                'MyMarketHistory'
            ];
            for (let tabID of tabsButtonsIDList) {
                let tabButtonNode = document['getElementById']('tab' + tabID);
                if (tabButtonNode['classList']['contains']('market_tab_well_tab_active')) {
                    tabButtonNode['classList']['remove']('market_tab_well_tab_active'), tabButtonNode['classList']['add']('market_tab_well_tab_inactive');
                    break;
                }
            }
            for (let tabID of tabsButtonsIDList) {
                let tabContentNode = document['getElementById']('tabContents' + tabID);
                tabContentNode['style']['display'] != 'none' && (tabContentNode['style']['display'] = 'none');
            }
            af['classList']['remove']('market_tab_well_tab_inactive'), af['classList']['add']('market_tab_well_tab_active');
            let ag = document['getElementById']('SMHT_content');
            ag['style']['display'] = '';
        }
        !isSMHTTabRendered && (u(), isSMHTTabRendered = !![]);
    }), ad['append'](tabTitle), ad;
}
async function a1() {
    let ad = ![], ae = ![];
    while (!![]) {
        if (!ad) {
            let af = document['getElementById']('myMarketTabs');
            if (af) {
                let tabButtonsList = af['getElementsByClassName']('market_tab_well_tabs')[0x0];
                if (tabButtonsList) {
                    let ag = a0(), lastChild = document['getElementById']('tabMyMarketHistory');
                    lastChild['parentNode']['insertBefore'](ag, lastChild['nextSibling']), ad = !![];
                }
            }
        }
        if (!ae) {
            let ah = document['getElementById']('myListings');
            if (ah) {
                let ai = Object['assign'](document['createElement']('div'), {
                    'id': 'SMHT_content',
                    'className': 'my_listing_section\x20market_content_block',
                    'style': 'display:none;'
                });
                ah['append'](ai), ae = !![];
            }
        }
        if (ad && ae)
            break;
    }
    let tabsButtonsIDList = [
        'tabMyListings',
        'tabMyMarketHistory'
    ];
    for (let tabID of tabsButtonsIDList) {
        document['getElementById'](tabID)['addEventListener']('click', function () {
            let aj = document['getElementById']('SMHT_tab'), ak = document['getElementById']('SMHT_content');
            aj['classList']['contains']('market_tab_well_tab_active') && (aj['classList']['remove']('market_tab_well_tab_active'), aj['classList']['add']('market_tab_well_tab_inactive')), ak['style']['display'] != 'none' && (ak['style']['display'] = 'none');
        });
    }
}
function a2() {
    let ad = Object['assign'](document['createElement']('div'), {
            'className': 'load-container',
            'style': 'text-align:\x20center;'
        }), ae = Object['assign'](document['createElement']('img'), {
            'src': 'https://community.akamai.steamstatic.com/public/images/login/throbber.gif',
            'alt': 'Loading...'
        });
    return ad['append'](ae), ad;
}
function a3(listings) {
    for (let ad of listings) {
        ad['k'] = ad['amount'] > 0x0, a4(document['getElementById']('image_transaction_id_' + ad['transaction_id']), ad), a4(document['getElementById']('name_transaction_id_' + ad['transaction_id']), ad);
    }
}
function a4(ad, ae) {
    let af = ad;
    af['addEventListener']('mouseenter', function () {
        a5(ad, ae);
    }), af['addEventListener']('mouseleave', function () {
        a6(ad);
    });
}
function a5(ad, ae) {
    let af = document['getElementById']('hover');
    if (a9() && af['target'] == ad)
        af['style']['display'] == '';
    else
        (!a9() || af['target'] != ad) && !ad['l'] && (ad['m'] = !![], a9() ? window['setTimeout'](function () {
            if (ad['m'])
                a7(ad, ae);
        }, Math['min'](0xfa, 0xc8)) : a7(ad, ae), ad['l'] = window['setTimeout'](function () {
            ad['l'] = ![], ad['m'] && (a8(ad, ae), ad['m'] = ![]);
        }, 0xfa));
}
function a6(ad) {
    ad['m'] && ad['l'] ? (window['clearTimeout'](ad['l']), ad['m'] = ![], ad['l'] = ![]) : document['getElementById']('hover')['style']['display'] = 'none';
}
function a7(ad, ae) {
    let af = document['getElementById']('hover'), ag = document['getElementById']('hover_content'), ah = document['getElementById']('hover_arrow_left'), ai = document['getElementById']('hover_arrow_right'), aj = 'https://community.akamai.steamstatic.com/economy/image/' + ae['icon_url'] + '/330x192', ak = document['getElementById']('hover_item_icon');
    ak['src'] = aj, ak['alt'] = ae['market_name'];
    let nameNode = document['getElementById']('hover_item_name');
    nameNode['textContent'] = aa(ae['market_name']);
    if (ae['name_color']) {
        nameNode['style']['color'] = '#' + ae['name_color'], ag['parentNode']['style']['borderColor'] = '#' + ae['name_color'];
        if (ah)
            ah['style']['borderRightColor'] = '#' + ae['name_color'];
        if (ai)
            ai['style']['borderLeftColor'] = '#' + ae['name_color'];
    } else {
        nameNode['style']['color'] = '', ag['parentNode']['style']['borderColor'] = '';
        if (ah)
            ah['style']['borderRightColor'] = '';
        if (ai)
            ai['style']['borderLeftColor'] = '';
    }
    if (ae['appid'] && g_supportApps[ae['appid']]) {
        var al = g_supportApps[ae['appid']];
        let an = document['getElementById']('hover_game_icon');
        an['src'] = al['icon'], an['alt'] = al['name'], document['getElementById']('hover_game_name')['textContent'] = al['name'], document['getElementById']('hover_item_type')['textContent'] = '', document['getElementById']('hover_game_info')['style']['display'] = '';
    } else
        document['getElementById']('hover_game_info')['style']['display'] = 'none';
    let am = document['getElementById']('hover_item_descriptors');
    am['textContent'] = '';
    if (ae['descriptions'] || ae['descriptions']['length']) {
        am['style']['display'] = '';
        for (let ao = 0x0; ao < ae['descriptions']['length']; ao++) {
            let description = ae['descriptions'][ao];
            if (!description['value'])
                continue;
            let ap = description['value']['replace'](/\[date\](\d*)\[\/date\]/g, function (ar, as) {
                    var date = new Date(as * 0x3e8);
                    return date['toLocaleString']();
                })['trim'](), aq = Object['assign'](document['createElement']('div'), { 'className': 'descriptor' });
            description['color'] && (aq['style']['color'] = '#' + description['color']);
            if (ap['length'] == 0x0)
                aq['innerHTML'] = '&nbsp;';
            else {
                if (description['type'] == 'image') {
                    let ar = Object['assign'](document['createElement']('img'), { 'src': description['value']['trim']() });
                    aq['append'](ar);
                } else {
                    if (description['type'] == 'html')
                        aq['innerHTML'] = ap;
                    else {
                        let as = aa(ap)['replace'](/\n/g, '<br>');
                        aq['innerHTML'] = ap;
                    }
                }
            }
            am['appendChild'](aq);
        }
    } else
        am['style']['display'] = 'none';
    af['n'] = ae, af['o'] = ae['amount'];
}
function a8(ad, ae) {
    let af = document['getElementById']('hover');
    (af['target'] != ad || af['n'] != ae || af['o'] != ae['amount']) && (a7(ad, ae), af['target'] = ad);
    document['getElementById']('iteminfo_clienthover')['classList']['add']('hover_box'), af['style']['visibility'] = 'hidden', af['style']['display'] = '', ab(af, ad);
    let ag = document['getElementById']('iteminfo_clienthover'), ah = document['getElementById']('hover_arrow_left'), ai = document['getElementById']('hover_arrow_right'), aj = ah, ak = aj ? -0x4 : 0x8, al = ac(af)['left'] + parseInt(ad['offsetWidth']) + ag['offsetWidth'] + (0x18 - ak), am = document['documentElement']['clientWidth'] - al, an = parseInt(af['style']['left']) - af['offsetWidth'];
    al > document['documentElement']['clientWidth'] && an > am ? (af['style']['left'] = parseInt(af['style']['left']) - af['offsetWidth'] + ak + 'px', aj = ai) : af['style']['left'] = parseInt(af['style']['left']) + parseInt(ad['offsetWidth']) - ak + 'px';
    aj && (ai['style']['display'] = 'none', ah['style']['display'] = 'none', aj['style']['display'] = '');
    let ao = 0x0;
    ad['offsetHeight'] < 0x62 && (ao = ad['offsetHeight'] / 0x2 - 0x31);
    af['style']['top'] = parseInt(af['style']['top']) - 0xd + ao + 'px';
    let ap = ac(ad)['top'] + ao;
    if (ap + ag['offsetHeight'] + 0x8 > document['documentElement']['clientHeight']) {
        let aq = ag['offsetHeight'] + 0x8 - (document['documentElement']['clientHeight'] - ap);
        aq = Math['min'](ag['offsetHeight'] - 0x4a, aq), af['style']['top'] = parseInt(af['style']['top']) - aq + 'px', aj && (aj['style']['top'] = 0x30 + aq + 'px');
    } else
        aj && (aj['style']['top'] = '');
    af['style']['display'] = 'none', af['style']['visibility'] = '', af['style']['display'] = '';
}
function a9() {
    return document['getElementById']('hover')['style']['display'] == 'none' ? ![] : !![];
}
function aa(ad) {
    return ad['replace'](/&/g, '&amp;')['replace'](/</g, '&lt;')['replace'](/>/g, '&gt;')['replace'](/"/g, '&quot;')['replace'](/'/g, '&#039;');
}
function ab(ad, ae) {
    let af = ac(ae), ag = ad['offsetParent'], ah = ac(ag);
    ad['style']['left'] = af['left'] - ah['left'] + 'px', ad['style']['top'] = af['top'] - ah['top'] + 'px';
}
function ac(ad) {
    let ae = ad['getBoundingClientRect'](), af = document['documentElement'];
    return {
        'top': Math['round'](ae['top'] - af['clientTop']),
        'left': Math['round'](ae['left'] - af['clientLeft'])
    };
}
((() => {
    window['location']['host'] == 'steamcommunity.com' && X();
})());
