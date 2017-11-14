const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  account: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: String,
  lastTime: Date,
  lastIp: String,
  avatar: String
})

UserSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt,null, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash;
        next()
      })
    })
  }else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err,isMatch) => {
      if(err){
        reject(err)
      } else {
        resolve(isMatch)
      }
    })
  })
}

module.exports = mongoose.model('user', UserSchema);

