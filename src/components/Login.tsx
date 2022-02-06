import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { SIGNIN } from "../models/Api";
import http from "../helpers/httpService";
import { LoginDetails } from "../models/Auth";
import { AxiosError } from "axios";

function Login() {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Partial<LoginDetails>>({});

  const updateDetails = (currentData: Partial<LoginDetails>) => {
    setLoginDetails((prevData) => ({
      ...prevData,
      ...currentData,
    }));
  };

  const login = async () => {
    setError({});
    setIsLoading(true);
    try {
      const response = await http.post(SIGNIN, loginDetails);
      console.log(loginDetails, response);
    } catch (error: AxiosError | any) {
      if (error?.response?.data?.error) {
        setError(error.response.data.error);
      }
    }
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
          error={!!error?.email}
          helperText={error?.email}
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
          margin="normal"
          variant="outlined"
        />

        <TextField
          error={!!error?.password}
          helperText={error?.password}
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
          margin="normal"
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
            sx={{ margin: "10px", marginLeft: 0, width: "100%" }}
            onClick={login}
            disabled={isLoading}
          >
            Login
            {isLoading && (
              <div style={{ marginLeft: "10px", display: "flex" }}>
                <CircularProgress size={16} />
              </div>
            )}
          </Button>

          <Link
            style={{
              textDecoration: "none",
              color: "unset",
              margin: "10px",
              marginRight: 0,
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
