import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const HomePage = () => {
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
          Welcome Back, [Username]!
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
