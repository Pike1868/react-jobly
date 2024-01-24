import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const NavBar = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("joblyToken");
    setUser(null);
    console.log("logging out now...");
    navigate("/");
  };
  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#253031",
        maxWidth: "100%",
      }}
    >
      <Link component={RouterLink} to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ margin: "1rem", fontWeight: "700", color: "#a2bd9c" }}
          href="/"
        >
          JOBLY
        </Typography>
      </Link>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link
          component={RouterLink}
          to="/companies"
          color="inherit"
          style={{ margin: "0 10px" }}
        >
          <Button color="inherit" style={{ fontWeight: "600" }}>
            Companies
          </Button>
        </Link>
        <Link
          component={RouterLink}
          to="/jobs"
          color="inherit"
          style={{ margin: "0 10px" }}
        >
          <Button color="inherit" style={{ fontWeight: "600" }}>
            Jobs
          </Button>
        </Link>
        <Link
          component={RouterLink}
          to="/profile"
          color="inherit"
          style={{ margin: "0 10px" }}
        >
          <Button color="inherit" style={{ fontWeight: "600" }}>
            Profile
          </Button>
        </Link>
        {user && (
          <Button
            color="inherit"
            style={{ fontWeight: "600", margin: "0 10px" }}
            onClick={logout}
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
