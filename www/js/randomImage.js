var lastIndex = 0;

function randomImage() {
	var mainImage = document.getElementById('mainImage');
	var mainImageClip = document.getElementById('mainImageClip');
//	var imgDir = 'img/';
	var imgArray = new Array('http://farm8.staticflickr.com/7033/6799064857_7a0b0fe0c8_o.jpg', 'http://farm8.staticflickr.com/7018/6754272311_0575283ca0_o.jpg','http://farm8.staticflickr.com/7001/6763184193_ca232a51e8_o.jpg','http://farm8.staticflickr.com/7141/6787747787_ef6acebc6e_o.jpg','http://farm8.staticflickr.com/7013/6718829537_db2d09e320_o.jpg', 'http://farm8.staticflickr.com/7018/6754272311_49b6e6c845_z.jpg');
	var imgIndex = 0;
	
	if(imgArray.length > 1) {
		while(imgIndex == lastIndex) {
			imgIndex = Math.floor(Math.random() * imgArray.length);
		}
		lastIndex = imgIndex;	
//		var imgPath = imgDir + imgArray[imgIndex];
		var imgPath = imgArray[imgIndex];
        
		mainImage.src = imgPath;
		mainImage.alt = imgArray[imgIndex];
        mainImageClip.style.backgroundImage = "url(" + imgPath + ")";
	}
	else {
		return false;
	}
}