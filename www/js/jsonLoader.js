function createHtml(items) {
	var latte = $('.latte');
	for (var i = 0, l = items.photoset.photo.length; i < l; i++) {
		latte = cloneEntry(i);
	};
	function cloneEntry(listOrder) {
    var photoItem = items.photoset.photo[listOrder];
    var photoId = photoItem.id
    var entryUrl = 'http://www.flickr.com/photos/' + items.photoset.ownername + '/' + photoId + '/in/set-' + items.photoset.id + '/';
		var clonedEntry = $(latte).clone(true);
		clonedEntry.insertBefore(latte);
		clonedEntry.find('.entryImage').attr('src', photoItem.url_m);
		clonedEntry.find('.entryImage').attr('alt', photoItem.title);
		clonedEntry.find('.entryTitle').text(photoItem.title);
		clonedEntry.find('.entryUrl').attr('href', entryUrl);
		return clonedEntry;
	}
	$('.latte').last().hide();
}

function main() {
  $.getJSON('js/searchresult.json', function(data){
    createHtml(data);
  });  
}

main();
