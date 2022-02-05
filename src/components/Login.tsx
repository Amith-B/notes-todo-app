import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useState } from "react";
import http from "./../helpers/httpService";
import CircularProgress from "@mui/material/CircularProgress";
import { SIGNIN } from "../models/Api";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateDetails = (currentData: {
    email?: string;
    password?: string;
  }) => {
    setLoginDetails((prevData) => ({
      ...prevData,
      ...currentData,
    }));
  };

  const login = async () => {
    setIsLoading(true);
    try {
      const response = await http.post(SIGNIN, loginDetails);
      console.log(loginDetails, response);
    } catch (error) {}
    setIsLoading(false);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          borderRadius: 2,
        }}
      >
        <TextField
          id="outlined-email"
          size="small"
          label="Email"
          type="email"
          value={loginDetails.email}
          onChange={(event) => updateDetails({ email: event.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            margin: "10px",
          }}
          variant="outlined"
        />

        <TextField
          id="outlined-password"
          size="small"
          label="Password"
          type="password"
          value={loginDetails.password}
          onChange={(event) => updateDetails({ password: event.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            margin: "10px",
          }}
          variant="outlined"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            sx={{ margin: "10px", width: "100%" }}
            onClick={login}
            disabled={isLoading}
          >
            Login
            {isLoading && (
              <CircularProgress size={16} sx={{ marginLeft: "10px" }} />
            )}
          </Button>

          <Link
            style={{
              textDecoration: "none",
              color: "unset",
              margin: "10px",
              width: "100%",
            }}
            to="/register"
          >
            <Button variant="outlined" sx={{ width: "100%" }}>
              Register
            </Button>
          </Link>
        </Box>
      </Paper>
    </div>
  );
}

export default Login;
