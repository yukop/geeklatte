
function getImageDataListFromJSON(json) {
	var imageDataList = [];
	var thisTitle = json.feed.entry[2].title.$t;
	var thisImageURL = json.feed.entry[2].content.$t;
	var imageData = {
		title: thisTitle,
		imageURL: thisImageURL
	};
	imageDataList.push(imageData);
	return imageDataList;
}

function setImageList(anImageList) {
	$('.entryImage').attr('src', anImageList[0].imageURL);
}


var URL = 'https://spreadsheets.google.com/feeds/list/0Ak1KvWLO65McdGtaMC05dGh5andQWHpiNHpLX1VxZnc/od6/public/basic?alt=json'
// var URL = 'https://spreadsheets.google.com/feeds/cells/0Ak1KvWLO65McdGtaMC05dGh5andQWHpiNHpLX1VxZnc/od6/public/basic?alt=json'

function mainAfterGetJson(data) {
	var imageList = getImageDataListFromJSON(data);
	console.log(imageList);
	setImageList(imageList);
}

function main() {
	$.getJSON(URL, mainAfterGetJson);	
}

main();