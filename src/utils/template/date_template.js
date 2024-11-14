const dateTemplate = {
	"schinese": {
		"strSymbol": "*year* 年 ",
		"symbolPrefix": true
	},
	"tchinese": {
		"strSymbol": "*year* 年 ",
		"symbolPrefix": true
	},
	"japanes": {
		"strSymbol": "*year*年",
		"symbolPrefix": true
	},
	"thai": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"bulgarian": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"czech": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"denish": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"german": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"english": {
		"strSymbol": ", *year*",
		"symbolPrefix": false	
	},
	"spanish": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"latam": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"greek": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"french": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"italian": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"indonesian": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"hungarian": {
		"strSymbol": "*year*. ",
		"symbolPrefix": true	
	},
	"dutch": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"norwegian": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"polish": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"portuguese": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"brazilian": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"romanian": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"russian": {
		"strSymbol": ". *year* г.",
		"symbolPrefix": false
	},
	"finnish": {
		"strSymbol": "*year*",
		"symbolPrefix": false
	},
	"swedish": {
		"strSymbol": ", *year*",
		"symbolPrefix": false
	},
	"turkish": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	},
	"vietnamese": {
		"strSymbol": ", *year*",
		"symbolPrefix": false
	},
	"ukrainian": {
		"strSymbol": " *year*",
		"symbolPrefix": false
	}
}

function buildDateStr(dateStr, ts, language) {
	let r_dateStr;
	if (language == 'koreana') {
		r_dateStr = `${ts.getFullYear()}년 ${ts.getMonth() + 1}월 ${ts.getDate()}일`;
	} else {	
		let templ = dateTemplate[language];
		if (templ.symbolPrefix) {
			r_dateStr = templ.strSymbol.replace('*year*', ts.getFullYear()) + dateStr;
		} else {
			r_dateStr = dateStr + templ.strSymbol.replace('*year*', ts.getFullYear());
		}
	}
	return r_dateStr;
}

export { buildDateStr }