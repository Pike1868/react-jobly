import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  const { id, title, salary, equity } = job;

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
                console.log("Applied to job:", id);
              }}
            >
              Apply
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
