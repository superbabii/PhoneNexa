import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  userType: { type: String, enum: ['Client', 'Customer'], default: 'Client' },
  email: { type: String, unique: true, required: function() {
    return this.userType === 'Client';
  }},
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  picture: { type: String },
  team: { type: String },
  userContacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  company: { type: String },
  country: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  birthday: { type: Date },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  onlineStatus: { type: String, enum: ['Online', 'Away', 'Offline'], default: 'Offline' },
  unreadMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  lastSeen: { type: Date },
  lastActive: { type: Date },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  lastMessageTime: { type: Date },
  missedCalls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Call' }],
  lastCall: { type: mongoose.Schema.Types.ObjectId, ref: 'Call' },
  lastCallTime: { type: Date },
  lastCallDuration: { type: Number },
  lastCallType: { type: String },
  lastCallStatus: { type: String },
  lastCallStatusTime: { type: Date },
}, { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;
