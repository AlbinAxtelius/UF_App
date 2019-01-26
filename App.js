import React from "react";
import { AuthStack } from "./src/config/tabs";
import { Provider } from "react-redux";
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";

import store from "./store";

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
    accentColor: "#C0392B"
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default class App extends React.Component {
  constructor() {
    super();
    console.ignoredYellowBox = ["Setting a timer"];
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <AuthStack />
        </ThemeContext.Provider>
      </Provider>
    );
  }
}
