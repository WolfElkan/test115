
var Elephant = require('../models/elephant.js')

var pachyderms = {}

pachyderms.index  = function(request, response) {
	Elephant.find({},function(error,result) {
		response.json({'pachyderms':result})
	})
}

pachyderms.show = function(request, response) {
	var id = request.params.id
	Elephant.find({'_id':id},function(error,result) {
		response.json(result)
	})
}

pachyderms.create = function(request,response) {
	new_elephant = new Elephant({
		field   : request.body.field,
		temp_id : request.body.temp_id,
	})
	new_elephant.save(function(error,result) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201)
			response.json(result)
		}
	})
}

pachyderms.update = function(request, response) {
	var id    = request.params.id
	var query = request.body.query
	var patch = request.body.patch
	Elephant.findOne(query,function(error,found_elephant) {
		if (error) {
			response.json(error)
		} else {
			for (key in patch) {
				found_elephant[key] = patch[key]
			}
			found_elephant.save(function(error,saved_elephant) {
				response.json(saved_elephant)
			})
		}
	})
}

pachyderms.delete = function(request, response) {
	var id = request.params.id
	Elephant.remove({'_id':id},function(error,result) {
		if (error) {
			// console.log(500,error)
		} else {
			// console.log(201.9)
			response.json(result)
		}
	})
}

module.exports = pachyderms
