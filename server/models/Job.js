const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const JobModel = mongoose.model("Job", jobSchema);

module.exports = JobModel;
