var randomImage = function () {
	var lastIndex = 0;
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
		mainImage.onload = function(){$('html').removeClass('loading')}
    mainImageClip.style.backgroundImage = "url(" + imgPath + ")";
  } else {
    return false;
  }
};

// functionを 何を渡したら何が返ってくるか、の最小単位で作る
// 1. make imgArray
// 2. take imgIndex by random
// 3. make img path, set it to img src and background
// 4. removeClass 'loading'
/*
var makeImgArray = function(){};
var takeImgIndex = function(){};
var makeImgPath = function(){};
var removeClass = function(){};
*/

var setHtmlClass = function() {
	$('html').removeClass('no-js').addClass('js loading');
};

//$('#mainImage')
//$('#mainImageClip')

setHtmlClass('js loading');

$(document).ready(function(){
	randomImage();
});

