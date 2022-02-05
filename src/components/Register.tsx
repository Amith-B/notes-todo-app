import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function Register() {
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
          id="outlined-username"
          size="small"
          label="Username"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            margin: "10px",
          }}
          variant="outlined"
        />
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
            Register
          </Button>
          <Link
            style={{
              textDecoration: "none",
              color: "unset",
              margin: "10px",
              width: "100%",
            }}
            to="/login"
          >
            <Button variant="outlined" sx={{ width: "100%" }}>
              login
            </Button>
          </Link>
        </Box>
      </Paper>
    </div>
  );
}

export default Register;
