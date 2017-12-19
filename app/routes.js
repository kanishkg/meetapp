//var Todo = require('./models/todo');
var stateInfo = {}
module.exports = function (app) {
	app.get('/state',function (req,res){
		console.log("get state");
		var senderID = req.psid;
		var threadID = req.tid;
		console.log(threadID);
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
			res.json(stateInfo[threadID]);
		}
	});
	app.post('/preference',function (req,res){
		console.log("whoa");
		console.log(req)
		var preference = req.pref;
		var query = req.c;
		console.log("revel");
		console.log(query)
		var senderID = query['c']['psid'];
		var threadID = query['c']['tid'];
		console.log(threadID);
		stateInfo[threadID]["state"] = 1;
		stateInfo[threadID]["users"].indexOf(senderID) === -1 ? stateInfo[threadID]["users"].push(senderID):pass;
		stateInfo[threadID]["preference"]= pref;
		res.json(stateInfo[threadID])
	});
    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
