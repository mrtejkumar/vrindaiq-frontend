import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  MenuItem,
  AppBar,
  Toolbar,
  Grid
} from "@mui/material";
import logo from "../../assets/logo.png";
import { registerUser } from "../../Services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    mobile: "",
    experience_level: "Beginner",
    investment_style: "Long-term",
    preferred_market: "Stocks",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error for field
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.full_name.trim()) newErrors.full_name = "Full name is required.";
    if (!form.username.trim() || form.username.length < 3)
      newErrors.username = "Username must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email address.";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (form.mobile && !/^\+?\d{10,15}$/.test(form.mobile))
      newErrors.mobile = "Enter a valid mobile number.";

    return newErrors;
  };

  const handleRegister = async () => {
    setSuccess("");
    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    try {
      setErrors({});
      await registerUser(form);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      if (err.response?.data?.detail) {
        // Handle backend field errors
        const backendErrors: Record<string, string> = {};
        if (Array.isArray(err.response.data.detail)) {
          err.response.data.detail.forEach((d: any) => {
            const field = d.loc?.[1] || "general";
            backendErrors[field] = d.msg || "Invalid value";
          });
        } else if (typeof err.response.data.detail === "string") {
          backendErrors.general = err.response.data.detail;
        }
        setErrors(backendErrors);
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    }
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", py: 2 }}>
          <img src={logo} alt="Logo" style={{ height: "60px" }} />
        </Toolbar>
      </AppBar>

      {/* Layout */}
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        {/* Left side */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img src={logo} alt="Logo" style={{ height: "100px" }} />
          <Typography variant="h4" sx={{ animation: "fadeIn 2s", '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } } }}>
               Welcome to Vrinda IQ
             </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your gateway to seamless experience in Stock Market.
          </Typography>
        </Grid>

        {/* Right side (form) */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
              <Typography variant="h5" gutterBottom align="center">
                Register
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  name="full_name"
                  label="Full Name"
                  value={form.full_name}
                  onChange={handleChange}
                  error={!!errors.full_name}
                  helperText={errors.full_name}
                  fullWidth
                />
                <TextField
                  name="username"
                  label="Username"
                  value={form.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                  fullWidth
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
                <TextField
                  name="mobile"
                  label="Mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                  fullWidth
                />
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                />

                <TextField
                  select
                  name="experience_level"
                  label="Experience Level"
                  value={form.experience_level}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Expert">Expert</MenuItem>
                </TextField>

                <TextField
                  select
                  name="investment_style"
                  label="Investment Style"
                  value={form.investment_style}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Intraday">Intraday</MenuItem>
                  <MenuItem value="Swing">Swing</MenuItem>
                  <MenuItem value="Long-term">Long-term</MenuItem>
                </TextField>

                <TextField
                  select
                  name="preferred_market"
                  label="Preferred Market"
                  value={form.preferred_market}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Stocks">Stocks</MenuItem>
                  <MenuItem value="Mutual Funds">Mutual Funds</MenuItem>
                  <MenuItem value="ETFs">ETFs</MenuItem>
                </TextField>

                {errors.general && (
                  <Typography color="error">{errors.general}</Typography>
                )}
                {success && (
                  <Typography color="success.main">{success}</Typography>
                )}

                <Button variant="contained" fullWidth onClick={handleRegister}>
                  Register
                </Button>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Login
                </Button>
              </Box>
            </Paper>
          </Container>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box component="footer" sx={{ textAlign: "center", py: 2, mt: 4 }}>
        <Typography variant="body2">
          © 2023 My Application. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
