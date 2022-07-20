import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import auth from "../api/auth";
import {
    HOME_ROUTER,
    REGISTER_ROUTE,
  } from "../utils/consts";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    let err = false;

    if (username === "") {
      err = true;
      setUsernameErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }
    setLoading(true);
    if (err) return;
    try {
      const res = await auth.login({ username, password });
      res && localStorage.setItem("accesstoken", res.token);
      //   navigate("/");
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        disabled={loading}
        error={usernameErrText !== ""}
        helperText={usernameErrText}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        disabled={loading}
        error={passwordErrText !== ""}
        helperText={passwordErrText}
      />
      <LoadingButton
        variant="outlined"
        fullWidth
        color="success"
        type="submit"
        loading={loading}
      >
        Login
      </LoadingButton>
      Don't have an account?
      <Button component={Link} to={REGISTER_ROUTE}>
        Signup
      </Button>
    </Box>
  );
};

export default Login;
