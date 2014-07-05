# -*- coding: utf-8 -*-
import tweepy
import ConfigParser
import urllib2
import json
import random
import re

config = ConfigParser.ConfigParser()
config.readfp(open('geeklatte.conf'))
apikey = config.get('Flickr', 'apikey')

config.readfp(open('twitter.conf'))
consumer_token = config.get('Twitter', 'consumer_token')
consumer_secret = config.get('Twitter', 'consumer_secret')
key = config.get('Twitter', 'key')
secret = config.get('Twitter', 'secret')

URL = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + apikey + '&photoset_id=72157628494205581&extras=date_taken%2Ctags%2Curl_s%2Curl_o&format=json&nojsoncallback=1'

f = urllib2.urlopen(URL)
data = f.read()

dictFromJson = json.loads(data)
photoset = dictFromJson['photoset']
ownername = photoset['ownername']
setid = photoset['id']
photos = photoset['photo']
n = random.randrange(len(photos))
photo = photos[n]
id = photo['id']
photo_url = 'http://www.flickr.com/photos/' + ownername + '/' + id + '/in/set-' + setid + '/'

tweet = photo['title'] + ' ' + photo_url + ' (' + re.sub('\s\d\d:\d\d:\d\d', '', photo['datetaken']) + ') #geeklatte'

auth = tweepy.OAuthHandler(consumer_token, consumer_secret)
auth.secure = True
auth.set_access_token(key, secret)

api = tweepy.API(auth, secure=True, api_root='/1.1')

status = tweet
api.update_status(status)