import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { RegisterDetails } from "../models/Auth";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  signUp,
  selectRegisterStatus,
  selectRegisterError,
} from "../store/reducers/authSlice";

function Register() {
  const [signupDetails, setSignupDetails] = useState<RegisterDetails>({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector(selectRegisterStatus);
  const error = useAppSelector(selectRegisterError);

  const updateDetails = (currentData: Partial<RegisterDetails>) => {
    setSignupDetails((prevData) => ({
      ...prevData,
      ...currentData,
    }));
  };

  const register = () => {
    dispatch(signUp(signupDetails));
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
          error={!!error?.name}
          helperText={error?.name}
          id="outlined-username"
          size="small"
          label="Username"
          onChange={(event) => updateDetails({ name: event.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          margin="normal"
          variant="outlined"
        />
        <TextField
          error={!!error?.email}
          helperText={error?.email}
          id="outlined-email"
          size="small"
          label="Email"
          type="email"
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
            onClick={register}
            disabled={registerStatus === "loading"}
          >
            Register
            {registerStatus === "loading" && (
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
            to="/login"
          >
            <Button variant="outlined" sx={{ width: "100%" }}>
              Login
            </Button>
          </Link>
        </Box>
      </Paper>
    </div>
  );
}

export default Register;
