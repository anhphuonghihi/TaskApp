import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import auth from "../api/auth";
import { HOME_ROUTER, LOGIN_ROUTE } from "../utils/consts";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    let err = false;

    if (username === "") {
      err = true;
      setUsernameErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }
    if (confirmPassword === "") {
      err = true;
      setConfirmPasswordErrText("Please fill this field");
    }
    setLoading(true);
    if (err) return;
    try {
      const res = await auth.signup({ username, password, confirmPassword });
      console.log("🚀 ~ file: Signup.jsx ~ line 40 ~ handleSubmit ~ res", res)

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
      <TextField
        margin="normal"
        required
        fullWidth
        id="confirmPassword"
        label="Confirm Password"
        name="confirmPassword"
        disabled={loading}
        error={confirmPasswordErrText !== ""}
        helperText={confirmPasswordErrText}
      />
      <LoadingButton
        variant="outlined"
        fullWidth
        color="success"
        type="submit"
        loading={loading}
      >
        Signup
      </LoadingButton>
      Already have an account?
      <Button component={Link} to={LOGIN_ROUTE}>
        Login
      </Button>
    </Box>
  );
};

export default Signup;
