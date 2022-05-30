import { useTheme } from "@mui/material/styles";
import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface OwnProps {
  children?: any;
}

type Props = OwnProps;

/**
 * Main layout of the app
 * @date 2022-05-27
 * @param {ReactElement} children childred layout of this component
 * @returns {ReactElement}
 * @component
 * @example
 * return(
 *    <Layout>{childrenCOmponents}</Layout>
 * )
 */
const Layout: FunctionComponent<Props> = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <div
      id="main-layout"
      style={{
        backgroundColor: theme.palette.background.default,
        height: "100%",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
