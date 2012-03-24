# -*- coding: utf-8 -*-

import webapp2
import os.path

import jinja2
jinja2_env = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainHandler(webapp2.RequestHandler):
  def get(self):
    tmpl = jinja2_env.get_template('static/html/index.html')
    self.response.out.write(tmpl.render())


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ], debug=True)
