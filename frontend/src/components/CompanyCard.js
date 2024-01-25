import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CompanyCard({ company }) {
  const { handle, name, description, numEmployees } = company;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="div"
          sx={{
            pt: "56.25%",
          }}
          image={"https://source.unsplash.com/random?backgrounds"}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography align="left">{description}</Typography>
          <Typography variant="body2" align="left" sx={{ padding: "16px 0 0" }}>
            Employees: {numEmployees}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/companies/${handle}`} style={{ textDecoration: "none" }}>
            <Button size="small">View Company</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
}
