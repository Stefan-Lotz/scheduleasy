const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserMessageSchema = new Schema({
    schedule: { type: Schema.Types.ObjectId, ref: 'Schedule', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
}, {
    timestamps: true,
});

const UserMessageModel = model('UserMessage', UserMessageSchema);

module.exports = UserMessageModel;