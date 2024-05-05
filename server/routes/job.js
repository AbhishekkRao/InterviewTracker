const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const passport = require("passport");

// GET request to retrieve all jobs for the authenticated user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const jobs = await Job.find({ user: req.user._id });
      res.status(200).json(jobs);
    } catch (error) {
      next(error);
    }
  }
);

// GET request to retrieve a job by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const jobId = req.params.id;

      const job = await Job.findOne({
        jobId: jobId,
        user: req.user._id,
      });

      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.status(200).json(job);
    } catch (error) {
      next(error);
    }
  }
);

// POST request to create a new job
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { jobTitle, jobId, jobType } = req.body;

      const newJob = new Job({
        jobTitle,
        jobId,
        jobType,
        user: req.user._id,
      });

      await newJob.save();

      res.status(201).json(newJob);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE request to delete a job by ID
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const jobId = req.params.id;

      const job = await Job.findOneAndDelete({
        _id: jobId,
        user: req.user._id,
      });

      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.status(200).json(job);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
