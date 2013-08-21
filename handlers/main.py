import os
import webapp2
import jinja2
from google.appengine.ext import db

class DataServer(db.Model):
	url = db.StringProperty(required=True)

class FlightData(db.Model):
	callsign = db.StringProperty(required=True)
	pilot_id = db.StringProperty(required=True)
	pilot_name = db.StringProperty(required=False)
	client_type = db.StringProperty(required=False)
	frequency = db.StringProperty(required=False)
	lat = db.StringProperty()
	lon = db.StringProperty()
	alt = db.StringProperty()




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
			
class MainHandler(webapp2.RequestHandler):
    def get(self):
    
	    template = JINJA_ENVIRONMENT.get_template('templates/index.html')
	    self.response.write(template.render())
       
app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/profile', ProfileHandler)
], debug=True)
