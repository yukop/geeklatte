#!/usr/bin python
# coding: utf-8

import urllib2
import json
import re
import apikey

URL = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apikey.APIKEY + '&photoset_id=72157628494205581&extras=date_taken%2C+tags%2C+url_o%2C+url_l%2C+url_m&format=json&nojsoncallback=1'

f = urllib2.urlopen(URL)
data = f.read()
dictFromJson = json.loads(data)
photoset = dictFromJson['photoset']
photos = photoset['photo']
photos.reverse()

entry = u'''
<div class="latte">
<a href="http://www.flickr.com/photos/%(ownername)s/%(photo_id)s/in/set-%(photoset_id)s/" target="_blank" class="entryUrl"><img src="%(image_url)s" class="entryImage" alt="%(entry_title)s"></a>
<p class="entryTitle">%(entry_title)s / %(datetaken)s<span class="hide"> %(tags)s</span></p>
</div>
'''
header = u'''
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Geek Latte</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
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
<h1 class="pageTitle">Geeklatte.com</h1>
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
I've been loving the internet for its openness and freedom. I don't have strong technical skill and knowledge, but I want to express my love by something I can.<br>
Besides, I'm addicted to coffee for many years. I once had worked as a server at French Cafe at Tokyo for 2 years.<br>
That is why I make geek latte art.
</p>

<h2 class="title">Who?</h2>
<p>Yuko Honda is somewhere on the Internet.<br>Please feel free to contact me with next latte theme. :)</p>
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
tosave = open('../www/index.html', 'w')
tosave.write(header.encode('utf-8'))
for photo in photos:
  photo_entry = entry % { 
    'ownername':  photoset['ownername'],
    'photoset_id' : photoset['id'],
    'photo_id': photo['id'],
    'image_url': photo['url_m'],
    'entry_title': photo['title'],
    'tags': photo['tags'],
    'datetaken': re.sub('\s\d\d:\d\d:\d\d', '', photo['datetaken'],)
    }
  tosave.write(photo_entry.encode('utf-8'))
tosave.write(footer)
tosave.close
