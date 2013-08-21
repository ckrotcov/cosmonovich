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