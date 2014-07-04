#!/usr/bin/env python
# -*- coding: utf-8 -*-

import urllib2
import json
import re
import ConfigParser
from jinja2 import Environment, FileSystemLoader

config = ConfigParser.ConfigParser()
config.readfp(open('geeklatte.conf'))
apikey = config.get('Flickr', 'apikey')

URL = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apikey + '&photoset_id=72157628494205581&extras=date_taken%2Ctags%2Curl_s%2Curl_o&format=json&nojsoncallback=1'

f = urllib2.urlopen(URL)
data = f.read()

save_json = open('../public_html/geeklatte_all.json', 'w')
save_json.write(data)
save_json.close


env = Environment(loader = FileSystemLoader('../templates'))
template = env.get_template('index.html')

dictFromJson = json.loads(data)
photoset = dictFromJson['photoset']
photos = photoset['photo']
for photo in photos:
  photo['datetaken'] = re.sub('\s\d\d:\d\d:\d\d', '', photo['datetaken'],)
photos.reverse()

output = template.render(photos=photos, photoset=photoset)
save_html = open('../public_html/index.html', 'w')
save_html.write(output.encode('utf-8'))



