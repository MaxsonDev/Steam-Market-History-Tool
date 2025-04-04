import {
    RequestMarketPage,
    RequestMyHistory,
    RequestAppFilters,
    RequestItemClassHover
} from '../requests/requests.js';
import {
    parseHistoryMessage,
    isMarketPageLoadCorrect,
    whyMyHistoryEmpty,
    parseSteamId
} from '../parsers/market_page_parser.js';
import {
    convertClassInstancAppToCIA,
    convertCIAToClassInstancApp,
    isOutOfMemory
} from '../utils/utils.js';
import { buildDateStr } from '../utils/template/date_template.js';
import { buildPrice } from '../utils/template/currency_template.js';
function ag(c7) {
    return aL('accounts')['then'](function () {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['AccountsDB']['transaction']('accounts', 'readwrite')['objectStore']('accounts'), ca = transaction['add'](c7);
            ca['onsuccess'] = function (cb) {
                c8(!![]);
            }, ca['onerror'] = function (cb) {
                c9(cb['target']['error']);
            };
        });
    });
}
function ah(steamid) {
    return aL('accounts')['then'](function () {
        return new Promise(function (c7) {
            let transaction = globalThis['AccountsDB']['transaction']('accounts', 'readwrite')['objectStore']('accounts'), c8 = transaction['delete'](steamid);
            c8['onsuccess'] = function (c9) {
                c7(!![]);
            };
        });
    });
}
function ai(steamid) {
    return aL('accounts')['then'](function () {
        return new Promise(function (c7) {
            let transaction = globalThis['AccountsDB']['transaction']('accounts', 'readonly')['objectStore']('accounts'), c8 = transaction['get'](steamid);
            c8['onsuccess'] = function (c9) {
                c7(c9['target']['result']);
            };
        });
    });
}
function aj() {
    return aL('accounts')['then'](function () {
        return new Promise(function (c7) {
            let transaction = globalThis['AccountsDB']['transaction']('accounts', 'readonly')['objectStore']('accounts'), c8 = transaction['getAll']();
            c8['onsuccess'] = function (c9) {
                c7(c9['target']['result']);
            };
        });
    });
}
function ak(c7) {
    return aL('accounts')['then'](function (c8) {
        return new Promise(function (c9, ca) {
            let transaction = globalThis['AccountsDB']['transaction']('accounts', 'readwrite')['objectStore']('accounts'), cb = transaction['put'](c7);
            cb['onsuccess'] = function (cc) {
                c9(!![]);
            }, cb['onerror'] = function (cc) {
                ca(cc['target']['error']);
            };
        });
    });
}
function al(steamid, c7, c8) {
    return ai(steamid)['then'](function (data) {
        return new Promise(function (c9, ca) {
            let cb = data['data'];
            cb = an(cb, c7, c8);
            let transaction = globalThis['AccountsDB']['transaction']('accounts', 'readwrite')['objectStore']('accounts'), cc = transaction['put'](cb);
            cc['onsuccess'] = function (cd) {
                c9(!![]);
            }, cc['onerror'] = function (cd) {
                ca(cd['target']['error']);
            };
        });
    });
}
function am(c7, steamid, c8) {
    return ai(steamid)['then'](function (c9) {
        let ca = an(c9, c7['last_index'], c8), cb = Object['assign']({}, ca, c7);
        return new Promise(function (cc, cd) {
            let transaction = globalThis['AccountsDB']['transaction']('accounts', 'readwrite')['objectStore']('accounts'), ce = transaction['put'](cb);
            ce['onsuccess'] = function (cf) {
                cc(!![]);
            }, ce['onerror'] = function (cf) {
                cd(cf['target']['error']);
            };
        });
    });
}
function an(c7, c8, c9) {
    return c7['language_list'][c9]['recorded_count'] = c8, c7;
}
function ao(cia) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('cia_db', 'readwrite')['objectStore']('cia_db'), ca = transaction['add']({ 'cia': cia });
            ca['onsuccess'] = function (cb) {
                c8(!![]);
            }, ca['onerror'] = function (cb) {
                let error = cb['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c8(!![]) : c9(error);
            };
        });
    });
}
function ap(cia) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('cia_db', 'readonly')['objectStore']('cia_db'), c9 = transaction['index']('cia'), ca = c9['get'](cia);
            ca['onsuccess'] = function (cb) {
                c8(cb['target']['result']);
            };
        });
    });
}
function aq(id) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('cia_db', 'readonly')['objectStore']('cia_db'), c9 = transaction['get'](id);
            c9['onsuccess'] = function (ca) {
                c8(ca['target']['result']);
            };
        });
    });
}
function ar(ciaData) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('cia_db', 'readwrite')['objectStore']('cia_db'), c9 = transaction['put'](ciaData);
            c9['onsuccess'] = function (ca) {
                c8(!![]);
            };
        });
    });
}
function as(color) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('color_db', 'readwrite')['objectStore']('color_db'), ca = transaction['add']({ 'color': color });
            ca['onsuccess'] = function (cb) {
                c8(!![]);
            }, ca['onerror'] = function (cb) {
                let error = cb['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c8(!![]) : c9(error);
            };
        });
    });
}
function at(color) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('color_db')['objectStore']('color_db'), ca = transaction['index']('color'), cb = ca['get'](color);
            cb['onsuccess'] = function (cc) {
                c8(cc['target']['result']);
            };
        });
    });
}
function au(color_id) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('color_db')['objectStore']('color_db'), ca = transaction['get'](color_id);
            ca['onsuccess'] = function (cb) {
                c8(cb['target']['result']);
            };
        });
    });
}
const av = {
    'GetAccount': function (steamid) {
        return ai(steamid);
    },
    'GetAllAccounts': function () {
        return aj();
    },
    'GetListOfSupportedApps': function (steamid) {
        return aO(steamid);
    },
    'UpdateLanguageRecordedCount': function (steamid, c7, c8) {
        return al(steamid, c7, c8)['then'](() => {
            return !![];
        })['catch'](error => {
            return new Promise(c9 => {
                return error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? !![] : ![];
            });
        });
    },
    'AddNewAccount': function (c7) {
        return ag(c7)['then'](function (c8) {
            return aP(c7['steamid'])['then'](c9 => {
                return !![];
            })['catch'](error => {
                ah(c7['steamid']);
                throw error;
            });
        })['catch'](error => {
            return error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? !![] : ![];
        });
    },
    'UpdateAccountData': function (c7) {
        return ak(c7);
    },
    'DeleteAccount': function (steamid) {
        return ah(steamid), aR(steamid), !![];
    },
    'DeleteAllDatabases': function () {
        return indexedDB['databases']()['then'](function (c7) {
            for (let c8 of c7) {
                if (c8['name']['includes']('listings_')) {
                    let steamid = c8['name']['replace']('listings_', '');
                    aR(steamid);
                } else
                    aM(c8['name']);
            }
            return !![];
        })['catch'](c7 => {
            return ![];
        });
    }
};
function aw(dateStrData, c7) {
    return aL('date_localizations')['then'](function (c8) {
        return new Promise(function (c9, ca) {
            let transaction = globalThis['DateLocalizationsDB']['transaction'](c7, 'readwrite')['objectStore'](c7), cb = transaction['add'](dateStrData);
            cb['onsuccess'] = function (cc) {
                c9(!![]);
            }, cb['onerror'] = function (cc) {
                let error = cc['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c9(!![]) : ca(error);
            };
        });
    });
}
function ax(date_str, c7) {
    return aL('date_localizations')['then'](function (c8) {
        return new Promise(function (c9, ca) {
            let transaction = globalThis['DateLocalizationsDB']['transaction'](c7)['objectStore'](c7), cb = transaction['index']('date_str'), cc = cb['get'](date_str);
            cc['onsuccess'] = function (cd) {
                c9(cd['target']['result']);
            };
        });
    });
}
function ay(date_str, c7) {
    return aL('date_localizations')['then'](function (c8) {
        return new Promise(function (c9, ca) {
            let transaction = globalThis['DateLocalizationsDB']['transaction'](c7)['objectStore'](c7), cb = transaction['get'](date_str);
            cb['onsuccess'] = function (cc) {
                c9(cc['target']['result']);
            };
        });
    });
}
function az(c7) {
    const c8 = function (c9) {
        const ca = c9['target']['result'];
        let cb = ca['createObjectStore'](c7, {
            'keyPath': 'id',
            'unique': !![]
        });
        cb['createIndex']('date_str', 'date_str', { 'unique': !![] });
    };
    return aN('date_localizations', c7, c8);
}
function aA(c7, c8) {
    return aL('descriptions_items')['then'](function () {
        return new Promise(function (c9, ca) {
            let transaction = globalThis['DescriptionsItemsDB']['transaction'](c8, 'readwrite')['objectStore'](c8), cb = transaction['add'](c7);
            cb['onsuccess'] = function (cc) {
                c9(!![]);
            }, cb['onerror'] = function (cc) {
                let error = cc['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c9(!![]) : ca(error);
            };
        });
    });
}
function aB(c7) {
    return aL('descriptions_items')['then'](function () {
        return new Promise(function (c8) {
            let transaction = globalThis['DescriptionsItemsDB']['transaction'](c7, 'readonly')['objectStore'](c7);
            transaction['count']()['onsuccess'] = function (c9) {
                c8(c9['target']['result']);
            };
        });
    });
}
function aC(descriptionId, c7) {
    return aL('descriptions_items')['then'](function () {
        return new Promise(function (c8) {
            let transaction = globalThis['DescriptionsItemsDB']['transaction'](c7, 'readonly')['objectStore'](c7), c9 = transaction['get'](descriptionId);
            c9['onsuccess'] = function (ca) {
                c8(ca['target']['result']);
            };
        });
    });
}
function aD(description, c7) {
    return aL('descriptions_items')['then'](function () {
        return new Promise(function (c8) {
            let transaction = globalThis['DescriptionsItemsDB']['transaction'](c7, 'readonly')['objectStore'](c7), c9 = transaction['index']('description'), ca = c9['get'](description);
            ca['onsuccess'] = function (cb) {
                c8(cb['target']['result']);
            };
        });
    });
}
function aE(c7) {
    const c8 = function (c9) {
        const ca = c9['target']['result'];
        let cb = ca['createObjectStore'](c7, {
            'keyPath': 'id',
            'unique': !![]
        });
        cb['createIndex']('description', 'description', { 'unique': !![] });
    };
    return aN('descriptions_items', c7, c8);
}
function aF(error) {
    return aL('errors')['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let ca = chrome['runtime']['a'](), errorData = {
                    'name': error['name'],
                    'message': error['message'],
                    'stack': error['stack'],
                    'date': new Date()['getTime'](),
                    'app_version': ca['version'],
                    'data': error['data']
                }, transaction = globalThis['ErrorsDB']['transaction']('errors', 'readwrite')['objectStore']('errors'), cb = transaction['add'](errorData);
            cb['onsuccess'] = function (cc) {
                c8(!![]);
            }, cb['onerror'] = function (cc) {
                let error = cc['target']['error'];
                if (error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements'))
                    c8(!![]);
                else {
                    let cd = {
                        'success': ![],
                        'message': error['message']
                    };
                    c9(cd);
                }
            };
        });
    });
}
function aG(icon_url) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('icon_url_db', 'readwrite')['objectStore']('icon_url_db'), ca = transaction['add']({ 'icon_url': icon_url });
            ca['onsuccess'] = function (cb) {
                c8(!![]);
            }, ca['onerror'] = function (cb) {
                let error = cb['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c8(!![]) : c9(error);
            };
        });
    });
}
function aH(icon_url) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('icon_url_db', 'readonly')['objectStore']('icon_url_db'), c9 = transaction['index']('icon_url'), ca = c9['get'](icon_url);
            ca['onsuccess'] = function (cb) {
                c8(cb['target']['result']);
            };
        });
    });
}
function aI(id) {
    return aL('descriptions_data')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['DescriptionsDataDB']['transaction']('icon_url_db', 'readonly')['objectStore']('icon_url_db'), c9 = transaction['get'](id);
            c9['onsuccess'] = function (ca) {
                c8(ca['target']['result']);
            };
        });
    });
}
const aJ = {
        'accounts': function (c7) {
            const c8 = c7['target']['result'];
            c8['createObjectStore']('accounts', {
                'keyPath': 'steamid',
                'unique': !![]
            });
        },
        'descriptions_data': function (c7) {
            const c8 = c7['target']['result'];
            let c9;
            c9 = c8['createObjectStore']('icon_url_db', {
                'keyPath': 'id',
                'autoIncrement': !![]
            }), c9['createIndex']('icon_url', 'icon_url', { 'unique': !![] }), c9 = c8['createObjectStore']('cia_db', {
                'keyPath': 'id',
                'autoIncrement': !![]
            }), c9['createIndex']('cia', 'cia', { 'unique': !![] }), c9 = c8['createObjectStore']('color_db', {
                'keyPath': 'id',
                'autoIncrement': !![]
            }), c9['createIndex']('color', 'color', { 'unique': !![] });
        },
        'market_names': function (c7) {
            const c8 = c7['target']['result'];
            let c9;
            c9 = c8['createObjectStore']('market_hash_name', {
                'keyPath': 'id',
                'autoIncrement': !![]
            }), c9['createIndex']('market_hash_name', 'market_hash_name', { 'unique': !![] });
        },
        'tags_localizations': function (c7) {
            const c8 = c7['target']['result'];
            let c9 = c8['createObjectStore']('tag_name_id', {
                'keyPath': 'id',
                'autoIncrement': !![]
            });
            c9['createIndex']('tag_name_id', 'tag_name_id', { 'unique': !![] });
        },
        'tags': function (c7) {
            const c8 = c7['target']['result'];
            let c9 = c8['createObjectStore']('tags', {
                'keyPath': 'tag',
                'unique': !![]
            });
            c9['createIndex']('appid', 'appid'), c9['createIndex']('ciaid_list', 'ciaid_list', { 'multiEntry': !![] });
        },
        'date_localizations': function (c7) {
            return !![];
        },
        'descriptions_items': function (c7) {
            return !![];
        },
        'errors': function (c7) {
            let c8 = c7['target']['result'];
            c8['createObjectStore']('errors', { 'keyPath': 'date' });
        }
    }, aK = {
        'accounts': 'AccountsDB',
        'listings': 'ListingsDB',
        'market_names': 'MarketNamesDB',
        'descriptions_data': 'DescriptionsDataDB',
        'descriptions_items': 'DescriptionsItemsDB',
        'date_localizations': 'DateLocalizationsDB',
        'tags_localizations': 'TagsLocalizationsDB',
        'tags': 'TagsDB',
        'errors': 'ErrorsDB'
    };
function aL(c7, c8) {
    if (globalThis[aK[c7]])
        return Promise['resolve'](!![]);
    return new Promise(function (c9) {
        let ca = indexedDB['open'](c7);
        !c8 ? ca['onupgradeneeded'] = aJ[c7] : ca['onupgradeneeded'] = c8, ca['onsuccess'] = function (cb) {
            globalThis[aK[c7]] = cb['target']['result'], c9(!![]);
        };
    });
}
function aM(c7) {
    globalThis[aK[c7]] && (globalThis[aK[c7]]['close'](), delete globalThis[aK[c7]]), indexedDB['deleteDatabase'](c7);
}
function aN(c7, c8, c9) {
    return aL(c7)['then'](function () {
        if (globalThis[aK[c7]]['objectStoreNames']['contains'](c8))
            return !![];
        return new Promise(function (ca, cb) {
            let cc = globalThis[aK[c7]]['version'], cd = cc + 0x1;
            globalThis[aK[c7]]['close']();
            let ce = indexedDB['open'](c7, cd);
            ce['onupgradeneeded'] = cf => {
                c9(cf);
            }, ce['onsuccess'] = function (cf) {
                globalThis[aK[c7]] = cf['target']['result'], ca(!![]);
            }, ce['onerror'] = error => {
                cb(error);
            };
        });
    });
}
function aO(steamid) {
    return aU(steamid)['then'](function (c7) {
        let c8 = [];
        return new Promise(function (c9) {
            let transaction = globalThis['ListingsDB_' + steamid]['transaction']('listings')['objectStore']('listings'), ca = transaction['index']('app_id'), cb = ca['openCursor'](null, 'nextunique');
            cb['onsuccess'] = function () {
                let cc = cb['result'];
                if (cc) {
                    let appid = cc['key'];
                    c8['push'](appid), cc['continue']();
                } else
                    c9(c8);
            };
        });
    });
}
function aP(steamid) {
    return aU(steamid);
}
function aQ(c7, steamid) {
    return aU(steamid)['then'](function (c8) {
        return new Promise(function (c9, ca) {
            let transaction = globalThis['ListingsDB_' + steamid]['transaction']('listings', 'readwrite')['objectStore']('listings'), cb = transaction['add'](c7);
            cb['onsuccess'] = function (cc) {
                console['log']('Dobavlen!'), c9(!![]);
            }, cb['onerror'] = function (cc) {
                c9(cc['target']['error']);
            };
        });
    });
}
function aR(steamid) {
    globalThis['ListingsDB_' + steamid] && (globalThis['ListingsDB_' + steamid]['close'](), delete globalThis['ListingsDB_' + steamid]), indexedDB['deleteDatabase']('listings_' + steamid);
}
function aS(cia_id, steamid) {
    return aU(steamid)['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['ListingsDB_' + steamid]['transaction']('listings')['objectStore']('listings'), ca = transaction['index']('cia_id'), cb = ca['get'](cia_id);
            cb['onsuccess'] = function (cc) {
                c8(cc['target']['result']);
            };
        });
    });
}
function aT(steamid) {
    return aU(steamid)['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['ListingsDB_' + steamid]['transaction']('listings')['objectStore']('listings'), ca = transaction['count']();
            ca['onsuccess'] = function (cb) {
                c8(cb['target']['result']);
            };
        });
    });
}
function aU(steamid) {
    if (globalThis['ListingsDB_' + steamid])
        return Promise['resolve'](!![]);
    return new Promise(function (c7, c8) {
        let c9 = indexedDB['open']('listings_' + steamid);
        c9['onupgradeneeded'] = function (ca) {
            const cb = ca['target']['result'];
            let cc = cb['createObjectStore']('listings', {
                'keyPath': 'index',
                'unique': !![]
            });
            cc['createIndex']('transaction_id', 'transaction_id', { 'unique': !![] }), cc['createIndex']('hash_name_id', 'hash_name_id'), cc['createIndex']('transaction', 'transaction'), cc['createIndex']('is_pending', 'is_pending'), cc['createIndex']('listed_ts', 'listed_ts'), cc['createIndex']('acted_ts', 'acted_ts'), cc['createIndex']('asset_id', 'asset_id'), cc['createIndex']('app_id', 'app_id'), cc['createIndex']('cia_id', 'cia_id'), cc['createIndex']('price', 'price');
        }, c9['onsuccess'] = function (ca) {
            globalThis['ListingsDB_' + steamid] = ca['target']['result'], c7(!![]);
        }, c9['onerror'] = function (ca) {
            c8(ca['target']['error']);
        };
    });
}
function aV(c7, c8) {
    return aL('market_names')['then'](function (c9) {
        return new Promise(function (ca, cb) {
            let transaction = globalThis['MarketNamesDB']['transaction']('market_hash_name', 'readwrite')['objectStore']('market_hash_name'), cc = transaction['add']({ 'market_hash_name': c7['market_hash_name'] });
            cc['onsuccess'] = function (cd) {
                ca();
            }, cc['onerror'] = function (cd) {
                let error = cd['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? ca() : cb(error);
            };
        });
    })['then'](function (c9) {
        return new Promise(function (ca, cb) {
            aW(c7['market_hash_name'])['then'](function (cc) {
                let cd = {
                        'id': cc['id'],
                        'name': c7['name'],
                        'market_name': c7['market_name']
                    }, transaction = globalThis['MarketNamesDB']['transaction'](c8, 'readwrite')['objectStore'](c8), ce = transaction['add'](cd);
                ce['onsuccess'] = function (cf) {
                    ca(!![]);
                }, ce['onerror'] = function (cf) {
                    let error = cf['target']['error'];
                    error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? ca(!![]) : cb(error);
                };
            });
        });
    })['catch'](function (error) {
        return error;
    });
}
function aW(market_hash_name) {
    return new Promise(function (c7) {
        let transaction = globalThis['MarketNamesDB']['transaction']('market_hash_name', 'readonly')['objectStore']('market_hash_name'), c8 = transaction['index']('market_hash_name'), c9 = c8['get'](market_hash_name);
        c9['onsuccess'] = function (ca) {
            c7(ca['target']['result']);
        };
    });
}
function aX(id) {
    return aL('market_names')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['MarketNamesDB']['transaction']('market_hash_name', 'readonly')['objectStore']('market_hash_name'), c9 = transaction['get'](id);
            c9['onsuccess'] = function (ca) {
                c8(ca['target']['result']);
            };
        });
    });
}
function aY(id, c7) {
    return aL('market_names')['then'](function (c8) {
        return new Promise(function (c9) {
            let transaction = globalThis['MarketNamesDB']['transaction'](c7, 'readonly')['objectStore'](c7), ca = transaction['get'](id);
            ca['onsuccess'] = function (cb) {
                c9(cb['target']['result']);
            };
        });
    });
}
function aZ(c7) {
    const c8 = function (c9) {
        const ca = c9['target']['result'];
        let cb;
        cb = ca['createObjectStore'](c7, {
            'keyPath': 'id',
            'unique': !![]
        }), cb['createIndex']('market_name', 'market_name'), cb['createIndex']('name', 'name');
    };
    return Promise['resolve'](aN('market_names', c7, c8));
}
function b0(tagName, cia_id) {
    return b3(tagName)['then'](function (tag) {
        if (tag['ciaid_list']['includes'](cia_id))
            return !![];
        return tag['ciaid_list']['push'](cia_id), aL('tags')['then'](function (c7) {
            return new Promise(function (c8, c9) {
                let transaction = globalThis['TagsDB']['transaction']('tags', 'readwrite')['objectStore']('tags'), ca = transaction['put'](tag);
                ca['onsuccess'] = function (cb) {
                    c8(!![]);
                }, ca['onerror'] = function (cb) {
                    let error = cb['target']['error'];
                    error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c8(!![]) : c9(error);
                };
            });
        });
    });
}
function b1(tagData) {
    return aL('tags')['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['TagsDB']['transaction']('tags', 'readwrite')['objectStore']('tags'), ca = transaction['add'](tagData);
            ca['onsuccess'] = function (cb) {
                c8(!![]);
            }, ca['onerror'] = function (cb) {
                let error = cb['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c8(!![]) : c9(error);
            };
        });
    });
}
function b2(appid) {
    return aL('tags')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['TagsDB']['transaction']('tags', 'readonly')['objectStore']('tags'), c9 = transaction['index']('appid'), ca = c9['getAll'](Number(appid));
            ca['onsuccess'] = function (cb) {
                let cc = cb['target']['result'];
                c8(cc);
            };
        });
    });
}
function b3(tagName) {
    return aL('tags')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['TagsDB']['transaction']('tags', 'readonly')['objectStore']('tags'), c9 = transaction['get'](tagName);
            c9['onsuccess'] = function (ca) {
                c8(ca['target']['result']);
            };
        });
    });
}
function b4(tag) {
    return b3(tag['tag'])['then'](function (tagList) {
        if (tagList['length'] == 0x0)
            return null;
        let tagDB;
        for (let c7 of tagList) {
            if (tag['tag'] == c7['tag'] && tag['appid'] == c7['appid']) {
                tagDB = c7;
                break;
            }
        }
        if (tagDB)
            return tagDB;
        return null;
    });
}
function b5(tagName) {
    return aL('tags_localizations')['then'](function (c7) {
        return new Promise(function (c8, c9) {
            let transaction = globalThis['TagsLocalizationsDB']['transaction']('tag_name_id', 'readwrite')['objectStore']('tag_name_id'), ca = transaction['add']({ 'tag_name_id': tagName });
            ca['onsuccess'] = function (cb) {
                c8(!![]);
            }, ca['onerror'] = function (cb) {
                let error = cb['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c8(![]) : c9(error);
            };
        });
    });
}
function b6() {
    return aL('tags_localizations')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['TagsLocalizationsDB']['transaction']('tag_name_id', 'readonly')['objectStore']('tag_name_id'), c9 = transaction['getAll']();
            c9['onsuccess'] = function (ca) {
                c8(ca['target']['result']);
            };
        });
    });
}
function b7(tagName) {
    return aL('tags_localizations')['then'](function (c7) {
        return new Promise(function (c8) {
            let transaction = globalThis['TagsLocalizationsDB']['transaction']('tag_name_id', 'readonly')['objectStore']('tag_name_id'), c9 = transaction['index']('tag_name_id'), ca = c9['get'](tagName);
            ca['onsuccess'] = function (cb) {
                c8(cb['target']['result']);
            };
        });
    });
}
function b8(localized_name, tagId, c7) {
    return aL('tags_localizations')['then'](function (c8) {
        return new Promise(function (c9, ca) {
            let transaction = globalThis['TagsLocalizationsDB']['transaction'](c7, 'readwrite')['objectStore'](c7), cb = transaction['add']({
                    'localized_name': localized_name,
                    'id': tagId
                });
            cb['onsuccess'] = function (cc) {
                c9(!![]);
            }, cb['onerror'] = function (cc) {
                let error = cc['target']['error'];
                error['message'] == 'Key\x20already\x20exists\x20in\x20the\x20object\x20store.' || error['message']['includes']('at\x20least\x20one\x20key\x20does\x20not\x20satisfy\x20the\x20uniqueness\x20requirements') ? c9(![]) : ca(error);
            };
        });
    });
}
function b9(tagId, c7) {
    return aL('tags_localizations')['then'](function (c8) {
        return new Promise(function (c9) {
            let transaction = globalThis['TagsLocalizationsDB']['transaction'](c7, 'readonly')['objectStore'](c7), ca = transaction['get'](tagId);
            ca['onsuccess'] = function (cb) {
                c9(cb['target']['result']);
            };
        });
    });
}
function ba(c7) {
    return new Promise(function (c8) {
        let transaction = globalThis['TagsLocalizationsDB']['transaction'](c7, 'readonly')['objectStore'](c7), c9 = transaction['count']();
        c9['onsuccess'] = function (ca) {
            c8(ca['target']['result']);
        };
    });
}
function bb(c7) {
    const c8 = function (c9) {
        const ca = c9['target']['result'];
        let cb;
        cb = ca['createObjectStore'](c7, {
            'keyPath': 'id',
            'unique': !![]
        }), cb['createIndex']('localized_name', 'localized_name');
    };
    return Promise['resolve'](aN('tags_localizations', c7, c8));
}
function bc(c7, c8, c9) {
    let ca = [];
    return ca['push'](aI(c7['icon_url_id'])), ca['push'](aX(c7['hash_name_id'])), ca['push'](aY(c7['hash_name_id'], c8)), ca['push'](aq(c7['cia_id'])), ca['push'](ay(c7['acted_id'], c8)), ca['push'](ay(c7['listed_id'], c8)), c7['name_color_id'] ? ca['push'](au(c7['name_color_id'])) : ca['push'](Promise['resolve'](null)), c7['background_color_id'] ? ca['push'](au(c7['background_color_id'])) : ca['push'](Promise['resolve'](null)), Promise['all'](ca)['then'](function (cb) {
        return new Promise(function (cc) {
            let [cd, ce, cf, cg, ch, ci, cj, ck] = cb, acted_date, listed_date;
            c8 != 'koreana' && (Number(c7['acted_id']) != 0x0 && Number(c7['listed_id']) != 0x0) && (acted_date = ch['date_str'], listed_date = ci['date_str']);
            let cl = {
                    'appid': c7['app_id'],
                    'assetid': c7['asset_id'],
                    'contextid': c7['context_id'],
                    'transaction': c7['transaction'],
                    'transaction_id': c7['transaction_id'],
                    'price': buildPrice(c7['price'], c9),
                    'icon_url': cd['icon_url'],
                    'market_hash_name': ce['market_hash_name'],
                    'market_name': cf['market_name'],
                    'acted_date': buildDateStr(acted_date, c7['acted_ts'], c8),
                    'listed_date': buildDateStr(listed_date, c7['listed_ts'], c8)
                }, [classid, instanceid] = cg['cia']['split']('_');
            cl['classid'] = classid, cl['instanceid'] = instanceid, cj && (cl['name_color'] = cj['color']), ck && (cl['background_color'] = ck['color']), cg['descriptions'][c8] ? bd(cg['descriptions'][c8], c8)['then'](descriptions => {
                cl['descriptions'] = descriptions, cc(cl);
            }) : cc(cl);
        });
    });
}
function bd(c7, c8) {
    let c9 = [];
    for (let ca of c7) {
        let cb = aC(ca, c8)['then'](function (cc) {
            return JSON['parse'](cc['description']);
        });
        c9['push'](cb);
    }
    return Promise['all'](c9);
}
function be(data, c7) {
    let c8 = bh(data), c9 = bi(data), ca = bj(data), cb = bk(c7), cc = bg(ca, cb), cd = bf(c8, c9, cc);
    return cd;
}
function bf(c7, c8, c9) {
    const ca = [];
    for (let cb of c9) {
        let cc;
        for (let cd of c8) {
            if (cb['row_id'] == cd['row_id']) {
                for (let ce of c7) {
                    if (ce['id'] == cd['assetid'] && ce['appid'] == cd['appid'] && ce['contextid'] == cd['contextid']) {
                        cc = Object['assign']({}, cb, ce);
                        break;
                    }
                }
                break;
            }
        }
        ca['push'](cc);
    }
    return ca;
}
function bg(c7, c8) {
    let c9 = [];
    for (let ca of c7) {
        for (let cb of c8) {
            if (ca['row_id'] == cb['row_id']) {
                c9['push'](Object['assign']({}, ca, cb));
                break;
            }
        }
    }
    return c9;
}
function bh(data) {
    let assets_list = [], c7 = data['assets'];
    for (let appid in c7) {
        for (let context_id in c7[appid]) {
            let c8 = Object['values'](c7[appid][context_id]);
            for (let c9 = 0x0; c9 < c8['length']; c9++) {
                assets_list['push'](c8[c9]);
            }
        }
    }
    return assets_list;
}
function bi(data) {
    let assetid_control_list = [], c7 = [];
    if (!data['hovers'])
        return c7;
    let hovers = data['hovers'];
    hovers = hovers['match'](/\(.+?\)/g), hovers = hovers['map'](c8 => c8['replace'](/[ )(']/g, '')['split'](','));
    for (let c8 of hovers) {
        let assetid = c8[0x4], appid = c8[0x2], context_id = c8[0x3], c9 = assetid + '_' + appid + '_' + context_id;
        if (assetid_control_list['includes'](c9))
            continue;
        let row_id = c8[0x1]['replace']('history_row_', '')['replace']('_name', '');
        c7['push']({
            'row_id': row_id,
            'assetid': assetid,
            'appid': appid,
            'contextid': context_id
        }), assetid_control_list['push'](c9);
    }
    return c7;
}
function bj(data) {
    let c7 = [], c8 = data['results_html']['replace'](/\\/g, ''), c9 = c8['match'](/<div class="market_listing_row.+?market_listing_game_name/gsm);
    for (let ca of c9) {
        let cb = bm(ca);
        c7['push'](cb);
    }
    return c7;
}
function bk(data) {
    let c7 = [], c8 = data['results_html']['replace'](/\\/g, ''), c9 = c8['match'](/<div class="market_listing_row.+?market_listing_game_name/gsm);
    for (let ca of c9) {
        let cb = bl(ca);
        c7['push'](cb);
    }
    return c7;
}
function bl(c7) {
    let row_id = bp(c7), date_d = bs(c7), row_id_d = { 'row_id': row_id };
    return Object['assign']({}, row_id_d, date_d);
}
function bm(c7) {
    let row_id = bp(c7), transaction = bo(c7, row_id), price = bn(c7, transaction), date_d = br(c7), c8 = bt(c7);
    return Object['assign']({}, {
        'name': c8,
        'row_id': row_id,
        'transaction': transaction
    }, date_d, price);
}
function bn(c7, transaction) {
    let price_d = {}, price_tag = c7['match'](/market_listing_price.+?<\/span>.+?<br\/>.+?<\/span>/s)[0x0], price_row = price_tag['match'](/market_listing_price.+?</s)[0x0];
    price_row = price_row['match'](/>.+</s)[0x0], price_row = price_row['replace'](/[><]+/g, '')['trim'](), price_d['price'] = bv(price_row);
    let c8 = price_tag['match'](/<br\/>.+<\/span>/s)[0x0];
    return c8 = c8['match'](/>.+</s)[0x0]['replace'](/[><]+/g, '')['trim'](), price_d['is_pending'] = c8 ? 0x1 : 0x0, price_d;
}
function bo(c7, id_tag) {
    let transaction, c8 = c7['match'](/market_listing_gainorloss.+?</s)[0x0];
    return c8 = c8['match'](/>.+</s)[0x0]['replace'](/></, '')['trim'](), c8['includes']('+') ? transaction = 'buy' : transaction = 'sell', transaction;
}
function bp(c7) {
    let id_tag = c7['match'](/<div.+market_listing_row.+>/)[0x0];
    return id_tag = id_tag['match'](/id=".+"/)[0x0], id_tag = id_tag['match'](/".+"/)[0x0]['replace'](/"+/g, ''), id_tag = id_tag['replace']('history_row_', ''), id_tag;
}
function bq(c7, transaction) {
    let c8 = {
        'b': '',
        'c': '',
        'd': ''
    };
    if ([
            'sell',
            'buy'
        ]['includes'](transaction)) {
        let c9 = c7['match'](/market_listing_owner_avatar.+?<\/span>/s)[0x0], ca = c9['match'](/<a.+?>/)[0x0];
        c8['b'] = ca['match'](/".+"/)[0x0]['replace'](/"+/g, '');
        let cb = c9['match'](/<img.+?>/)[0x0], cc = cb['match'](/src=".+?"/s)[0x0];
        cc = cc['match'](/".+?"/s)[0x0]['replace'](/"+/g, ''), cc = cc['replace']('https://avatars.akamai.steamstatic.com/', ''), c8['c'] = cc['trim']();
        let username = cb['match'](/title=".+?"/)[0x0];
        username = username['match'](/".+?"/s)[0x0]['replace'](/"+/g, ''), c8['d'] = username['trim']();
    }
    return c8;
}
function br(c7) {
    let date_d = {}, date_l = c7['match'](/<div class="market_listing_right_cell market_listing_listed_date.+?<\/div>/sg), listed_str = date_l[0x1]['match'](/>.+</s)[0x0], acted_str = date_l[0x0]['match'](/>.+</s)[0x0];
    return date_d['listed_str'] = listed_str['replace'](/[><]+/g, '')['trim'](), date_d['acted_str'] = acted_str['replace'](/[><]+/g, '')['trim'](), date_d;
}
function bs(c7) {
    let date_d_Kpop = {}, date_d = br(c7), listed_str = date_d['listed_str'], listed_arr = listed_str['match'](/\d+/g);
    date_d_Kpop['listed_ts'] = new Date(Date['UTC'](listed_arr[0x0], listed_arr[0x1] - 0x1, listed_arr[0x2], 0xc));
    if (date_d['acted_str']) {
        let acted_str = date_d['acted_str'], c8 = acted_str['match'](/\d+/g);
        date_d_Kpop['acted_ts'] = new Date(c8[0x0], c8[0x1] - 0x1, c8[0x2]);
    } else
        date_d_Kpop['acted_ts'] = 0x0;
    return date_d_Kpop;
}
function bt(c7) {
    let name = c7['match'](/<span id.+market_listing_item_name.+?</s)[0x0];
    return name = name['match'](/>.+</s)[0x0], name = name['replace'](/[><]+/g, '')['trim'](), name = name['replace'](/&quot;/g, '\x22'), name;
}
function bu(c7, row_id) {
    let c8 = new RegExp(row_id + '_image.+?<', 's'), c9 = c7['match'](c8)[0x0];
    return c9 = c9['match'](/src=".+"/)[0x0]['replace']('src=', ''), c9 = c9['match']('.+')[0x0]['replace'](/"+/g, ''), c9 = c9['replace']('https://community.akamai.steamstatic.com/economy/image/', ''), c9 = c9['split']('/')[0x0], c9;
}
function bv(price_str) {
    let price, priceIsFloat = price_str['match'](/\d+[.,]\d+/);
    return priceIsFloat ? (price = priceIsFloat[0x0], price['includes'](',') && (price = price['replace'](',', '.')), price = parseInt((parseFloat(price) * 0x64)['toFixed'](0x2))) : (price = price_str['match'](/\d+/)[0x0], price = parseInt(price) * 0x64), price;
}
function bw(action_link) {
    let c7 = action_link['match'](/steam:\/\/rungame\/730\/76561202255233023\/\+csgo_econ_action_preview%20M.+%assetid%D.+/);
    return c7 ? !![] : ![];
}
function bx(action_link) {
    let c7 = action_link['match'](/M\d+A/)[0x0]['replace'](/[MA]+/g, ''), c8 = action_link['match'](/D.+/)[0x0]['replace']('D', '');
    return [
        c7,
        c8
    ];
}
function by(c7, assets_list) {
    for (let c8 of assets_list) {
        if (c8['name']['includes'](c7['name'])) {
            let c9 = {};
            return c9['appid'] = c8['appid'], c9['background_color'] = c8['background_color'], c9['name_color'] = c8['name_color'], c9['icon_url'] = c8['icon_url'], c9;
        }
    }
}
const bz = {
        'UpdateListings': steamid => {
            bA['e'](steamid);
        },
        'StopListingPoller': () => {
            bA['StopListingPollerLP']();
        },
        'IsListingPollerWork': () => {
            return bA['IsListingPollerWorkLP']();
        },
        'GetListingPollerStatus': () => {
            return bA['GetListingPollerStatusLP']();
        }
    }, bA = {
        'f': function () {
            this['g'] = ![], this['h'] = ![], this['pollerStatus'] = 'unused', this['stopWithError'] = null, this['i'] = undefined, this['j'] = undefined, this['start'] = undefined, this['total_count'] = undefined, this['last_index'] = undefined, this['recorded_count'] = undefined, this['k'] = 0x0, this['l'] = 0xea60, this['m'] = undefined, this['last_transaction_id'] = undefined, this['n'] = ![], this['dateSegmentsCount'] = undefined, this['o'] = ![], this['marketHashNameListControl'] = [], this['dateIDListControl'] = [], this['iconUrlListControl'] = [], this['colorListControl'] = [], this['p'] = undefined;
        },
        'GetListingPollerStatusLP': function () {
            let statusData = {
                'pollerStatus': this['pollerStatus'],
                'last_index': this['last_index'],
                'recorded_count': this['recorded_count'],
                'total_count': this['total_count'],
                'stopWithError': this['stopWithError']
            };
            return this['pollerStatus'] == 'lp_error' && (statusData['error'] = this['stopWithError']), statusData;
        },
        'StopListingPollerLP': async function () {
            this['h'] = !![], this['g'] = ![];
        },
        'IsListingPollerWorkLP': function () {
            return this['g'];
        },
        'e': async function (steamid) {
            if (this['g'] || this['h'])
                return;
            bJ('Listing\x20Poller\x20is\x20Run!', 'info'), this['f'](), this['g'] = !![], this['q']('get_status'), this['r']();
            try {
                await this['s'](steamid), await this['t'](steamid), await bB(), this['q']('lp_work');
                let c7 = Math['floor']((this['total_count'] - this['last_index']) / 0x1f4) * 0x1f4;
                c7 == this['total_count'] && (c7 -= 0x1f4);
                while (this['g']) {
                    bJ('Start:\x20' + c7 + '.\x20Total\x20Count:\x20' + this['total_count'], 'start');
                    try {
                        let lastIndexCheck, c8;
                        if (this['j'] != 'koreana') {
                            let data = await this['u'](c7, this['j']), c9 = await this['u'](c7, 'koreana');
                            if (data['total_count'] != this['total_count'] || c9['total_count'] != this['total_count']) {
                                let ca = data['total_count'] >= c9['total_count'] ? data['total_count'] : c9['total_count'], cb = ca - this['total_count'];
                                c7 += cb, this['total_count'] = ca, bJ('Total\x20Count\x20Change!', 'warning');
                                continue;
                            }
                            this['v'](), lastIndexCheck = data['total_count'], c8 = be(data, c9);
                        } else {
                            let data = await this['u'](c7, this['j']);
                            if (data['total_count'] != this['total_count']) {
                                let cc = data['total_count'], cd = cc - this['total_count'];
                                c7 += cd, this['total_count'] = cc;
                                continue;
                            }
                            this['v'](), lastIndexCheck = data['total_count'], c8 = be(data, data);
                        }
                        c8['reverse'](), await this['w'](c8), await bB(), this['v'](), await this['x'](c8), await this['p']['y'](), await bE(c8, this['j']);
                        if (lastIndexCheck == this['last_index'])
                            throw 'DonePolling';
                        c7 < 0x1f4 ? (c7 = 0x0, this['n'] = !![]) : c7 -= 0x1f4, this['z']();
                    } catch (error) {
                        if (typeof error == 'object')
                            throw error;
                        if ([
                                'NeedLoginInSteamcommunity',
                                'ServerError',
                                'TooManyRequests',
                                'ErrorLoadHistory'
                            ]['includes'](error)) {
                            if (this['k'] == 0x3) {
                                bJ('Its\x203\x20try.\x20Exit', 'error');
                                throw error;
                            }
                            await this['A'](error);
                            continue;
                        }
                        throw error;
                    }
                }
                throw 'StopPolling';
            } catch (error) {
                this['g'] = ![], this['h'] = ![];
                if (typeof error == 'object') {
                    this['q']('lp_error'), this['stopWithError'] = 'UnknownError', bJ('Poller\x20stop\x20with\x20error:\x20\x27UnknownError\x27.', 'end');
                    throw error;
                } else {
                    if ([
                            'DonePolling',
                            'HaventHistory'
                        ]['includes'](error))
                        this['q']('lp_done');
                    else
                        error == 'StopPolling' ? this['q']('lp_stop') : (this['q']('lp_error'), this['stopWithError'] = error, bJ('Poller\x20stop\x20with\x20error:\x20' + error + '.', 'end'));
                }
                return;
            }
        },
        'u': async function (c7, c8, count = null) {
            let data = await RequestMyHistory(c7, c8, count);
            if (data['total_count'] == 0x0) {
                if (c8 != 'koreana') {
                    let c9 = await RequestMyHistory(c7, 'koreana', count);
                    c9['total_count'] == 0x0 && this['B'](c9['results_html']);
                } else
                    this['B'](data['results_html']);
            }
            if (data['total_count'] < this['total_count'])
                throw 'NeedChangeAccount';
            if (data['assets']['length'] == 0x0 && data['hovers'] == '')
                throw 'ServerError';
            return data;
        },
        'x': async function (c7) {
            for (let c8 of c7) {
                if (this['n'] && this['last_transaction_id'] != null) {
                    this['last_transaction_id'] == c8['row_id'] && (this['n'] = ![]);
                    continue;
                }
                await this['C'](c8), this['recorded_count'] += 0x1, this['last_index'] += 0x1, this['last_transaction_id'] = c8['row_id'];
                let c9 = {
                    'last_index': this['last_index'],
                    'recorded_count': this['recorded_count'],
                    'last_transaction_id': this['last_transaction_id'],
                    'total_count': this['total_count']
                };
                bJ('Indexes.\x20last_index:\x20' + this['last_index'] + '.\x20recorded_count:\x20' + this['recorded_count'] + '.\x20transaction_id:\x20' + this['last_transaction_id']), await am(c9, this['i'], this['j']), await bB(), this['v']();
            }
        },
        'C': async function (c7) {
            let c8 = {
                    'transaction_id': c7['row_id'],
                    'icon_url_id': undefined,
                    'hash_name_id': undefined,
                    'asset_id': c7['id'],
                    'context_id': c7['contextid'],
                    'cia_id': undefined,
                    'app_id': c7['appid'],
                    'listed_id': undefined,
                    'listed_ts': c7['listed_ts'],
                    'acted_id': undefined,
                    'acted_ts': c7['acted_ts'],
                    'transaction': c7['transaction'],
                    'price': c7['price'],
                    'index': undefined,
                    'amount': c7['amount']
                }, [icon_url_id, hash_name_id, listed_id, acted_id, background_color_id, name_color_id] = await this['D'](c7);
            c8['index'] = this['recorded_count'] + 0x1, c8['hash_name_id'] = hash_name_id['id'], c8['icon_url_id'] = icon_url_id['id'], c8['listed_id'] = listed_id['id'], c8['acted_id'] = acted_id['id'];
            background_color_id && (c8['background_color_id'] = background_color_id['id']);
            name_color_id && (c8['name_color_id'] = name_color_id['id']);
            await this['p']['E'](c7);
            let cia_d = await ap(convertClassInstancAppToCIA(c7));
            c8['cia_id'] = cia_d['id'], console['log'](JSON['stringify'](c8)), await aQ(c8, this['i']), bJ('Listing\x20Added!\x20Hash\x20Name:\x20' + c7['market_hash_name'] + '.', 'info');
        },
        'D': function (c7) {
            let c8 = [];
            return c8['push'](aH(c7['icon_url'])), c8['push'](aW(c7['market_hash_name'])), this['dateSegmentsCount'] == 0x3 ? (c8['push'](Promise['resolve']({ 'id': 0x0 })), c8['push'](Promise['resolve']({ 'id': 0x0 }))) : (c8['push'](ax(c7['listed_str'], this['j'])), c8['push'](ax(c7['acted_str'], this['j']))), c7['background_color'] ? c8['push'](at(c7['background_color'])) : c8['push'](Promise['resolve'](null)), c7['name_color'] ? c8['push'](at(c7['name_color'])) : c8['push'](Promise['resolve'](null)), Promise['all'](c8);
        },
        't': async function (steamid) {
            await this['F'](steamid), await this['G']();
        },
        'F': async function (steamid) {
            let c7 = await this['u'](0x0, 'koreana', 0xa), c8 = await ai(steamid);
            this['total_count'] = c8['total_count'], this['last_index'] = c8['last_index'], this['recorded_count'] = c8['recorded_count'];
            if (c8['last_index'] == c7['total_count'])
                throw 'DonePolling';
            this['j'] = bI(c8['language_list']), this['i'] = steamid, this['p'] = new c2(this), this['last_transaction_id'] = c8['last_transaction_id'], c8['last_transaction_id'] != null && (this['n'] = !![]);
        },
        'G': async function () {
            let c7 = [];
            return c7['push'](aZ(this['j'])), c7['push'](az(this['j'])), c7['push'](aE(this['j'])), Promise['all'](c7);
        },
        'w': async function (c7) {
            await bC(c7, this['j']), await this['p']['H'](c7['map'](c8 => c8['appid']));
            for (let c8 of c7) {
                let c9 = [];
                !this['marketHashNameListControl']['includes'](c8['market_hash_name']) ? (c9['push'](aV(c8, this['j'])), this['marketHashNameListControl']['push'](c8['market_hash_name'])) : c9['push'](Promise['resolve'](!![])), !this['iconUrlListControl']['includes'](c8['icon_url']) ? (c9['push'](aG(c8['icon_url'])), this['iconUrlListControl']['push'](c8['icon_url'])) : c9['push'](Promise['resolve'](!![])), c8['background_color'] && !this['colorListControl']['includes'](c8['background_color']) ? (c9['push'](as(c8['background_color'])), this['colorListControl']['push'](c8['background_color'])) : c9['push'](Promise['resolve'](!![])), c8['name_color'] && !this['colorListControl']['includes'](c8['name_color']) ? (c9['push'](as(c8['name_color'])), this['colorListControl']['push'](c8['name_color'])) : c9['push'](Promise['resolve'](!![])), c9 = c9['concat'](this['I'](c8)), await Promise['all'](c9), this['v']();
            }
            for (let ca of [
                    'marketHashNameListControl',
                    'dateIDListControl',
                    'iconUrlListControl',
                    'colorListControl'
                ]) {
                this[ca] = [];
            }
        },
        'I'(c7) {
            !this['o'] && (this['dateSegmentsCount'] = bH(c7['acted_str']));
            if (this['dateSegmentsCount'] == 0x3)
                return [
                    Promise['resolve'](!![]),
                    Promise['resolve'](!![])
                ];
            let c8 = [], c9, listedDict;
            if (c7['acted_str'] && c7['acted_ts']) {
                let dateID = bG(c7['acted_ts']);
                !this['dateIDListControl']['includes'](dateID) ? (c9 = {
                    'id': dateID,
                    'date_str': c7['acted_str']
                }, c8['push'](aw(c9, this['j'])), this['dateIDListControl']['push'](dateID)) : c8['push'](Promise['resolve'](!![]));
            }
            if (c7['listed_str'] && c7['listed_ts']) {
                let dateID = bG(c7['listed_ts']);
                !this['dateIDListControl']['includes'](dateID) ? (listedDict = {
                    'id': dateID,
                    'date_str': c7['listed_str']
                }, c8['push'](aw(listedDict, this['j'])), this['dateIDListControl']['push'](dateID)) : c8['push'](Promise['resolve'](!![]));
            }
            return c8;
        },
        's': async function (steamid) {
            let c7 = await RequestMarketPage(), c8 = isMarketPageLoadCorrect(c7);
            if (c8 != '')
                throw c8;
            let c9 = parseSteamId(c7);
            if (steamid != c9)
                throw 'NeedChangeAccount';
        },
        'B': function (c7) {
            let message = parseHistoryMessage(c7);
            throw whyMyHistoryEmpty(message);
        },
        'q': function (status) {
            this['pollerStatus'] = status;
        },
        'A': async function (error) {
            this['k'] += 0x1, this['J'] = new Date()['getTime']() + this['l'], this['q']('lp_wait_unban_' + this['l'] / 0x3e8), bJ('Try:\x20' + this['k'] + '.\x20Timer\x20sleep\x20sec:\x20' + this['l'] / 0x3e8, 'info'), await this['K']()['catch'](error => {
                throw error;
            }), this['l'] += this['l'], this['q']('lp_work');
        },
        'r': function () {
            this['g'] && (chrome['runtime']['getPlatformInfo'](), setTimeout(() => {
                bA['r']();
            }, 0x61a8));
        },
        'K': function () {
            return new Promise((c7, c8) => {
                const c9 = () => {
                    if (!this['g']) {
                        c8('StopPolling');
                        return;
                    }
                    let ca = new Date()['getTime']();
                    ca < this['J'] ? setTimeout(c9, 0x2710) : c7(!![]);
                };
                c9();
            });
        },
        'z': function () {
            this['k'] = 0x0, this['l'] = 0xea60, this['J'] = undefined;
        },
        'v': function () {
            if (!this['g'])
                throw 'StopPolling';
        }
    };
function bB() {
    return isOutOfMemory()['then'](c7 => {
        if (c7)
            throw 'OutOfMemory';
    });
}
async function bC(c7, c8) {
    let description_list = c7['map'](c9 => c9['descriptions']);
    description_list = await bD(description_list, c8);
    if (!description_list)
        return;
    return aB(c8)['then'](function (c9) {
        let ca = [];
        for (let cb of description_list) {
            c9++;
            let descriptionData = {
                'description': cb,
                'id': c9
            };
            ca['push'](aA(descriptionData, c8));
        }
        return Promise['all'](ca);
    });
}
async function bD(description_list, c7) {
    let c8 = [], c9 = [];
    for (let description_l of description_list) {
        if (!description_l)
            continue;
        for (let ca of description_l) {
            let cb = JSON['stringify'](ca);
            if (!c8['includes'](cb)) {
                let cc = await aD(cb, c7);
                !cc && c9['push'](cb), c8['push'](cb);
            }
        }
    }
    return c9;
}
async function bE(c7, c8) {
    let c9 = [];
    for (let ca of c7) {
        if (!ca['descriptions'])
            continue;
        let cia = convertClassInstancAppToCIA(ca);
        if (c9['includes'](cia))
            continue;
        await bF(ca['descriptions'], c8)['then'](cb => {
            return ap(cia)['then'](ciaData => {
                if (ciaData['descriptions'] && ciaData['descriptions'][c8])
                    return;
                !ciaData['descriptions'] && (ciaData['descriptions'] = {}), ciaData['descriptions'][c8] = cb, ar(ciaData);
            });
        }), c9['push'](cia);
    }
}
function bF(descriptions, c7) {
    let c8 = [];
    for (let description of descriptions) {
        let c9 = aD(JSON['stringify'](description), c7)['then'](function (ca) {
            return ca['id'];
        });
        c8['push'](c9);
    }
    return Promise['all'](c8);
}
function bG(c7) {
    let c8 = new Date(c7);
    return c8['getDate']() + '_' + (c8['getMonth']() + 0x1);
}
function bH(date_str) {
    let c7 = date_str['match'](/\d+/g);
    return c7['length'];
}
function bI(c7) {
    for (let c8 of Object['keys'](c7)) {
        let c9 = c7[c8];
        if (c9['main_language'])
            return c8;
    }
}
function bJ(c7, color) {
    color = color || 'black';
    let c8 = 'White';
    switch (color) {
    case 'success':
        color = 'Green', c8 = 'LimeGreen';
        break;
    case 'info':
        color = 'DodgerBlue', c8 = 'Turquoise';
        break;
    case 'error':
        color = 'Red', c8 = 'Black';
        break;
    case 'start':
        color = 'OliveDrab', c8 = 'PaleGreen';
        break;
    case 'warning':
        color = 'Tomato', c8 = 'Black';
        break;
    case 'end':
        color = 'Orchid', c8 = 'MediumVioletRed';
        break;
    default:
        color = color;
    }
    if (typeof c7 == 'object')
        console['log'](c7);
    else
        typeof color == 'object' ? (console['log']('%c' + c7, 'color:\x20PowderBlue;font-weight:bold;\x20background-color:\x20RoyalBlue;'), console['log'](color)) : console['log']('%c' + c7, 'color:' + color + ';font-weight:bold;\x20background-color:\x20' + c8 + ';');
}
bA['f']();
let bK = ![];
const bL = {}, bM = {
        'SearchListingsRequest': async function (c7, c8) {
            let tabId = c8['tab']['id'];
            if (!bL[tabId])
                bL[tabId] = new bO();
            else {
                let c9 = bQ(c7), ca = bT(c9);
                bL[tabId]['sessionId'] != ca && (delete bL[tabId], bL[tabId] = new bO());
            }
            return bN(), await bL[tabId]['L'](c7);
        }
    };
function bN() {
    if (bK)
        return;
    bK = !![];
    let c7 = () => {
        chrome['tabs']['query']({})['then'](c8 => {
            let tabsSearchArray = Object['keys'](bL)['map'](c9 => Number(c9));
            for (let tabSearchID of tabsSearchArray) {
                let c9 = ![];
                for (let ca of c8) {
                    if (ca['id'] == tabSearchID) {
                        ca['url']['match'](/steamcommunity\.com\/market(?:\/?$|\/?[?#])/m) && (c9 = !![]);
                        break;
                    }
                }
                !c9 && delete bL[tabSearchID];
            }
            Object['keys'](bL)['length'] > 0x0 ? setTimeout(c7, 0x2710) : bK = ![];
        });
    };
    c7();
}
function bO() {
    this['M'] = ![], this['f'] = function () {
        this['N'] = undefined, this['O'] = undefined, this['P'] = undefined, this['Q'] = undefined, this['R'] = undefined, this['S'] = undefined, this['T'] = undefined, this['U'] = undefined, this['language'] = undefined, this['sessionId'] = undefined, this['currency'] = undefined, this['V'] = undefined, this['W'] = 0x0, this['X'] = undefined, this['Y'] = undefined, this['Z'] = undefined, this['a0'] = [], this['a1'] = {}, this['a2'] = ![], this['a3'] = ![];
    }, this['L'] = async function (c7) {
        try {
            this['M'] = !![], await this['a4'](c7);
            this['a3'] && await this['a5']();
            if (this['a3'] && this['P'] && !this['Z'] || this['a3'] && this['T'] && !this['Y'])
                return this['M'] = ![], null;
            this['a3'] = ![], await this['search']();
            if (this['a0']['length'] == 0x0)
                return this['M'] = ![], null;
            let c8 = this['a0'];
            this['O'] == 'time.asc' && c8['reverse']();
            let c9 = await Promise['all'](c8['map'](ca => bc(ca, this['language'], this['currency'])));
            return this['a6'](c9);
        } catch (ca) {
            return null;
        } finally {
            this['a0'] = [], this['M'] = ![];
        }
    }, this['a4'] = async function (c7, c8) {
        let c9 = bQ(c7), [ca, cb] = bS(c9), cc = bR(ca);
        if (this['X'] == cc && cb) {
            this['S'] = Number(cb);
            return;
        } else
            this['f']();
        this['X'] = cc;
        let cd = ![];
        for (let ce of ca) {
            if (ce[0x0] == 'search')
                ce[0x1] != '' && (this['P'] = ce[0x1]['toLocaleUpperCase'](), this['a3'] = !![]);
            else {
                if (ce[0x0] == 'sessionid')
                    this['sessionId'] = ce[0x1];
                else {
                    if (ce[0x0] == 'transactions')
                        this['N'] = ce[0x1];
                    else {
                        if (ce[0x0] == 'sort_by')
                            this['O'] = ce[0x1];
                        else {
                            if (ce[0x0] == 'pagesize')
                                this['Q'] = Number(ce[0x1]);
                            else {
                                if (ce[0x0] == 'appid')
                                    this['R'] = Number(ce[0x1]);
                                else {
                                    if (ce[0x0] == 'steamid')
                                        this['U'] = ce[0x1];
                                    else {
                                        if (ce[0x0] == 'language')
                                            this['language'] = ce[0x1];
                                        else {
                                            if (ce[0x0] == 'currency')
                                                this['currency'] = ce[0x1];
                                            else
                                                ce[0x0]['includes']('category') && ce[0x1] != 'any' && (this['a3'] = !![], cd = !![]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (this['a3'] && cd) {
            let cf = [];
            for (let cg of ca) {
                cg[0x0]['includes']('category') && cg[0x1] != 'any' && cf['push']([
                    cg[0x0]['replace']('category_', ''),
                    cg[0x1]
                ]);
            }
            this['T'] = cf;
        }
        this['V'] = await aT(this['U']);
    }, this['a5'] = async function () {
        if (this['P']) {
            let c7 = (c9, ca) => {
                    return aL('market_names')['then'](cb => {
                        return new Promise(cc => {
                            let cd = c9 == 'market_hash_name' ? 'market_hash_name' : 'market_name', transaction = globalThis['MarketNamesDB']['transaction'](c9, 'readonly')['objectStore'](c9), ce = transaction['openCursor']();
                            ce['onsuccess'] = async cf => {
                                let cg = ce['result'];
                                if (cg) {
                                    let nameData = cg['value'];
                                    if (!c8['includes'](nameData['id'])) {
                                        let nameString = nameData[cd]['toLocaleUpperCase']();
                                        nameString['includes'](ca) && c8['push'](nameData['id']);
                                    }
                                    cg['continue']();
                                } else
                                    cc();
                            };
                        });
                    });
                }, c8 = [];
            await Promise['all']([
                c7('market_hash_name', this['P']),
                c7(this['language'], this['P'])
            ]), this['Z'] = c8;
        }
        if (this['T']) {
            let categoryControl = [], ciaListControl = {}, c9 = this['T']['map'](tagKV => {
                    let tagName = tagKV[0x0] + '=' + tagKV[0x1];
                    return !categoryControl['includes'](tagKV[0x0]) && categoryControl['push'](tagKV[0x0]), b3(tagName)['then'](tagData => {
                        !ciaListControl[tagData['category']] && (ciaListControl[tagData['category']] = []);
                        for (let ca of tagData['ciaid_list']) {
                            ciaListControl[tagData['category']]['push']({
                                'category': tagData['category'],
                                'ciaid': ca
                            });
                        }
                    });
                });
            await Promise['all'](c9);
            let ciaListArray = Object['values'](ciaListControl), ciaidResult;
            categoryControl['length'] == 0x1 ? (ciaidResult = [], ciaListArray['forEach'](ciaList => ciaList['forEach'](cia => ciaidResult['push'](cia['ciaid'])))) : ciaidResult = bP(ciaListArray, categoryControl), this['Y'] = ciaidResult;
        }
    }, this['search'] = async function () {
        return aU(this['U'])['then'](c7 => {
            let c8 = this, c9, ca;
            if (this['O'] == 'time.desc')
                c9 = 'prev';
            else
                this['O'] == 'time.asc' && (c9 = 'next');
            return !this['S'] && (c9 == 'prev' ? this['a1'][0x1] = this['V'] : this['a1'][0x1] = 0x1), c9 == 'prev' ? ca = this['S'] ? IDBKeyRange['upperBound'](this['S']) : IDBKeyRange['upperBound'](this['a1'][0x1]) : ca = this['S'] ? IDBKeyRange['lowerBound'](this['S']) : IDBKeyRange['lowerBound'](this['a1'][0x1]), new Promise((cb, cc) => {
                let cd = ![], ce = 0x0, cf = 0x1, cg = 0x0, transaction = globalThis['ListingsDB_' + this['U']]['transaction']('listings', 'readonly')['objectStore']('listings'), ch = transaction['openCursor'](ca, c9);
                ch['onsuccess'] = ci => {
                    let cj = ch['result'];
                    if (cj) {
                        while (!![]) {
                            let ck = cj['value'];
                            if (!c8['a7'](ck))
                                break;
                            !c8['S'] && !c8['a2'] && cg++;
                            if (!cd) {
                                c8['a0']['push'](ck), ce++;
                                if (ce == c8['Q']) {
                                    if (c8['S']) {
                                        cb(!![]);
                                        return;
                                    }
                                    ce = 0x0, cd = !![];
                                    break;
                                }
                            }
                            if (!cd)
                                break;
                            ce++;
                            ce == 0x1 && (cf++, c8['a1'][cf] = cj['key']);
                            ce == c8['Q'] && (ce = 0x0);
                            break;
                        }
                        cj['continue']();
                    } else {
                        !c8['a2'] && (this['W'] = cg, c8['a2'] = !![]);
                        cb(!![]);
                        return;
                    }
                };
            })['catch'](cb => {
                throw cb;
            });
        })['catch'](c7 => {
            this['a0'] = [];
        });
    }, this['a7'] = function (c7) {
        if (this['N'] != 'all' && this['N'] != c7['transaction'])
            return ![];
        if (this['R'] && this['R'] != c7['app_id'])
            return ![];
        if (this['Y'] && !this['Y']['includes'](c7['cia_id']))
            return ![];
        if (this['Z'] && !this['Z']['includes'](c7['hash_name_id']))
            return ![];
        return !![];
    }, this['a6'] = function (c7) {
        let c8 = {
            'listings': c7,
            'pagesize': this['Q'],
            'total_count': this['W']
        };
        return this['S'] ? c8['index_cursor'] = this['S'] : (c8['max_page'] = Object['keys'](this['a1'])['length'], c8['page_matrix'] = this['a1']), c8;
    };
}
function bP(ciaListArray, categoryControl) {
    let c7 = function (ca) {
            let cb = {};
            for (let cc of categoryControl) {
                cc != ca && (cb[cc] = ![]);
            }
            return cb;
        }, c8 = [], c9 = [];
    ciaListArray['sort']((ca, cb) => ca['length'] - cb['length']);
    for (let ciaListCount = 0x0; ciaListCount < ciaListArray['length']; ciaListCount++) {
        for (let ciaCount = 0x0; ciaCount < ciaListArray[ciaListCount]['length']; ciaCount++) {
            let cia = ciaListArray[ciaListCount][ciaCount];
            if (c8['includes'](cia['ciaid']) || c9['includes'](cia['ciaid'])) {
                ciaListArray[ciaListCount]['splice'](ciaCount, 0x1);
                continue;
            }
            let countsForDeleteCIAs = [], ca = c7(cia['category']);
            for (let cc = 0x0; cc < ciaListArray['length']; cc++) {
                for (let cd = 0x0; cd < ciaListArray[cc]['length']; cd++) {
                    let ce = ciaListArray[cc][cd];
                    if (cia['category'] == ce['category'])
                        break;
                    if (cia['ciaid'] == ce['ciaid']) {
                        ca[ce['category']] = !![], countsForDeleteCIAs['push']([
                            cc,
                            cd
                        ]);
                        break;
                    }
                }
                if (!Object['values'](ca)['includes'](![]))
                    break;
            }
            !Object['values'](ca)['includes'](![]) && c8['push'](cia['ciaid']);
            let cb = ciaListArray['map'](cf => cf['length']);
            if (cb['includes'](0x0))
                return c8;
            c9['push'](cia['ciaid']), countsForDeleteCIAs['push']([
                ciaListCount,
                ciaCount
            ]), countsForDeleteCIAs['forEach'](countsDel => ciaListArray[countsDel[0x0]]['splice'](countsDel[0x1], 0x1));
        }
    }
    return c8;
}
function bQ(c7) {
    let c8 = c7['split']('&');
    return c8 = c8['map'](c9 => c9['split']('=')), c8;
}
function bR(c7) {
    let c8 = '';
    for (let c9 = 0x0; c9 < c7['length']; c9++) {
        let ca = c7[c9];
        c8 += ca[0x0] + '=' + ca[0x1], c9 + 0x1 != c7['length'] && (c8 += '&');
    }
    return c8;
}
function bS(c7) {
    let c8 = null, c9 = [];
    for (let ca of c7) {
        ca[0x0] != 'index_cursor' ? c9['push'](ca) : c8 = ca[0x1];
    }
    return [
        c9,
        c8
    ];
}
function bT(c7) {
    for (let c8 of c7) {
        if (c8[0x0] == 'sessionid')
            return c8[0x1];
    }
}
let bU = ![], bV = undefined;
const bW = {}, bX = {
        'GetStatusOfListingPoller': async function (c7) {
            let tabId = c7['tab']['id'];
            return !bW[tabId] && (bW[tabId] = new c0(tabId), !bU && (bU = !![], bV = setTimeout(bY, 0x61a8))), await bW[tabId]['GetListingPollerStatus']();
        }
    };
async function bY() {
    return new Promise(c7 => {
        let c8 = () => {
            bV = null, chrome['tabs']['query']({})['then'](c9 => {
                let tabsOfStatusPollerCallback = Object['keys'](bW);
                c9 = c9['map'](ca => String(ca['id']));
                for (let ca = 0x0; ca < tabsOfStatusPollerCallback['length']; ca++) {
                    let tabId = tabsOfStatusPollerCallback[ca];
                    !c9['includes'](tabId) && bZ(tabId);
                }
                Object['keys'](bW)['length'] > 0x0 ? bV = setTimeout(c8, 0x61a8) : (bU = ![], c7(!![]));
            });
        };
        c8();
    });
}
function bZ(tabId) {
    delete bW[tabId], Object['keys'](bW)['length'] == 0x0 && bV && (clearTimeout(bV), bU = ![]);
}
function c0(tabId) {
    this['tabId'] = tabId, this['a8'] = ![], this['isPollerWork'] = ![], this['pollerStatus'] = 'unused', this['total_count'] = undefined, this['last_index'] = undefined, this['recorded_count'] = undefined, this['stopWithError'] = undefined, this['GetListingPollerStatus'] = function () {
        this['a8'] ? setTimeout(bZ, 0x7d0, this['tabId']) : (this['a9'](), this['pollerStatus'] != 'unused' && (this['isPollerWork'] = !![]));
        let statusData = {
            'isPollerWork': this['isPollerWork'],
            'status': this['pollerStatus']
        };
        return ![
            'unused',
            'lp_error'
        ]['includes'](this['pollerStatus']) && (statusData['last_index'] = this['last_index'], statusData['recorded_count'] = this['recorded_count'], statusData['total_count'] = this['total_count']), this['pollerStatus'] == 'lp_error' && (statusData['error'] = this['stopWithError'], this['stopWithError'] = null), [
            'lp_done',
            'lp_stop',
            'lp_error'
        ]['includes'](this['pollerStatus']) && (this['isPollerWork'] = ![], this['pollerStatus'] = 'unused', this['a8'] = !![]), statusData;
    }, this['a9'] = function () {
        let statusData = bz['GetListingPollerStatus']();
        for (let c7 of Object['entries'](statusData)) {
            this[c7[0x0]] = c7[0x1];
        }
    };
}
const c1 = {
    'GetAppFilters': c7 => {
        return c3(c7);
    }
};
function c2(c7) {
    this['aa'] = {}, this['ab'] = {}, this['ac'] = c7, this['H'] = async function (c8) {
        for (let appid of c8) {
            if (!appid)
                continue;
            if (!this['aa'][appid]) {
                let c9 = await RequestAppFilters(appid, this['ac']['j']);
                if (c9['facets']) {
                    this['aa'][appid] = !![];
                    for (let category of Object['keys'](c9['facets'])) {
                        this['ab'][category] = c9['facets'][category];
                    }
                } else
                    this['aa'][appid] = ![];
            }
        }
    }, this['E'] = async function (c8) {
        let cia = convertClassInstancAppToCIA(c8);
        if (!this['aa'][c8['appid']]) {
            await ao(cia);
            return;
        }
        let ciaDB = await ap(cia);
        if (ciaDB)
            return;
        let ciaArr = convertCIAToClassInstancApp(cia), c9, tagsRaw, tagsList;
        try {
            c9 = await RequestItemClassHover(ciaArr[0x2], ciaArr[0x0], ciaArr[0x1]), tagsRaw = c6(c9);
            if (!tagsRaw['tags']) {
                await ao(cia);
                return;
            }
            tagsList = await this['ad'](tagsRaw['tags'], c8['appid']);
        } catch (error) {
            if (typeof error == 'object')
                throw error;
            else
                return await this['ac']['A']('TagsServerError_' + error), await this['E'](c8);
        }
        this['ac']['z'](), await ao(cia), ciaDB = await ap(cia);
        let cia_id = ciaDB['id'];
        for (let tagData of tagsList) {
            let tagDB = await b3(tagData['tag']);
            if (!tagDB) {
                let ca = Object['assign']({}, tagData, { 'ciaid_list': [] });
                await b1(ca);
            }
            await b0(tagData['tag'], cia_id);
        }
    }, this['ad'] = async function (tags, app_id) {
        let c8 = [];
        for (let tag_d of tags) {
            if (!this['ab'][app_id + '_' + tag_d['category']]['tags'][tag_d['internal_name']])
                continue;
            let tagData = await this['ae'](tag_d, app_id);
            c8['push'](tagData);
        }
        return c8;
    }, this['ae'] = function (tag_d, app_id) {
        let categoryName = app_id + '_' + tag_d['category'], tagValue = tag_d['internal_name'], tagData = this['ab'][categoryName]['tags'][tag_d['internal_name']], c8 = [];
        return c8['push'](b5(categoryName)), c8['push'](b5(categoryName + '=' + tagValue)), tagData['color'] && c8['push'](as(tagData['color'])), Promise['all'](c8)['then'](function () {
            let c9 = [];
            return c9['push'](b7(categoryName)), c9['push'](b7(categoryName + '=' + tagValue)), tagData['color'] && c9['push'](at(tagData['color'])), Promise['all'](c9);
        })['then'](c9 => {
            let [category_name, tag_name, color] = c9, ca = {
                    'appid': app_id,
                    'category': categoryName,
                    'category_name_id': category_name['id'],
                    'tag_name_id': tag_name['id'],
                    'tag': categoryName + '=' + tagValue
                }, categoryTagsCount = Object['keys'](this['ab'][categoryName]['tags'])['length'];
            return categoryTagsCount <= 0x14 ? ca['type'] = 'checkbox' : ca['type'] = 'dropdown', color && (ca['color_id'] = color['id']), ca;
        });
    }, this['y'] = async function () {
        let c8 = await Promise['all']([
            ba('tag_name_id'),
            ba(this['ac']['j'])
        ]);
        if (c8[0x0] == c8[0x1])
            return;
        let countDiffrent = c8[0x0] - c8[0x1], c9 = Object['keys'](this['aa']);
        return b6()['then'](async ca => {
            for (let tagData of ca) {
                let cb = await b9(tagData['id'], this['ac']['j']);
                if (!cb) {
                    let cc = tagData['tag_name_id']['split']('_')[0x0];
                    c9['includes'](cc) && await this['af'](tagData), countDiffrent -= 0x1;
                }
                if (countDiffrent == 0x0)
                    return;
            }
        });
    }, this['af'] = function (tagData) {
        let c8;
        if (tagData['tag_name_id']['includes']('=')) {
            let [categoryName, tagName] = tagData['tag_name_id']['split']('=');
            c8 = this['ab'][categoryName]['tags'][tagName]['localized_name'];
        } else
            c8 = this['ab'][tagData['tag_name_id']]['localized_name'];
        return b8(c8, tagData['id'], this['ac']['j']);
    }, bb(c7['j']);
}
function c3(c7) {
    return b2(c7['appid'])['then'](async function (tagsList) {
        let c8 = {};
        for (let tagData of tagsList) {
            if (!c8[tagData['category']]) {
                let categoryName = await b9(tagData['category_name_id'], c7['language']);
                c8[tagData['category']] = {
                    'type': tagData['type'],
                    'localized_name': categoryName['localized_name'],
                    'tags': {}
                };
            }
            let tagName = await b9(tagData['tag_name_id'], c7['language']), tagValue = tagData['tag']['split']('=')[0x1], tagMatchesCount = tagData['ciaid_list']['length'], c9 = {
                    'localized_name': tagName['localized_name'],
                    'matches': tagMatchesCount
                };
            if (tagData['color_id']) {
                let color = await au(tagData['color_id']);
                c9['color'] = color['color'];
            }
            c8[tagData['category']]['tags'][tagValue] = c9;
        }
        return c8;
    });
}
function c4(tagRaw, c7) {
    let c8 = [];
    return c8['push'](b5(tagRaw['categoryValue'])), c8['push'](b5(tagRaw['categoryValue'] + '=' + tagRaw['tagValue'])), tagRaw['color'] && c8['push'](as(tagRaw['color'])), Promise['all'](c8)['then'](function () {
        let c9 = [];
        return c9['push'](b7(tagRaw['categoryValue'])), c9['push'](b7(tagRaw['categoryValue'] + '=' + tagRaw['tagValue'])), tagRaw['color'] && c9['push'](at(tagRaw['color'])), Promise['all'](c9)['then'](function (ca) {
            let [category_name, tag_name] = ca;
            return new Promise(function (cb) {
                let cc = [];
                cc['push'](b8(tagRaw['categoryLocalizedName'], category_name['id'], c7)), cc['push'](b8(tagRaw['tagLocalizedName'], tag_name['id'], c7)), Promise['all'](cc)['then'](cb(ca));
            });
        });
    })['then'](function (c9) {
        let [category_name, tag_name, color] = c9, tagData = {
                'appid': tagRaw['appid'],
                'type': tagRaw['type'],
                'categoryNameId': category_name['id'],
                'tagNameId': tag_name['id'],
                'tag': tagRaw['categoryValue'] + '=' + tagRaw['tagValue']
            };
        return color && (tagData['color_id'] = color['id']), tagData;
    });
}
function c5(tags, app_id) {
    let c7 = [];
    for (let tag_d of tags) {
        let c8 = tag_d['category'] + '=' + tag_d['internal_name'];
        c7['push']({
            'tag': c8,
            'appid': app_id
        });
    }
    return c7;
}
function c6(c7) {
    let c8 = c7['match'](/BuildHover.+?\$\('.+'\)\.show/s);
    if (!c8)
        throw 'ServerError';
    c8 = c8[0x0]['match'](/{.+}/s)[0x0];
    try {
        c8 = JSON['parse'](c8);
    } catch (error) {
        c8 = c8['replace'](/[\b]/g, '\x5cb')['replace'](/[\f]/g, '\x5cf')['replace'](/[\n]/g, '\x5cn')['replace'](/[\r]/g, '\x5cr')['replace'](/[\t]/g, '\x5ct'), c8 = JSON['parse'](c8);
    }
    ;
    return c8;
}
export {
    bz as ListingPollerCallback,
    c1 as TagsCallback,
    av as DatabasesCallback,
    bM as SearchListingsCallback,
    bX as StatusPollerCallback
};
