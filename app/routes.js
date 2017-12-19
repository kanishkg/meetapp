//var Todo = require('./models/todo');
var stateInfo = {}
module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
	//app.get('/api/todos', function (req, res) {
    	//    // use mongoose to get all todos in the database
    	//    getTodos(res);
    	//});

    	//// create todo and send back all todos after creation
    	//app.post('/api/todos', function (req, res) {

    	//    // create a todo, information comes from AJAX request from Angular
    	//    Todo.create({
    	//        text: req.body.text,
    	//        done: false
    	//    }, function (err, todo) {
    	//        if (err)
    	//            res.send(err);

    	//        // get and return all the todos after you create another
    	//        getTodos(res);
    	//    });

    	//});

    	//// delete a todo
    	//app.delete('/api/todos/:todo_id', function (req, res) {
    	//    Todo.remove({
    	//        _id: req.params.todo_id
    	//    }, function (err, todo) {
    	//        if (err)
    	//            res.send(err);

    	//        getTodos(res);
    	//    });
    	//});
	app.get('/state',function (req,res){
		console.log("get state");
		senderID = req.psid;
		threadID = req.tid;
		console.log(threadID);
		if(stateInfo[threadID]){
			res.json(stateInfo[threadID]);
		}
		else{
			stateInfo[threadID]["state"] = 0;
			stateInfo[threadID]["users"] = [];
			stateInfo[threadID]["locations"] = {};
			stateInfo[threadID]["preference"] = [];
			stateInfo[threadID]["recommendations"] = [];
			//addtime
			res.json(stateInfo[threadID]);
		}
	});
	app.post('/state',function (req,res){
		senderID = req.psid;
		threadID = req.tid;
		if(stateInfo[threadID]["state"] === 1){
			location = req.loc;
			stateInfo[threadID]["users"].indexOf(senderID) === -1 ? stateInfo[threadID]["users"].push(senderID)
			stateInfo[threadID]["locations"][senderID]= location;
		}
		else if(stateInfo[threadID]["state" === 0]){
			preference = req.pref;
			stateInfo[threadID]["state"] = 1;
			stateInfo[threadID]["users"].indexOf(senderID) === -1 ? stateInfo[threadID]["users"].push(senderID);
			stateInfo[threadID]["preference"]= pref;
		}
		res.json(stateInfo[threadID])
	});
    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
