const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AlternateScheduleSchema = new Schema({
  periods: [
    {
      name: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  activeDays: [
    {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  ],
});

const ScheduleSchema = new Schema(
  {
    title: { type: String, required: true },
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
    linkedSchedule: { type: String, required: false },
    alternateSchedule: { type: AlternateScheduleSchema, required: false },
  },
  {
    timestamps: true,
  }
);

const ScheduleModel = model("Schedule", ScheduleSchema);

module.exports = ScheduleModel;
