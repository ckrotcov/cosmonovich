import os
import webapp2
import urllib2
import re
from google.appengine.ext import db
import random

class DataServer(db.Model):
	url = db.StringProperty(required=True)

class FlightData(db.Model):
	callsign = db.StringProperty(required=True)
	pilot_id = db.StringProperty(required=True)
	pilot_name = db.StringProperty(required=True)
	lat = db.StringProperty()
	lon = db.StringProperty()
	alt = db.StringProperty()

			
class StatusHandler(webapp2.RequestHandler):
    def get(self):
		url = "http://status.vatsim.net/status.txt"
		try:
			result = urllib2.urlopen(url)
			data = result.read()
			p1 = re.compile('(url0=(.*))')
			
			for item in DataServer.all():
				item.delete()
  
			for item in p1.findall(str(data)):
				
				server = DataServer(url=item[1])
				server.put()
			
			for server in DataServer.all():
				self.response.write(server.url)
				
			self.response.write("OK")
			
		except urllib2.URLError, e:
			self.response.write("Error")
		
class GetPilotData(webapp2.RequestHandler):
	def get(self):
		url_count = DataServer.all().count()
		offset = random.randrange(0, url_count)
		url_object = DataServer.all().fetch(1, offset)[0]
		
		try:
			result = urllib2.urlopen(url_object.url)
			data = result.read()
			r1 = re.compile('((AAL|UAL|WWA).*)')
			for item in r1.findall(str(data)):	
				
				pilot_data = item[0].split(':');
				
				self.response.write(pilot_data)
				
				flight_data = FlightData(callsign=pilot_data[0],
										pilot_id=pilot_data[1],
										pilot_name=pilot_data[2],
										lat=pilot_data[5],
										lon=pilot_data[6],
										alt=pilot_data[7])
				flight_data.put()
				
				self.response.write(flight_data)			
			
			
				
		except urllib2.URLError, e:
			self.response.write("Error")
		
		
       
app = webapp2.WSGIApplication([
    ('/tasks/status', StatusHandler),
    ('/tasks/flight_radar', GetPilotData)
], debug=True)
