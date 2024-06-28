const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ScheduleSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    about: { type: String, required: true },
    cover: { type: String, required: true },
    numPeriods: { type: Number, required: true },
    url: { type: String, required: true, unique: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    periods: [
      {
        name: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "UserMessage" }],
  },
  {
    timestamps: true,
  }
);

const ScheduleModel = model("Schedule", ScheduleSchema);

module.exports = ScheduleModel;
