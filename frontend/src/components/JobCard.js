import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import JoblyApi from "../api/JoblyApi";
import { useUserContext } from "../context/UserContext";

export default function JobCard({ job }) {
  const { userDetails, setUserDetails } = useUserContext();
  const { id, title, salary, equity } = job;

  // Check if user has already applied for this job
  const [hasApplied, setHasApplied] = useState(
    userDetails.applications.includes(id)
  );

  useEffect(() => {
    // Update the state when userDetails.applications changes
    setHasApplied(userDetails.applications.includes(id));
  }, [userDetails.applications, id]);

  const handleApplyClick = async () => {
    try {
      await JoblyApi.applyToJob(userDetails.username, id);
      setUserDetails({
        ...userDetails,
        applications: [...userDetails.applications, id],
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography align="left">Salary: {salary}</Typography>
          <Typography variant="body2" align="left" sx={{ padding: "16px 0 0" }}>
            Equity: {equity}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to="#" style={{ textDecoration: "none" }}>
            <Button
              size="small"
              onClick={() => {
                handleApplyClick();
              }}
              disabled={hasApplied}
            >
              {hasApplied ? "Applied" : "Apply"}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
