//var Todo = require('./models/todo');
var stateInfo = {}
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
	app.get('/getloc',function (req,res){
		console.log("getting location");
		res.sendFile(__dirname + '/public/enter_location.html');
	});
    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
