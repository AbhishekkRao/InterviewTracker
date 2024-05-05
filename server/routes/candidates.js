const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const User = require("../models/User");
const passport = require("passport");

router.use(passport.initialize());

// GET request to retrieve all candidates by job id /:jobId
router.get(
  "/:jobId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    console.log(req.params.jobId, req.user._id);
    try {
      const candidates = await Candidate.find({
        jobId: req.params.jobId,
        user: req.user._id,
      });

      res.status(200).json(candidates);
    } catch (error) {
      next(error);
    }
  }
);

// POST request to add a new candidate
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { name, interviewStatus, interviewFeedback, rating, jobId } =
        req.body;

      // Create a new candidate
      const newCandidate = new Candidate({
        name,
        interviewStatus,
        interviewFeedback,
        rating,
        jobId,
        user: req.user._id,
      });

      // Save the candidate to the database
      await newCandidate.save();

      res.status(201).json(newCandidate);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE request to delete a candidate by ID
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const candidateId = req.params.id;

      // Find the candidate by ID and user
      const candidate = await Candidate.findOneAndDelete({
        _id: candidateId,
        user: req.user._id,
      });

      if (!candidate) {
        return res.status(404).json({ error: "Candidate not found" });
      }

      res.status(200).json(candidate);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
