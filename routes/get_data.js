const mongoose = require("mongoose");
const Stations = mongoose.model('stations');
const Songs = mongoose.model('songs');
const asyncGrabData = require('../utils/asyncGrabData');

module.exports = (app) => {
	app.get('/', (req, res) => res.send("StreamData API"))


	// gets all stations
	app.get('/api/stations', async (req, res) => {
		const stations = await Stations.find({});
		res.send(stations)
	});

	app.get('/api/stations/current', (req, res) => {
		Stations.find({}).then(stations => {		
			asyncGrabData(stations).then(data => res.send(data))
		}).catch(e => console.log(e));
	})

	app.get('/api/:station/songs', async (req, res) => {
		const { station } = req.params;
		const songList = await Songs.findOne({ station });
		res.send(songList)
	})
}
