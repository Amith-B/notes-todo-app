import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div
      style={{
        height: "100%",
        margin: "auto",
        width: "fit-content",
        padding: 20,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          id="outlined-email"
          size="small"
          label="Email"
          type="email"
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
          <Button variant="contained" sx={{ margin: "10px", width: "100%" }}>
            Login
          </Button>
          <Button variant="outlined" sx={{ margin: "10px", width: "100%" }}>
            <Link
              style={{
                textDecoration: "none",
                color: "unset",
              }}
              to="/register"
            >
              Register
            </Link>
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default Login;
