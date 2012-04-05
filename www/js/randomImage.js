var lastIndex = 0;

var randomImage = function () {
  var mainImage = document.getElementById('mainImage');
  var mainImageClip = document.getElementById('mainImageClip');
  var imgDir = 'img/';
  var imgArray = ['droiko.jpg', 'gplus.jpg', 'mozc.jpg', 'octocat.jpg', 'sadchrome.jpg', 'python.jpg', 'git.jpg', 'gopher.jpg', 'html5.jpg'];
  var imgIndex = 0;
	
	mainImage.src = '';
	
  if(imgArray.length > 1) {
    while(imgIndex == lastIndex) {
      imgIndex = Math.floor(Math.random() * imgArray.length);
    }
    lastIndex = imgIndex;
    var imgPath = imgDir + imgArray[imgIndex];
    mainImage.src = imgPath;
    mainImage.alt = imgArray[imgIndex];
		mainImage.onload = function(){setHtmlClass('js')}
    mainImageClip.style.backgroundImage = "url(" + imgPath + ")";
  } else {
    return false;
  }
};

var setHtmlClass = function (classString) {
  document.getElementsByTagName('html')[0].className = classString;
};

setHtmlClass('js loading');

window.onload = function(){
  randomImage();
}
