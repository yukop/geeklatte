
function getImageDataListFromJSON(json) {
	var imageDataList = [];
	for (var i = 0, k = i + 1, l = json.feed.entry.length; i < l; i++) {
		var thisTitle = json.feed.entry[i].content.$t;
		var thisImageURL = json.feed.entry[k].content.$t;
		var imageData = {
			title: thisTitle,
			imageURL: thisImageURL
		};
		imageDataList.push(imageData);
	}
//	console.log(imageDataList);
	return imageDataList;
}

function setImageList(anImageList) {
	var contentBody = $('#contentBody');
	var div = $('<div class="latte"></div>');
	var entryImageBlock = $('<div class="entryImageBlock"></div>');
	var entryImage = $('<img class="entryImage" src="" width="612" alt="">');
	var entryTitle = $('<p class="entryTitle"></p>');
	for (var i = 0, l = anImageList.length; i < l; i++) {
		$(div).append(entryImageBlock);
		$(entryImageBlock).append(entryImage);
		$('.entryImage').attr('src', anImageList[i].imageURL);
		$('.entryTitle').text(anImageList[i].title);
		// これらをまとめて var entry に代入したい
		// cloneNode(true)
		console.log($(div).append(entryImageBlock));
	}
	$(div).show();
}

// var URL = 'https://spreadsheets.google.com/feeds/list/0Ak1KvWLO65McdGtaMC05dGh5andQWHpiNHpLX1VxZnc/od6/public/basic?alt=json'
var URL = 'https://spreadsheets.google.com/feeds/cells/0Ak1KvWLO65McdGtaMC05dGh5andQWHpiNHpLX1VxZnc/od6/public/basic?alt=json'

function mainAfterGetJson(data) {
	var imageList = getImageDataListFromJSON(data);
	console.log(imageList);
	setImageList(imageList);
}

function main() {
	$.getJSON(URL, mainAfterGetJson);	
}

main();