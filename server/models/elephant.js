var mongoose = require('mongoose')

var ElephantSchema = new mongoose.Schema({
	field : String,
},{	timestamps: { 
		createdAt: 'created_at', 
		updatedAt: 'updated_at',
	} 
});

mongoose.model('Elephant',ElephantSchema);

module.exports = mongoose.model('Elephant');
