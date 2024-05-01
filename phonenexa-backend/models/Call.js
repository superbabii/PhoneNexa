import { Schema, mongoose } from 'mongoose';

const callSchema = new mongoose.Schema({
    caller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    callerName: { type: String, required: true },
    receiverName: { type: String, required: true },
    type: { type: String, enum: ['Video', 'Voice'], required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], required: true },
    duration: { type: Number, required: true },
    callerPhoto: { type: String, required: true },
    receiverPhoto: { type: String, required: true },
    callerVideo: { type: String, required: true },
    receiverVideo: { type: String, required: true },
    callerAudio: { type: String, required: true },
    receiverAudio: { type: String, required: true },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

const Call = mongoose.model('Call', callSchema);

export default Call;