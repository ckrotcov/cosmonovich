import os
import webapp2
import jinja2
import json
from models import *
from google.appengine.api import users

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])

class ProfileHandler(webapp2.RequestHandler):
	def get(self):
		
		user = users.get_current_user()
		if user:
			self.response.headers['Content-Type'] = 'text/plain'
			self.response.write('Hello, ' + user.nickname())
		else:
		
			self.redirect(users.create_login_url(self.request.uri))

class DataHandler(webapp2.RequestHandler):
	def get(self):
		q = db.Query(FlightData)
		data = []
		for f in q.filter('client_type = ', 'PILOT').fetch(limit=None):
			data.append(db.to_dict(f))
		self.response.headers['Content-Type'] = 'application/json'  
		self.response.write(json.dumps(data))
			
class MainHandler(webapp2.RequestHandler):
    def get(self):
		
		template = JINJA_ENVIRONMENT.get_template('index.html')
		self.response.write(template.render())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/profile', ProfileHandler),
	('/data', DataHandler)
], debug=True)
