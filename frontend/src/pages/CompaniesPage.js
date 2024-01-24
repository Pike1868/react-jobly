import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import JoblyApi from "../api/JoblyApi";
import CompanyCard from "../components/CompanyCard";

export default function CompaniesPage() {
  const [companiesList, setCompaniesList] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    minEmployees: "",
    maxEmployees: "",
  });
  const [error, setError] = useState("");

  const fetchCompanies = async (searchParams = {}) => {
    try {
      const response = await JoblyApi.getAllCompanies(searchParams);
      setCompaniesList(response.companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (parseInt(search.minEmployees) > parseInt(search.maxEmployees)) {
      setError("Minimum employees cannot be greater than maximum employees.");
      return;
    }
    setError("");
    fetchCompanies(search);
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
            Search Companies
          </Typography>

          {error && <Typography color="error">{error}</Typography>}
          <Container maxWidth="sm">
            <form onSubmit={handleSearchSubmit}>
              <TextField
                label="Company Name"
                name="name"
                value={search.name}
                onChange={handleSearchChange}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Min Employees"
                name="minEmployees"
                value={search.minEmployees}
                onChange={handleSearchChange}
                type="number"
                margin="normal"
              />
              <TextField
                label="Max Employees"
                name="maxEmployees"
                value={search.maxEmployees}
                onChange={handleSearchChange}
                type="number"
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </form>
          </Container>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {companiesList.map((company) => (
            <CompanyCard key={company.handle} company={company} />
          ))}
        </Grid>
      </Container>
    </main>
  );
}
