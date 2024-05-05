import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedDELETERequest,
  makeAuthenticatedPOSTRequest,
} from "../utils/serverHelper";
import { addJob, deleteJob, fetchJobs } from "../api/jobsApi";
import { useNavigate } from "react-router-dom";

const JobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    jobId: "",
    jobType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  };

  const handleAddJob = async () => {
    try {
      const addedJob = await addJob(newJob);
      setJobs((prevJobs) => [...prevJobs, addedJob]);
      setNewJob({ jobTitle: "", jobId: "", jobType: "" });
    } catch (error) {
      console.error("Failed to add job:", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {["Job Title", "Job ID", "Job Type", "Actions"].map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.jobTitle}</TableCell>
              <TableCell>{job.jobId}</TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/jobs/${job.jobId}`)}>
                  View
                </Button>
                <Button onClick={() => handleDeleteJob(job._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {/* Add Job Row */}
          <TableRow>
            <TableCell>
              <TextField
                value={newJob.jobTitle}
                onChange={(e) =>
                  setNewJob({ ...newJob, jobTitle: e.target.value })
                }
                label="Job Title"
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell>
              <TextField
                value={newJob.jobId}
                onChange={(e) =>
                  setNewJob({ ...newJob, jobId: e.target.value })
                }
                label="Job ID"
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell>
              <TextField
                value={newJob.jobType}
                onChange={(e) =>
                  setNewJob({ ...newJob, jobType: e.target.value })
                }
                label="Job Type"
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell>
              <Button
                onClick={handleAddJob}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;
