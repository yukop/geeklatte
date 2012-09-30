function createEntryList(json) {
	var largeImageUrlList = [];
	var imageUrlList = [];
	var titleList = [];
	var entryUrlList = [];
	for (var i = 0, l = json.photo.length; i < l; i++ ) {
		largeImageUrlList = largeImageUrlList.concat(json.photo[i].url_l);
		imageUrlList = imageUrlList.concat(json.photo[i].url_m);
		titleList = titleList.concat(json.photo[i].title);
		entryUrlList = entryUrlList.concat('http://www.flickr.com/photos/' + json.ownername + '/' + json.photo[i].id + '/in/set-' + json.id + '/');
	}
	var latestEntries = {
		'largeImageUrlList': largeImageUrlList,
		'imageUrlList': imageUrlList,
		'titleList': titleList,
		'entryUrlList': entryUrlList
	}
	return latestEntries;
};

function setRandomNum(entryList) {
	var randomNum = Math.floor(Math.random() * entryList.imageUrlList.length);
	return randomNum;
}

function setMainImage(latestEntries, indexNum){
//	$('#mainImageLink').attr('href', latestEntries.entryUrlList[indexNum]);
	$('#mainImage').attr('src', latestEntries.largeImageUrlList[indexNum]);
	$('#mainImage').attr('alt', latestEntries.titleList[indexNum]);
	mainImage.onload = function(){$('html').removeClass('loading')}
//	$('#mainImageClip').css("background-image", 'url(' + latestEntries.largeImageUrlList[indexNum] + ')');	
};


//randomImage
function randomImage() {
	$.getJSON('js/latestEntries.json', function(data){
		var latestEntries = createEntryList(data);
		var indexNum = setRandomNum(latestEntries);
		setMainImage(latestEntries, indexNum);
	})
}

//prepare
function setHtmlClass(classValue) {
	$('html').removeClass('no-js').addClass(classValue);
};

//run
setHtmlClass('js loading');
$(document).ready(function(){
	randomImage();
});

