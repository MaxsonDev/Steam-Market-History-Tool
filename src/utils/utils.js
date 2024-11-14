const languagesOfflineDict = {
    "schinese": "Simplified Chinese",
    "tchinese": "Traditional Chinese",
    "japanese": "Japanese",
    "koreana": "Korean",
    "thai": "Thai",
    "bulgarian": "Bulgarian",
    "czech": "Czech",
    "danish": "Danish",
    "german": "German",
    "english": "English",
    "spanish": "Spanish - Spain",
    "latam": "Spanish - Latin America",
    "greek": "Greek",
    "french": "French",
    "italian": "Italian",
    "indonesian": "Indonesian",
    "hungarian": "Hungarian",
    "dutch": "Dutch",
    "norwegian": "Norwegian",
    "polish": "Polish",
    "portuguese": "Portuguese - Portugal",
    "brazilian": "Portuguese - Brazil",
    "romanian": "Romanian",
    "russian": "Russian",
    "finnish": "Finnish",
    "swedish": "Swedish",
    "turkish": "Turkish",
    "vietnamese": "Vietnamese",
    "ukrainian": "Ukrainian"
}

function generateID(length=10) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

function calculateFreeStorageSpace(convertInMB=false) {
    return globalThis.navigator.storage.estimate()
    .then((storageInfo) => {
        let freeSpace = storageInfo.quota - storageInfo.usage;
        if (convertInMB) {
            freeSpace = (freeSpace / 1024 / 1024).toFixed(2);
        }
        return freeSpace;
    });
}

function isOutOfMemory() {
    return calculateFreeStorageSpace().then((freeSpace) => {return (freeSpace <= 2_000_000) ? true : false});         
}

function removeChildrensNode(parentNode) {
	while (parentNode.firstChild) {
		parentNode.firstChild.remove();
	}
}

function convertClassInstancAppToCIA(listing) {
    return `${listing.classid}_${listing.instanceid}_${listing.appid}`;
}

function convertCIAToClassInstancApp(cia) {
    return cia.split('_');
}

export { generateID, removeChildrensNode, convertClassInstancAppToCIA, convertCIAToClassInstancApp, languagesOfflineDict, isOutOfMemory }