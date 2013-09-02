import os
import webapp2
import jinja2
from google.appengine.ext import db
from google.appengine.api import users

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
		
		if users.get_current_user():
			url = users.create_logout_url(self.request.uri)
			url_linktext = 'Logout'
		else:
			url = users.create_login_url(self.request.uri)
			url_linktext = 'Login'
		
		user = users.get_current_user()
		
		values = {
			'url': url,
			'url_linktext': url_linktext,
			'user': user}
		template = JINJA_ENVIRONMENT.get_template('templates/game.html')
		self.response.write(template.render(values))
		
app = webapp2.WSGIApplication([
    ('/game', MainHandler),
    ('/profile', ProfileHandler)
], debug=True)
