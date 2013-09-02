import os
import webapp2
import jinja2
from google.appengine.ext import db


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join( os.path.dirname( __file__ ), '..' )) ,
    extensions=['jinja2.ext.autoescape'])

			
class MainHandler(webapp2.RequestHandler):
    def get(self):
		template = JINJA_ENVIRONMENT.get_template('templates/index.html')
		self.response.write(template.render())
       
app = webapp2.WSGIApplication([
    ('/', MainHandler),
], debug=True)
