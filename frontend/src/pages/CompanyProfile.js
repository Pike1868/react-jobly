import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import JobCard from "../components/JobCard";

export default function CompanyProfile() {
  const [company, setCompany] = useState(null);
  const { handle } = useParams();

  useEffect(() => {
    async function getCompanyDetails() {
      try {
        const response = await JoblyApi.getCompany(handle);
        setCompany(response.company);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    }
    getCompanyDetails();
  }, [handle]);

  if (!company) return <Box>Loading...</Box>;

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h3"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {company.name}
          </Typography>
          <Typography variant="h2" component="h1" gutterBottom></Typography>
          <Typography variant="body1">{company.description}</Typography>
        </Container>
      </Box>

      <Container sx={{ py: 4 }} maxWidth="md">
        <Grid container spacing={4}>
          {company.jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
