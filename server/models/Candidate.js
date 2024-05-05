const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  interviewStatus: {
    type: String,
    required: true,
  },
  interviewFeedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const CandidateModel = mongoose.model("Candidate", candidateSchema);

module.exports = CandidateModel;
