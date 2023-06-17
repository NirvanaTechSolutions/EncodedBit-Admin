const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
  },
  plan: {
    type: String,
  },
  activation: {
    type: Date,
  },
  expiration: {
    type: Date,
  },
});

const userSchema = new mongoose.Schema({
  usersub: String,
  email: String,
  name: String,
  country: String,
  state: String,
  message: String,
  mobileno: Number,
  pincode: Number,
  isprofile: Boolean,
  issubscribed: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;
