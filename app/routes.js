//
//var Todo = require('./models/todo');
var request=require('request');
var meet=require('./models/meet.js');
var stateInfo = {};
module.exports = function (app) {
	app.post('/state',function (req,res){
		console.log("get state");
		var senderID = req.body.psid;
		var threadID = req.body.tid;
		console.log(req.body);
		if(stateInfo[threadID]){
			res.json(stateInfo[threadID]);
		}
		else{
			stateInfo[threadID] = {}
			stateInfo[threadID]["state"] = 0;
			stateInfo[threadID]["users"] = [];
			stateInfo[threadID]["locations"] = {};
			stateInfo[threadID]["preference"] = [];
			stateInfo[threadID]["recommendations"] = [];
			//addtime
			console.log(stateInfo[threadID]);
			res.json(stateInfo[threadID]);
		}
	});
	app.post('/preference',function (req,res){
		console.log("whoa");
		console.log(req.body.c, req.body.pref);
		var preference = req.body.pref;
		var query = req.body.c;
		console.log("revel");
		console.log(query);
		var senderID = query.psid;
		var threadID = query.tid;
		console.log(threadID);
		stateInfo[threadID]["state"] = 1;
		if (stateInfo[threadID]["users"].indexOf(senderID) === -1){
			stateInfo[threadID]["users"].push(senderID);
		}
		stateInfo[threadID]["preference"]= preference;
		res.json(stateInfo[threadID]);
	});
	app.post('/getResults',function(req,res){
		console.log("Getting Results");
		var optimize = 'magic_recipe';
		var tid = req.body.tid;
		var preference = stateInfo[tid].preference;
		var locations = Object.values(stateInfo[tid].locations);
		var listCoords = [];
		locations.forEach( function (arrayItem)
			{
			    listCoords.push({"lat":arrayItem.lat,"lng":arrayItem.lng});
			});
		var recommendations = meet.findCandidates(listCoords, preference, optimize);
		stateInfo[tid].recommendations = recommendations;
		stateInfo[tid].state = 2;
		console.log(stateInfo[tid],"recos");
		res.json(stateInfo[tid]);
	});

	app.get('/sendLoc',function (req,res){
		var tid = req.query.tid;
		var psid = req.query.psid;
		console.log(tid,"bros",req.query.addr);
		var loc = {"addr":req.query.addr,"lat":req.query.lat,"lon":req.query.lon};
		var name = "";
		console.log(stateInfo,"stateInfo");
		console.log(stateInfo[tid]);
		console.log(stateInfo[tid]["locations"]);
		request.get('https://graph.facebook.com/v2.6/'+psid+"?fields=first_name,last_name,profile_pic&access_token=EAAB3yf09ykIBAA9fbiBBWm3iVK2tiwHDh3tDGJOT1ENOkkyLyZBNtZBYZBmFLZBhVnDGc2iKCSzTZArETftKTvuDGGXgRTo4v5DX37LXPvuMykSkDHP8sWWo2ym2mpk7QEUIx3RHZC2MBE9DbIwZBvSq4L64QZCvmE1bZCxZCZCW8RNjAZDZD"
 ,{},function(err,res,body){
	 body = JSON.parse(body);

	 name = body.first_name;

	 stateInfo[tid]["locations"][psid] = [loc,name];
	 console.log(stateInfo[tid]["locations"][psid]);
});
		console.log(name,"name");
		res.render('/app/public/index.html');
	});
	    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

app.get('/getloc',function (req,res){
	console.log("getting loc");
	var tid = req.query.tid;
	var psid = req.query.psid;
	console.log(tid,'break',psid);
	res.render('/app/public/enter_location.html',{tid:tid,psid:psid});
});
};
