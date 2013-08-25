import os
import webapp2
import jinja2
from google.appengine.ext import db


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join( os.path.dirname( __file__ ), '..' )) ,
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
    	print "here"
    	template = JINJA_ENVIRONMENT.get_template('templates/game.html')
    	self.response.write(template.render())
       
app = webapp2.WSGIApplication([
    ('/game', MainHandler),
    ('/profile', ProfileHandler)
], debug=True)
