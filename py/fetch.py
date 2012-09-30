#!/usr/bin python
# coding: utf-8

import urllib2
import json
import re
import apikey

URL = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apikey.APIKEY + '&photoset_id=72157628494205581&extras=date_taken%2Ctags%2Curl_s%2Curl_o&format=json&nojsoncallback=1'

f = urllib2.urlopen(URL)
data = f.read()
dictFromJson = json.loads(data)
photoset = dictFromJson['photoset']
photos = photoset['photo']
photos.reverse()

entry = u'''
<div class="latte" id="%(photo_id)s">
<a href="http://www.flickr.com/photos/%(ownername)s/%(photo_id)s/in/set-%(photoset_id)s/" target="_blank" class="entryUrl"><img src="%(thumbnail_url)s" class="entryImage" alt="%(entry_title)s"></a>
<p class="entryTitle">%(entry_title)s / %(datetaken)s<span class="hide"> %(tags)s</span></p>
</div>
'''
header = u'''
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="keywords" content="geeklatte, Geek Latte, Latte Art, ギークラテ, ラテアート">
<meta name="description" content="I make geek latte art. ギークラテ作ってるよー！すなわち、ギークっぽい題材でラテアートしてます。">
<title>Geeklatte</title>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="js/jquery.incrementalFilter.js"></script>
<script src="js/ga.js"></script>
<link href="css/index.css" rel="stylesheet" type="text/css">
<script>
$(function(){
    $('.filterBox').incrementalFilter('.latte');
})
</script>
</head>
<body class="gradientbg">
<div class="body">
<h1 class="pageTitle">Geeklatte</h1>
<form class="search"><input type="text" name="" value="" placeholder="Search" class="filterBox"></form>

<div class="contentBody">
'''
footer = u'''
</div>
</div>

<div class="footer">
<div class="contentUnit">
<h2 class="title">How?</h2>
<iframe width="480" height="270" src="http://www.youtube.com/embed/aFinw4Sb-Wk?theme=light&color=white" frameborder="0" allowfullscreen></iframe>
</div>

<div class="contentUnit">
<h2 class="title">Why?</h2>
<p>
I love the Internet. I love its openness and its favor of information freedom. I thought I could somehow express my gratitude and respects for geeks who are involved in the Internet technology.<br>
Besides that, I'm a long time coffee addict. And now, I'm fortunate enough to have a good Espresso machine in my office. The time has come!<br>
This is why I make this series of "geek" latte art.
</p>

<h2 class="title">Who?</h2>
<p>Yuko Honda lives in somewhere on the Internet.<br>If you come up with any latte art ideas, please let me know. :)</p>
<ul class="socialLink">
<li><a id="gp" href="https://plus.google.com/u/0/106825171914368756519/posts">Yuko Honda on Google+</a></li>
<li><a id="tw" href="https://twitter.com/yukop">@yukop on Twitter</a></li>
<li><a id="fr" href="http://www.flickr.com/photos/yukop/">yukop on Flickr</a></li>
<li><a id="gh" href="https://github.com/yukop/">yukop on Github</a></li>
</ul>
</div>

</div>

</div>
</body>
</html>
'''

# all items for index.html
tosave = open('./public_html/index.html', 'w')
#tosave = open('../www/index.html', 'w')
tosave.write(header.encode('utf-8'))
for photo in photos:
  photo_entry = entry % { 
    'ownername':  photoset['ownername'],
    'photoset_id' : photoset['id'],
    'photo_id': photo['id'],
    'thumbnail_url': photo['url_s'],
    'image_url': photo['url_o'],
    'entry_title': photo['title'],
    'tags': photo['tags'],
    'datetaken': re.sub('\s\d\d:\d\d:\d\d', '', photo['datetaken'],)
    }
  tosave.write(photo_entry.encode('utf-8'))
tosave.write(footer)
tosave.close
