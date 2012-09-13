#!/usr/bin python

import urllib2
import apikey

URL = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apikey.APIKEY + '&photoset_id=72157628494205581&extras=url_o%2C+url_m&format=json&nojsoncallback=1'


f = urllib2.urlopen(URL)
data = f.read()

tosave = open('../js/searchresult.json', 'w')
tosave.write(data)
tosave.close()