import React, { FunctionComponent } from "react";
import { ThemeDefault } from "./themes";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout";
import MainPage from "./pages/Main";
import { ReactNotifications } from "react-notifications-component";

interface OwnProps {
  // Add some types here
  temp?: any;
}

type Props = OwnProps;

/**
 * React App component
 * @date 2022-05-27
 * @returns {ReactElement}
 *
 * @component
 * @example
 * return (<App/>)
 */
const App: FunctionComponent<Props> = (props) => {
  return (
    <ThemeProvider theme={ThemeDefault}>
      <Layout>
        <ReactNotifications />
        <MainPage />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
