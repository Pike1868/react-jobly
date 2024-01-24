import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import JoblyApi from "../api/JoblyApi";
import JobCard from "../components/JobCard";
import { useUserContext } from "../context/UserContext";

export default function UserProfile() {
  const { user } = useUserContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await JoblyApi.getUser(user.username);
        setFormData({
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
        });
        console.log(response.user);
        setApplications(response.user.applications);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      }
    }
    fetchUserData();
  }, [user.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await JoblyApi.updateUser(user.username, formData);
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Error updating user data");
    }
  };

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const jobsData = await Promise.all(
          applications.map(async (jobId) => {
            const response = await JoblyApi.getJob(jobId);
            return response.job;
          })
        );
        setJobDetails(jobsData);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    }

    fetchJobDetails();
  }, [applications]);

  console.log(applications);
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Paper elevation={24} sx={{ margin: "auto", maxWidth: "40%" }}>
        <Typography
          component="h3"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          User Profile
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Container maxWidth="sm">
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="First Name"
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Container>
      </Paper>

      <Container sx={{ py: 4 }} maxWidth="md">
        <Grid container spacing={4}>
          {jobDetails.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
