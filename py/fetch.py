#!/usr/bin python
# coding: utf-8

import urllib2
import json
import apikey

URL = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apikey.APIKEY + '&photoset_id=72157628494205581&extras=url_o%2C+url_m%2C+url_l&format=json&nojsoncallback=1'

f = urllib2.urlopen(URL)
data = f.read()
dictFromJson = json.loads(data)
photoset = dictFromJson['photoset']
photos = photoset['photo']
photos.reverse()

entry = u'''
<div class="latte">
<a href="http://www.flickr.com/photos/%(ownername)s/%(photo_id)s/in/set-%(photoset_id)s/" target="_blank" class="entryUrl"><img src="%(image_url)s" class="entryImage" alt="geeklatte"></a>
<p class="entryTitle">%(entry_title)s</p>
</div>
'''
header = u'''
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Geek Latte</title>
<link href="css/archives.css" rel="stylesheet" type="text/css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="js/ga.js"></script>

</head>
<body class="gradientbg">
<div id="contentBody">
'''
footer = u'''
<!--/#contentBody--></div>
</body>
</html>
'''

# all items for archives.html
tosave = open('../www/archives.html', 'w')
tosave.write(header.encode('utf-8'))
for photo in photos:
  photo_entry = entry % { 
    'ownername':  photoset['ownername'],
    'photoset_id' : photoset['id'],
    'photo_id': photo['id'],
    'image_url': photo['url_m'],
    'entry_title': photo['title'],
    }
  tosave.write(photo_entry.encode('utf-8'))
tosave.write(footer)
tosave.close

# latest 5 items for index.html
del photos[5:len(photos)]
latest5 = json.dumps(photoset)

tosaveJson = open('../www/js/latestEntries.json', 'w')
tosaveJson.write(latest5)
tosaveJson.close
