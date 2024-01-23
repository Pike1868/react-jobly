import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { FormControlLabel, Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import JoblyApi from "../api/JoblyApi";
import JobCard from "../components/JobCard";

export default function CompaniesPage() {
  const [jobsList, setJobsList] = useState([]);
  const [search, setSearch] = useState({
    title: "",
    minSalary: "",
    hasEquity: false,
  });
  const [error, setError] = useState("");

  const fetchJobs = async (searchParams = {}) => {
    console.log(searchParams);
    try {
      const response = await JoblyApi.getAllJobs(searchParams);
      setJobsList(response.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    setError("");
    fetchJobs(search);
  };

  return (
    <main>
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
            Search Jobs
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Container maxWidth="sm">
            <form onSubmit={handleSearchSubmit}>
              <TextField
                label="Job Title"
                name="title"
                value={search.title}
                onChange={handleSearchChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Minimum Salary"
                name="minSalary"
                value={search.minSalary}
                onChange={handleSearchChange}
                type="number"
                margin="normal"
              />
              <Box>
                <Checkbox
                  checked={search.hasEquity}
                  onChange={(e) =>
                    setSearch({ ...search, hasEquity: e.target.checked })
                  }
                  name="hasEquity"
                />
                <Typography component="label" htmlFor="hasEquity">
                  Has Equity
                </Typography>
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </form>
          </Container>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {jobsList.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Grid>
      </Container>
    </main>
  );
}
