import { Schema, mongoose } from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {type: Schema.Types.ObjectId,ref: 'User',},
  receiver: {type: Schema.Types.ObjectId,ref: 'User',},
  chat: {type: Schema.Types.ObjectId,ref: 'Chat',},
  text: {type: String, required: true},
  attachment: {
    type: {
      type: String, // 'image', 'audio', 'video', 'document', 'url', etc.
      enum: ['image', 'audio', 'video', 'document', 'url'],
    },
    url: String, // URL to the file or external resource
    filename: String, // Original filename
    mimeType: String, // MIME type (e.g., 'audio/mp3', 'application/pdf')
    size: Number, // File size in bytes
  },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;