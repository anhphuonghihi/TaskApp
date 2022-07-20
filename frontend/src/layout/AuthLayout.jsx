import React from "react";
import { Container, Box } from "@mui/material";
import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Loading from "../components/Loading";
const BoxStyled = styled(Box)`
  margin-top: 64px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return loading ? (
    <Loading fullHeight />
  ) : (
    <div>
      <Container maxWidth="xs">
        <BoxStyled>
          <Outlet />
        </BoxStyled>
      </Container>
    </div>
  );
};

export default AuthLayout;
