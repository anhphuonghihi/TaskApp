import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto";
import Switch from "@mui/material/Switch";
import Router from "./components/Router";
import { styled } from "@mui/material/styles";
const SwitchStyled = styled(Switch)`
  position: fixed;
  top: 20px;
  right: 20px;
`;
function App() {
  const [themes, setThemes] = useState(false);
  const click = () => {
    setThemes(!themes);
  };
  const them = themes ? "light" : "dark";
  const theme = createTheme({
    palette: { mode: them },
  });
  return (
    <ThemeProvider theme={theme}>
      <SwitchStyled onChange={click} />
      <CssBaseline />
      <Router />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
