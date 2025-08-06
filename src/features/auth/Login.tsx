import { useState } from "react";
import { Container, TextField, Button, Paper, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { useAuthStore } from "./authStore";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/authService";
import logo from "../../assets/logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const { access_token } = await loginUser(username, password);
      login(access_token);
      navigate("/");
    } catch (err: any) {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", py: 2 }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "60px" }}
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img src={logo} alt="Logo" style={{ height: "80px" }} />
          <Typography variant="h4" sx={{ animation: "fadeIn 2s", '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
            Welcome to Vrinda IQ
          </Typography>
        </Box>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" fullWidth onClick={handleLogin}>
            Login
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => navigate("/register")}
            sx={{ mt: 1 }}
          >
            Don't have an account? Register
          </Button>
        </Box>
      </Paper>
      </Container>
      <Box component="footer" sx={{ textAlign: "center", py: 2, mt: 4 }}>
        <Typography variant="body2">© 2023 My Application. All rights reserved.</Typography>
      </Box>
    </>
  );
}
