import { useNavigate, useParams } from "react-router-dom";
import CandidatesTable from "../components/CandidatesTable";
import { useEffect, useState } from "react";
import { fetchCandidates } from "../api/candidateApi";
import { fetchJobs } from "../api/jobsApi";

const Candidates = () => {
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.reload(true);
  };

  const jobId = useParams<{ id: string }>();
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadCandidates();
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await fetchJobs();
      // console.log("data", data)
      const job = data.find((job) => job.jobId === jobId.id);
      setJob(job);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
  };

  const loadCandidates = async () => {
    try {
      const data = await fetchCandidates(jobId.id);
      setCandidates(data);
    } catch (error) {
      console.error("Error loading candidates:", error);
    }
  };

  return (
    <div className="mx-20 mt-10 flex flex-col gap-10">
      <div onClick={() => navigate("/dashboard")} className="cursor-pointer">
        {`<`} Back to Dashboard
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">
          {job.jobTitle} (Job ID: {jobId.id}) - {job.jobType}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <CandidatesTable
        data={candidates}
        jobId={jobId.id}
        candidates={candidates}
        setCandidates={setCandidates}
      />
    </div>
  );
};

export default Candidates;
