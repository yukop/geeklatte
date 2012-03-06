var lastIndex = 0;

function randomImage() {
	var mainImage = document.getElementById('mainImage');
	var mainImageClip = document.getElementById('mainImageClip');
	var imgDir = 'img/';
	var imgArray = new Array('droiko.jpg','gplus.jpg','mozc.jpg','octocat.jpg','sadchrome.jpg','python.jpg','git.jpg','gopher.jpg','html5.jpg');
	var imgIndex = 0;
	
	if(imgArray.length > 1) {
		while(imgIndex == lastIndex) {
			imgIndex = Math.floor(Math.random() * imgArray.length);
		}
		lastIndex = imgIndex;	
		var imgPath = imgDir + imgArray[imgIndex];

		mainImage.src = imgPath;
		mainImage.alt = imgArray[imgIndex];
        mainImageClip.style.backgroundImage = "url(" + imgPath + ")";
	}
	else {
		return false;
	}
}