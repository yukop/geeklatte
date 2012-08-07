
function getImageDataListFromJSON(json) {
	var imageDataList = [];
	for (var i = 0, k = i + 1, l = json.feed.entry.length; i < l; i = i + 2) {
		var thisTitle = json.feed.entry[i].content.$t;
		var thisImageURL = json.feed.entry[k].content.$t;
		var imageData = {
			title: thisTitle,
			imageURL: thisImageURL
		};
		imageDataList.push(imageData);
	}
	console.log(imageDataList);
	return imageDataList;
}

function setImageList(anImageList) {
	var contentBody = $('#contentBody');
	var latte = $('.latte');

	for (var i = 0, l = anImageList.length; i < l; i++) {
		$(latte).clone(true).insertAfter(latte);
		$('.entryImage').attr('src', anImageList[i].imageURL);
		$('.entryTitle').text(anImageList[i].title);
	}
}

// var URL = 'https://spreadsheets.google.com/feeds/list/0Ak1KvWLO65McdGtaMC05dGh5andQWHpiNHpLX1VxZnc/od6/public/basic?alt=json'
var URL = 'https://spreadsheets.google.com/feeds/cells/0Ak1KvWLO65McdGtaMC05dGh5andQWHpiNHpLX1VxZnc/od6/public/basic?alt=json'

function mainAfterGetJson(data) {
	var imageList = getImageDataListFromJSON(data);
	setImageList(imageList);
}

function main() {
	$.getJSON(URL, mainAfterGetJson);	
}

main();