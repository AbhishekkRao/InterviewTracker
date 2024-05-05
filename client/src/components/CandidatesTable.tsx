import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import { Candidate } from "../interfaces/Candidate";
import {
  fetchCandidates,
  addCandidate,
  deleteCandidate,
  editCandidate,
} from "../api/candidateApi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";

const CandidatesTable: React.FC = ({ jobId, candidates, setCandidates }) => {
  const emptyCandidate: Candidate = {
    jobId: jobId,
    name: "",
    interviewStatus: "Pending",
    interviewFeedback: "",
    rating: "0",
  };

  const [newCandidate, setNewCandidate] = useState<Candidate>({
    ...emptyCandidate,
  });
  const [editModeMap, setEditModeMap] = useState<{ [id: string]: boolean }>({});

  const handleAddCandidate = async () => {
    try {
      console.log("Adding candidate:", newCandidate);
      const addedCandidate = await addCandidate(newCandidate);
      setCandidates((prevCandidates) => [...prevCandidates, addedCandidate]);
      setNewCandidate({ ...emptyCandidate, jobId: jobId });
    } catch (error) {
      console.error("Failed to add candidate:", error);
    }
  };

  const handleDeleteCandidate = async (id: string) => {
    try {
      await deleteCandidate(id);
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete candidate:", error);
    }
  };

  const handleEditToggle = (id: string) => {
    setEditModeMap((prevEditModeMap) => ({
      ...prevEditModeMap,
      [id]: !prevEditModeMap[id],
    }));
  };

  const handleEditCandidate = async (
    id: string,
    field: keyof Candidate,
    value: string
  ) => {
    try {
      await editCandidate(id, { [field]: value });
      const updatedCandidates = candidates.map((candidate) => {
        if (candidate._id === id) {
          return { ...candidate, [field]: value };
        }
        return candidate;
      });
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error("Failed to edit candidate:", error);
    }
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "Job ID",
              "Name",
              "Interview Status",
              "Interview Feedback",
              "Rating",
              "Actions",
            ].map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates?.length > 0 &&
            candidates.map((candidate) => (
              <TableRow key={candidate._id}>
                <TableCell>
                  <TextField
                    value={candidate.jobId}
                    disabled={true}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {editModeMap[candidate._id] ? (
                    <TextField
                      value={candidate.name}
                      onChange={(e) =>
                        handleEditCandidate(
                          candidate._id,
                          "name",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    candidate.name
                  )}
                </TableCell>
                <TableCell>
                  {editModeMap[candidate._id] ? (
                    <Select
                      value={candidate.interviewStatus}
                      onChange={(e) =>
                        handleEditCandidate(
                          candidate._id,
                          "interviewStatus",
                          e.target.value as string
                        )
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  ) : (
                    candidate.interviewStatus
                  )}
                </TableCell>
                <TableCell>
                  {editModeMap[candidate._id] ? (
                    <TextField
                      value={candidate.interviewFeedback}
                      onChange={(e) =>
                        handleEditCandidate(
                          candidate._id,
                          "interviewFeedback",
                          e.target.value
                        )
                      }
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    candidate.interviewFeedback
                  )}
                </TableCell>
                <TableCell>
                  <Rating
                    name="simple-controlled"
                    value={Number(candidate.rating)}
                    onChange={(event, newValue) =>
                      handleEditCandidate(
                        candidate._id,
                        "rating",
                        newValue.toString()
                      )
                    }
                    disabled={!editModeMap[candidate._id]}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteCandidate(candidate._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {/* Add Candidate Row */}
          <TableRow>
            {Object.entries(newCandidate).map(([key, value]) => (
              <TableCell key={key}>
                {key === "interviewStatus" ? (
                  <Select
                    value={value}
                    defaultValue={"Pending"}
                    onChange={(e) =>
                      setNewCandidate((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                ) : key === "rating" ? (
                  <Rating
                    name="simple-controlled"
                    value={Number(value)}
                    onChange={(event, newValue) =>
                      setNewCandidate((prev) => ({
                        ...prev,
                        [key]: newValue.toString(),
                      }))
                    }
                  />
                ) : (
                  <TextField
                    value={value}
                    onChange={(e) =>
                      setNewCandidate((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    disabled={key === "jobId"}
                    label={key}
                    variant="outlined"
                    size="small"
                  />
                )}
              </TableCell>
            ))}
            <TableCell>
              <Button
                disabled={Object.values(newCandidate).some((value) => !value)}
                onClick={handleAddCandidate}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
          {/* Edit Mode Toggle Button */}
          {candidates.length > 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Button onClick={handleEditToggle} color="primary">
                  {editMode ? "Save" : "Edit"}
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidatesTable;
