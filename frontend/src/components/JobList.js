import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import JoblyApi from "../api/JoblyApi";
import JobCard from "../components/JobCard";

export default function JobList({ jobs }) {
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const jobsData = await Promise.all(
          jobs.map(async (job) => {
            //if an array of job objects, return job object
            if (typeof job === "object" && "id" in job) {
              return job;
            }
            //if an array of ids, fetch job details by id
            const response = await JoblyApi.getJob(job);
            return response.job;
          })
        );
        setJobDetails(jobsData);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    }

    fetchJobDetails();
  }, [jobs]);

  return (
    <Grid container spacing={4}>
      {jobDetails.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </Grid>
  );
}
