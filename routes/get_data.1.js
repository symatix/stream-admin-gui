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

	app.get('/api/stations/current', async (req, res) => {
		const stations = await Stations.find({})
		asyncGrabData(stations)
			.then(data => res.send(data))
			.catch(e => console.log(e))
	})




	app.get('/api/:station/:start/:end', async (req, res) => {
		const { station, start, end } = req.params;
		console.log("==> start ", start, "isNumber: ",!isNaN(start));
		console.log("==> end ", end, "isNumber: ", !isNaN(end))

		
		Songs.aggregate([
			{ "$match": { station } },
			{
			   $project: {
				  song_list: {
					$filter: {
					   input: "$song_list",
					   as: "song",
					   cond: { 
						   "$and": [
							{$gt: [ "$$song.time", Number(start) ]},
							{$lt: [ "$$song.time", Number(end) ]}
						   ]
					   }
				   }
				  }
			   }
			}
		 ]).exec(function(err, doc){
			 if (err) return console.log(err)
			 console.log(doc);
			 res.send(doc)
		 })
	})

/* GONNA GET DEPRECATED */ 
	app.get('/api/:station/songs', async (req, res) => {
		const { station } = req.params;
		const songList = await Songs.findOne({ station });
		res.send(songList)
	})
}






// Songs.aggregate([
// 	{
// 	   $project: {
// 		  song_list: {
// 			 $filter: {
// 				input: "$song_list",
// 				as: "song",
// 				cond: { 
// 					$gte: [ "$$song.time", start ],
// 					$lte: [ "$$song.time", end]
// 				}
// 			 }
// 		  }
// 	   }
// 	}
//  ])

//  {
// 	_id: 0,
// 	items: [
// 	  { item_id: 43, quantity: 2, price: 10 },
// 	  { item_id: 2, quantity: 1, price: 240 }
// 	]
//  }
//  {
// 	_id: 1,
// 	items: [
// 	  { item_id: 23, quantity: 3, price: 110 },
// 	  { item_id: 103, quantity: 4, price: 5 },
// 	  { item_id: 38, quantity: 1, price: 300 }
// 	]
//  }
//  {
// 	 _id: 2,
// 	 items: [
// 		{ item_id: 4, quantity: 1, price: 23 }
// 	 ]
//  }