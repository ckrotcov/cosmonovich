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
	pilot_name = db.StringProperty(required=False)
	client_type = db.StringProperty(required=False)
	frequency = db.StringProperty(required=False)
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
			
			
			out = data.split("!CLIENTS:\r\n")
			data_lines = out[1].split("!SERVERS:\r\n")
			app_data = data_lines[0]
			app_data= app_data.replace(';\r\n', "").splitlines()
			
			for item in app_data:
				pilot_data = item.split(':');
				print pilot_data			
				if pilot_data:
				
					if pilot_data[1] and pilot_data[2]:
						
						q = db.Query(FlightData)
						flight_data = q.filter('callsign =', pilot_data[0]).get()
						
						
											
						if not flight_data:
							flight_data = FlightData(callsign=pilot_data[0], pilot_id=pilot_data[1])
							
						flight_data.callsign=pilot_data[0]
						flight_data.pilot_id=pilot_data[1]
						flight_data.pilot_name=pilot_data[2]
						flight_data.client_type=pilot_data[3]
						flight_data.frequency=pilot_data[4]
						flight_data.lat=pilot_data[5]
						flight_data.lon=pilot_data[6]
						flight_data.alt=pilot_data[7]
						flight_data.put()

					
				
		except urllib2.URLError, e:
			self.response.write("Error")
		
		
       
app = webapp2.WSGIApplication([
    ('/tasks/status', StatusHandler),
    ('/tasks/flight_radar', GetPilotData)
], debug=True)
