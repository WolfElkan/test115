var mongoose = require('mongoose')
var bcrypt   = require('bcrypt')

var UserSchema = new mongoose.Schema({
	username : String,
	password : String,
},{	timestamps: { 
		createdAt: 'created_at', 
		updatedAt: 'updated_at',
	}
});

UserSchema.pre('save',function(next) {
	this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(8))
	// console.log('model :',this)
	next()
})

function equip(user) {
	// user = user[0]
	user.check = function(password) {
		return bcrypt.compareSync(password, user.password)
	}
	return user
}

function valid(user) {
	return Boolean(user.password)
}

mongoose.model('users',UserSchema);

module.exports = {
	'model' : mongoose.model('users'),
	'equip' : equip,
	'valid' : valid,
}
