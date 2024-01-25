import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import JoblyApi from "../api/JoblyApi";
import JobList from "../components/JobList";
import { useUserContext } from "../context/UserContext";

export default function UserProfile() {
  const { userDetails } = useUserContext();
  const [formData, setFormData] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await JoblyApi.updateUser(userDetails.username, formData);
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Error updating user data");
    }
  };

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
        <Typography
          component="h4"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ marginBottom: "20px" }}
        >
          User Job Applications:
        </Typography>
        <JobList jobs={userDetails.applications} />
      </Container>
    </Box>
  );
}
