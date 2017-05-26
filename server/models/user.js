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
	next()
})

function equip(user) {
	user.check = function(password) {
		if (password) {
			return bcrypt.compareSync(password, user.password)
		} else {
			return false
		}
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