import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useUserContext } from "../context/UserContext";

const HomePage = () => {
  const { user } = useUserContext();
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Jobly
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          All the jobs in one, convenient place.
        </Typography>
        <Typography variant="h4" component="h2">
          Welcome Back, {user.username}!
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
