var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    uniqe: true,
    type: String
  },
  password: String,
  nickname: {
    uniqe: true,
    type: String
  },
  address: String,
  phone: {
    uniqe: true,
    type: Number
  },
  role: {
    type: Number,
    default: 0
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
});

UserSchema.pre('save', function (next) {
  var user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// 密码比较
UserSchema.methods = {
  comparePassword: function (_password, callback) {
    bcrypt.compare(_password, this.password, function (err, isMatch) {
      if (err) return callback(err);

      callback(null, isMatch);
    });
  }
}

UserSchema.statics = {
  fetch: function (callback) {
    return this
      .find({})
      .sort('meta.createAt')
      .exec(callback)
  },
  findById: function (id, callback) {
    return this
      .findOne({_id: id})
      .exec(callback)
  }
}



module.exports = UserSchema;
