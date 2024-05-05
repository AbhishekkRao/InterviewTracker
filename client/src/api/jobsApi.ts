import axios from "axios";
import { headersProvider } from "../utils/serverHelper";

const backendUrl = "http://localhost:8080";

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${backendUrl}/jobs`, {
      headers: headersProvider(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getJob = async (id) => {
  try {
    const response = await axios.get(`${backendUrl}/jobs/${id}`, {
      headers: headersProvider(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

export const addJob = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/jobs`, data, {
      headers: headersProvider(),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    await axios.delete(`${backendUrl}/jobs/${id}`, {
      headers: headersProvider(),
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
