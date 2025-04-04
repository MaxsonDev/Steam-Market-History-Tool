const E = {
    'a': function () {
        this['b'] = null, this['c'] = null, this['d'] = ![], this['e'] = ![], this['f'] = !![];
    },
    'g': function () {
        this['a'](), this['h'](), this['i']();
    },
    'h': function () {
        let a4 = document['getElementById']('content'), a5 = Object['assign'](document['createElement']('section'), { 'id': 'accounts_content' }), a6 = Object['assign'](document['createElement']('div'), {
                'className': 'content-title',
                'textContent': 'Accounts'
            }), a7 = Object['assign'](document['createElement']('div'), {
                'id': 'accounts_warning_container',
                'className': 'warning-container'
            }), accountsTable = Object['assign'](document['createElement']('div'), { 'id': 'accounts_table' });
        a5['append'](a6, a7, accountsTable), a4['append'](a5);
    },
    'i': function () {
        let accountsTable = document['getElementById']('accounts_table');
        accountsTable['childElementCount'] > 0x0 && (removeChildrensNode(accountsTable), this['a']());
        let a4 = Z();
        accountsTable['append'](a4);
        let a5 = [];
        a5['push'](GetAllAccountsSW()), a5['push'](Y(RequestMarketPage())), a5['push'](Y(RequestMyHistory(0x0, 'koreana', 0xa))), Promise['all'](a5)['then'](a6 => this['j'](a6));
    },
    'j': function (a4) {
        let [accountsArray, a5, a6] = a4, a7;
        if (!a5['isError']) {
            let a8 = new DOMParser()['parseFromString'](a5, 'text/html');
            !globalThis['steamLanguages'] && (globalThis['steamLanguages'] = parseSteamLanguages(a8)), a7 = parseUserData(a8), a7 ? (this['b'] = a7, !a6['isError'] && a6['total_count'] && a6['total_count'] != 0x0 && (this['b']['total_count'] = a6['total_count'])) : this['d'] = !![];
        } else
            V('accounts_warning_container', a5['error']);
        accountsArray['length'] > 0x0 ? (this['c'] = accountsArray, a7 && this['k']()) : this['c'] = [], !a7 && accountsArray['length'] == 0x0 && (this['e'] = !![]), this['l']();
    },
    'k': function () {
        let a4 = null, a5 = null;
        for (let a7 = 0x0; a7 < this['c']['length']; a7++) {
            let a8 = this['c'][a7];
            if (a8['steamid'] == this['b']['steamid']) {
                a4 = a7, a5 = a8;
                break;
            }
        }
        if (!a5)
            return;
        let a6 = ![];
        for (let a9 of Object['keys'](this['b'])) {
            if ([
                    'total_count',
                    'currency_code',
                    'steamid',
                    'current_language'
                ]['includes'](a9)) {
                a9 == 'currency_code' && (this['b'][a9] != a5[a9] && console['log']('Currency\x20change.'));
                a9 == 'total_count' && (this['b'][a9] > a5[a9] && (a5[a9] = this['b'][a9], a6 = !![]));
                continue;
            }
            a5[a9] != this['b'][a9] && (a5[a9] = this['b'][a9], a6 = !![]);
        }
        a6 && (this['c']['splice'](a4, 0x1), this['c']['push'](a5), IsListingPollerWorkSW()['then'](isPollerWork => {
            if (!isPollerWork)
                UpdateAccountDataSW(a5);
        }));
    },
    'l': function () {
        if (this['e']) {
            let a5 = document['getElementById']('accounts_table');
            removeChildrensNode(a5), V('accounts_warning_container', 'NeedLoginInSteamcommunity');
            return;
        }
        this['d'] && V('accounts_warning_container', 'NeedLoginInSteamcommunity');
        let accountsCardsArr = [];
        for (let a6 = 0x0; a6 < this['c']['length']; a6++) {
            let a7 = this['c'][a6], a8 = new F(a7, this['b'], ![]), a9 = a8['m']();
            this['b'] && a7['steamid'] == this['b']['steamid'] ? (this['f'] = ![], accountsCardsArr['unshift'](a9)) : accountsCardsArr['push'](a9);
        }
        if (this['b'] && this['f']) {
            let aa = new F(this['b'], this['b'], !![]), ab = aa['m']();
            accountsCardsArr['unshift'](ab);
        }
        let a4 = document['getElementById']('accounts_table');
        removeChildrensNode(a4);
        for (let ac of accountsCardsArr) {
            a4['append'](ac);
        }
    }
};
function F(a4, a5, a6) {
    this['n'] = a4, this['b'] = a5, this['f'] = a6, this['o'] = undefined, this['p'] = ![], this['m'] = function () {
        this['b'] && this['b']['steamid'] == this['n']['steamid'] && (this['p'] = !![]);
        let ab = Object['assign'](document['createElement']('div'), {
            'className': 'account-card',
            'id': 'accountid_' + this['n']['steamid']
        });
        this['f'] ? ab['setAttribute']('data-account-info', JSON['stringify'](this['b'])) : (ab['setAttribute']('data-account-info', JSON['stringify'](this['n'])), this['p'] ? ab['setAttribute']('data-is-current-account', 'true') : ab['setAttribute']('data-is-current-account', 'false'));
        let ac = Object['assign'](document['createElement']('div'), { 'className': 'account-card-content' }), ad = this['q'](), ae = this['r'](), af = this['s']();
        return ac['append'](ad, ae, af), ab['append'](ac), ab;
    }, this['q'] = function () {
        let ab = Object['assign'](document['createElement']('div'), { 'className': 'avatar-container' });
        this['p'] && ab['classList']['add']('current-avatar-container');
        let ac = this['n']['icon_url'];
        !this['n']['icon_url']['includes']('.gif') && (ac = ac['replace']('.jpg', '_full.jpg'));
        let ad = Object['assign'](document['createElement']('img'), {
            'className': 'avatar-img',
            'src': ac,
            'alt': this['n']['username']
        });
        return ab['append'](ad), ab;
    }, this['r'] = function () {
        let ab = Object['assign'](document['createElement']('div'), { 'className': 'account-card-info' }), ac = Object['assign'](document['createElement']('div'), { 'className': 'current-account-card-container' });
        if (this['p']) {
            let ad = Object['assign'](document['createElement']('span'), {
                'className': 'current-account-card-true',
                'textContent': 'Current\x20Account'
            });
            ac['append'](ad);
        }
        let usernameCont = Object['assign'](document['createElement']('div'), { 'className': 'username-account-card-container' }), usernameSpan = Object['assign'](document['createElement']('a'), {
                'textContent': this['n']['username'],
                'href': 'https://steamcommunity.com/profiles/' + this['n']['steamid'] + '/',
                'target': '_blank'
            });
        usernameCont['append'](usernameSpan);
        let steamidCont = Object['assign'](document['createElement']('div'), { 'className': 'steamid-account-card-container' }), steamidSpan = Object['assign'](document['createElement']('span'), { 'textContent': 'ID:\x20' + this['n']['steamid'] });
        steamidCont['append'](steamidSpan);
        if (this['f'])
            ab['append'](ac, usernameCont, steamidCont);
        else {
            let ae = Object['assign'](document['createElement']('div'), {
                    'textContent': 'Language:',
                    'className': 'language-account-card-container'
                }), af = Object['assign'](document['createElement']('span'), { 'textContent': '\x20' + a3(this['n']['current_language']) });
            af['style'] = 'color:\x20#66c0f4;', ae['append'](af);
            let transactionsCont = Object['assign'](document['createElement']('div'), {
                    'textContent': 'Transactions:',
                    'className': 'listings-account-card-container'
                }), transactionsSpan = Object['assign'](document['createElement']('span'), {
                    'textContent': this['n']['recorded_count'],
                    'className': 'total-listings-account',
                    'style': 'color:\x20#90ba3c;'
                });
            transactionsCont['append'](transactionsSpan);
            let listingsCont = Object['assign'](document['createElement']('div'), {
                    'textContent': 'Listings:',
                    'className': 'listings-account-card-container'
                }), lastIndexListingSpan = Object['assign'](document['createElement']('span'), {
                    'textContent': this['n']['last_index'],
                    'className': 'last-index-listings-account'
                }), ag = Object['assign'](document['createElement']('span'), {
                    'textContent': this['n']['total_count'],
                    'className': 'total-listings-account'
                });
            this['n']['last_index'] < this['n']['total_count'] ? lastIndexListingSpan['style'] = 'color:\x20yellow;' : lastIndexListingSpan['style'] = 'color:\x20#90ba3c;', listingsCont['append'](lastIndexListingSpan, '/', ag), ab['append'](ac, usernameCont, steamidCont, ae, transactionsCont, listingsCont);
        }
        return ab;
    }, this['s'] = function () {
        let ab;
        return this['f'] ? ab = a9(this['n']['steamid'], !![]) : (ab = a7(this['n']['steamid'], this['p'], !![]), this['p'] && IsListingPollerWorkSW()['then'](ac => {
            if (ac) {
                let ad = document['getElementById']('account_action_' + this['n']['steamid']);
                removeChildrensNode(ad), setTimeout(UpdateListings, 0x3e8, this['n']['steamid']);
            }
        })), ab;
    };
    function a7(steamid, ab, ac) {
        const ad = [
            {
                'id': 'update_listings_',
                'textContent': 'Update\x20Listings',
                'src': '../assets/update_db.svg',
                't': ah => {
                    let steamid = G(ah, 'update_listings_');
                    UpdateListings(steamid);
                    let ai = '', messageText = 'You\x20have\x20launched\x20a\x20market\x20history\x20collection\x20operation.\x20You\x20can\x20close\x20the\x20web\x20page.\x20The\x20data\x20is\x20collected\x20in\x20the\x20background.';
                    U['u']('', messageText, 'notification', null, null);
                }
            },
            {
                'id': 'delete_account_',
                'textContent': 'Delete\x20Account',
                'src': '../assets/delete_account.png',
                't': ah => {
                    let steamid = H(ah, 'delete_account_'), ai = 'Delete\x20account\x20data?', messageText = 'This\x20operation\x20will\x20delete\x20the\x20account\x20data\x20and\x20market\x20history\x20data.\x20But\x20it\x20will\x20not\x20remove\x20the\x20descriptions,\x20tags,\x20items\x20names,\x20etc.<br>Open\x20the\x20<b>Databases</b>\x20tab\x20to\x20delete\x20all\x20data.';
                    U['u'](ai, messageText, 'dialog', DeleteAccount, [steamid]);
                }
            }
        ];
        let ae = Object['assign'](document['createElement']('div'), { 'className': 'account-menu-block-wrap' }), af = Object['assign'](document['createElement']('div'), { 'className': 'account-menu-flex-wrap' });
        for (let ah of ad) {
            if (!ab && [
                    'update_listings_',
                    'new_language_'
                ]['includes'](ah['id']))
                continue;
            let ai = a8(ah, steamid);
            af['append'](ai);
        }
        ae['append'](af);
        let ag;
        if (!ac)
            ag = document['getElementById']('account_action_' + steamid), ag['append'](ae);
        else
            return ag = Object['assign'](document['createElement']('div'), {
                'className': 'account-card-action',
                'id': 'account_action_' + steamid
            }), ag['append'](ae), ag;
    }
    function a8(ab, steamid) {
        let ac = Object['assign'](document['createElement']('div'), {
                'className': 'account-button',
                'id': '' + ab['id'] + steamid
            }), ad = Object['assign'](document['createElement']('div'), { 'className': 'button-icon-container' }), ae = Object['assign'](document['createElement']('img'), {
                'className': 'button-icon',
                'src': ab['src']
            });
        ad['append'](ae);
        let af = Object['assign'](document['createElement']('span'), {
            'className': 'button-name',
            'textContent': ab['textContent']
        });
        return ac['append'](ad, af), ac['addEventListener']('click', ab['t']), ac;
    }
    function a9(steamid, ab) {
        let ac = Object['assign'](document['createElement']('div'), { 'className': 'add-account-form' }), ad = Object['assign'](document['createElement']('div'), {
                'className': 'action-button\x20action-green',
                'id': 'pre_add_new_account_' + steamid,
                'textContent': 'Add\x20New\x20Account'
            });
        ad['addEventListener']('click', function (af) {
            let steamid = G(af, 'pre_add_new_account_');
            aa(steamid);
        });
        let ae;
        ac['append'](ad);
        if (!ab)
            ae = document['getElementById']('account_action_' + steamid), ae['append'](ac);
        else
            return ae = Object['assign'](document['createElement']('div'), {
                'className': 'account-card-action',
                'id': 'account_action_' + steamid
            }), ae['append'](ac), ae;
    }
    function aa(steamid) {
        let ab = document['getElementById']('account_action_' + steamid), ac = Object['assign'](document['createElement']('div'), { 'className': 'add-account-form' }), ad = Object['assign'](document['createElement']('div'), { 'className': 'add-new-account-language-select' }), ae = Object['assign'](document['createElement']('span'), {
                'className': 'title',
                'style': 'color:\x20#66c0f4;font-size:\x2013px;padding:\x205px\x200;',
                'textContent': 'Select\x20Language'
            }), af = Object['assign'](document['createElement']('select'), {
                'name': 'language',
                'id': 'add_new_account_language_select'
            });
        for (let ak of Object['keys'](globalThis['steamLanguages'])) {
            let al = Object['assign'](document['createElement']('option'), {
                'value': ak,
                'textContent': globalThis['steamLanguages'][ak]
            });
            af['append'](al);
        }
        let ag = document['getElementById']('accountid_' + steamid), ah = ag['getAttribute']('data-account-info');
        ah = JSON['parse'](ah);
        globalThis['steamLanguages'] && (af['value'] = ah['current_language']);
        ad['append'](ae, af);
        let ai = Object['assign'](document['createElement']('div'), {
            'className': 'action-button\x20action-green',
            'id': 'add_new_account_' + steamid,
            'textContent': 'Add'
        });
        ai['addEventListener']('click', function (am) {
            let an = document['getElementById']('add_new_account_language_select')['value'], steamid = G(am, 'add_new_account_');
            AddNewAccount(steamid, an);
        });
        let aj = Object['assign'](document['createElement']('div'), {
            'className': 'action-button\x20action-blank',
            'id': 'close_add_new_account_' + steamid,
            'textContent': 'Close'
        });
        aj['addEventListener']('click', function (am) {
            let steamid = G(am, 'close_add_new_account_');
            a9(steamid);
        }), ac['append'](ad, ai, aj), ab['append'](ac);
    }
}
function G(a4, idPart) {
    let steamid = H(a4, idPart), a5 = document['getElementById']('account_action_' + steamid);
    return removeChildrensNode(a5), steamid;
}
function H(a4, idPart) {
    let a5 = a4['currentTarget'], steamid = a5['getAttribute']('id');
    return steamid = steamid['replace'](idPart, ''), steamid;
}
const I = {
    'status': undefined,
    'v': ![],
    'w': ![],
    'x': async function (steamid) {
        this['steamid'] = steamid;
        while (!![]) {
            let status = await GetStatusOfListingPollerSW();
            if (!status['isPollerWork'] && status['status'] == 'unused')
                break;
            let a4 = document['getElementById']('listing_poller_statusbar');
            if (!a4) {
                await Q(0x1388);
                continue;
            }
            if (this['w']) {
                if (!this['v']) {
                    let messageNode = document['getElementById']('lp_status_message');
                    messageNode['textContent'] = 'Stopping...', this['v'] = !![];
                }
                if ([
                        'get_status',
                        'lp_work'
                    ]['includes'](status['status']) || status['status']['includes']('lp_wait_unban_'))
                    continue;
            }
            this['y'](status['status']), this['z'](status['status']), J(status), status['status'] == 'lp_error' && V('accounts_warning_container', status['error']), this['status'] = status['status'];
        }
        this['A']();
    },
    'Stop': async function () {
        this['w'] = !![];
    },
    'A': function () {
        this['status'] = undefined, this['v'] = ![], this['w'] = ![];
    },
    'y': function (status) {
        if (this['w']) {
            if (this['w'] && this['v'] && status == 'lp_stop') {
                let messageNode = document['getElementById']('lp_status_message');
                messageNode['textContent'] = 'Stopped!', this['w'] = ![];
            }
            return;
        }
        if (this['status'] != status) {
            let messageNode = document['getElementById']('lp_status_message'), message;
            if (status == 'lp_work')
                message = 'Updating';
            else {
                if (status == 'lp_done')
                    message = 'Done!';
                else {
                    if (status == 'get_status')
                        message = 'Get\x20Status';
                    else {
                        if (status['includes']('lp_wait_unban_')) {
                            let a4 = status['replace']('lp_wait_unban_', '');
                            message = 'Steam\x20Microban.\x20Wait\x20' + a4 + '\x20sec..';
                        } else
                            status == 'lp_error' && (message = 'Error', messageNode['style']['color'] = 'red');
                    }
                }
            }
            message && (messageNode['textContent'] = message);
        }
    },
    'z': function (status) {
        if (this['status'] != status) {
            let a4 = document['getElementById']('lp_statusbar_button_block'), a5 = a4['firstChild'], a6;
            if (a5) {
                if (this['w'])
                    a5['getAttribute']('id') != 'loadNode' && (a4['firstChild']['remove'](), a6 = Z());
                else {
                    if (status == 'get_status')
                        a5['getAttribute']('id') != 'loadNode' && (a4['firstChild']['remove'](), a6 = Z());
                    else {
                        if (status == 'lp_work' || status['includes']('lp_wait_unban_'))
                            a5['getAttribute']('id') != 'stop_listing_poller' && (a4['firstChild']['remove'](), a6 = O());
                        else {
                            if (status == 'lp_error')
                                a5['getAttribute']('id') != 'ok_listing_poller' && (a4['firstChild']['remove'](), a6 = P('action-grey'));
                            else
                                status == 'lp_stop' ? a5['getAttribute']('id') != 'ok_listing_poller' && (a4['firstChild']['remove'](), a6 = P('action-grey')) : a5['getAttribute']('id') != 'ok_listing_poller' && (a4['firstChild']['remove'](), a6 = P('action-green'));
                        }
                    }
                }
            }
            a6 && a4['append'](a6);
        }
    }
};
function J(status) {
    if (!status['recorded_count'] || !status['last_index'] || !status['total_count'])
        return;
    let a4 = document['getElementById']('lp_progress'), a5 = document['getElementById']('lp_percent'), a6 = document['getElementById']('lp_recorded_count'), lastIndexTag = document['getElementById']('lp_last_index'), a7 = document['getElementById']('lp_total_count'), a8 = Math['floor'](status['last_index'] / (status['total_count'] / 0x64));
    a4['style']['width'] = a8 + '%', a5['textContent'] = a8 + '%', a6['textContent'] = status['recorded_count'], lastIndexTag['textContent'] = status['last_index'], a7['textContent'] = status['total_count'];
}
function K(status) {
    let a4 = document['getElementById']('lp_statusbar_button_block'), a5 = a4['firstChild'], a6;
    if ([
            'get_status',
            'lp_stop'
        ]['includes'](status))
        a5['getAttribute']('id') != 'loadNode' && (a4['firstChild']['remove'](), a6 = Z());
    else
        [
            'lp_work',
            'lp_wait_unban'
        ] && (a5['getAttribute']('id') != 'stop_listing_poller' && (a4['firstChild']['remove'](), a6 = O()));
    a6 && a4['append'](a6);
}
function L(steamid) {
    let a4 = document['getElementById']('account_action_' + steamid), statusbar = Object['assign'](document['createElement']('div'), { 'id': 'listing_poller_statusbar' }), a5 = M(), a6 = N();
    statusbar['append'](a5, a6), a4['append'](statusbar);
}
function M() {
    let a4 = Object['assign'](document['createElement']('div'), { 'className': 'lp-statusbar-block' }), a5 = Object['assign'](document['createElement']('div'), { 'className': 'lp-statusbar-info' }), a6 = Object['assign'](document['createElement']('span'), {
            'className': 'lp-status-message',
            'id': 'lp_status_message',
            'textContent': 'Get\x20Status'
        }), a7 = Object['assign'](document['createElement']('span'), {
            'className': 'lp-percent-progress',
            'id': 'lp_percent',
            'textContent': '-'
        });
    a5['append'](a6, a7);
    let a8 = Object['assign'](document['createElement']('div'), { 'className': 'lp-progressbar' }), a9 = Object['assign'](document['createElement']('div'), {
            'className': 'lp-progress',
            'id': 'lp_progress'
        });
    a8['append'](a9);
    let aa = Object['assign'](document['createElement']('div'), { 'className': 'lp-count-title-group' }), transaction_title = Object['assign'](document['createElement']('span'), {
            'className': 'lp-count-title',
            'style': 'float:\x20left;',
            'textContent': 'Transactions:'
        }), ab = Object['assign'](document['createElement']('span'), {
            'className': 'lp-count-title',
            'style': 'float:\x20right;',
            'textContent': 'Market\x20Listings:'
        });
    aa['append'](transaction_title, ab);
    let ac = Object['assign'](document['createElement']('div'), { 'className': 'lp-count-group' }), transaction_count_side = Object['assign'](document['createElement']('div'), { 'className': 'lp-count-side\x20lp-transaction-count' }), ad = Object['assign'](document['createElement']('span'), {
            'id': 'lp_recorded_count',
            'textContent': '-'
        });
    transaction_count_side['append'](ad);
    let ae = Object['assign'](document['createElement']('div'), { 'className': 'lp-count-side\x20lp-listings-count' }), last_index_span = Object['assign'](document['createElement']('span'), {
            'className': 'lp-listing-num',
            'id': 'lp_last_index',
            'textContent': '-'
        }), af = Object['assign'](document['createElement']('div'), { 'className': 'lp-split-listings' }), total_count_span = Object['assign'](document['createElement']('span'), {
            'className': 'lp-listing-num',
            'id': 'lp_total_count',
            'textContent': '-'
        });
    return ae['append'](last_index_span, af, total_count_span), ac['append'](transaction_count_side, ae), a4['append'](a5, a8, aa, ac), a4;
}
function N() {
    let a4 = Object['assign'](document['createElement']('div'), { 'id': 'lp_statusbar_button_block' }), a5 = Z();
    return a5['setAttribute']('id', 'loadNode'), a4['append'](a5), a4;
}
function O() {
    let a4 = Object['assign'](document['createElement']('div'), {
        'className': 'action-button\x20action-blue',
        'id': 'stop_listing_poller',
        'textContent': 'Stop'
    });
    return a4['addEventListener']('click', function (a5) {
        let a6 = a5['currentTarget'], a7 = a6['parentElement'];
        a6['remove']();
        let a8 = Z();
        a8['setAttribute']('id', 'loadNode'), a7['append'](a8), I['Stop'](), StopListingPollerSW();
    }), a4;
}
function P(colorButton) {
    let a4 = Object['assign'](document['createElement']('div'), {
        'className': 'action-button\x20' + colorButton,
        'id': 'ok_listing_poller',
        'textContent': 'OK'
    });
    return a4['addEventListener']('click', function (a5) {
        E['i']();
    }), a4;
}
function Q(a4) {
    return new Promise(function (a5) {
        setTimeout(a5, a4);
    });
}
const R = {
    'g': function () {
        this['h']();
    },
    'h': function () {
        let a4 = document['getElementById']('content'), a5 = Object['assign'](document['createElement']('section'), { 'id': 'databases_content' }), a6 = Object['assign'](document['createElement']('div'), {
                'className': 'content-title',
                'textContent': 'Databases'
            }), a7 = Object['assign'](document['createElement']('div'), {
                'id': 'databases_warning_container',
                'className': 'warning-container'
            }), descriptionTag = document['createElement']('p');
        descriptionTag['innerHTML'] = '<b>All\x20market\x20history\x20data</b>\x20of\x20all\x20accounts,\x20such\x20as\x20items\x20descriptions,\x20tags,\x20names,\x20links,\x20etc.,\x20are\x20stored\x20in\x20the\x20same\x20databases.\x20Therefore,\x20deleting\x20an\x20account\x20on\x20the\x20Accounts\x20tab\x20does\x20not\x20delete\x20the\x20entire\x20history\x20of\x20the\x20market.\x20To\x20completely\x20delete\x20all\x20data,\x20click\x20on\x20the\x20<b>Delete\x20All</b>\x20button\x20below.<br><br>If\x20you\x20want\x20to\x20re-update\x20the\x20listings,\x20you\x20don\x27t\x20need\x20to\x20delete\x20<b>all\x20market\x20history\x20data</b>.\x20On\x20the\x20contrary,\x20saved\x20databases\x20will\x20help\x20save\x20your\x20Internet\x20traffic,\x20reduce\x20the\x20update\x20time,\x20avoid\x20getting\x20microban\x20on\x20Steam\x20servers\x20and\x20do\x20not\x20burn\x20the\x20potatoes\x20on\x20which\x20they\x20work.';
        let a8 = S(), a9 = Object['assign'](document['createElement']('div'), {
                'id': 'delete_databases',
                'className': 'action-button\x20action-grey',
                'textContent': 'Delete\x20All'
            });
        a9['addEventListener']('click', function () {
            let aa = 'Delete\x20all\x20database?', messageText = 'This\x20operation\x20will\x20delete\x20ALL\x20market\x20history\x20data\x20and\x20accounts.<br>Also,\x20all\x20Steam\x20tabs\x20with\x20the\x20address\x20<b>steamcommunity.com/market</b>\x20will\x20be\x20closed,\x20for\x20safty.<br>Are\x20you\x20sure\x20you\x20want\x20to\x20continue?';
            U['u'](aa, messageText, 'dialog', T, null);
        }), a5['append'](a6, a7, descriptionTag, a8, a9), a4['append'](a5);
    }
};
function S() {
    return warningTitle = 'Warning', warningType = 'info', warningMessageNode = document['createElement']('p'), warningMessageNode['innerHTML'] = 'If\x20you\x20have\x20added\x20more\x20than\x20one\x20account,\x20then,\x20after\x20deleting\x20<b>all\x20market\x20history\x20data</b>,\x20other\x20accounts\x20will\x20stop\x20working!\x20To\x20avoid\x20the\x20expected\x20errors,\x20<u>ALL\x20databases\x20will\x20be\x20deleted</u>!<br>If\x20you\x20have\x20more\x20than\x20one\x20account\x20and\x20you\x20need\x20them,\x20do\x20not\x20delete\x20<b>all\x20market\x20history\x20data</b>!', X(warningType, warningTitle, warningMessageNode, ![]);
}
async function T() {
    if (await IsListingPollerWorkSW()) {
        V('databases_warning_container', 'YouCantDeleteAllDatabases');
        return;
    }
    await CloseAllSteamcommuntyMarketTabsSW(), DeleteAllDatabasesSW()['then'](() => {
        let a4 = document['getElementById']('accounts_category'), a5 = document['getElementById']('accounts_content');
        !a4['classList']['contains']('choice-category') && a5 ? a4['addEventListener']('click', () => {
            E['i']();
        }, { 'once': !![] }) : a5 && a5['addEventListener']('hover', () => {
            E['i'](), { 'once': !![] };
        });
        return;
    })['then'](() => {
        let messageText = 'All\x20databases\x20have\x20been\x20deleted!';
        U['u']('', messageText, 'notification', null, null);
    });
}
;
const U = {
    'B': ![],
    'C': null,
    'u': function (a4, messageText, typeOfPopup, a5, a6) {
        if (this['B'])
            return;
        this['B'] = !![];
        a6 && (this['C'] = a6);
        let a7 = document['getElementById']('popup');
        a7['classList']['remove']('hide-content');
        let a8 = Object['assign'](document['createElement']('div'), { 'id': 'popup_content' }), a9 = Object['assign'](document['createElement']('div'), {
                'textContent': a4,
                'id': 'popup_dialog_title'
            }), messageBox = Object['assign'](document['createElement']('div'), { 'id': 'popup_dialog_message_box' }), message = Object['assign'](document['createElement']('p'), {
                'textContent': messageText,
                'id': 'popup_dialog_message'
            });
        typeOfPopup == 'notification' && (messageBox['style'] = 'text-align:\x20center;');
        message['innerHTML'] = messageText, messageBox['append'](message);
        let aa = Object['assign'](document['createElement']('div'), { 'id': 'popup_content_buttons_container' });
        if (typeOfPopup == 'dialog') {
            let ab = Object['assign'](document['createElement']('div'), {
                    'textContent': 'OK',
                    'className': 'action-button\x20action-grey'
                }), ac = Object['assign'](document['createElement']('div'), {
                    'textContent': 'Close',
                    'className': 'action-button\x20action-grey'
                });
            ab['addEventListener']('click', () => {
                this['C'] ? a5(...this['C']) : a5(), this['D']();
            }), ac['addEventListener']('click', () => {
                this['D']();
            }), aa['append'](ab, ac);
        } else {
            if (typeOfPopup == 'notification') {
                let ad = Object['assign'](document['createElement']('div'), {
                    'textContent': 'OK',
                    'className': 'action-button\x20action-grey'
                });
                ad['addEventListener']('click', () => {
                    this['D']();
                }), aa['append'](ad);
            }
        }
        a8['append'](a9, messageBox, aa), a7['append'](a8);
    },
    'D': function () {
        this['C'] = null;
        let a4 = document['getElementById']('popup');
        removeChildrensNode(a4), a4['classList']['add']('hide-content'), this['B'] = ![];
    }
};
function V(a4, error) {
    let a5, a6, a7;
    if ('NoInternetConnection' == error)
        a5 = 'No\x20Internet\x20Connections', a7 = 'alert', W(a4, a7, a5, a6);
    else {
        if ('TooManyRequests' == error)
            a5 = 'Too\x20Many\x20Requests', a7 = 'alert', a6 = document['createElement']('p'), a6['textContent'] = 'Many\x20requests\x20have\x20been\x20made\x20to\x20the\x20server.\x20Wait\x20and\x20try\x20again\x20later.', W(a4, a7, a5, a6);
        else {
            if ([
                    'ServerError',
                    'ErrorLoadHistory',
                    'PageLoadWithError'
                ]['includes'](error))
                a5 = 'Steam\x20Server\x20Error', a7 = 'alert', a6 = document['createElement']('p'), a6['textContent'] = 'Steam\x20servers\x20are\x20currently\x20unavailable.\x20Wait\x20and\x20try\x20again\x20later.', W(a4, a7, a5, a6);
            else {
                if ('RequestError' == error)
                    a5 = 'Unknown\x20Request\x20Error', a7 = 'alert', a6 = document['createElement']('p'), a6['textContent'] = 'Unknown\x20reason\x20for\x20the\x20error!', W(a4, a7, a5, a6);
                else {
                    if ('OutOfMemory' == error)
                        a5 = 'Out\x20Of\x20Memory', a7 = 'alert', a6 = document['createElement']('p'), a6['textContent'] = 'There\x20is\x20not\x20enough\x20free\x20memory\x20on\x20the\x20hard\x20disk!', W(a4, a7, a5, a6);
                    else {
                        if ('NeedChangeAccount' == error)
                            a5 = 'Account\x20Has\x20Been\x20Changed', a7 = 'alert', a6 = document['createElement']('p'), a6['textContent'] = 'Maybe,\x20while\x20the\x20listings\x20were\x20being\x20updated,\x20you\x20logged\x20out\x20and\x20logged\x20in\x20under\x20another\x20account.', W(a4, a7, a5, a6);
                        else {
                            if ('AccountNotAdded' == error)
                                a5 = 'Account\x20Not\x20Added', a7 = 'alert', a6 = document['createElement']('p'), a6['textContent'] = 'The\x20account\x20has\x20not\x20been\x20added\x20to\x20the\x20database.', W(a4, a7, a5, a6);
                            else {
                                if ('YouCantDeleteAccount' == error)
                                    a5 = 'You\x20Can\x27t\x20Delete\x20Account', a7 = 'info', a6 = document['createElement']('p'), a6['textContent'] = 'You\x20can\x27t\x20delete\x20account.\x20The\x20listings\x20of\x20this\x20account\x20are\x20currently\x20being\x20updated.', W(a4, a7, a5, a6);
                                else {
                                    if ('YouCantDeleteAllDatabases' == error)
                                        a5 = 'You\x20Can\x27t\x20Delete\x20All\x20Databases', a7 = 'info', a6 = document['createElement']('p'), a6['textContent'] = 'One\x20of\x20the\x20accounts\x20is\x20currently\x20updating\x20its\x20market\x20history.\x20Stop\x20the\x20update\x20process\x20and\x20try\x20again.', W(a4, a7, a5, a6);
                                    else {
                                        if ('NeedLoginInSteamcommunity' == error) {
                                            a5 = 'You\x20Are\x20Not\x20Logged', a7 = 'info';
                                            let messageContainer = document['createElement']('div');
                                            a6 = document['createElement']('p'), a6['textContent'] = 'You\x20are\x20not\x20logged\x20into\x20Steam\x20Community.\x20In\x20order\x20to\x20add\x20an\x20account,\x20update\x20the\x20listings,\x20try\x20these\x20problem\x20solutions\x20and\x20refresh\x20the\x20page:';
                                            let a8 = document['createElement']('ul'), a9 = Object['assign'](document['createElement']('li'), { 'className': 'warning-li' });
                                            a9['innerHTML'] = 'Open\x20or\x20refresh\x20any\x20Steam\x20community\x20<a\x20href=\x22https://steamcommunity.com/market/\x22\x20target=\x22_blank\x22\x20>page</a>.\x20This\x20is\x20necessary\x20in\x20order\x20for\x20the\x20server\x20to\x20re-authorize\x20the\x20account\x20in\x20the\x20system.';
                                            let aa = Object['assign'](document['createElement']('li'), { 'className': 'warning-li' });
                                            aa['innerHTML'] = '<a\x20href=\x22https://steamcommunity.com/login/home/?goto=market%2F\x22\x20target=\x22_blank\x22>Login</a>\x20to\x20the\x20Steam\x20Community\x20system.', a8['append'](a9, aa), messageContainer['append'](a6, a8), W(a4, a7, a5, messageContainer);
                                        } else
                                            a5 = 'Unknown\x20Error', a7 = 'alert', a6 = document['createElement']('p'), a6['textContent'] = 'Unknown\x20reason\x20for\x20the\x20error!', W(a4, a7, a5, a6);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function W(a4, a5, a6, a7) {
    let a8 = X(a5, a6, a7);
    document['getElementById'](a4)['append'](a8);
}
function X(a4, a5, a6, a7 = !![]) {
    let a8 = Object['assign'](document['createElement']('div'), { 'className': 'warning-block' }), a9 = Object['assign'](document['createElement']('div'), { 'className': 'warning-title-container' }), aa = Object['assign'](document['createElement']('span'), {
            'textContent': a5,
            'className': 'warning-title'
        });
    if (a4 == 'alert')
        aa['classList']['add']('warning-alert');
    else
        a4 == 'info' && aa['classList']['add']('warning-info');
    if (a7) {
        let ab = Object['assign'](document['createElement']('div'), { 'className': 'warning-close-block' });
        ab['addEventListener']('click', ad => {
            let ae = ad['currentTarget']['closest']('.warning-block');
            ae['remove']();
        });
        let ac = Object['assign'](document['createElement']('img'), {
            'src': '../assets/cross_grey.svg',
            'className': 'button-icon'
        });
        ab['append'](ac), a9['append'](aa, ab);
    } else
        a9['append'](aa);
    if (a6) {
        let ad = Object['assign'](document['createElement']('div'), { 'className': 'warning-message' });
        ad['append'](a6), a8['append'](a9, ad);
    } else
        a8['append'](a9);
    return a8;
}
function Y(a4) {
    return a4['then'](a5 => {
        return a5;
    })['catch'](errorStr => {
        return {
            'isError': !![],
            'error': errorStr
        };
    });
}
function Z() {
    let a4 = Object['assign'](document['createElement']('div'), {
            'className': 'load-container',
            'style': 'text-align:\x20center;'
        }), a5 = Object['assign'](document['createElement']('img'), {
            'src': '/assets/throbber.gif',
            'alt': 'Loading...'
        });
    return a4['append'](a5), a4;
}
function UpdateListings(steamid) {
    L(steamid), setTimeout(steamid => {
        I['x'](steamid);
    }, 0xbb8, steamid), UpdateListingsSW(steamid);
}
function DeleteAccount(steamid) {
    let a4 = document['getElementById']('account_action_' + steamid);
    removeChildrensNode(a4);
    let a5 = Z();
    a4['append'](a5);
    let a6 = document['getElementById']('accountid_' + steamid);
    a6['getAttribute']('data-is-current-account') == 'true' ? IsListingPollerWorkSW()['then'](a7 => {
        if (a7) {
            V('accounts_warning_container', 'YouCantDeleteAccount'), setTimeout(steamid => {
                let a8 = document['getElementById']('account_action_' + steamid);
                removeChildrensNode(a8), UpdateListings(steamid);
            }, 0xbb8, steamid);
            return;
        } else
            DeleteAccountSW(steamid)['then'](() => {
                E['i']();
            });
    }) : DeleteAccountSW(steamid)['then'](() => {
        E['i']();
    });
}
function AddNewAccount(steamid, a4) {
    let a5 = document['getElementById']('account_action_' + steamid), a6 = Z();
    a5['append'](a6);
    let a7 = [];
    a7['push'](Y(RequestMarketPage())), a7['push'](Y(RequestMyHistory(0x0, 'koreana', 0xa))), Promise['all'](a7)['then'](function (a8) {
        let [a9, aa] = a8;
        if (a9['isError']) {
            V('accounts_warning_container', a9['error']), E['i']();
            return;
        }
        let ab = new DOMParser()['parseFromString'](a9, 'text/html'), ac = parseUserData(ab);
        if (!ac || ac['steamid'] != steamid) {
            V('accounts_warning_container', 'NeedChangeAccount'), E['i']();
            return;
        }
        let ad;
        if (aa['total_count'] == 0x0) {
            let message = parseHistoryMessage(aa['results_html']), aj = whyMyHistoryEmpty(message);
            if (aj == 'HaventHistory')
                ad = 0x0;
            else {
                V('accounts_warning_container', aj), E['i']();
                return;
            }
        }
        if (aa['total_count'] != 0x0 && aa['assets']['length'] == 0x0 && aa['hovers'] == '') {
            V('accounts_warning_container', 'ErrorLoadHistory'), E['i']();
            return;
        }
        ad == undefined && (ad = aa['total_count']);
        let ae = document['getElementById']('accountid_' + steamid), af = ae['getAttribute']('data-account-info');
        af = JSON['parse'](af), af['current_language'] = a4;
        let ag = {};
        ag[a4] = {
            'recorded_count': 0x0,
            'main_language': !![]
        };
        let ah = {
                'language_list': ag,
                'last_transaction_id': null,
                'last_index': 0x0,
                'recorded_count': 0x0,
                'total_count': ad
            }, ai = Object['assign']({}, af, ah);
        AddNewAccountSW(ai)['then'](async ak => {
            !ak && (await isOutOfMemory() ? V('accounts_warning_container', 'OutOfMemory') : V('accounts_warning_container', 'AccountNotAdded')), E['i']();
        });
    });
}
const a0 = {
    'accounts': () => {
        E['g']();
    },
    'databases': () => {
        R['g']();
    }
};
function a1(a4, a5) {
    if (a5) {
        let a7 = document['getElementById'](a5 + '_category');
        a7['classList']['remove']('choice-category');
    }
    let a6 = document['getElementById'](a4 + '_category');
    a6['classList']['add']('choice-category');
}
function a2(a4, a5) {
    if (a5) {
        let a7 = document['getElementById'](a5 + '_content');
        a7 && a7['classList']['add']('hide-content');
    }
    let a6 = document['getElementById'](a4 + '_content');
    a6 ? a6['classList']['remove']('hide-content') : a0[a4]();
}
function a3(a4) {
    let a5;
    return globalThis['steamLanguages'] && globalThis['steamLanguages'][a4] ? a5 = globalThis['steamLanguages'][a4] : globalThis['languagesOfflineDict'][a4] ? a5 = globalThis['languagesOfflineDict'][a4] : a5 = 'Undifined\x20Language', a5;
}
(function () {
    window['addEventListener']('load', function () {
        let a4 = window['location']['hash'];
        a4 && (a4 = a4['replace']('#', ''), a1(a4), a2(a4));
    }), window['addEventListener']('hashchange', function (a4) {
        const a5 = function (a8) {
            let a9 = a8['match'](/\#.+/);
            return a9 ? a9[0x0]['replace']('#', '') : '';
        };
        let a6 = a5(a4['newURL']), a7 = a5(a4['oldURL']);
        a1(a6, a7), a2(a6, a7);
    });
}());
