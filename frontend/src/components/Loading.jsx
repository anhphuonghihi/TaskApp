import { Box, CircularProgress } from "@mui/material";
import { styled, css } from "@mui/material/styles";
import React from "react";
const BoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex-direction: column;
  height: 100%;
  ${(props) =>
    props.fullHeight &&
    css`
      height: 100vh;
    `};
`;
const Loading = (props) => {
  return (
    <BoxStyled {...props}>
      <CircularProgress />
    </BoxStyled>
  );
};

export default Loading;
