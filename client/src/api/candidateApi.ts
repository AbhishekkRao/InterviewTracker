import axios from "axios";
import { headersProvider } from "../utils/serverHelper";

const backendUrl = "http://localhost:8080";

export const fetchCandidates = async (jobId) => {
  try {
    const response = await axios.get(`${backendUrl}/candidates/${jobId}`, {
      headers: headersProvider(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};

export const addCandidate = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/candidates`, data, {
      headers: headersProvider(),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding candidate:", error);
    throw error;
  }
};

export const deleteCandidate = async (id) => {
  try {
    const response = await axios.delete(`${backendUrl}/candidates/${id}`, {
      headers: headersProvider(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error;
  }
};
