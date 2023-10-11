const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  referrer: String,
  kycID: String,
  falconId: String,
  phone: String,
  verifiedEmail: Boolean,
  verifiedPhone: Boolean,
  email: String,
  panDocNo: String,
  bankId: String,
  bankAccountNumber: String,
  bankIFSC: String,
  productId: String,
  vpan: String,
  instrumentId: String,
  inProfile: Boolean,
  isMinor: Boolean,
  parentId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('User', userSchema);
